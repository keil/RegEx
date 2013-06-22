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

load("generator.js");

load("statistics.js")



//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

RegEx.Generator.make(2).foreach(function(i,result) {
		__sysout("@" + result.toString());
});

// load assert
//load("__lib/__lib_apache_assert.js");

// load testcase

quit();
