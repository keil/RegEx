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
		RegEx.run = SELF;

		var fstWidth = 100;
		var sndWidth = 20;
		var seperator = ".";

		function run() {

				print("");
				print(" * Efficient Solving of Regular Expression Inequalities");
				print(" *  Regular Expression Generator");
				print("");
				print(" * Copyright (c) 2013, Proglang, University of Freiburg.");
				print(" *  http://proglang.informatik.uni-freiburg.de/");
				print(" * All rights reserved.");
				print("");
				print(" * Author Matthias Keil");
				print(" *  http://www.informatik.uni-freiburg.de/~keilr/");
				print("");

				print(" *** Start of Regular Expression Generator *** \n");
				var total = new Date().getTime();

				//////////////////////////////////////////////////
				// Generate Results 
				//////////////////////////////////////////////////

				/** Out */ out("Generate Regular Expressionsss (" + RegEx.config.depth + ")");
				/** Time */ var time = new Date().getTime();
				var genRes = RegEx.Generator.make(RegEx.config.depth);
				/** Out */ if(genRes!=undefined) ok(); else fail();
				/** Notice */ if(genRes!=undefined) notice("Results: " + genRes.length );
				/** Notice */ if(genRes!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
				/** Notice */ if(genRes!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

				/** Debug */
				if(RegEx.config.debug) {
						genRes.foreach(function(i, result) {
								__sysout("RESULT (" + i + "): \n " + result.toString() + "\n");
						});
				}

				//////////////////////////////////////////////////
				// Transform Results 
				//////////////////////////////////////////////////

				/** Out */ out("Call Transformation");
				/** Time */ var time = new Date().getTime();
				var transRes = RegEx.Transformation.make(genRes);
				/** Out */ if(transRes!=undefined) ok(); else fail();
				/** Notice */ if(transRes!=undefined) notice("Results: " + transRes.length);
				/** Notice */ if(transRes!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
				/** Notice */ if(genRes!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

				/** Debug */
				if(RegEx.config.debug) {
						transRes.foreach(function(i, result) {
								__sysout("TRANSFORMATION (" + i + "): \n " + result.toString() + "\n");
						});
				}

				//////////////////////////////////////////////////
				//  Solve Regular Expression Inequalities
				//////////////////////////////////////////////////

				/** Out */ out("Make Container");
				/** Time */ var time = new Date().getTime();
				var container = RegEx.Statistics.convert(transRes);
				/** Out */ if(container!=undefined) ok(); else fail();
				/** Notice */ if(container!=undefined) notice("Results: " + container.length);
				/** Notice */ if(container!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
				/** Notice */ if(container!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");


				/** Out */ out("Solve Regular Expression Inequalities");
				/** Time */ var time = new Date().getTime();
				var statistics = RegEx.Statistics.make(container);
				/** Out */ if(statistics!=undefined) ok(); else fail();
				/** Notice */ if(statistics!=undefined) notice("Results: " + statistics.length);
				/** Notice */ if(statistics!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
				/** Notice */ if(statistics!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

				/** Debug */
				if(RegEx.config.debug) {
						statistics.foreach(function(i, result) {
								__sysout("STATISTICS (" + i + "): \n " + result.toString() + "\n");
						});
				}


				/** Out */ out("Use Antimirovs Approach");
				/** Time */ var time = new Date().getTime();
				var antimirov = undefined;
				/** Out */ if(antimirov!=undefined) ok(); else fail();

				//////////////////////////////////////////////////
				//  Evaluate Statistics
				//////////////////////////////////////////////////

				/** Out */ out("Evaluate Statistics");
				/** Time */ var time = new Date().getTime();
				var result = RegEx.Evaluator.make(statistics);;
				/** Out */ if(result!=undefined) ok(); else fail();
				/** Notice */ if(result!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
				/** Notice */ if(result!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");
				/** Notice */ if(result!=undefined) notice("Results (ok): " + result.getOk());
				/** Notice */ if(result!=undefined) notice("Results (correct): " + result.getCorrect());
				/** Notice */ if(result!=undefined) notice("Results (failed): " + result.getFailed());
				result.getMaxArray().foreach(function(depth, max) {
						/** Notice */ if(result!=undefined) notice("Results (MAX(" + depth + ")): " + max);
				});
				result.getAvgArray().foreach(function(depth, avg) {
						/** Notice */ if(result!=undefined) notice("Results (ACG(" + depth + ")): " + avg);
				});





				// TODO
				print("\n *** Generator finished *** \n");
				return undefined;
		}
		SELF.run = run;


		function out(string) {
				putstr(padding_right(string + " ", seperator, fstWidth));
		}
		SELF.out = out;

		function notice(string) {
				putstr(padding_right("... " + string + " ", seperator, fstWidth+sndWidth));
				putstr("\n");
		}
		SELF.notice = notice;

		function ok() {
				putstr(padding_left(" OK", seperator, sndWidth));
				putstr("\n");
		}
		SELF.ok = ok;

		function done() {
				putstr(padding_left(" DONE", seperator, sndWidth));
				putstr("\n");
		}
		SELF.done = done;

		function fail() {
				putstr(padding_left(" FAIL", seperator, sndWidth));
				putstr("\n");
		}
		SELF.fail = fail;

		function subout(string) {
				putstr(padding_right("... " + string + " ", seperator, fstWidth));
		}
		SELF.subout = subout;

})(__RegEx);;
