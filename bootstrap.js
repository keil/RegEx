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
load("evaluator.js");

// Main Application
load("run.js");

//////////////////////////////////////////////////
// Run
//////////////////////////////////////////////////

RegEx.run.run();
quit();
