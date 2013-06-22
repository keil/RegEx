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
						return regex.toString();
						//return "[" + regex.toString() + "] - {" + pool.toString() + "}";
				}
		}
		SELF.Result = Result;

		function make(depth) {
				var results = new Array();
				// TODO: aktuell arbeitet alles auf dem selben pool
				var pool = new RegEx.Pool.Pool();

				generate(depth, pool).foreach(function(i, r) {
						results.push(new Result(r,pool));
				});

				return results;
		}
		SELF.make = make;


		function generate(depth, pool) {

				var results = new Array();

				if(depth==0) return results;


				// r?
				generate((depth-1), pool).foreach(function(i, r) {
						results.push(new Result(new RegEx.Expressions.QMarkRegEx(r.getRegEx()), pool, depth));
						//results.push(new RegEx.Expressions.QMarkRegEx(r));
				});
				// r*
				generate((depth-1), pool).foreach(function(i, r) {
						results.push(new Result(new RegEx.Expressions.StarRegEx(r.getRegEx()), r.getPool(), depth));
					//	var result = new Result(new RegEx.Expressions.StarRegEx(r), pool, depth);
					//	results.add(result);
//						results.push(new RegEx.Expressions.StarRegEx(r));
				});

				// r+s
				generate((depth-1), pool).foreach(function(i, r) {
						generate((depth-1), r.getPool()).foreach(function(j, s) {
								results.push(new Result(new RegEx.Expressions.OrRegEx(r.getRegEx(),s.getRegEx()), s.getPool(), depth));
						});
				});

				// r&s
				generate((depth-1), pool).foreach(function(i, r) {
						generate((depth-1), r.getPool()).foreach(function(j, s) {
								results.push(new Result(new RegEx.Expressions.AndRegEx(r.getRegEx(),s.getRegEx()), s.getPool(), depth));
						});
				});

				// !r
				generate((depth-1), pool).foreach(function(i, r) {
						results.push(new Result(new RegEx.Expressions.NegRegEx(r.getRegEx()), r.getPool(), depth));
				});

				// r.s
				generate((depth-1), pool).foreach(function(i, r) {
						generate(1, r.getPool()).foreach(function(j, s) {
						results.push(new Result(new RegEx.Expressions.ConcatRegEx(r.getRegEx(),s.getRegEx()), r.getPool(), depth));
							//		results.push(new RegEx.Expressions.ConcatRegEx(r,s));
						});
				});

//					generate((depth-1), pool).foreach(function(i, s) {
//						generate(1, pool).foreach(function(j, r) {
//								results.push(new RegEx.Expressions.ConcatRegEx(r,s));
//						});
//				});


				// {} 
				// OPTINAL: represents real/used regex
//				results.push(new RegEx.Expressions.EmptySetLiteral());

				// ^
				// OPTINAL: represents real/used regex
//				results.push(new RegEx.Expressions.EmptyLiteral());

				// @
				// OPTINAL: represents a SET
//				results.push(new RegEx.Expressions.AtLiteral());

				// ?
				// OPTINAL: represents a SET
//				results.push(new RegEx.Expressions.QMarkLiteral());

				// 
				// TODO change "name" to the correspondig english word used in RegEx 
				pool
				l = pool.newLiteral();
				results.push(new Result(l.literal, l.pool));

return results;


		}




})(__RegEx);
