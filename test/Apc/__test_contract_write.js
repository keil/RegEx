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

function testW(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertTrue(contract.isWriteable(name1));
		__sysout("/[" + contract.toString() + "] " + name1 + ": " + contract.isWriteable(name1) + "/ " + contract.derive(name1).toString());
}

function testN(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertFalse(contract.isWriteable(name1));
		__sysout("/[" + contract.toString() + "] " + name1 + ": " + contract.isWriteable(name1) + "/ " + contract.derive(name1).toString());
}

__sysout("# TEST 1 #");
testN("@.b.c", "a");
testN("@.b*.c", "b");
testN("@", "a");

__sysout("# TEST 2 #");
testN("?.b.c", "a");
testN("?.b*.c", "b");
testW("?", "1");
testW("?", "1");

__sysout("# TEST 3 #");
testN("/[a-z]/.b.c", "a");
testN("a.b.c", "a");
testN("/[a-z]/.b.c", "b");
testN("a.b.c", "b");
testW("/[a-z]/", "a");
testW("a", "a");
testW("b", "b");

__sysout("# TEST 4 #");
testN("/[a-z]/.b.c", "a");
testN("a*.b.c", "a");
testN("/[a-z]/.b.c", "b");
testN("a*.b.c", "b");
testW("/[a-z]/", "a");
testW("a*", "a");
testW("b*", "b");

__sysout("# TEST 5 #");
testN("/[a-z]/.b.c", "a");
testN("a?.b.c", "a");
testN("/[a-z]/.b.c", "b");
testN("a?.b.c", "b");
testW("/[a-z]/", "a");
testW("a?", "a");
testW("b?", "b");

__sysout("# TEST 6 #");
testN("(a+b).b.c", "a");
testN("(a+b).b.c", "b");
testN("(a+b).b.c", "c");
testW("(a+b)", "a");
testW("(a+b)", "b");
testN("(a+b)", "c");

__sysout("# TEST 7 #");
testN("(a+b)*.b.c", "a");
testN("(a+b)*.b.c", "b");
testN("(a+b)*.b.c", "c");
testW("(a+b)*", "a");
testW("(a+b)*", "b");
testN("(a+b)*", "c");


__sysout("# TEST 8 #");
testN("(a+b)?.b.c", "a");
testN("(a+b)?.b.c", "b");
testN("(a+b)?.b.c", "c");
testW("(a+b)?", "a");
testW("(a+b)?", "b");
testN("(a+b)?", "c");

__sysout("# TEST 9 #");
testN("(a+b*).b.c", "a");

