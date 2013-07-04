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

// load logging engine
//load("__lib/__lib_log4js.js");
//var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// TODO
load("__JsConTest/jscontest.events.handler.effects3.js");

// load system
load("system.js");

// load apc
load("apc.js");

// load trace path
// load("path.js");
//load("pathtrie.js");

// load contract
load("contract.js");

// load violation
// load("violation.js")

// load parser
// load("parser.js");

// load proxy
// load("proxy.js");

// load permit
// load("permit.js")

//////////////////////////////////////////////////
// RegEx
//////////////////////////////////////////////////

load("regex.js");
load("config.js");
load("run.js");

load("dummy.js");
load("pool.js");
load("replaceable.js");

load("generator.js");
load("transformation.js");

load("statistics.js");
load("evaluator.js");

load("run.js");


//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////
// MAX 4, DEFAULT 3
//var results = RegEx.Generator.make(3);

//results.foreach(function(i, result) {
//		__sysout("RESULT (" + i + "): \n " + result.toString() + "\n");
		//__sysout(result.getDummy().dump());
//});

RegEx.run.run();

//var results = RegEx.Transformation.make(results);
//results.foreach(function(i, result) {
//		__sysout("TRANSFORMATION (" + i + "): \n " + result.toString() + "\n");
		//__sysout(result.getDummy().dump());
//});

/*
var a = new RegEx.Dummy.NameDummy("chacha");
var b = new RegEx.Dummy.NameDummy("martha");


var test = new RegEx.Replaceable.Replaceable(a);
__sysout("### " + test.dump());
test.replaceBy(b);
__sysout("### " + test.dump());
*/

//	function f(d) {return (d==1) ? 1 : (2*f(d-1)*f(d-1) + 3*f(d-1) + f(d-1)*6)}

//	__sysout(f(1));
//	__sysout(f(2));
//	__sysout(f(3));
//	__sysout(f(4));


// load assert
//load("__lib/__lib_apache_assert.js");

// load testcase


// var invert = false;
//		var x = false;

//var result = (invert) ? x : !x; 
//print(result);

quit();
