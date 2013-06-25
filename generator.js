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
 * $Date: 2013-05-14 08:21:34 +0200 (Tue, 14 May 2013) $
 * $Rev: 23219 $
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
		 * \\ TODO change order
		 */
		function Result(dummy, depth, pool, cache) {

				// TODO
				//	__sysout("@ " + regex + " / " + pool + " / " + depth + " / " + cache.getLength());


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
				var reps = new RegEx.Replaceable.Cache();	

				return generate(depth, pool, reps);
		}
		SELF.make = make;


		/** Generate Function
		 * @param depth	Nesting Index
		 * @param pool	Literal Pool
		 * @param reps	Replaceables Cache
		 * @return Array of RegEx.Generator.Result
		 */
		function generate(depth, pool, reps) {

				var results = new Array();

				// Termination Condition
				if(depth==0) return results;

				// r?
				generate((depth-1), pool, reps).foreach(function(i, rRes) {

						// Dummy
						var rDummy = rRes.getDummy();

						// Pool
						var pool = rRes.getPool();

						// Replaceable
						var rRep = new RegEx.Replaceable.Replaceable(rDummy);
						var reps = rRes.getReplaceables();
						var reps = reps.push(rRep);

						results.push(new Result(new RegEx.Dummy.OptionalDummy(rDummy), depth, pool, reps));
				});

				// r*
				generate((depth-1), pool, reps).foreach(function(i, rRes) {

						// Dummy
						var rDummy = rRes.getDummy();

						// Pool
						var pool = rRes.getPool();

						// Replaceable
						var rRep = new RegEx.Replaceable.Replaceable(rDummy);
						var reps = rRes.getReplaceables();
						var reps = reps.push(rRep);

						results.push(new Result(new RegEx.Dummy.StarDummy(rDummy), depth, pool, reps));
				});

				// r+s
				generate((depth-1), pool, reps).foreach(function(i, rRes) {
						generate((depth-1), rRes.getPool(), rRes.getReplaceables()).foreach(function(j, sRes) {

								// Dummy
								var rDummy = rRes.getDummy();
								var sDummy = sRes.getDummy();

								// Pool
								var pool = sRes.getPool();

								// Replaceable
								var rRep = new RegEx.Replaceable.Replaceable(rDummy);
								var sRep = new RegEx.Replaceable.Replaceable(sDummy);
								var reps = rRes.getReplaceables();
								var reps = reps.push(rRep);
								var reps = reps.push(sRep);

								results.push(new Result(new RegEx.Dummy.OrDummy(rDummy, sDummy), depth, pool, reps));
						});
				});

				// r&s
				generate((depth-1), pool, reps).foreach(function(i, rRes) {
						generate((depth-1), rRes.getPool(), rRes.getReplaceables()).foreach(function(j, sRes) {

								// Dummy
								var rDummy = rRes.getDummy();
								var sDummy = sRes.getDummy();

								// Pool
								var pool = sRes.getPool();

								// Replaceable
								var rRep = new RegEx.Replaceable.Replaceable(rDummy);
								var sRep = new RegEx.Replaceable.Replaceable(sDummy);
								var reps = rRes.getReplaceables();
								var reps = reps.push(rRep);
								var reps = reps.push(sRep);

								results.push(new Result(new RegEx.Dummy.AndDummy(rDummy, sDummy), depth, pool, reps));
						});
				});

				// !r
				generate((depth-1), pool, reps).foreach(function(i, rRes) {

						// Dummy
						var rDummy = rRes.getDummy();

						// Pool
						var pool = rRes.getPool();

						// Replaceable
						var rRep = new RegEx.Replaceable.Replaceable(rDummy);
						var reps = rRes.getReplaceables();
						var reps = reps.push(rRep);

						results.push(new Result(new RegEx.Dummy.NegDummy(rDummy), depth, pool, reps));
				});

				// r.s
				generate((depth-1), pool, reps).foreach(function(i, rRes) {
						generate(1, rRes.getPool(), rRes.getReplaceables()).foreach(function(j, sRes) {

								// Dummy
								var rDummy = rRes.getDummy();
								var sDummy = sRes.getDummy();

								// Pool
								var pool = sRes.getPool();

								// Replaceable
								var rRep = new RegEx.Replaceable.Replaceable(rDummy);
								var sRep = new RegEx.Replaceable.Replaceable(sDummy);
								var reps = rRes.getReplaceables();
								var reps = reps.push(rRep);
								var reps = reps.push(sRep);

								results.push(new Result(new RegEx.Dummy.ConcatDummy(rDummy, sDummy), depth, pool, reps));
						});
				});

				// TODO einstellige und zweistellige in eine function zudsammenfassen

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


				// TODO einkapseln



				var lPool =  new RegEx.Pool.Pool(pool);
				var lDummy = lPool.getInLiteral();



				// Dummy
			//	var lDummy = pool.getInLiteral();
				// Pool
				//var lPool = pool.newPool(lDummy);
				

			//	lPool = new RegEx.Pool.Pool(new RegEx.Pool.Pool(), lDummy);
//
//				// Replaceable
//				var lRep = new RegEx.Replaceable.Replaceable(lDummy);
//				var reps = reps.push(lRep);
				results.push(new Result(lDummy, 1, lPool, reps));

				return results;
		}

})(__RegEx);
