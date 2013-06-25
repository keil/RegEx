(function(RegEx) {

		SELF = {};
		RegEx.Generator = SELF;


		function Result(regex, pool, depth, cache) {

				__sysout("@ " + regex + " / " + pool + " / " + depth + " / " + cache.getLength());	

				this.getRegEx = function() {
						return regex;
				};

				this.getPool = function() {
						return pool;
				};

				this.getDepth = function() {
						return depth;
				};

				this.getReplaceable = function() {
						__sysout("!!" + cache);
						return cache;
				};

				this.toString = function() {
						//__sysout("toString on Result: " + regex);
						//__sysout(regex instanceof RegEx.Dummy.OptionalDummy);
						return "#" + regex.toString();
						//return "[" + regex.toString() + "] - {" + pool.toString() + "}";
				}
		}
		SELF.Result = Result;



/*		function Replaceable(regex) {

				// CONTRACT INTERFACE
				this.isEmpty = function() { return regex.isEmpty(); };
				this.isBlank = function() { return regex.isBlank(); };
				this.isNullable = function() { return regex.isNullable(); };
				this.isIndifferent = function() { return regex.isIndifferent(); };
				this.isUniversal = function() { return regex.isUniversal(); };
				this.isReadable = function(name) { return regex.isReadable(); };
				this.isWriteable = function(name) { return regex.isWriteable(); };
				this.first = function() { return regex.first(); };
				this.derive = function(name) { return regex.derive(); };
				this.lderive = function(larg) { return regex.lderive(); };
				this.uderive = function(larg) { return regex.uderive(); };
				this.isSuperSetOf = function(arg, ctx) { return regex.isSuperSetOf(arg, ctx); };
				this.isSubSetOf = function(arg, ctx) { return regex.isSubSetOf(arg, ctx); };
				this.reduce = function() { return regex.reduce(); };
				this.dump = function() { return regex.dump(); };
				this.toString = function() { return regex.toString(); };





				this.replace = function(newregex) {
						regex = newregex;
				};

				this.getRegEx = function() {
					return regex;
				}
		}
		SELF.Replaceable = Replaceable;

*/





		function make(depth) {
				var pool = new RegEx.Pool.Pool();
				//var replaceable = new Array();
				var cache = new RegEx.Replaceable.Cache();	

				return generate(depth, pool, cache);
		}
		SELF.make = make;




		function generate(depth, pool, replaceables) {

				var results = new Array();

				if(depth==0) return results;

				// r?
				generate((depth-1), pool, replaceables).foreach(function(i, r) {

							rr = new RegEx.Replaceable.Replaceable(r.getRegEx());

						
								replaceables = r.getReplaceable();
								replaceables = replaceables.add(rr);

								__sysout("\n\n\n$$$$$$$$$$" + r.getReplaceable().getLength() + "/" + replaceables.getLength() + "$$$$$$$$$$\n\n\n");


						results.push(new Result(new RegEx.Dummy.OptionalDummy(r.getRegEx()), r.getPool(), depth, replaceables));
				});

				// r*
				generate((depth-1), pool, replaceables).foreach(function(i, r) {

							rr = new RegEx.Replaceable.Replaceable(r.getRegEx());

								replaceables = r.getReplaceable();
								replaceables = replaceables.add(rr);


						results.push(new Result(new RegEx.Dummy.StarDummy(r.getRegEx()), r.getPool(), depth, replaceables));
				});

				// r+s
				generate((depth-1), pool, replaceables).foreach(function(i, r) {
						generate((depth-1), r.getPool(), r.getReplaceable()).foreach(function(j, s) {

								rr = new RegEx.Replaceable.Replaceable(r.getRegEx());
								sr = new RegEx.Replaceable.Replaceable(s.getRegEx());

								replaceables = r.getReplaceable();
								replaceables = replaceables.add(rr);
								replaceables = replaceables.add(sr);

								results.push(new Result(new RegEx.Dummy.OrDummy(r.getRegEx(),s.getRegEx()), s.getPool(), depth, replaceables));
						});
				});

				// r&s
				generate((depth-1), pool, replaceables).foreach(function(i, r) {
						generate((depth-1), r.getPool(), r.getReplaceable()).foreach(function(j, s) {

								rr = new RegEx.Replaceable.Replaceable(r.getRegEx());
								sr = new RegEx.Replaceable.Replaceable(s.getRegEx());

								replaceables = s.getReplaceable();
								replaceables = replaceables.add(rr);
								replaceables = replaceables.add(sr);

								results.push(new Result(new RegEx.Dummy.AndDummy(r.getRegEx(),s.getRegEx()), s.getPool(), depth, replaceables));
						});
				});

				// !r
				generate((depth-1), pool, replaceables).foreach(function(i, r) {

						rr = new RegEx.Replaceable.Replaceable(r.getRegEx());

								replaceables = r.getReplaceable();
								replaceables = replaceables.add(rr);

						results.push(new Result(new RegEx.Dummy.NegDummy(r.getRegEx()), r.getPool(), depth, replaceables));
				});

				// r.s
				generate((depth-1), pool, replaceables).foreach(function(i, r) {
						generate(1, r.getPool(), r.getReplaceable()).foreach(function(j, s) {

								rr = new RegEx.Replaceable.Replaceable(r.getRegEx());
								sr = new RegEx.Replaceable.Replaceable(s.getRegEx());

								replaceables = s.getReplaceable();
								replaceables = replaceables.add(rr);
								replaceables = replaceables.add(sr);

								results.push(new Result(new RegEx.Dummy.ConcatDummy(rr, sr), s.getPool(), depth, replaceables));

								//results.push(new Result(new RegEx.Dummy.ConcatDummy(r.getRegEx(),s.getRegEx()), s.getPool(), depth, s.getReplaceable()));
								//		results.push(new RegEx.Dummy.ConcatDummy(r,s));
						});
				});



				// {} 
				// OPTINAL: represents real/used regex
				//				results.push(new RegEx.Dummy.EmptySetLiteral());

				// ^
				// OPTINAL: represents real/used regex
				//				results.push(new RegEx.Dummy.EmptyLiteral());

				// @
				// OPTINAL: represents a SET
				//				results.push(new RegEx.Dummy.AtLiteral());

				// ?
				// OPTINAL: represents a SET
				//				results.push(new RegEx.Dummy.QMarkLiteral());

				// 
				// TODO change "name" to the correspondig english word used in RegEx 
				//pool
				
				
				var l = pool.newLiteral();
				var lr = new RegEx.Replaceable.Replaceable(l.literal);

				replaceables = replaceables.add(lr);
				results.push(new Result(l.literal, l.pool, 1, replaceables));

				return results;
		}




})(__RegEx);
