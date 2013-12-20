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



// The Global Object
load("RegEx/global.js");
load("RegEx/config.js");

load("RegEx/cache.js");
load("RegEx/literal.js");
load("RegEx/expression.js");

load("RegEx/first.js");
load("RegEx/containment.js");

load("Regex/parser.js");

//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

var __start = new Date().getTime();

/* Test: Regular Expression */
load("Test/Regex/constructor.js");
load("Test/Regex/normalization.js");
load("Test/Regex/derivatives.js"); 

/* Test: Literal Operations */
load("Test/Regex/union.js"); 
load("Test/Regex/invert.js"); 
load("Test/Regex/disjoint.js"); 
load("Test/Regex/subset.js");

/* Test: First Construction */
load("Test/Regex/first.js");











var __end = new Date().getTime();

__sysout("%% START: " + __start);
__sysout("%% END: " + __end);
__sysout("%% TIME: " + (__end - __start));

quit();
