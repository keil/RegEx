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
		RegEx.Statistics = SELF;


		function Container(left, right, depth, isValid) {
				var isSubset = undefined; 
		
				this.solveInequality = function() {
					isSubset = left.isSubSetOf(right, new RegEx.APC.Contract.Containment.Context());
				}

				this.getStatistics = function() {
					
						return new Statistic(this, isSubset)
						//return left.toString() + " <= " + right.toString();
				}

				this.toString = function() {
					return left.getTarget().toString() + " <= " + right.getTarget().toString();
				}

				this.getLeft = function() {
					return left;
				}

				this.getRight = function() {
					return right;
				}

				this.getDepth = function() {
					return depth;
				}

				this.isValid = function() {
					return isValid;
				}



		}


		function Statistic(container, isSubset) {

				var leftStat = container.getLeft().getStatistics();
				var rightStat = container.getRight().getStatistics();


				this.getDerivations = function() {
						return (leftStat.getDerive()+rightStat.getDerive());
						//return "Derivations: " + (leftStat.getDerive()+rightStat.getDerive()) +  "(" + leftStat.getDerive() + "/" + rightStat.getDerive() + ")";
				}

				this.getLowerDerivations = function() {
						return (leftStat.getLDerive()+rightStat.getLDerive());
						//return "Lower Derivations: " + (leftStat.getLDerive()+rightStat.getLDerive()) +  "(" + leftStat.getLDerive() + "/" + rightStat.getLDerive() + ")";
				}

				this.getUpperDerivations = function() {
						return (leftStat.getUDerive()+rightStat.getUDerive());
						//return "Upper Derivations: " + (leftStat.getUDerive()+rightStat.getUDerive()) +  "(" + leftStat.getUDerive() + "/" + rightStat.getUDerive() + ")";
				}



				this.isValid = function() {
						return container.isValid();
				};

				this.isSubset = function() {
						return isSubset;
				};

				this.getDepth = function() {
						return container.getDepth();
				};


				this.toString = function() {
						return ((isSubset==container.isValid()) ? "OK" : "FAIL") + " " + container.toString() + " RESULT:" + isSubset + " VALID:" + container.isValid();
				};


				this.print = function() {
					var result = "";
					result += this.toString() + "\n";
					result += "#" + this.getDerivations() + "\n";
					result += "#" + this.getLowerDerivations() + "\n";
					result += "#" + this.getUpperDerivations() + "\n";

				}
		}


		// TODO Class Evaluator .. 
		// um automatisierte ergebnisse zi berechnen





		function convert(transformations) {
				var results = new Array();
				transformations.foreach(function(i, r) {
					results.push(new Container(r.getLeft(), r.getRight(), r.getDepth(), r.isValid()));
				});
				return results
		}
		SELF.convert = convert;


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
