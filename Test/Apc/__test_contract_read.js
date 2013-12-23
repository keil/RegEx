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

function testR(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertTrue(contract.isReadable(name1));
		__sysout("[" + contract.toString() + "] " + name1 + ": " + contract.isReadable(name1) + "/ " + contract.derive(name1).toString());
}

function testN(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertFalse(contract.isReadable(name1));
		__sysout("[" + contract.toString() + "] " + name1 + ": " + contract.isReadable(name1) + "/ " + contract.derive(name1).toString());
}

__sysout("# TEST 1 #");
testN("@.b.c", "a");
testN("@.b*.c", "b");
testN("@", "a");

__sysout("# TEST 2 #");
testR("?.b.c", "a");
testR("?.b*.c", "b");
testR("?", "1");
testR("?", "1");

__sysout("# TEST 3 #");
testR("/[a-z]/.b.c", "a");
testR("a.b.c", "a");
testR("/[a-z]/.b.c", "b");
testN("a.b.c", "b");
testR("/[a-z]/", "a");
testR("a", "a");
testR("b", "b");

__sysout("# TEST 4 #");
testR("/[a-z]/.b.c", "a");
testR("a*.b.c", "a");
testR("/[a-z]/.b.c", "b");
testR("a*.b.c", "b");
testR("/[a-z]/", "a");
testR("a*", "a");
testR("b*", "b");

__sysout("# TEST 5 #");
testR("/[a-z]/.b.c", "a");
testR("a?.b.c", "a");
testR("/[a-z]/.b.c", "b");
testR("a?.b.c", "b");
testR("/[a-z]/", "a");
testR("a?", "a");
testR("b?", "b");

__sysout("# TEST 6 #");
testR("(a+b).b.c", "a");
testR("(a+b).b.c", "b");
testN("(a+b).b.c", "c");
testR("(a+b)", "a");
testR("(a+b)", "b");
testN("(a+b)", "c");

__sysout("# TEST 7 #");
testR("(a+b)*.b.c", "a");
testR("(a+b)*.b.c", "b");
testN("(a+b)*.b.c", "c");
testR("(a+b)*", "a");
testR("(a+b)*", "b");
testN("(a+b)*", "c");


__sysout("# TEST 8 #");
testR("(a+b)?.b.c", "a");
testR("(a+b)?.b.c", "b");
testN("(a+b)?.b.c", "c");
testR("(a+b)?", "a");
testR("(a+b)?", "b");
testN("(a+b)?", "c");

__sysout("# TEST 9 #");
testR("(a+b*).b.c", "a");

