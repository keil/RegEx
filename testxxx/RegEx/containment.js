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

var rs = Array();

function mkRegEx(string) {
		rs.push($(string));
}

__sysout("\n# CONTINMENT TEST #");

mkRegEx("a");
mkRegEx("b");
mkRegEx("c");
mkRegEx("1");
mkRegEx("2");
mkRegEx("3");

mkRegEx("[ab]");
mkRegEx("[abc]");
mkRegEx("[123]");

mkRegEx("[^ab]");
mkRegEx("[^abc]");
mkRegEx("[^123]");

mkRegEx("[digit]");
mkRegEx("[char]");
mkRegEx("[lchar]");
mkRegEx("[uchar]");
mkRegEx("[alpha]");
mkRegEx("?");

mkRegEx("a*");
mkRegEx("a+b");
mkRegEx("a&b");
mkRegEx("!b");
mkRegEx("a.b");

mkRegEx("(a)");
mkRegEx("(a)*");
mkRegEx("(a+b)");
mkRegEx("(a&b)");
mkRegEx("!(b)");
mkRegEx("(a.b)");
mkRegEx("(a&(!b))");
mkRegEx("(a+(!b))");
mkRegEx("(!(a)&(!b))");
mkRegEx("(!(a)+(!b))");

mkRegEx("(a*)");
mkRegEx("(a)*");
mkRegEx("(a+b)*");
mkRegEx("(a&b)");
mkRegEx("!(b)*");
mkRegEx("(a.b)*");
mkRegEx("(a&(!b))*");
mkRegEx("(a+(!b))*");
mkRegEx("(!(a)&(!b))*");
mkRegEx("(!(a)+(!b))*");

mkRegEx("[ab].b");
mkRegEx("[^ab].b");
mkRegEx("a*.b");
mkRegEx("(a+b).b");
mkRegEx("(a&b).b");
mkRegEx("!(a).b");

mkRegEx("(a).a");
mkRegEx("((a)*).a");
mkRegEx("(a+b).a");
mkRegEx("(a&b).a");
mkRegEx("!(b).a");
mkRegEx("(a.b).a");
mkRegEx("(a&(!b)).a");
mkRegEx("(a+(!b)).a");
mkRegEx("(!(a)&(!b)).a");
mkRegEx("(!(a)+(!b)).a");
mkRegEx("((!a)&(!b)).a");
mkRegEx("((!a)+(!b)).a");

(function() {
		rs.foreach(function(i, r) {
				rs.foreach(function(i, s) {
						__sysout("* isSubSetOf: " + r + " <= " + s);
						var subRS = r.isSubSetOf(s);
						__sysout("** " + subRS);
						__sysout("* isSubSetOf: " + s + " <= " + r);
						var subSR = s.isSubSetOf(r);
						__sysout("** " + subSR);

						__sysout("* isSupSetOf: " + r + " => " + s);
						var supRS = r.isSuperSetOf(s);
						__sysout("** " + supRS);
						__sysout("* isSupSetOf: " + s + " => " + r);
						var supSR = s.isSuperSetOf(r);
						__sysout("** " + supSR);

						__sysout("\n");
				});
		});
})();
