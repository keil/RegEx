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
(function(RegGen) {

        SELF = {};
        RegGen.run = SELF;

        var fstWidth = 100;
        var sndWidth = 20;
        var seperator = ".";

        /** Main Application
        */
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

                /** Out */ out("Generate Regular Expressionsss (" + RegGen.config.depth + ")");
                /** Time */ var time = new Date().getTime();
                var genRes = RegGen.Generator.make(RegGen.config.depth);
                /** Out */ if(genRes!=undefined) ok(); else fail();
                /** Notice */ if(genRes!=undefined) notice("Results: " + genRes.length );
                /** Notice */ if(genRes!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
                /** Notice */ if(genRes!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

                /** Debug */
                if(RegGen.config.debug) {
                        genRes.foreach(function(i, result) {
                                __sysout("RESULT (" + i + "): \n " + result.toString() + "\n");
                        });
                }

                //////////////////////////////////////////////////
                // Transform Results 
                //////////////////////////////////////////////////

                /** Out */ out("Call Transformation");
                /** Time */ var time = new Date().getTime();
                var transRes = RegGen.Transformation.make(genRes);
                /** Out */ if(transRes!=undefined) ok(); else fail();
                /** Notice */ if(transRes!=undefined) notice("Results: " + transRes.length);
                /** Notice */ if(transRes!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
                /** Notice */ if(genRes!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

                /** Debug */
                if(RegGen.config.debug) {
                        transRes.foreach(function(i, result) {
                                __sysout("TRANSFORMATION (" + i + "): \n " + result.toString() + "\n");
                        });
                }

                //////////////////////////////////////////////////
                //  Solve Regular Expression Inequalities
                //////////////////////////////////////////////////

                /** Out */ out("Make Container");
                /** Time */ var time = new Date().getTime();
                var container = RegGen.Statistics.convert(transRes);
                /** Out */ if(container!=undefined) ok(); else fail();
                /** Notice */ if(container!=undefined) notice("Results: " + container.length);
                /** Notice */ if(container!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
                /** Notice */ if(container!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

                /** Out */ out("Solve Regular Expression Inequalities");
                /** Time */ var time = new Date().getTime();
                var statistics = RegGen.Statistics.make(container);
                /** Out */ if(statistics!=undefined) ok(); else fail();
                /** Notice */ if(statistics!=undefined) notice("Results: " + statistics.length);
                /** Notice */ if(statistics!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
                /** Notice */ if(statistics!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");

                /** Debug */
                if(RegGen.config.debug) {
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
                var result = RegGen.Evaluation.make(statistics);;
                /** Out */ if(result!=undefined) ok(); else fail();
                /** Notice */ if(result!=undefined) notice("Time: " + (new Date().getTime()-time) + "ms");
                /** Notice */ if(result!=undefined) notice("Total: " + (new Date().getTime()-total) + "ms");
                /** Notice */ if(result!=undefined) notice("Results (ok): " + result.getOk());
                /** Notice */ if(result!=undefined) notice("Results (indeterminable/correct): " + result.getCorrect());
                /** Notice */ if(result!=undefined) notice("Results (failed): " + result.getFailed());
                result.getMaxArray().foreach(function(depth, max) {
                        /** Notice */ if(result!=undefined && max!=undefined) notice("Results (MAX(" + depth + ")): " + max);
                });
                result.getAvgArray().foreach(function(depth, avg) {
                        /** Notice */ if(result!=undefined && avg!=undefined) notice("Results (ACG(" + depth + ")): " + avg);
                });

                /** Full Output */
                if(RegGen.config.fulloutput) {
                        result.getFailedSet().foreach(function(i, statistics) {
                                __sysout("FAILED (" + i + "): \n " + statistics.toString() + "\n");
                        });
                }

                /** Full Output */
                if(RegGen.config.fulloutput) {
                        result.getIndeterminableSet().foreach(function(i, statistics) {
                                __sysout("INDETERMINABLE (" + i + "): \n " + statistics.toString() + "\n");
                        });
                }

                print("\n *** Generator finished *** \n");
                return undefined;
        }
        SELF.run = run;

        /** Standard Output
        */
        function out(string) {
                putstr(padding_right(string + " ", seperator, fstWidth));
        }
        SELF.out = out;

        /** Notice Output
        */
        function notice(string) {
                putstr(padding_right("... " + string + " ", seperator, fstWidth+sndWidth));
                putstr("\n");
        }
        SELF.notice = notice;

        /** OK Output
        */
        function ok() {
                putstr(padding_left(" OK", seperator, sndWidth));
                putstr("\n");
        }
        SELF.ok = ok;

        /** DONE Output
        */
        function done() {
                putstr(padding_left(" DONE", seperator, sndWidth));
                putstr("\n");
        }
        SELF.done = done;

        /** FAILED Output
        */
        function fail() {
                putstr(padding_left(" FAILED", seperator, sndWidth));
                putstr("\n");
        }
        SELF.fail = fail;

        /** Sub-Standard Output
        */
        function subout(string) {
                putstr(padding_right("... " + string + " ", seperator, fstWidth));
        }
        SELF.subout = subout;

})(__RegGen);;
