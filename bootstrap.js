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

// load hash set
load("__lib/__lib_apache_hashtable.js");
load("__lib/__lib_apache_hashset.js");
// load string padding
load("__lib/__lib_padding.js");
// Load new waek map
load("__lib/__lib_harmony_weakmap.js");
// Load reflect API
load("__lib/__lib_reflect.js");
// Load StringMap
load("__lib/__lib_StringMap.js");

//////////////////////////////////////////////////
// Access Permission Contracts
//////////////////////////////////////////////////

// load system
load("system.js");

// load apc
load("apc.js");

// load contract
load("contract.js");

//////////////////////////////////////////////////
// RegEx
//////////////////////////////////////////////////


/**
//  interface
load("regex.js");
// configuration
load("config.js");

// Dummy Objects
load("dummy.js");
// Lioteral Pool
load("pool.js");
// Replaceable Objects
load("replaceable.js");

// RegEx Generator
load("generator.js");
// RegEx Transformer
load("transformation.js");

// Statistics
load("statistics.js");
// Evaluator
load("evaluation.js");

// Main Application
load("run.js");
*/
//////////////////////////////////////////////////
// Run
//////////////////////////////////////////////////

// run regex genearator
//RegEx.run.run();
//quit();
//

//load("areg.js");

//load("Regex/literal.js");




// The Global Object
load("RegEx/global.js");
load("RegEx/config.js");

load("RegEx/cache.js");
load("RegEx/literal.js");
load("RegEx/expression.js");

load("RegEx/first.js");
load("RegEx/containment.js");

load("Regex/parser.js");

/** TESTCASES **/

/* Test: Regular Expression */
//load("Test/Regex/constructor.js");
//load("Test/Regex/normalization.js");
//load("Test/Regex/derivatives.js"); 

/* Test: Literal Operations */
//load("Test/Regex/intersection.js"); 
//load("Test/Regex/invert.js"); 
//load("Test/Regex/disjoint.js"); 
//load("Test/Regex/subset.js");

/* Test: First Construction */
//load("Test/Regex/first.js");

/* Test: Positive and Negative Derivatives */
//load("Test/Regex/pderiv.js");
//load("Test/Regex/nderiv.js");



// OPEN



// TEST DISPOVE AND PROVE AXIOMS








(function() {
		r = $("!(a).b");
		s = $("(a&b)");

		test($("!(a).b"), $("(a&b)"), true);
});

// TEST SUBSET RELATION
function first(r, s) {
		__sysout(r.first());
		__sysout(s.first());
		__sysout(__RegEx.First.inversion(s.first()));
		__sysout(__RegEx.First.intersection(r.first(), __RegEx.First.inversion(s.first())));
} 

function test(r, s, verbose) {

		CONFIG.Verbose = (verbose!=undefined) ? verbose : false;

		__sysout("* isSubSetOf: " + r + " <= " + s);
		var subRS = r.isSubSetOf(s);
		__sysout("** " + subRS);
		__sysout("* isSubSetOf: " + s + " <= " + r);
		var subSR = s.isSubSetOf(r);
		__sysout("** " + subSR);

		__sysout("* isSupSetOf: " + r + " => " + s);
		var supRS = r.isSuperSetOf(s);
		__sysout("** " + supRS);
		__sysout("* isSupSetOf: " + s + " => " + r);
		var supSR = s.isSuperSetOf(r);
		__sysout("** " + supSR);

		__sysout("\n");
}

quit();
