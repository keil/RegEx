/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date: 2013-04-30 13:00:09 +0200 (Tue, 30 Apr 2013) $
 * $Rev: 23215 $
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

// load configuration
load("config.js");

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
load("pool.js");

load("dummy.js");
load("replaceable.js");

load("generator.js");




load("statistics.js")



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

RegEx.Generator.make(3).foreach(function(i,result) {
		
		__sysout("@" + i + " " + result.toString());
		__sysout(result.getRegEx().dump()); //.dump();
});

var a = new RegEx.Dummy.NameDummy("chacha");
var b = new RegEx.Dummy.NameDummy("martha");


//var test = new RegEx.Replaceable.Replaceable(a);
//__sysout("### " + test.dump());
//test.replaceBy(b);
//__sysout("### " + test.dump());


//	function f(d) {return (d==1) ? 1 : (2*f(d-1)*f(d-1) + 3*f(d-1) + f(d-1)*6)}

//	__sysout(f(1));
//	__sysout(f(2));
//	__sysout(f(3));
//	__sysout(f(4));


// load assert
//load("__lib/__lib_apache_assert.js");

// load testcase

quit();
