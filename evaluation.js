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
		RegEx.Evaluation = SELF;

		//////////////////////////////////////////////////
		// Result
		//////////////////////////////////////////////////

		/** Evaluation Result
		 * @param failed sum of failed RegEx
		 * @param ok sum of ok RegEx
		 * @param correct sum correct failed RegEx (indeterminable)
		 * @param max Array: depth -> max of derivations
		 * @param avg Array: depth -> averaged sum of derivations
		 * @param failedSet Array with failed RegEx
		 * @param indeterminableSet Array with indeterminable RegEx
		 *
		 */
		function Result(failed, ok, correct, max, avg, failedSet, indeterminableSet) {
				this.getFailed = function() {return failed;};
				this.getOk = function() {return ok;};
				this.getCorrect = function() {return correct;};
				this.getMaxArray = function() {return max;};
				this.getAvgArray = function() {return avg;};
				this.getFailedSet = function() {return failedSet;};
				this.getIndeterminableSet = function() {return indeterminableSet;};
		}
		SELF.Result = Result;

		//////////////////////////////////////////////////
		// Make
		//////////////////////////////////////////////////

		function make(statistics) {
				var failedSum = 0; // isSubset=true, isValid=false
				var okSum = 0; // isSubset=true, isValid=true OR isSubset=false, isValid=false
				var correctSum = 0; // isSubset=false, isValid=true

				var maxLUDerive = new Array();
				var avgTmpLUDerive = new Array();
				var avgLUDerive = new Array();

				var failedSet = new Array();
				var indeterminableSet = new Array();

				statistics.foreach(function(i, statistic) {		
						// Evaluate: Failed statistics 			
						if(statistic.isValid()==statistic.isSubset()) { 		
								okSum++;
						}
						else if(!statistic.isSubset()) {
								indeterminableSet.push(statistic);
								correctSum++;
						}
						else {
								failedSet.push(statistic);
								failedSum++;
						}

				// sum of all derivations (upper and lower)
				var sum = statistic.getLowerDerivations() + statistic.getUpperDerivations();

				// Evaluate: max()
				if(maxLUDerive[statistic.getDepth()]==undefined || maxLUDerive[statistic.getDepth()]<sum) {
						maxLUDerive[statistic.getDepth()]=sum;
				}

				// Evaluate: avg()
				if(avgTmpLUDerive[statistic.getDepth()]==undefined) {
						avgTmpLUDerive[statistic.getDepth()]=new Array();
				}
				avgTmpLUDerive[statistic.getDepth()].push(sum);

				});

				// Evaluate: avg()
				avgTmpLUDerive.foreach(function(depth, values) {
						if(values==undefined) return;
						var counter = 0;
						var sum = 0;
						values.foreach(function(i, value) {
								counter++;
								sum += value;
						});
						avgLUDerive[depth] = (sum/counter);
				});

				return new Result(failedSum, okSum, correctSum, maxLUDerive, avgLUDerive, failedSet, indeterminableSet);
		}
		SELF.make = make;

})(__RegEx);
