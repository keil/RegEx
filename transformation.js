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
						// TODO für alle
						//
						

						// Or Transformation
//						results.append(mkOrTransformation(result));
						// TODO für alle


						// And Transformation
//						results.append(mkAndTransformation(result));
						// TODO give a notice
						// TODO für alle


						// Opt Transformation
//						results.append(mkOptTransformation(result));
						// TODO alles ohne Opt
						

						// Star Transformation
//						results.append(mkStarTransformation(result));
						// TODO alles Ohne Star
						

						// Neg Transformation
						// TODO
						//results.append(mkNegTransformation(result));
						// ToDo Alles`:w
						

				});




				// TODO note: skpped the case that r<=r
				// 


				// call function for each element of the transformation array

				return results;
		}
		SELF.make = make;

		//////////////////////////////////////////////////
		// Transformation Rules
		//////////////////////////////////////////////////

		/**
		 * Replace: ..r.. -> ..s..
		 * Replace: ..r.. -> ..r*..
		 * Replace: ..r.. -> ..r?..
		 * Replace: ..r.. -> ..!(s)..
		 * @param result	Generator Result
		 */
		function mkLiteralTransformation(result) {
				var results = new Array();

				var dummy = result.getDummy();
				var pool = result.getPool();

				// Origin
		//		var origin = dummy.dump();

				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOptionalCache());	
				set.append(result.getReplaceables().getStarCache());
				set.append(result.getReplaceables().getOrCache());
				set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getConcatCache());

				// Modification
				set.foreach(function(i, replaceable) {

						// Origin
						var origin = dummy.dump(new RegEx.Expressions.CallStatistics());

						var newLiteral = pool.getNotInLiteral();
						replaceable.replaceBy(newLiteral);


						

						// TODO
						var modification = dummy.dump(new RegEx.Expressions.CallStatistics());

						


						//  Wrapper
					//	var originWrapper = new RegEx.Expressions.RegExWrapper(origin, new RegEx.Expressions.CallStatistics());
					//	var modificationWrapper = new RegEx.Expressions.RegExWrapper(modification, new RegEx.Expressions.CallStatistics());

						// r != s
						results.push(new Result(origin, modification, result.getDepth(), false));
						// s != r
						results.push(new Result(modification, origin, result.getDepth(), false));

						replaceable.restore();
				});


				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getNegationCache());

				// Modification
				set.foreach(function(i, replaceable) {

						// Origin
						var origin = dummy.dump(new RegEx.Expressions.CallStatistics());


						var newLiteral = pool.getNotInLiteral();
						replaceable.replaceBy(newLiteral);

						
					
						// TODO
						var modification = dummy.dump(new RegEx.Expressions.CallStatistics());


						//  Wrapper
				//		var originWrapper = new RegEx.Expressions.RegExWrapper(origin, new RegEx.Expressions.CallStatistics());
				//		var modificationWrapper = new RegEx.Expressions.RegExWrapper(modification, new RegEx.Expressions.CallStatistics());

						// r != s
						results.push(new Result(origin, modification, result.getDepth(), false));
						// s != r
						results.push(new Result(modification, origin, result.getDepth(), true));

						replaceable.restore();
				});





						// r <= r*
						// TODO
						// r* != r
						// TODO
						
						
						// r? <= r
						// TODO
						// r != r?
						// TODO

						// r <= !(s)
						// TODO
						// !(s) != r


				return results;
		}

		/** Replace: ..r.. -> ..(r+s)..
		 * @param result	Generator Result
		 */
		function mkOrTransformation(result) {
				var results = new Array();

				var dummy = result.getDummy();
				var pool = result.getPool();

				// Origin
				var origin = dummy.dump();

				// Modification
				result.getReplaceables().getAllCachesWithoutNegation().foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.OrDummy(replaceable.getOrigin(), pool.getNotInLiteral());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), (replaceable.getSign()) ? true : false));
						results.push(new Result(modification, origin, result.getDepth(), (replaceable.getSign()) ? false : true));

						replaceable.restore();
				});

				return results;
		}

		/** Replace: ..r.. -> ..(r&s)..
		 * @param result	Generator Result
		 */
		function mkAndTransformation(result) {
				var results = new Array();

				var dummy = result.getDummy();
				var pool = result.getPool();

				// Origin
				var origin = dummy.dump();

				// Modification
				result.getReplaceables().getAllCachesWithoutNegation().foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.AndDummy(replaceable.getOrigin(), pool.getNotInLiteral());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), (replaceable.getSign()) ? false : true));
						results.push(new Result(modification, origin, result.getDepth(), (replaceable.getSign()) ? true : false));

						replaceable.restore();
				});

				return results;
		}


		// TODO
		/** Replace: ..r.. -> ..r?..
		 * @param result	Generator Result
		 */
		function mkOptTransformation(result) {
				var results = new Array();

				var dummy = result.getDummy();

				// Origin
				var origin = dummy.dump();
				
				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOrCache());
				set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getConcatCache());

				// Modification
				set.foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.OptionalDummy(replaceable.getOrigin());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), (replaceable.getSign()) ? true : false));
						results.push(new Result(modification, origin, result.getDepth(), (replaceable.getSign()) ? false : true));

						replaceable.restore();
				});

				// Set
				var set = new Array();
				set.append(result.getReplaceables().getOptionalCache());	
				set.append(result.getReplaceables().getStarCache());
				set.append(result.getReplaceables().getNegationCache());

				// Modification
				set.foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.OptionalDummy(replaceable.getOrigin());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), true));
						results.push(new Result(modification, origin, result.getDepth(), true));

						replaceable.restore();
				});

				return results;
		}


		/** Replace: ..r.. -> ..r*..
		 * @param result	Generator Result
		 */
		function mkStarTransformation(result) {
				var results = new Array();

				var dummy = result.getDummy();

				// Origin
				var origin = dummy.dump();
				
				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOptionalCache());
				set.append(result.getReplaceables().getOrCache());
				set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getConcatCache());

				// Modification
				set.foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.StarDummy(replaceable.getOrigin());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), (replaceable.getSign()) ? true : false));
						results.push(new Result(modification, origin, result.getDepth(), (replaceable.getSign()) ? false : true));

						replaceable.restore();
				});

				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getStarCache());
				set.append(result.getReplaceables().getNegationCache());

				// Modification
				set.foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.StarDummy(replaceable.getOrigin());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), true));
						results.push(new Result(modification, origin, result.getDepth(), true));

						replaceable.restore();
				});

				return results;
		}

		// TODO
		/** Replace: ..!(r).. -> ..r..
		 * @param result	Generator Result
		 */
		function mkNegTransformation(result) {
				var results = new Array();

				var dummy = result.getDummy();
				var pool = result.getPool();

				// Origin
				var origin = dummy.dump();
				
				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getLiteralCache());
				set.append(result.getReplaceables().getOptionalCache());
				set.append(result.getReplaceables().getStarCache());
				set.append(result.getReplaceables().getOrCache());
				set.append(result.getReplaceables().getAndCache());
				set.append(result.getReplaceables().getConcatCache());
				set.append(result.getReplaceables().getNegationCache());

				// Modification
				set.foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.NegationDummy(replaceable.getOrigin());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), false));
						results.push(new Result(modification, origin, result.getDepth(), false));

						replaceable.restore();
				});

				// Set
				var set = new Array();				
				set.append(result.getReplaceables().getNegationCache());

				// Modification
				set.foreach(function(i, replaceable) {

						var newLiteral = pool.getNotInLiteral();
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), (replaceable.getSign()) ? false : true));
						results.push(new Result(modification, origin, result.getDepth(), (replaceable.getSign()) ? true : false));

						replaceable.restore();
				});

				return results;
		}

})(__RegEx);
