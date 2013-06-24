(function(RegEx) {

		SELF = {};
		RegEx.Generator = SELF;


		function Result(regex, pool, depth) {

				this.getDepth = function() {
						return depth;
				};

				this.getRegEx = function() {
						return regex;
				};

				this.getPool = function() {
						return pool;
				};

				this.toString = function() {
						//__sysout("toString on Result: " + regex);
						//__sysout(regex instanceof RegEx.Dummy.OptionalDummy);
						return "#" + regex.toString();
						//return "[" + regex.toString() + "] - {" + pool.toString() + "}";
				}
		}
		SELF.Result = Result;



		function Replaceable(regex) {

				// CONTRACT INTERFACE
			/*	this.isEmpty = function() { return regex.isEmpty(); };
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

*/



				this.replace = function(newregex) {
						regex = newregex;
				};

				this.getRegEx = function() {
					return regex;
				}
		}
		SELF.Replaceable = Replaceable;







		function make(depth) {
		//		var results = new Array();
				var pool = new RegEx.Pool.Pool();

				//generate(depth, pool).foreach(function(i, r) {
			//			results.push(new Result(r,pool));
		//		});

		//		return results;
		return generate(depth, pool);
		}
		SELF.make = make;




		function generate(depth, pool) {

				var results = new Array();

				if(depth==0) return results;

				// r?
				generate((depth-1), pool).foreach(function(i, r) {
						results.push(new Result(new RegEx.Dummy.OptionalDummy(r.getRegEx()), pool, depth));
				});

				// r*
				generate((depth-1), pool).foreach(function(i, r) {
						results.push(new Result(new RegEx.Dummy.StarDummy(r.getRegEx()), r.getPool(), depth));
				});

				// r+s
				generate((depth-1), pool).foreach(function(i, r) {
						generate((depth-1), r.getPool()).foreach(function(j, s) {
								results.push(new Result(new RegEx.Dummy.OrDummy(r.getRegEx(),s.getRegEx()), s.getPool(), depth));
						});
				});

				// r&s
				generate((depth-1), pool).foreach(function(i, r) {
						generate((depth-1), r.getPool()).foreach(function(j, s) {
								results.push(new Result(new RegEx.Dummy.AndDummy(r.getRegEx(),s.getRegEx()), s.getPool(), depth));
						});
				});

				// !r
				generate((depth-1), pool).foreach(function(i, r) {
						results.push(new Result(new RegEx.Dummy.NegDummy(r.getRegEx()), r.getPool(), depth));
				});

				// r.s
				generate((depth-1), pool).foreach(function(i, r) {
						generate(1, r.getPool()).foreach(function(j, s) {
								results.push(new Result(new RegEx.Dummy.ConcatDummy(r.getRegEx(),s.getRegEx()), s.getPool(), depth));
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
				
				
				l = pool.newLiteral();
				rep = new Replaceable(l)
				
				results.push(new Result(l.literal, l.pool));

				return results;


		}




})(__RegEx);
