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
 * $Date: 2013-04-08 14:56:47 +0200 (Mon, 08 Apr 2013) $
 * $Rev: 23174 $
 */

function testS(cstring0, cstring1) {
		// parse contracts
		contract0 = __APC.Parser.parse(cstring0);
		// parse contracts
		contract1 = __APC.Parser.parse(cstring1);

		__sysout("\n##########");
		__sysout("C0: \"" + cstring0 + "\" = " + contract0);
		__sysout("C1: \"" + cstring1 + "\" = " + contract1);
		__sysout(contract0 + " <= " + contract1 + ": " + contract0.isSubSetOf(contract1, new __APC.Contract.Containment.Context()));
		__sysout(contract1 + " >= " + contract0 + ": " + contract1.isSuperSetOf(contract0, new __APC.Contract.Containment.Context()));


		// test
		result0 = assertTrue(contract0 + " <= " + contract1, contract0.isSubSetOf(contract1, new __APC.Contract.Containment.Context()));
		result1 = assertTrue(contract1 + " >= " + contract0, contract1.isSuperSetOf(contract0, new __APC.Contract.Containment.Context()));
		__sysout("TEST: " + result0 + " " + result1);
}

function testN(cstring0, cstring1) {
		// parse contracts
		contract0 = __APC.Parser.parse(cstring0);
		// parse contracts
		contract1 = __APC.Parser.parse(cstring1);



		__sysout("\n##########");
		__sysout("C0: \"" + cstring0 + "\" = " + contract0);
		__sysout("C1: \"" + cstring1 + "\" = " + contract1);
		__sysout(contract0 + " <= " + contract1 + ": " + contract0.isSubSetOf(contract1, new __APC.Contract.Containment.Context()));
		__sysout(contract1 + " >= " + contract0 + ": " + contract1.isSuperSetOf(contract0, new __APC.Contract.Containment.Context()));

		// test
		result0 = assertFalse(contract0 + " <= " + contract1, contract0.isSubSetOf(contract1, new __APC.Contract.Containment.Context()));
		result1 = assertFalse(contract1 + " >= " + contract0, contract1.isSuperSetOf(contract0, new __APC.Contract.Containment.Context()));
		__sysout("TEST: " + result0 + " " + result1);
}


testS("a",	"!(b)");
testN("?",	"!(b)");
testN("?",	"a");


testN("!(a)",	"!(b)");
testN("!(a)",	"!(?)");
testS("!(?)",	"!(a)");

testS("!(a)",	"?*");
testN("!(a)",	"a*");

testS("a*",	"(a+b)*");

testS("?", "(a+?)");
testN("?", "(a+b)");
testS("?", "(a.b+?)");

testS("(a+?)", "(a.b+?)");
testS("(a.@+?)", "(a.b+?)");
testS("(a+?)", "(a+?)");

testN("", "a");
testN("a", "");




