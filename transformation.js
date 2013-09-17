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
						results.append(mkOrTransformation(result));
						// And Transformation
						results.append(mkAndTransformation(result));
						// Opt Transformation
						results.append(mkOptTransformation(result));
						// Star Transformation
						results.append(mkStarTransformation(result));
						// Neg Transformation
						results.append(mkNegTransformation(result));
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

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.QMarkDummy();
				}, /* Orig <= Mod */ function(rep) {
						var result = true;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						return result;
				}, /* use +/- */ function(rep) {
						var result = false;
						return result;
				}));

				return results;
		}

		/** Replace: ..r.. -> ..(r+s)..
		 * @param result	Generator Result
		 */
		function mkOrTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getCache());

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.OrDummy(replaceable.getOrigin(), pool.getNotInLiteral());
				}, /* Orig <= Mod */ function(rep) {
						var result = true;
						if(rep.inAnd) result=false;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						if(rep.inAnd) result=true;
						return result;
				}, /* use +/- */ function(rep) {
						var result = true;
						return result;
				}));

				return results;
		}

		/** Replace: ..r.. -> ..(r&s)..
		 * @param result	Generator Result
		 */
		function mkAndTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getCache());

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.AndDummy(replaceable.getOrigin(), pool.getNotInLiteral());
				}, /* Orig <= Mod */ function(rep) {
						var result = false;
						if(rep.inAnd) result=true;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = true;
						if(rep.inAnd) result=true;
						return result;
				}, /* use +/- */ function(rep) {
						var result = true;
						return result;
				}));

				return results;
		}

		/** Replace: ..r.. -> ..r?..
		 * @param result	Generator Result
		 */
		function mkOptTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getCache());

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.OptionalDummy(replaceable.getOrigin());
				}, /* Orig <= Mod */ function(rep) {
						var result = true;
						if(rep.inOpt) result=true;
						if(rep.inStar) result=true;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						if(rep.inOpt) result=true;
						if(rep.inStar) result=true;
						return result;
				}, /* use +/- */ function(rep) {
						var result = true;
						return result;
				}));

				return results;
		}

		/** Replace: ..r.. -> ..r*..
		 * @param result	Generator Result
		 */
		function mkStarTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getCache());

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.StarDummy(replaceable.getOrigin());
				}, /* Orig <= Mod */ function(rep) {
						var result = true;
						if(rep.inStar) result=true;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						if(rep.inStar) result=true;
						return result;
				}, /* use +/- */ function(rep) {
						var result = true;
						return result;
				}));

				return results;
		}

		/** Replace: ..!(r).. -> ..r..
		 * Replace: ..!(r).. -> ..!(s)..
		 * @param result	Generator Result
		 */
		function mkNegTransformation(result) {
				var results = new Array();

				var set = new Array();				
				set.append(result.getReplaceables().getCache());

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.NegationDummy(replaceable.getOrigin());
				}, /* Orig <= Mod */ function(rep) {
						var result = false;
						if(rep.inAnd) result=true;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						if(rep.inAnd) result=true;
						return result;
				}, /* use +/- */ function(rep) {
						var result = true;
						return result;
				}));

				results.append(iterate(result, set, function(replaceable, pool, origin) {
						return new RegEx.Dummy.NegationDummy( pool.getNotInLiteral());
				}, /* Orig <= Mod */ function(rep) {
						var result = true;
						if(rep.inAnd) result=false;
						return result;
				}, /* Mod <= Orig */ function (rep) {
						var result = false;
						if(rep.inAnd) result=true;
						return result;
				}, /* use +/- */ function(rep) {
						var result = true;
						return result;
				}));

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

						replaceable.replaceWith(newLiteral);
						var modification = dummy.dump().reduce();

						// Transformation Result
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
