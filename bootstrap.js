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


// ##### OK
//load("Test/Regex/constructor.js");
//load("Test/Regex/normalization.js");
//load("Test/Regex/derivatives.js"); 




//load("Test/Regex/union.js"); 


load("Test/Regex/invert.js"); 
//load("Test/Regex/disjoint.js"); 
//load("Test/Regex/subset.js");

// ##### OPEN

//
//
//load("Test/Regex/first.js"); // not OK -- implement inv first


//load("Test/Regex/subset.js");


// test 
// Literal subset
// Literal first
// literal union
// literal invert
// TEST DISJPUNT

// pderic nderiv


// TEST
(function(x) {
		var y = 5;
		(function() {
			x=13;
			y=11;
		})();
		__sysout(x);
		__sysout(y);
})(7);

x = Array(1,2,3,5);
__sysout(x.length);
y = Array().concat(x);
__sysout(y.length);
__sysout(x==y);


quit();
