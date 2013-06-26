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
					result = left.isSubSetOf(right, new RegEx.APC.Contract.Containment.Context());
				}

				this.getStatistics = function() {
					return left.toString() + " <= " + right.toString();
				}
		}


		function Statistic(container, isSubset, isValid) {

				this.getState = function() {
						return (isSubset==isValid);
				};

				this.toString = function() {
						var state = (isSubset==isValid) ? "OK" : "FAIL";
						return ((isSubset==isValid) ? "OK" : "FAIL") + " " + container.toString() + " RESULT:" + isSubset + " VALID:" + isValid;
				};
		}







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
