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

var fname = "f";
var vname = "v";

obj = __APC.permit("@", {a:2, b:3, x:{a:2, b:3, c:4, d:5}, y:{a:2, b:3, c:4, d:5}}, vname);

obj.a;
obj.b;
obj.x.a
obj.y.b
obj.a = 4711;
obj.x = {};
obj.x.a = 4712;


var reffect = __APC.Effect.getReadEffect(fname);
reffect.foreach(function(k, v){
		__sysout("<READ> " + v);
});

var weffect = __APC.Effect.getWriteEffect(fname);
weffect.foreach(function(k, v){
		__sysout("<WRITE> " + v);
});

// NOTE - todo deletes the list
__look();
