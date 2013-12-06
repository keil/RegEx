function testRegEx(string) {
		var r = mkRegEx(string);
		__sysout(string + ": " + r.toString());
}

__sysout("\n# CONSTRUCORS TEST #");

// Literals

testRegEx("a");
testRegEx("b");
testRegEx("c");
testRegEx("1");
testRegEx("2");
testRegEx("3");

testRegEx("[ab]");
testRegEx("[abc]");
testRegEx("[123]");

testRegEx("[^ab]");
testRegEx("[^abc]");
testRegEx("[^123]");

testRegEx("[digit]");
testRegEx("[char]");
testRegEx("[lchar]");
testRegEx("[uchar]");
testRegEx("[alpha]");
testRegEx("?");

// Expressions
// TODO, normalization

testRegEx("a.b");
testRegEx("[ab].b");
testRegEx("[^ab].b");
testRegEx("a*.b");
testRegEx("(a+b).b");
testRegEx("(a&b).b");
testRegEx("!(a).b");
