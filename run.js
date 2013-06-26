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
				var time = new Date().getTime();

				//////////////////////////////////////////////////
				// Generate Results 
				//////////////////////////////////////////////////

				/** Out */ out("Generate Regular Expressionsss (" + RegEx.config.depth + ")");
				var genRes = RegEx.Generator.make(RegEx.config.depth);
				/** Out */ if(genRes!=undefined) ok(); else fail();
				/** Notice */ if(genRes!=undefined) notice("Results: " + genRes.length );
				/** Notice */ if(genRes!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");

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
				var transRes = RegEx.Transformation.make(genRes);
				/** Out */ if(transRes!=undefined) ok(); else fail();
				/** Notice */ if(transRes!=undefined) notice("Results: " + transRes.length);
				/** Notice */ if(transRes!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");

				/** Debug */
				/** Debug */
				if(RegEx.config.debug) {

						transRes.foreach(function(i, result) {
								__sysout("TRANSFORMATION (" + i + "): \n " + result.toString() + "\n");
						});
				}

				//////////////////////////////////////////////////
				//  Solve Regular Expression Inequalities
				//////////////////////////////////////////////////

				/** Out */ out("Solve Regular Expression Inequalities");
				var statistics = undefined;
				/** Out */ if(statistics!=undefined) ok(); else fail();

				/** Out */ out("Use Antimirovs Approach");
				var statistics = undefined;
				/** Out */ if(statistics!=undefined) ok(); else fail();

				//////////////////////////////////////////////////
				//  Evaluate Statistics
				//////////////////////////////////////////////////

				/** Out */ out("Evaluate Statistics");
				var statRes = undefined;
				/** Out */ if(statRes!=undefined) ok(); else fail();



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
