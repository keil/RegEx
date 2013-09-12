/*
 * Efficient Solving of Regular Expression Inequalities 
 *  Regular Expression Generator
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date$
 * $Rev$
 */
(function(RegEx) {

		SELF = {};
		RegEx.Generator = SELF;

		//////////////////////////////////////////////////
		// Result
		//////////////////////////////////////////////////

		/** Generator Result 
		 * @param dummy	RegEx Dummy 
		 * @param depth RegEx depth
		 * @param pool	Literal pool
		 * @param cache	Replaceable Cache
		 */
		function Result(dummy, depth, pool, cache) {
				/** Get Dummy */
				this.getDummy = function() { return dummy; };
				/** Get Depth */
				this.getDepth = function() { return depth; };
				/** Get Pool */
				this.getPool = function() { return pool; };
				/** Get Replaceables */
				this.getReplaceables = function() { return cache; };
				/** To String */
				this.toString = function() { return '{' + dummy.toString()+ ' / ' + depth + ' / ' + pool.toString() + ' / ' +  cache.toString(); };
		}
		SELF.Result = Result;

		//////////////////////////////////////////////////
		// Generator
		//////////////////////////////////////////////////

		/** Make Function
		 * @param depth	Depth of Regular Expressions (nesting index)
		 * @return Array of RegEx.Generator.Result
		 */
		function make(depth) {
				var pool = new RegEx.Pool.Pool(undefined, undefined);	
				return generate(depth, pool);
		}
		SELF.make = make;

		/** Generate Function
		 * @param depth	Nesting Index
		 * @param pool	Literal Pool
		 * @return Array of RegEx.Generator.Result
		 */
		function generate(depth, pool) {

				var results = new Array();

				// Termination Condition
				if(depth==0) return results;

				// r?
				generate((depth-1), pool).foreach(function(i, rRes) {

						// Depth
						var depth = rRes.getDepth()+1;

						// Pool
						var pool = rRes.getPool();

						// Replaceable
						var dummy = new RegEx.Dummy.OptionalDummy(rRes.getDummy());
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						/* FLAG */ rep.isOpt = true;

						// Replaceables
						var store = new RegEx.Replaceable.Store();
						store.merge(rRes.getReplaceables());
						/* FLAG */ store.setInOpt();
						//store.push(rep);

						//results.push(new Result(rep, depth, pool, store));
				});

				// r*
				generate((depth-1), pool).foreach(function(i, rRes) {

						// Depth
						var depth = rRes.getDepth()+1;

						// Pool
						var pool = rRes.getPool();

						// Replaceable
						var dummy = new RegEx.Dummy.StarDummy(rRes.getDummy());
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						/* FLAG */ rep.isStar = true;

						// Replaceables
						var store = new RegEx.Replaceable.Store();
						store.merge(rRes.getReplaceables());
						/* FLAG */ store.setInStar();
						//store.push(rep);

						//results.push(new Result(rep, depth, pool, store));
				});

				// r+s
				generate((depth-1), pool).foreach(function(i, rRes) {
						generate((depth-1), rRes.getPool()).foreach(function(j, sRes) {

								// Depth
								var depth = Math.max(rRes.getDepth(), sRes.getDepth())+1;

								// Pool
								var pool = sRes.getPool();

								// Replaceable
								var dummy = new RegEx.Dummy.OrDummy(rRes.getDummy(), sRes.getDummy());
								var rep = new RegEx.Replaceable.Replaceable(dummy);
								/* FLAG */ rep.isOr = true;

								// Replaceables
								var store = new RegEx.Replaceable.Store();
								store.merge(rRes.getReplaceables());
								store.merge(sRes.getReplaceables());
								/* FLAG */ store.setInOr();
								//store.push(rep);

								results.push(new Result(rep, depth, pool, store));
						});
				});

				// r&s
				generate((depth-1), pool).foreach(function(i, rRes) {
						generate((depth-1), rRes.getPool()).foreach(function(j, sRes) {

								// Depth
								var depth = Math.max(rRes.getDepth(), sRes.getDepth())+1;

								// Pool
								var pool = sRes.getPool();

								// Replaceable
								var dummy = new RegEx.Dummy.AndDummy(rRes.getDummy(), sRes.getDummy());
								var rep = new RegEx.Replaceable.Replaceable(dummy);
								/* FLAG */ rep.isAnd = true;

								// Replaceables
								var store = new RegEx.Replaceable.Store();
								store.merge(rRes.getReplaceables());
								store.merge(sRes.getReplaceables());
								/* FLAG */ store.setInAnd();
								//store.push(rep);

								//results.push(new Result(rep, depth, pool, store));
						});
				});

				// !r
				generate((depth-1), pool).foreach(function(i, rRes) {

						// Depth
						var depth = rRes.getDepth()+1;

						// Pool
						var pool = rRes.getPool();

						// Replaceable
						var dummy = new RegEx.Dummy.NegationDummy(rRes.getDummy());
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						/* FLAG */ rep.isNeg = true;

						// Replaceables
						var store = new RegEx.Replaceable.Store();
						store.merge(rRes.getReplaceables());
						/* FLAG */ store.setInNeg();
			//			/* INVERT */ store.invert();
						//store.push(rep);

						//results.push(new Result(rep, depth, pool, store));
				});

				// r.s
				generate((depth-1), pool).foreach(function(i, rRes) {
						generate(1, rRes.getPool()).foreach(function(j, sRes) {

								// Depth
								var depth = Math.max(rRes.getDepth(), sRes.getDepth())+1;

								// Pool
								var pool = sRes.getPool();

								// Replaceable
								var dummy = new RegEx.Dummy.ConcatDummy(rRes.getDummy(), sRes.getDummy());
								var rep = new RegEx.Replaceable.Replaceable(dummy);
								/* FLAG */ rep.isConcat = true;

								// Store 
								var store = new RegEx.Replaceable.Store();
								store.merge(rRes.getReplaceables());
								store.merge(sRes.getReplaceables());
								/* FLAG */ store.setInConcat();
								//store.push(rep);
								
								results.push(new Result(rep, depth, pool, store));
						});
				});

				// OPTINAL: represents real/used regex
				if(RegEx.config.full) {
// deaktivated because of space reasons
/*						// {} 
						var dummy = new RegEx.Dummy.EmptySetDummy();
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						var store = new RegEx.Replaceable.Store();
						store.push(rep);
						results.push(new Result(dummy, 1, pool, store));

						// ^
						var dummy = new RegEx.Dummy.EmptyDummy();
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						var store = new RegEx.Replaceable.Store();
						store.push(rep);
						results.push(new Result(dummy, 1, pool, store));

						// @
						var dummy = new RegEx.Dummy.AtDummy();
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						var store = new RegEx.Replaceable.Store();
						store.push(rep);
						results.push(new Result(dummy, 1, pool, store));
*/
						// ?
						var dummy = new RegEx.Dummy.QMarkDummy();
						var rep = new RegEx.Replaceable.Replaceable(dummy);
						var store = new RegEx.Replaceable.Store();
						store.push(rep);
						results.push(new Result(dummy, 1, pool, store));
				}

				// x 
				var pool =  new RegEx.Pool.Pool(pool);
				var dummy = pool.getInLiteral();
				var rep = new RegEx.Replaceable.Replaceable(dummy);
				var store = new RegEx.Replaceable.Store();
				store.push(rep);
				results.push(new Result(rep, 1, pool, store));

				return results;
		}

})(__RegEx);
