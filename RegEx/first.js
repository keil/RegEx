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

// TODO add comments

__RegEx.First = (function() {

		SELF = function(r) {
				if(r instanceof __RegEx.Containmet.Expression) {
						return intersection(r.left, r.right);
				} else  if(r instanceof __RegEx.Expression.And) {
						return intersection(r.left, r.right);
				} else 	if(r instanceof __RegEx.Expression.Neg) {
						return negation(r.sub);
				}
		}

		function ofIntersection(r, s) {
				var firstR = r.first();
				var firstS = s.first();

				var first = Array();

				firstR.foreach(function(i, lR) {
						firstS.foreach(function(j, lS) {
								var l = __RegEx.Literal.union(lR, lS);
								first.push(l.toString(), l);
						});
				});
				return first;
		}

		function negation(r) {
				var firstR = r.first();
				var first = Array();

				firstR.foreach(function(i, lR) {
						var l = __RegEx.Literal.invert(lR);
						first.push(l.toString(), l);
				});

				// TODO, remove all literals with \nderiv{l} r = \Sigma*

				return firstR.concat(first);



		}
		return SELF;
})();

