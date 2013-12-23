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
// Access Permission Contracts
//////////////////////////////////////////////////

// NOTE: build first for regex structure
// load apc
//load("src/Apc/apc.global.js");
// load parser
//load("src/Apc/apc.parser.js");
// load contract
//load("src/Apc/apc.contract.js");

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
// Generator
//////////////////////////////////////////////////


// interface to Access Permission Contracts
// load("src/RegGen/reggen.contracts.js");
// interface to Extended Regular Expressions
load("src/RegGen/reggen.regex.js");
// configuration
load("src/RegGen/reggen.config.js");
// Dummy Objects
load("src/RegGen/reggen.dummy.js");
// Lioteral Pool
load("src/RegGen/reggen.pool.js");
// Replaceable Objects
load("src/RegGen/reggen.replaceable.js");
// RegEx Generator
load("src/RegGen/reggen.generator.js");
// RegEx Transformer
load("src/RegGen/reggen.transformation.js");
// Statistics
load("src/RegGen/reggen.statistics.js");
// Evaluator
load("src/RegGen/reggen.evaluation.js");
// Main Application
load("src/RegGen/reggen.run.js");

//////////////////////////////////////////////////
// Run
//////////////////////////////////////////////////

// run regex genearator
RegGen.run.run();


// tests
(function() {
		r = $("(a+(!b))*");
		s = $("!(b)");

		first(r, s);

		test(r, s, true);
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
