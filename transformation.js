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
		RegEx.Transformation = SELF;

		//////////////////////////////////////////////////
		// Result
		//////////////////////////////////////////////////

		/** Transformation Result
		 * @left left regex (r)
		 * @right right contract (s)
		 * @depth depth-index for statistics
		 * @valid true, if r <= s, false otherwise
		 */
		function Result(left, right, depth, valid) {
				/** Get Left */
				this.getLeft = function() { return left; };
				/** Get Right */
				this.getRight = function() { return right; };
				/** Get Depth */
				this.getDepth = function() { return depth; };
				/** Get Valid */
				this.isValid = function() { return valid; };
				/** To String */
				this.toString = function() { return left + " <= " + right + " (" + depth + ") (" + valid + ")"; };
		}
		SELF.Result = Result;

		//////////////////////////////////////////////////
		// Make
		//////////////////////////////////////////////////

		function make(arg) {
				var results = new Array();

				arg.foreach(function(i, result) {

						// Literal Transformation
						results.append(mkLiteralTransformation(result));
						// Or Transformation
//						results.append(mkOrTransformation(result));
						// And Transformation
//						results.append(mkAndTransformation(result));
						// Opt Transformation
						//results.append(mkOptTransformation(result)); //  TODO, at the moment not applicable, because a?? <= a? 
						// Star Transformation
//						results.append(mkStarTransformation(result)); // TODO, at the moment not applicable, because a?? <= a?
						// Neg Transformation
//						results.append(mkNegTransformation(result));
				});

				return results;
		}
		SELF.make = make;

		/**
		 * Replace: ..r.. -> ..s..
		 * @param result	Generator Result
		 */
		function mkLiteralTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getCache());

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return pool.getNotInLiteral();
				}, /* Orig <= Mod */ function(rep) {
						var result = false;
						if(rep.inAnd) result=true;

						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						if(rep.inAnd) result=true;
						if(rep.isNeg) result=true;

						return result;
				}, /* use +/- */ function(rep) {
						var result = false;

						return result;
				}));

//				results.append(iterate(result, set, function(replaceable, pool, origin) {
//						return new RegEx.Expressions.RegExWrapper(new RegEx.Dummy.NegationDummy(replaceable.getOrigin()));
//				}, false, false, false));

//				var set = new Array();				
//				set.append(result.getReplaceables().getAndCache());

//				results.append(iterate(result, set, function(replaceable, pool, origin) {
//						return pool.getNotInLiteral();
//				}, true, true));

//				var set = new Array();				
//				set.append(result.getReplaceables().getLiteralCache());
				//set.append(result.getReplaceables().getOptionalCache());	
				//set.append(result.getReplaceables().getStarCache());
				//set.append(result.getReplaceables().getOrCache());
				//set.append(result.getReplaceables().getAndCache());
				//set.append(result.getReplaceables().getNegationCache());
				//set.append(result.getReplaceables().getConcatCache());

//				results.append(iterate(result, set, function(replaceable, pool, origin) {
//						return new RegEx.Dummy.NegationDummy(replaceable.getOrigin());
//				}, false, false));


				return results;
		}

		/** Replace: ..r.. -> ..(r+s)..
		 * @param result	Generator Result
		 */
		function mkOrTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOptionalCache());	
				set.append(result.getReplaceables().getStarCache());
				set.append(result.getReplaceables().getOrCache());
				set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getNegationCache());
				set.append(result.getReplaceables().getConcatCache());			

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.OrDummy(replaceable.getOrigin(), pool.getNotInLiteral());
				}, true, false));

				return results;
		}

		/** Replace: ..r.. -> ..(r&s)..
		 * @param result	Generator Result
		 */
		function mkAndTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOptionalCache());	
				set.append(result.getReplaceables().getStarCache());
				set.append(result.getReplaceables().getOrCache());
				set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getNegationCache());
				set.append(result.getReplaceables().getConcatCache());			

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.AndDummy(replaceable.getOrigin(), pool.getNotInLiteral());
				}, false, true));

				return results;
		}

		/** Replace: ..r.. -> ..r?..
		 * @param result	Generator Result
		 */
		function mkOptTransformation(result) {
				var results = new Array();

				var set = new Array();				
				//set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOptionalCache());	
				//set.append(result.getReplaceables().getStarCache());
				//set.append(result.getReplaceables().getOrCache());
				//set.append(result.getReplaceables().getAndCache());
				//set.append(result.getReplaceables().getNegationCache());
				//set.append(result.getReplaceables().getConcatCache());			
				// TODO, test if nullable, otherwise dont replace

//				results.append(iterate(result, set, function(replaceable, pool, origin) {
//						return replaceable.getOrigin();
//				}, true, false));

				return results;
		}

		/** Replace: ..r.. -> ..r*..
		 * @param result	Generator Result
		 */
		function mkStarTransformation(result) {
				var results = new Array();

				var set = new Array();				
				//set.append(result.getReplaceables().getLiteralCache());
				//set.append(result.getReplaceables().getOptionalCache());	
				set.append(result.getReplaceables().getStarCache());
				//set.append(result.getReplaceables().getOrCache());
				//set.append(result.getReplaceables().getAndCache());
				//set.append(result.getReplaceables().getNegationCache());
				//set.append(result.getReplaceables().getConcatCache());
				// TODO, test if nullable, otherwise dont replace			

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return replaceable.getOrigin().getSubDummy();
				}, false, true, true));

				return results;
		}

		// TODO
		/** Replace: ..!(r).. -> ..r..
		 * Replace: ..!(r).. -> ..!(s)..
		 * @param result	Generator Result
		 */
		function mkNegTransformation(result) {
				var results = new Array();

				var set = new Array();				
				//set.append(result.getReplaceables().getLiteralCache());
				//set.append(result.getReplaceables().getOptionalCache());	
				//set.append(result.getReplaceables().getStarCache());
				//set.append(result.getReplaceables().getOrCache());
				//set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getNegationCache());
				//set.append(result.getReplaceables().getConcatCache());
				// TODO, test if nullable, otherwise dont replace			

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return replaceable.getOrigin().getSubDummy();
				}, false, false));

				var set = new Array();				
				//set.append(result.getReplaceables().getLiteralCache());
				//set.append(result.getReplaceables().getOptionalCache());	
				//set.append(result.getReplaceables().getStarCache());
				//set.append(result.getReplaceables().getOrCache());
				//set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getNegationCache());
				//set.append(result.getReplaceables().getConcatCache());
				// TODO, test if nullable, otherwise dont replace			

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.NegationDummy(pool.getNotInLiteral());
				}, false, false));

				return results;
		}



		/** Iterate
		 * @param result		Generator Result
		 * @param set			Replaceables Set
		 * @param modCall		Callback Function for Modifications
		 * @param oRmFlag		Flag, if E<=F
		 * @param mRoFlag		Flag, if F<=E
		 * @param signDependend	Flag, true observes the sign, false not
		 */
		function iterate(result, set, modCall, oRmFlagArg, mRoFlagArg, signDependendArg) {
				// new result Array
				var results = new Array();
				// Dummy and Pool
				var dummy = result.getDummy();
				var pool = result.getPool();
				// Origin
				var origin = dummy.dump().reduce();
				// Modification
				set.foreach(function(i, replaceable) {

						oRmFlag = oRmFlagArg(replaceable);
						mRoFlag = mRoFlagArg(replaceable);
						signDependend = signDependendArg(replaceable);

						var newLiteral = modCall(replaceable, pool, origin);
						if(newLiteral==undefined) return;

						__sysout("\n\nREPLACEABLE: " + dummy.toString());

					
						replaceable.replaceWith(newLiteral);
						var modification = dummy.dump().reduce();

						// Transformation Result

						__sysout("ORIGIN: " + origin);
						__sysout("NEW: " + newLiteral);
						__sysout("REPLACEABLE: " + dummy.toString());
						__sysout("MODIFICATION: " + modification.reduce());

						if(origin==modification) {
								// in case that the normalization reduces the regex to two equivalent regular expressions
								results.push(new Result(origin, modification, result.getDepth(), true));
						} else {
								results.push(new Result(origin, modification, result.getDepth(), (signDependend? (replaceable.getSign() ? oRmFlag : !oRmFlag) : oRmFlag)));
								results.push(new Result(modification, origin, result.getDepth(), (signDependend? (replaceable.getSign() ? mRoFlag : !mRoFlag) : mRoFlag)));
						}
						results.push(new Result(origin, origin, result.getDepth(), true));
						results.push(new Result(modification, modification, result.getDepth(), true));
						// Restore
						replaceable.restore();
				});

				return results;
		}
})(__RegEx);
