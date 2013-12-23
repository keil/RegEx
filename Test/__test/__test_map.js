/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *  - TestCase
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date: 2013-03-07 11:18:52 +0100 (Thu, 07 Mar 2013) $
 * $Rev: 23136 $
 */

map = new __APC.Util.Map();
map.set("x", 7);
map.set("y", 6345);
map.set("z", 64);

map.contains("x");

map.contains("asdf");


map.get("z");
map.get("asdf");

echo = function (k,v) { __sysout("[#" + k + "] " + v); }; 
map.foreach(echo);

map.clear();
