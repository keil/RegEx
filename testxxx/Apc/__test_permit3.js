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

//////////////////////////////////////////////////
// OBJECTS

function createObject() {
		return {
				a: {a: {a: {a: {a: {a: 4711}}}}},
						b: {a: {b: {a: {b: {c: 4711}}}}},
						bb: {bb: 8},
						c: 4711,
						x: {x: 4711},
						y: {y: {y: {y: {y: 4711}}}},
						zzz: 4711,
						f: function() { return this.a },
						g: function() { return {a: 4711} },
						gg: function() { return this },
						h: function() { this.zzz = 4711 }
		};
}

function test(contract, exp) {
		__sysout("\n\n\n");
		obj = createObject();
		__APC.apply(contract, this, "obj");
		__sysout("[" +contract+ "]: " + exp + " # " + __dump(eval(exp)));
		__look();
}



//////////////////////////////////////////////////
// TESTS

// f() - this.a
test("f", "obj.f()");

// f() - this.a
test("a", "obj.f()");

// g() - {a: 4711}
test("g", "obj.g()");

// g() - {a: 4711}
test("g", "obj.g().a");

// g() - {a: 4711}
test("g.a", "obj.g().a");

// h() - this.zzz = 4711
test("h", "obj.h()");

// h() - this.zzz = 4711
test("(h+zzz)", "obj.h()");

// gg() - this
test("gg", "obj.gg()");

// gg() - this
test("gg.a", "obj.gg().a");

// gg() - this
test("gg.c", "obj.gg().a");

// gg() - this
test("(gg+a)", "obj.gg().a");

// gg() - this
test("gg.c", "obj.gg().c = 4711");

// gg() - this
test("gg.a", "obj.gg().c = 4711");

// gg() - this
test("(gg+c)", "obj.gg().c = 4711");


