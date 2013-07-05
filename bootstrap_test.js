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
// load assert
load("__lib/__lib_apache_assert.js");

// load logging engine
load("__lib/__lib_log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);


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
load("parser.js");

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

load("statistics.js")

load("run.js");


//////////////////////////////////////////////////
// TEST
//////////////////////////////////////////////////

var __start = new Date().getTime();

/* Test Map **/ // (TESTED)
// deprecated 
//__testcase("__test/__test_map.js");

/* Test Parser **/ // (TESTED)
/** APC */ //__testcase("__test/__test_parser.js");

/* Test Path **/ // (TESTED)
// deprecated 
//__testcase("__test/__test_path.js"); 
/** APC */ //__testcase("__test/__test_path2.js");

/** Test Contract **/ // (TESTED)
__testcase("__test/__test_contract.js");

/** Test Contract (reduced) **/ // (TESTED)
__testcase("__test/__test_contract_reduce.js");

/* Test Contract (derive) **/  // (TESTED)
__testcase("__test/__test_contract_read.js");
__testcase("__test/__test_contract_write.js");
__testcase("__test/__test_set_read.js");
__testcase("__test/__test_set_write.js");


/* Test Permit **/  // (TESTED)
/** APC */ //__testcase("__test/__test_permit.js");
/** APC */ //__testcase("__test/__test_permit2.js");
/** APC */ //__testcase("__test/__test_permit3.js");
/** APC */ //__testcase("__test/__test_permit4.js");
/** APC */ //__testcase("__test/__test_permit5.js");
/** APC */ //__testcase("__test/__test_permit6.js");
/** APC */ //__testcase("__test/__test_permit7.js");


/* Test Permit (special) **/ // (TESTED)
/** APC */ //__testcase("__test/__test_scope.js");
/** APC */ //__testcase("__test/__test_scope2.js");


/* Test Path (membership) **/ // 
// deprecated 
//__testcase("__test/__test_subset.js");
//__testcase("__test/__test_superset.js");
//__testcase("__test/__test_sreduce.js");
//__testcase("__test/__test_flattening.js");


/* Containment Calculus */
__testcase("__test/__test_contract_subset.js");
__testcase("__test/__test_contract_subset2.js");


/* Tries */
/** APC */ //__testcase("__test/__test_pathtrie.js");
/** APC */ //__testcase("__test/__test_pathtrie2.js");

var __end = new Date().getTime();

__sysout("%% START: " + __start);
__sysout("%% END: " + __end);
__sysout("%% TIME: " + (__end - __start));


quit();
