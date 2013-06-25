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


		/** Transformation Result
		 *
		 * @left left regex (r)
		 * @right right contract (s)
		 * @depth depth-index for statistics
		 * @valid true, if r <= s, false otherwise
		 */
		function Result(left, right, depth, valid) {

				this.getLeft = function() {
						return left;
				};

				this.getRight = function() {
						return right;
				};

				this.getDepth = function() {
						return depth;
				};

				this.isValid = function() {
						return valid;
				};

				this.toString = function() {
						return left + " <= " + right + " (" + depth + ") (" + valid + ")";
				}
		}
		SELF.Result = Result;



		function make() {
		
				// TODO note: skpped the case that r<=r
				// 


				// call function for each element of the transformation array

		
		}

		// ..r.. -> ..s..
		function mkLiteral() {
		
		}

		// ..r.. -> ..(r+s)..
		function mkOr() {
		
		}

		// ..r.. -> ..(r&s)..
		function mkAnd() {
		
		}

		// ..r.. -> ..r*..

		
		// ..r*.. -> ..r..
		//
		// ..r.. -> ..r?..
		//

		// ..r?.. -> ..r..



		// 



})(__RegEx);
