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

function testRegEx(string) {
		__sysout("* " + string);
		__sysout("** " + $(string).toString() + "\n");
}

__sysout("\n# NORMALIZATION TEST #");

testRegEx("(a)");
testRegEx("((a)*)*");
testRegEx("(a+a)");
testRegEx("(a&b)");
testRegEx("(a&a)");
testRegEx("!(!(b))");

testRegEx("((a))");
testRegEx("(((a)*)*)*");
testRegEx("(a+(a+a))");
testRegEx("(a&(a&b))");
testRegEx("(a&(a&a))");
testRegEx("!(!(!(b)))");

testRegEx("((a+a)+(a+a))");
testRegEx("((a&b)&(a&b))");
testRegEx("((a&a)&(a&a))");
