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

obj = {a:4711, b:4712};
__APC.apply("a", this, "obj");
function test() {
		obj.a;
		obj.b;
		__look();
}
test();

__sysout("\n\n\n");
obj = {a:4711, b:4712};
function test() {
		obj.a;
		obj.b;
		__look();
}
__APC.apply("a", this, "test");
test();

__sysout("\n\n\n");
obj = {a:4711, b:4712};

function test2(obj) {
		this.c = 3456;
		obj.a;
		obj.b;
		__look();
}

__APC.apply("a", this, "test2");

test2(obj);

test2.d = 76543;
test2.x;
__look();
