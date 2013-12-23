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
 * $Date: 2013-04-29 08:40:12 +0200 (Mon, 29 Apr 2013) $
 * $Rev: 23188 $
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


// LITERAL TESTS


testN("",		"@");
testS("@",		"@");
testN("a",		"@");
testN("/a/",	"@");
testN("?",		"@");



testN("",		"a");
testS("@",		"a");
testS("a",		"a");
testN("/a/",	"a");
testN("?",		"a");



testN("",		"/a/");
testS("@",		"/a/");
testN("a",		"/a/");
// testS("a",		"/a/"); kann aktuell nicht bestimmt werden.
testS("/a/",	"/a/");
testN("?",		"/a/");



testS("",		"?");
testS("@",		"?");
testS("a",		"?");
testS("/a/",	"?");
testS("?",		"?");



testN("",		"@?");
testS("@",		"@?");
testN("a",		"@?");
testN("/a/",	"@?");
testN("?",		"@?");
testN("!(a)",	"@?");



testN("",		"a?");
testS("@",		"a?");
testS("a",		"a?");
testN("/a/",	"a?");
testN("?",		"a?");
testN("!(a)",	"a?");



testN("",		"/a/?");
testS("@",		"/a/?");
testN("a",		"/a/?");
// testS("a",		"/a/"); kann aktuell nicht bestimmt werden.
testS("/a/",	"/a/?");
testN("?",		"/a/?");
testN("!(a)",	"/a/?");



testS("",		"??");
testS("@",		"??");
testS("a",		"??");
testS("/a/",	"??");
testS("?",		"??");
testN("!(a)",	"??");




testN("",		"@*");
testS("@",		"@*");
testN("a",		"@*");
testN("/a/",	"@*");
testN("?",		"@*");
testN("!(a)",	"@*");



testN("",		"a*");
testS("@",		"a*");
testS("a",		"a*");
testN("/a/",	"a*");
testN("?",		"a*");
//testN("!(a)",	"a*");



testN("",		"/a/*");
testS("@",		"/a/*");
testN("a",		"/a/*");
// testS("a",		"/a/"); kann aktuell nicht bestimmt werden.
testS("/a/",	"/a/*");
testN("?",		"/a/*");
testN("!(a)",	"/a/*");



testS("",		"?*");
testS("@",		"?*");
testS("a",		"?*");
testS("/a/",	"?*");
testS("?",		"?*");
testS("!(a)",	"?*");



testS("",		"(a+?)");
testS("@",		"(a+?)");
testS("a",		"(a+?)");
testS("/a/",	"(a+?)");
testS("?",		"(a+?)");
testN("!(a)",	"(a+?)");

testN("",		"(a+b)");
testS("@",		"(a+b)");
testS("a",		"(a+b)");
testN("/a/",	"(a+b)");
testN("?",		"(a+b)");
testN("!(a)",	"(a+b)");



testN("",		"(a&?)");
testS("@",		"(a&?)");
testS("a",		"(a&?)");
testN("/a/",	"(a&?)");
testN("?",		"(a&?)");
testN("!(a)",	"(a&?)");

testN("",		"(a&b)");
testS("@",		"(a&b)");
testN("a",		"(a&b)");
testN("/a/",	"(a&b)");
testN("?",		"(a&b)");
testN("!(a)",	"(a&b)");



testS("",		"!(a)");
testS("@",		"!(a)");
testN("a",		"!(a)");
testS("/a/",	"!(a)");
testN("?",		"!(a)");
testS("!(a)",	"!(a)");
testN("!(a)",	"!(b)");

testN("",		"!(?)");
testS("@",		"!(?)");
testN("a",		"!(?)");
testN("/a/",	"!(?)");
testN("?",		"!(?)");
testN("!(a)",	"!(?)");



// SOPER TESTS
testS("!(?)",	"!(a)");
testS("@",		"!(@)");
testS("?",		"!(@)");
testS("?*",		"!(@)");
testS("!(a)",	"?*");





