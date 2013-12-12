function testRegEx(string) {
		__sysout("* " + string);
		__sysout("** " + mkRegEx(string).toString() + "\n");
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

testRegEx("a*");
testRegEx("a+b");
testRegEx("a&b");
testRegEx("!b");
testRegEx("a.b");

testRegEx("(a)");
testRegEx("(a)*");
testRegEx("(a+b)");
testRegEx("(a&b)");
testRegEx("!(b)");
testRegEx("(a.b)");
testRegEx("(a&(!b))");
testRegEx("(a+(!b))");
testRegEx("(!(a)&(!b))");
testRegEx("(!(a)+(!b))");

testRegEx("(a*)");
testRegEx("(a)*");
testRegEx("(a+b)*");
testRegEx("(a&b)");
testRegEx("!(b)*");
testRegEx("(a.b)*");
testRegEx("(a&(!b))*");
testRegEx("(a+(!b))*");
testRegEx("(!(a)&(!b))*");
testRegEx("(!(a)+(!b))*");

testRegEx("[ab].b");
testRegEx("[^ab].b");
testRegEx("a*.b");
testRegEx("(a+b).b");
testRegEx("(a&b).b");
testRegEx("!(a).b");

testRegEx("(a).a");
testRegEx("((a)*).a");
testRegEx("(a+b).a");
testRegEx("(a&b).a");
testRegEx("!(b).a");
testRegEx("(a.b).a");
testRegEx("(a&(!b)).a");
testRegEx("(a+(!b)).a");
testRegEx("(!(a)&(!b)).a");
testRegEx("(!(a)+(!b)).a");
