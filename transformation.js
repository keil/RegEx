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

						// Not Transformation
						results.append(mkNotTransformation(result));

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
				var origin = dummy.dump();

				// Modification
				result.getReplaceables().foreach(function(i, replaceable) {

						var newLiteral = pool.getNotInLiteral();
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						// r != s
						results.push(new Result(origin, modification, result.getDepth(), false));
						// s != r
						results.push(new Result(modification, origin, result.getDepth(), false));



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



						replaceable.restore();
				});

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
				result.getReplaceables().foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.OrDummy(replaceable.getOrigin(), pool.getNotInLiteral());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), true));
						results.push(new Result(modification, origin, result.getDepth(), false));

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
				result.getReplaceables().foreach(function(i, replaceable) {

						var newLiteral = new RegEx.Dummy.AndDummy(replaceable.getOrigin(), pool.getNotInLiteral());
						replaceable.replaceBy(newLiteral);

						var modification = dummy.dump();

						results.push(new Result(origin, modification, result.getDepth(), false));
						results.push(new Result(modification, origin, result.getDepth(), true));

						replaceable.restore();
				});

				return results;
		}


		// TODO
		/** Replace: ..r?.. -> ..r..
		 * @param result	Generator Result
		 */
		function mkOptTransformation(result) {
				var results = new Array();

				//var dummy = result.getDummy();
				//var pool = result.getPool();

				// Origin
				//var origin = dummy.dump();

				// Modification
				//result.getReplaceables().foreach(function(i, replaceable) {

						//var newLiteral = new RegEx.Dummy.AndDummy(replaceable.getOrigin(), pool.getNotInLiteral());
						//replaceable.replaceBy(newLiteral);

						//var modification = dummy.dump();

						//results.push(new Result(origin, modification, result.getDepth(), false));
						//results.push(new Result(modification, origin, result.getDepth(), true));

						//replaceable.restore();
				//});

				return results;
		}


		// TODO
		/** Replace: ..r*.. -> ..r..
		 * @param result	Generator Result
		 */
		function mkStarTransformation(result) {
				var results = new Array();

				return results;
				// copy from mkOptTransformation
		}

		// TODO
		/** Replace: ..!(r).. -> ..r..
		 * @param result	Generator Result
		 */
		function mkNotTransformation(result) {
				var results = new Array();

				return results;
				// copy from mkOptTransformation
		}

})(__RegEx);
