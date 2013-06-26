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


				out("Start of Regular Expression Generator");
				ok();

				//out("Load Modules");
				//fail();


				out("Generate Regular Expressionsss (" + RegEx.config.depth + ")");
				var genRes = RegEx.Generator.make(RegEx.config.depth);
				if(genRes!=undefined) ok(); else fail();
			//	ok();


		}
		SELF.run = run;


		function out(string) {
				putstr(padding_right(string, seperator, fstWidth));
		}

		function ok() {
				putstr(padding_left("OK", seperator, sndWidth));
				putstr("\n");
		}

		function fail() {
				putstr(padding_left("FAIL", seperator, sndWidth));
				putstr("\n");
		}







})(__RegEx);;

