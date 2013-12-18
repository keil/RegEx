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

var res = Array();

function makeRegEx(string) {
		res.push($(string));
}

__sysout("\n# DISJOINT TEST #");

// Literals

makeRegEx("a");
makeRegEx("b");
makeRegEx("c");
makeRegEx("1");
makeRegEx("2");
makeRegEx("3");

makeRegEx("[ab]");
makeRegEx("[abc]");
makeRegEx("[123]");

makeRegEx("[^ab]");
makeRegEx("[^abc]");
makeRegEx("[^123]");

makeRegEx("[digit]");
makeRegEx("[char]");
makeRegEx("[lchar]");
makeRegEx("[uchar]");
makeRegEx("[alpha]");
makeRegEx("?");

(function() {
		res.foreach(function(i, e) {
				res.foreach(function(i, f) {
						__sysout("* DISJOINT OF: " + e + "  ∏ " + f + " =  Ø");
						var b = __RegEx.Literal.disjoint(e,f);
						__sysout("** " + b);
						__sysout("\n");
				});
		});
})();

