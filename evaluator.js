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
		RegEx.Evaluator = SELF;


		function Result(failed, ok, correct, max, avg) {
				this.getFailed = function() {return failed;};
				this.getOk = function() {return ok;};
				this.getCorrect = function() {return correct;};
				this.getMaxArray = function() {return max;};
				this.getAvgArray = function() {return avg;};
		}
		SELF.Result = Result;



		function make(statistics) {
				// isSubset=true, isValid=false
				var failed = 0;
				// isSubset=true, isValid=true
				// isSubset=false, isValid=false
				var ok = 0;
				// isSubset=false, isValid=true
				var correct = 0;

				var maxLUDerive = new Array();

				var avgLUDerive = new Array();



				statistics.foreach(function(i, statistic) {		
						// Evaluate: Failed statistics 			
						if(statistic.isValid()==statistic.isSubset()) ok++;
						else if(!statistic.isSubset()) correct++;
						else failed++

						// Evaluate: max()
						if(maxLUDerive[statistic.getDepth()]==undefined)
							maxLUDerive[statistic.getDepth()]=0;

						var sum = statistic.getLowerDerivations() + statistic.getUpperDerivations();
						if(maxLUDerive[statistic.getDepth()]<sum)
							maxLUDerive[statistic.getDepth()]=sum;

						// Evaluate: avg()
						if(avgLUDerive[statistic.getDepth()]==undefined)
							avgLUDerive[statistic.getDepth()]=new Array();

						var sum = statistic.getLowerDerivations() + statistic.getUpperDerivations();
						avgLUDerive[statistic.getDepth()].push(sum);
				});


				// Evaluate: avg()
				avgLUDerive.foreach(function(depth, values) {
						if(values==undefined) return;
						var counter = 0;
						var sum = 0;
						values.foreach(function(i, value) {
								counter++;
								sum += value;
						});
						avgLUDerive[depth] = (sum/counter);
				});

				return new Result(failed, ok, correct, maxLUDerive, avgLUDerive);
		}
		SELF.make = make;





})(__RegEx);

