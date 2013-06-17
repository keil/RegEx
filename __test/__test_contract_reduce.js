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

function testR(cstring, pstring) {
		// parse contracts
		contract = __APC.Parser.parse(cstring);

		// test
		result = assertTrue(cstring, contract.isReadable(pstring));

		__sysout("\n##########");
		__sysout("contract: " + cstring);
		__sysout("property: " + pstring);
		__sysout("isReadable: " + contract.isReadable(pstring));
		__sysout("derivation: " + contract.derive(pstring).dump());
		__sysout("TEST: " + result);
}

function testNR(cstring, pstring) {
		// parse contracts
		contract = __APC.Parser.parse(cstring);

		// test
		result = assertFalse(cstring, contract.isReadable(pstring));

		__sysout("\n##########");
		__sysout("contract: " + cstring);
		__sysout("property: " + pstring);
		__sysout("isReadable: " + contract.isReadable(pstring));
		__sysout("derivation: " + contract.derive(pstring).dump());
		__sysout("TEST: " + result);
}

function testW(cstring, pstring) {
		// parse contracts
		contract = __APC.Parser.parse(cstring);

		// test
		result = assertTrue(cstring, contract.isWriteable(pstring));

		__sysout("\n##########");
		__sysout("contract: " + cstring);
		__sysout("property: " + pstring);
		__sysout("isWriteable: " + contract.isWriteable(pstring));
		__sysout("derivation: " + contract.derive(pstring).dump());
		__sysout("TEST: " + result);
}

function testNW(cstring, pstring) {
		// parse contracts
		contract = __APC.Parser.parse(cstring);

		// test
		result = assertFalse(cstring, contract.isWriteable(pstring));

		__sysout("\n##########");
		__sysout("contract: " + cstring);
		__sysout("property: " + pstring);
		__sysout("isWriteable: " + contract.isWriteable(pstring));
		__sysout("derivation: " + contract.derive(pstring).dump());
		__sysout("TEST: " + result);
}


// LITERAL TESTS
// READABLE

testR("?", "a");
testR("?", "b");
testR("?", "");

testNR("@", "a");
testNR("@", "b");
testNR("@", "");

testR("aa", "aa");
testNR("aa", "bb");
testNR("aa", "");

testNR("bb", "aa");
testR("bb", "bb");
testNR("bb", "");
testR("", "");

testR("/^aa$/", "aa");
testNR("/^aa$/", "bb");
testNR("/^aa$/", "");

testR("/aa/", "aa");
testNR("/aa/", "bb");
testR("/aa/", "baab");
testR("/.*/", "baab");
testR("/.*/", "");
testR("/a|b/", "a");
testNR("/a|b/", "c");
testNR("/aa/", "");


// LITERAL TESTS
// WRITEALE

testW("?", "a");
testW("?", "b");
testW("?", "");

testNW("@", "a");
testNW("@", "b");
testNW("@", "");

testW("aa", "aa");
testNW("aa", "bb");
testNW("aa", "");

testNW("bb", "aa");
testW("bb", "bb");
testNW("bb", "");
testW("", "");


testW("/^aa$/", "aa");
testNW("/^aa$/", "bb");
testNW("/^aa$/", "");

testW("/aa/", "aa");
testNW("/aa/", "bb");
testW("/aa/", "baab");
testW("/.*/", "baab");
testW("/.*/", "");
testW("/a|b/", "a");
testNW("/a|b/", "c");
testNW("/aa/", "");

// SIMPLE CONTRACT TESTS
// READABLE

testR("a?", "a");
testNR("a?", "b");
testNR("a?", "");

testR("a*", "a");
testNR("a*", "b");
testNR("a*", "");

testR("(a+b)", "a");
testR("(a+b)", "b");
testNR("(a+b)", "c");
testR("(a+?)", "c");
testR("(@+?)", "c");

testNR("(a&b)", "a");
testNR("(a&b)", "b");
testR("(a&?)", "a");
testNR("(a&?)", "b");
testNR("(@&?)", "c");

testNR("!(a)", "a");
testR("!(a)", "b");
testNR("!(?)", "a");
testR("!(@)", "a");

testR("!(!(a))", "a");
testNR("!(!(b))", "a");

// SIMPLE CONTRACT TESTS
// WRITEABLE

testW("a?", "a");
testNW("a?", "b");
testNW("a?", "");

testW("a*", "a");
testNW("a*", "b");
testNW("a*", "");

testW("(a+b)", "a");
testW("(a+b)", "b");
testNW("(a+b)", "c");
testW("(a+?)", "c");
testW("(@+?)", "c");

testNW("(a&b)", "a");
testNW("(a&b)", "b");
testW("(a&?)", "a");
testNW("(a&?)", "b");
testNW("(@&?)", "c");

testNW("!(a)", "a");
testW("!(a)", "b");
testNW("!(?)", "a");
testW("!(@)", "a");

testW("!(!(a))", "a");
testNW("!(!(b))", "a");

// COMPLEX CONTRACT TESTS
// READABLE

testR("?.a", "a");
testR("?.b", "b");

testNR("@.a", "a");
testNR("@.b", "b");

testR("a?.b", "a");
testR("a?.b", "b");
testNR("a?.b", "c");
testNR("a?.b", "");

testR("a*.b", "a");
testR("a*.b", "b");
testNR("a*.b", "c");
testNR("a*.b", "");

testR("(aa+bb).aa", "aa");
testNR("(aa+cc).bb", "bb");
testR("(aa+?).@", "aa");

testNR("(aa&cc).bb", "aa");
testNR("(aa&cc).bb", "bb");
testR("(aa&?).@", "aa");
testR("(aa&cc)?.bb", "bb");
testR("(aa&cc)*.bb", "bb");

testR("aa.aa", "aa");
testNR("aa.bb", "bb");
testR("aa.@", "aa");
testR("aa.?", "aa");

testR("aa.aa", "aa");
testNR("aa.bb", "bb");
testR("aa.@", "aa");
testR("aa.?", "aa");

testR("(a.?+b.@)", "a");
testNR("(a.?&b.@)", "b");
testNR("(a.?&/get/)", "get");
testR("(a.?+/get/)", "get");
testNR("(a.?&/get/)", "set");

testR("(?&!(length))", "a");
testNR("(?&!(length))", "length");
testR("((a.?&!(length))+/X/)", "lengthX");

// COMPLEX CONTRACT TESTS
// READABLE

testNW("?.a", "a");
testNW("?.b", "b");

testNW("@.a", "a");
testNW("@.b", "b");

testNW("a?.b", "a");
testW("a?.b", "b");
testNW("a?.b", "c");
testNW("a?.b", "");

testNW("a*.b", "a");
testW("a*.b", "b");
testNW("a*.b", "c");
testNW("a*.b", "");

testNW("(aa+bb).aa", "aa");
testNW("(aa+cc).bb", "bb");
testNW("(aa+?).@", "aa");

testNW("(aa&cc).bb", "aa");
testNW("(aa&cc).bb", "bb");
testNW("(aa&?).@", "aa");
testW("(aa&cc)?.bb", "bb");
testW("(aa&cc)*.bb", "bb");

testNW("aa.aa", "aa");
testNW("aa.bb", "bb");
testNW("aa.@", "aa");
testNW("aa.?", "aa");
testW("aa.bb?", "aa");
testW("aa.bb*", "aa");

testNW("aa.aa", "aa");
testNW("aa.bb", "bb");
testNW("aa.@", "aa");
testNW("aa.?", "aa");

testNW("(a.?+b.@)", "a");
testNW("(a.?&b.@)", "b");
testNW("(a.?&/get/)", "get");
testW("(a.?+/get/)", "get");
testNW("(a.?&/get/)", "set");

testW("(?&!(length))", "a");
testNW("(?&!(length))", "length");
testW("((a.?&!(length))+/X/)", "lengthX");
