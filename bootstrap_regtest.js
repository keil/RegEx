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
 * $Date: 2013-12-19 16:51:42 +0100 (Thu, 19 Dec 2013) $
 * $Rev: 23616 $
 */

//////////////////////////////////////////////////
// System
//////////////////////////////////////////////////

// load system
load("system.js");

//////////////////////////////////////////////////
// Libraries
//////////////////////////////////////////////////

// load hash set
load("lib/__lib_apache_hashtable.js");
load("lib/__lib_apache_hashset.js");
// load string padding
load("lib/__lib_padding.js");
// Load new waek map
load("lib/__lib_harmony_weakmap.js");
// Load reflect API
load("lib/__lib_reflect.js");
// Load StringMap
load("lib/__lib_StringMap.js");

//////////////////////////////////////////////////
// Regular Expressions
//////////////////////////////////////////////////

// The Global Object
load("src/RegEx/regex.global.js");
load("src/RegEx/regex.config.js");
// expressions
load("src/RegEx/regex.cache.js");
load("src/RegEx/regex.literal.js");
load("src/RegEx/regex.expression.js");
// containment calculus
load("src/RegEx/regex.first.js");
load("src/RegEx/regex.containment.js");
// parser
load("src/Regex/regex.parser.js");

//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

(function() {
var __start = new Date().getTime();

/* Test: Regular Expression */
load("Test/Regex/constructor.js");
load("Test/Regex/normalization.js");
load("Test/Regex/derivatives.js"); 

/* Test: Literal Operations */
load("Test/Regex/intersection.js"); 
load("Test/Regex/invert.js"); 
load("Test/Regex/disjoint.js"); 
load("Test/Regex/subset.js");

/* Test: First Construction */
load("Test/Regex/first.js");

/* Test: Positive and Negative Derivatives */
load("Test/Regex/pderiv.js");
load("Test/Regex/nderiv.js");

/* Test: Containment Calculus */
load("Test/Regex/containment.js");
load("Test/Regex/containment_axioms.js");

var __end = new Date().getTime();

__sysout("%% START: " + __start);
__sysout("%% END: " + __end);
__sysout("%% TIME: " + (__end - __start));

});






(function() {
		r = $("(?)*");
		s = $("(a)*");

		first(r, s);

		test(r, s, true);
})();

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
