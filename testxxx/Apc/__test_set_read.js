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

function testRR(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertTrue(contract.isReadable(name1));
		__sysout("[" + contract.toString() + "] " + name1 + ": " + contract.isReadable(name1) + "/ " + contract.derive(name1).toString());
		assertTrue(contract.derive(name1).isReadable(name2));
		__sysout("[" + contract.derive(name1).toString() + "] " + name2 + ": " + contract.derive(name1).isReadable(name2) + "/ " + contract.derive(name1).derive(name2).toString());
}

function testRN(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertTrue(contract.isReadable(name1));
		__sysout("[" + contract.toString() + "] " + name1 + ": " + contract.isReadable(name1) + "/ " + contract.derive(name1).toString());
		assertFalse(contract.derive(name1).isReadable(name2));
		__sysout("[" + contract.derive(name1).toString() + "] " + name2 + ": " + contract.derive(name1).isReadable(name2) + "/ " + contract.derive(name1).derive(name2).toString());
}

function testN(string, name1, name2) {
		contract = __APC.Parser.parse(string);
		assertFalse(contract.isReadable(name1));
		__sysout("[" + contract.toString() + "] " + name1 + ": " + contract.isReadable(name1) + "/ " + contract.derive(name1).toString());
		assertFalse(contract.derive(name1).isReadable(name2));
		__sysout("[" + contract.derive(name1).toString() + "] " + name2 + ": " + contract.derive(name1).isReadable(name2) + "/ " + contract.derive(name1).derive(name2).toString());
}




__sysout("\n# TEST 1 #");
testN("@.b.c", "a", "b");
testN("@.b*.c", "b", "b");
testN("@", "a", "");

__sysout("\n# TEST 2 #");
testRR("?.b.c", "a", "b");
testRR("?.b*.c", "b", "b");
testRN("?", "1", "b");
testRN("?", "1", "");

__sysout("\n# TEST 3 #");
testRR("/[a-z]/.b.c", "a", "b");
testRR("a.b.c", "a", "b");
testRR("/[a-z]/.b.c", "b", "b");
testN("a.b.c", "b", "a");
testRN("/[a-z]/", "a", "a");
testRN("a", "a", "a");
testRN("b", "b", "b");

__sysout("\n# TEST 4 #");
testRR("/[a-z]/.b.c", "a", "b");
testRR("a*.b.c", "a", "b");
testRR("/[a-z]/.b.c", "b", "b");
testRN("a*.b.c", "b", "b");
testRN("/[a-z]/", "a", "a");
testRR("a*", "a", "a");
testRN("b*", "b", "a");

__sysout("\n# TEST 5 #");
testRR("/[a-z]/.b.c", "a", "b");
testRN("a?.b.c", "a", "a");
testRR("/[a-z]/.b.c", "b", "b");
testRN("a?.b.c", "b", "b");
testRN("/[a-z]/", "a", "");
testRN("a?", "a", "b");
testRN("b?", "b", "b");

__sysout("\n# TEST 6 #");
testRR("(a+b).b.c", "a", "b");
testRR("(a+b).b.c", "b", "b");
testN("(a+b).b.c", "c", "b");
testRN("(a+b)", "a", "a");
testRN("(a+b)", "b", "b");
testN("(a+b)", "c", "");

__sysout("\n# TEST 7 #");
testRR("(a+b)*.b.c", "a", "a");
testRR("(a+b)*.b.c", "b", "a");
testRR("(a+b)*.b.c", "a", "b");
testRR("(a+b)*", "a", "a");
testRR("(a+b)*", "b", "b");
testN("(a+b)*", "c", "c");


__sysout("\n# TEST 8 #");
testRN("(a+b)?.b.c", "a", "a");
testRN("(a+b)?.b.c", "b", "a");
testRR("(a+b)?.b.c", "a", "b");
testRN("(a+b)?", "a", "a");
testRN("(a+b)?", "b", "b");
testN("(a+b)?", "c", "c");

__sysout("\n# TEST 9 #");
testRN("(a+/b*/).b.c", "bbb", "a");
testRR("(a+/b*/).b.c", "bbb", "b");
