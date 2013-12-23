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

start = new __APC.TracePath.TraceEmpty();
//start = new __APC.TracePath.TraceProperty("chahca");

a = new __APC.TracePath.TraceProperty("a");
b = new __APC.TracePath.TraceProperty("b");
c = new __APC.TracePath.TraceProperty("c");
d = new __APC.TracePath.TraceProperty("d");
e = new __APC.TracePath.TraceProperty("e");
f = new __APC.TracePath.TraceProperty("f");


p1 = new __APC.TracePath.TracePath(b, c);

q1 =  new __APC.TracePath.TracePath(d, e);

s0 = new __APC.TracePath.TraceSet(p1, q1);

b0 = new __APC.TracePath.TracePath(start, a);
b1 = new __APC.TracePath.TracePath(b0, s0);
b2 = new __APC.TracePath.TracePath(b1, f);

__sysout(b2);

(b2.dump(new Array())).foreach(function(k,v){
		__sysout("@" + v);
});
