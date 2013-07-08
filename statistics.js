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
		RegEx.Statistics = SELF;

		//////////////////////////////////////////////////
		// Container
		//////////////////////////////////////////////////

		/** Container
		 * @param left left RegEx Wrapper
		 * @param right right RegEx Wrapper
		 * @param depth nesting index
		 * @param isValid true, if left <= right, false otherwise
		 */
		function Container(left, right, depth, isValid) {
				// true, if left <= right, false otherwise
				var isSubset = undefined; 

				/** Solve Inequality
				*/	
				this.solveInequality = function() {
						isSubset = left.isSubSetOf(right, new RegEx.APC.Contract.Containment.Context());
				}

				/** Return Statistics
				*/	
				this.getStatistics = function() {
						return new Statistic(this, isSubset)
				}

				/** To String
				*/
				this.toString = function() {
						return left.getTarget().toString() + " <= " + right.getTarget().toString();
				}

				/** Left
				 * @return left RegEx
				 */
				this.getLeft = function() {
						return left;
				}

				/** Right
				 * @return right RegEx
				 */
				this.getRight = function() {
						return right;
				}

				/** Depth
				 * @return depth
				 */
				this.getDepth = function() {
						return depth;
				}

				/** Is Valid SubSet
				 * @return isValid
				 */
				this.isValid = function() {
						return isValid;
				}
		}

		//////////////////////////////////////////////////
		// Statistic (Result)
		//////////////////////////////////////////////////

		/** Statistic
		 * @param container the evaluated container
		 * @param isSubset the evaluated result
		 */
		function Statistic(container, isSubset) {
				// Call Statistics
				var leftCallStat = container.getLeft().getStatistics();
				var rightCallStat = container.getRight().getStatistics();

				/** Sum of called symbol-derivations
				*/
				this.getDerivations = function() {
						return (leftCallStat.getDerive()+rightCallStat.getDerive());
				}

				/** Sum of called lower-derivations
				*/
				this.getLowerDerivations = function() {
						return (leftCallStat.getLDerive()+rightCallStat.getLDerive());
				}

				/** Sum of called upper-derivations
				*/
				this.getUpperDerivations = function() {
						return (leftCallStat.getUDerive()+rightCallStat.getUDerive());
				}

				/** Is Valid
				 * @return true, if left <= rigth, false othweise
				 */
				this.isValid = function() {
						return container.isValid();
				};

				/** Is Subset (Evaluation Result)
				 * @return true, if left <= rigth, false othweise
				 */
				this.isSubset = function() {
						return isSubset;
				};

				/** Depth
				 * @return depth
				 */
				this.getDepth = function() {
						return container.getDepth();
				};

				/** To String
				*/
				this.toString = function() {
						return ((isSubset==container.isValid()) ? "OK" : "FAIL") + " " + container.toString() + " RESULT:" + isSubset + " VALID:" + container.isValid();
				};

				/** Print
				*/
				this.print = function() {
						var result = "";
						result += this.toString() + "\n";
						result += "#" + this.getDerivations() + "\n";
						result += "#" + this.getLowerDerivations() + "\n";
						result += "#" + this.getUpperDerivations() + "\n";

				}
		}

		//////////////////////////////////////////////////
		// Comvert
		//////////////////////////////////////////////////

		function convert(transformations) {
				var results = new Array();
				transformations.foreach(function(i, r) {
						results.push(new Container(r.getLeft(), r.getRight(), r.getDepth(), r.isValid()));
				});
				return results
		}
		SELF.convert = convert;

		//////////////////////////////////////////////////
		// Make
		//////////////////////////////////////////////////

		function make(container) {
				var results = new Array();
				container.foreach(function(i, c) {
						c.solveInequality();
						results.push(c.getStatistics());
				});
				return results
		}
		SELF.make = make;

})(__RegEx);
