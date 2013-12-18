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

// TODO, FIX first(!r)

__RegEx.First = (function() {

		/* calculates the first literals 
		 * @param r regular expression
		 * @return Array of literals
		 */
		SELF = function(r) {
				if(r instanceof __RegEx.Expression.And) {
						return intersection(r.left, r.right);
				} else 	if(r instanceof __RegEx.Expression.Neg) {
						return negation(r.sub);
				}
		}

		// TODO, ist der weg wirklich OK


		/* first(r & s) = {l \sqcap l' | l \in first(r),  l' \in first(r)} 
		 * @param r regular expression
		 * @param s regular expression
		 * @return Array of literals
		 */
		function intersection(lsR, lsS) {
				var first = Array();
				lsR.foreach(function(i, lR) {
						lsS.foreach(function(j, lS) {
								var l = __RegEx.Literal.union(lR, lS);
								first.push(l.toString(), l);
						});
				});
				return first;
		}

		/* first(!r) = first(r) \cup {^l | l \in first(r)} \ {l | l \in first(r), \nderiv_{l} r = \Sigma* }
		 * @param ls Array of literals
		 * @return Array of literals
		 */
		function negation(ls) {
				var first = Array();
				ls.foreach(function(i, l) {
						var lprime = __RegEx.Literal.invert(l);
						first.push(lprime.toString(), lprime);
				});

				// TODO, remove all literals with \nderiv{l} r = \Sigma*
				return ls.concat(first);
		}

		return SELF;
})();
