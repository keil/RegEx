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

__RegEx.First = (function() {

        SELF = new Object();

        SELF.union	= union;
        SELF.intersection	= intersection;
        SELF.inversion		= inversion;


        function add(array, literal) {
                if(literal.empty()) return true;
                array.add(literal);
        }

        /* first(r + s) = {l \sqcup l' | l \in first(r),  l' \in first(r)} 
         * @param r regular expression
         * @param s regular expression
         * @return Array of literals
         */
        function union(lsR, lsS) {
                var first = Array();
                lsR.foreach(function(i, lR) {
                        lsS.foreach(function(j, lS) {
                                add(first,__RegEx.Literal.intersection(lR, lS));
                                add(first,__RegEx.Literal.intersection(lR, __RegEx.Literal.invert(lS)));
                                add(first,__RegEx.Literal.intersection(__RegEx.Literal.invert(lR), lS));
                        });
                });
                return first;                
        }

        /* first(r & s) = {l \sqcap l' | l \in first(r),  l' \in first(r)} 
         * @param r regular expression
         * @param s regular expression
         * @return Array of literals
         */
        function intersection(lsR, lsS) {
                var first = Array();
                lsR.foreach(function(i, lR) {
                        lsS.foreach(function(j, lS) {
                                add(first,__RegEx.Literal.intersection(lR, lS));
                        });
                });
                return first;
        }

        /* first(!r) = first(r) \cup {^l | l \in first(r)} \ {l | l \in first(r), \nderiv_{l} r = \Sigma* }
         * @param ls Array of literals
         * @return Array of literals
         */
        function inversion(ls) {
                var negated = Array();
                ls.foreach(function(i, l) {
                        add(negated,__RegEx.Literal.invert(l));
                });
                var first = __RegEx.Literal.Wildcard();
                negated.foreach(function(i, l) {
                        first = __RegEx.Literal.intersection(first, l);
                });
                // NOTE, remove all literals with \nderiv{l} r = \Sigma*
                // is not required
                return ls.concat(Array(first));
        }

        return SELF;
})();
