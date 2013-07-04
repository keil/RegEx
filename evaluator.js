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
						if(statistic.isValid()==statistics.isSubset()) ok++;
						else if(!statistics.isSubset()) correct++;
						else failed++

						// Evaluate: max()
						if(maxLUDerive[statistics.getDepth()]==undefined)
							maxLUDerive[statistics.getDepth()]=0;

						var sum = statistics.getLowerDerivations() + statistics.getUpperDerivations();
						if(maxLUDerive[statistics.getDepth()]<sum)
							maxLUDerive[statistics.getDepth()]=sum;

						// Evaluate: avg()
						if(maxLUDerive[statistics.getDepth()]==undefined)
							maxLUDerive[statistics.getDepth()]=new Array();

						var sum = statistics.getLowerDerivations() + statistics.getUpperDerivations();
						maxLUDerive[statistics.getDepth()].push(sum);
				});

				// Evaluate: avg()
				avgLUDerive.foreach(function(depth, values) {
						var counter = 0;
						var sum = 0;
						valued.foreach(function(i, value) {
								counter++;
								sum += value;
						});
						avgLUDerive[depth] = (sum/counter);
				});

				return new Result(failed, ok, correct, maxLUDerive, avgLUDerive);
		}
		SELF.make = make;





})(__RegEx);

