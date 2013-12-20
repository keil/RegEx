/*
 * Efficient Solving of Regular Expression Inequalities 
 *  Regular Expression Generator
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date: 2013-07-23 15:59:13 +0200 (Tue, 23 Jul 2013) $
 * $Rev: 23389 $
 */

var ls = Array();
function mkLiterals(string) {
		ls.push($(string));
}


function testRegEx(string) {
		__sysout("* STRING: " + string);
		var r = $(string);
		__sysout("** REGEX: " + r.toString());

		ls.foreach(function(i, l) {
				__sysout("** NDERIV w.r.t. " + l + ": " + r.nderiv(l));
		})

		__sysout("\n");
}

__sysout("\n# NDERIV TEST #");

// Literals

mkLiterals("a");
mkLiterals("b");
mkLiterals("c");
mkLiterals("1");
mkLiterals("2");
mkLiterals("3");

mkLiterals("[ab]");
mkLiterals("[abc]");
mkLiterals("[123]");

mkLiterals("[^ab]");
mkLiterals("[^abc]");
mkLiterals("[^123]");

mkLiterals("[digit]");
mkLiterals("[char]");
mkLiterals("[lchar]");
mkLiterals("[uchar]");
mkLiterals("[alpha]");
mkLiterals("?");

// Expressions

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
testRegEx("((!a)&(!b)).a");
testRegEx("((!a)+(!b)).a");
