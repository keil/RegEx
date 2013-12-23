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
 * $Date: 2013-03-07 13:17:03 +0100 (Thu, 07 Mar 2013) $
 * $Rev: 23142 $
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
						f: function(x) { return this.a },
						g: function(x) { return {a: 4711} },
						h: function(x) { this.zzz = 4712 }
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



__sysout("## READ ##################################################");
__sysout("##");

// Single Read Test - @
test("@", "obj.a");
test("@", "obj.bb.bb");

// Single Read Test - ?
test("?", "obj.a");
test("?", "obj.bb.bb");

// Single Read Test - x
test("a", "obj.a");
test("a", "obj.b");
test("bb", "obj.bb");
test("bb", "obj.bbb");

// Single Read Test - (x+x)
test("(a+b)", "obj.a");
test("(c+a)", "obj.b");
test("(a+b)", "obj.bb");
test("(bb+bb)", "obj.bbb");

// Single Read Test - x?
test("a?", "obj.a");
test("a?", "obj.b");
test("bb?", "obj.bb");
test("bb?", "obj.bbb");

// Single Read Test - (x+x)?
test("(a+b)?", "obj.a");
test("(c+a)?", "obj.b");

// Single Read Test - x*
test("a*", "obj");
test("a*", "obj.a");
test("a*", "obj.a.a.a");
test("a*", "obj.a.a.a.b");
test("a*", "obj.b");
test("bb*", "obj.bbb");

// Single Read Test - (x+x)*
test("(a+b)*", "obj.a");
test("(c+a)*", "obj.b");
test("(a+b)*", "obj.bb");
test("(bb+bb)*", "obj.bbb");



// Multiple Read Test - @
test("a.a.a.@", "obj.a.a.a.a");
test("@.a", "obj.a.a");
test("a.@.a", "obj.a.a.a");

// Multiple Read Test - ?
test("a.a.a.?", "obj.a.a.a.a");
test("a.a.a.?", "obj.a.a.a.b");
test("?.a", "obj.a.a");
test("?.a", "obj.b.a");
test("?.a", "obj.c.a");
test("a.?.a", "obj.a.a.a");

// Multiple Read Test - x
test("a.a.a", "obj.a.a.a");
test("a", "obj.b.a.b");
test("bb", "obj.bb.bb");
test("bb", "obj.bb");

// Multiple Read Test - (x+x)
test("a.a.(a+b)", "obj.a.a.a");
test("a.a.(a+b)", "obj.a.a.b");
test("a.a.(a+b)", "obj.a.a.c");
test("(a+b).a", "obj.a.a");
test("(a+b).a", "obj.b.a");
test("(c+b).a", "obj.a.a");

// Multiple Read Test - x?
test("a.a?.a", "obj.a.a.a");
test("a?.b.a.b", "obj.b.a.b");
test("bb.bb?", "obj.bb.bb");
test("bb?", "obj.bb");

// Multiple Read Test - (x+x)?
test("a.a.(a+b)?", "obj.a.a.a");
test("a.a.(a+b)?", "obj.a.a.b");
test("a.a.(a+b)?", "obj.a.a.c");
test("(a+b)?.a", "obj.a.a");
test("(a+b)?.b.a", "obj.b.a");
test("(c+b)?.a", "obj.a.a");

// Multiple Read Test - x*
test("a.a*.a", "obj.a.a.a");
test("a*.b.a.b", "obj.b.a.b");
test("bb.bb*", "obj.bb.bb");
test("bb*", "obj.bb");

// Multiple Read Test - (x+x)*
test("a.a.(a+b)*", "obj.a.a.a");
test("a.a.(a+b)*", "obj.a.a.b");
test("a.a.(a+b)*", "obj.a.a.c");
test("(a+b)*.a", "obj.a.a");
test("(a+b)*.b.a", "obj.b.a");
test("(c+b)*.a", "obj.a.a");





__sysout("## WRITE ##################################################");
__sysout("##");

// Single Write Test - @
test("@", "obj.a = 4711");
test("@", "obj.bb.bb = 4711");

// Single Write Test - ?
test("?", "obj.a = 4711");
test("?", "obj.bb.bb = 4711");

// Single Write Test - x
test("a", "obj.a = 4711");
test("a", "obj.b = 4711");
test("bb", "obj.bb = 4711");
test("bb", "obj.bbb = 4711");

// Single Write Test - (x+x)
test("(a+b)", "obj.a = 4711");
test("(c+a)", "obj.b = 4711");
test("(a+b)", "obj.bb = 4711");
test("(bb+bb)", "obj.bbb = 4711");

// Single Write Test - x?
test("a?", "obj.a = 4711");
test("a?", "obj.b = 4711");
test("bb?", "obj.bb = 4711");
test("bb?", "obj.bbb = 4711");

// Single Write Test - (x+x)?
test("(a+b)?", "obj.a = 4711");
test("(c+a)?", "obj.b = 4711");

// Single Write Test - x*
test("a*", "obj = 4711");
test("a*", "obj.a = 4711");
test("a*", "obj.a.a.a = 4711");
test("a*", "obj.a.a.a.b = 4711");
test("a*", "obj.b = 4711");
test("bb*", "obj.bbb = 4711");

// Single Write Test - (x+x)*
test("(a+b)*", "obj.a = 4711");
test("(c+a)*", "obj.b = 4711");
test("(a+b)*", "obj.bb = 4711");
test("(bb+bb)*", "obj.bbb = 4711");



// Multiple Write Test - @
test("a.a.a.@", "obj.a.a.a.a = 4711");
test("@.a", "obj.a.a = 4711");
test("a.@.a", "obj.a.a.a = 4711");

// Multiple Write Test - ?
test("a.a.a.?", "obj.a.a.a.a = 4711");
test("a.a.a.?", "obj.a.a.a.b = 4711");
test("?.a", "obj.a.a = 4711");
test("?.a", "obj.b.a = 4711");
test("?.a", "obj.c.a = 4711");
test("a.?.a", "obj.a.a.a = 4711");

// Multiple Write Test - x
test("a.a.a", "obj.a.a.a = 4711");
test("a", "obj.b.a.b = 4711");
test("bb", "obj.bb.bb = 4711");
test("bb", "obj.bb = 4711");

// Multiple Write Test - (x+x)
test("a.a.(a+b)", "obj.a.a.a = 4711");
test("a.a.(a+b)", "obj.a.a.b = 4711");
test("a.a.(a+b)", "obj.a.a.c = 4711");
test("(a+b).a", "obj.a.a = 4711");
test("(a+b).a", "obj.b.a = 4711");
test("(c+b).a", "obj.a.a = 4711");

// Multiple Write Test - x?
test("a.a?.a", "obj.a.a.a = 4711");
test("a.a?.a", "obj.a.a = 4711");
test("a?.b.a.b", "obj.b.a.b = 4711");
test("bb.bb?", "obj.bb.bb = 4711");
test("bb?", "obj.bb = 4711");

// Multiple Write Test - (x+x)?
test("a.a.(a+b)?", "obj.a.a.a = 4711");
test("a.a.(a+b)?", "obj.a.a.b = 4711");
test("a.a.(a+b)?", "obj.a.a.c = 4711");
test("a.(a+b)?.a", "obj.a.a.a = 4711");
test("(a+b)?.a", "obj.a.a = 4711");
test("(a+b)?.b.a", "obj.b.a = 4711");
test("(c+b)?.a", "obj.a.a = 4711");

// Multiple Write Test - x*
test("a.a*.a", "obj.a.a.a = 4711");
test("a.a*.a", "obj.a.a = 4711");
test("a*.b.a.b", "obj.b.a.b = 4711");
test("bb.bb*", "obj.bb.bb = 4711");
test("bb*", "obj.bb = 4711");

// Multiple Write Test - (x+x)*
test("a.a.(a+b)*", "obj.a.a.a = 4711");
test("a.a.(a+b)*", "obj.a.a.b = 4711");
test("a.a.(a+b)*", "obj.a.a.c = 4711");
test("a.(a+b)*.a", "obj.a.a.a = 4711");
test("(a+b)*.a", "obj.a.a = 4711");
test("(a+b)*.b.a", "obj.b.a = 4711");
test("(c+b)*.a", "obj.a.a = 4711");

