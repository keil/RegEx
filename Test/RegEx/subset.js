function isTrue(r, b, name2) {
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
