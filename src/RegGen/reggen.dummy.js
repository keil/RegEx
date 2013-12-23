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
 * $Date$
 * $Rev$
 */
(function(RegGen) {

        SELF = {};
        RegGen.Dummy = SELF;

        /**
         * Literals
         */

        /** Dummy of a */
        function AtomDummy(a) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Atom(a)); };	
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Atom(a)) };
        }
        SELF.AtomDummy = AtomDummy;

        /** Dummy of A */
        function SetDummy(A) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Set(A)); };	
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Set(A)) };
        }
        SELF.SetDummy = SetDummy;


        /** Dummy of ^A */
        function InvDummy(A) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Inv(A)); };	
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Inv(A)) };
        }
        SELF.InvDummy = InvDummy;

        /** Dummy of ? */
        function WildcardDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Wildcard()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Wildcard()) };
        }
        SELF.WildcardDummy = WildcardDummy;

        /** Dummy of ? */
        function DigitDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Digit()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Digit()) };
        }
        SELF.DigitDummy = DigitDummy;

        /** Dummy of ? */
        function CharDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Char()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Char()) };
        }
        SELF.CharDummy = CharDummy;

        /** Dummy of ? */
        function LowerCharDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.LowerChar()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.LowerChar()) };
        }
        SELF.LowerCharDummy = LowerCharDummy;

        /** Dummy of ? */
        function UpperCharDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.UpperChar()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.UpperChar()) };
        }
        SELF.UpperCharDummy = UpperCharDummy;

        /** Dummy of ? */
        function AlphaDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Alpha()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Alpha()) };
        }
        SELF.AlphaDummy = AlphaDummy;

        /**
         * Expressions
         */

        /** Dummy of {} */
        function NullDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Null()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Null()) };
        }
        SELF.Null = NullDummy;

        /** Dummy of ^ */
        function EmptyDummy() {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Empty()); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Empty()) };
        }
        SELF.EmptyDummy = EmptyDummy;

        /** Dummy of r* */
        function StarDummy(dumpable) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Star(dumpable.dump())); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Star(dumpable.dump())) };
                this.getSubDummy = function() { return dumpable; };
        }
        SELF.StarDummy = StarDummy;

        /** Dummy of r+s */
        function OrDummy(dumpable0, dumpable1) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Or(dumpable0.dump(), dumpable1.dump())); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.Or(dumpable0.dump(), dumpable1.dump())) };
                this.getLeftSubDummy = function() { return dumpable0; };
                this.getRightSubDummy = function() { return dumpable1; };
        }
        SELF.OrDummy = OrDummy;

        /** Dummy of r&s */
        function AndDummy(dumpable0, dumpable1) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.And(dumpable0.dump(), dumpable1.dump())); };
                this.toString = function() { return "dummyof " + (RegGen.Expressions.And(dumpable0.dump(), dumpable1.dump())) };
                this.getLeftSubDummy = function() { return dumpable0; };
                this.getRightSubDummy = function() { return dumpable1; };
        }
        SELF.AndDummy = AndDummy;

        /** Dummy of !r */
        function NegDummy(dumpable) {
                this.dump = function() { return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Neg(dumpable.dump())); };
                this.toString = function () { return "dummyof " + (RegGen.Expressions.Neg(dumpable.dump())) };
                this.getSubDummy = function() { return dumpable; };
        }
        SELF.NegDummy = NegDummy;

        /** Dummy of r,s */
        function DotDummy(dumpable0, dumpable1) {
                this.dump = function() {return new RegGen.Expressions.RegGenWrapper(RegGen.Expressions.Dot(dumpable0.dump(), dumpable1.dump())); }
                this.toString = function () { return "dummyof " + (RegGen.Expressions.Dot(dumpable0.dump(), dumpable1.dump())) };
                this.getLeftSubDummy = function() { return dumpable0; };
                this.getRightSubDummy = function() { return dumpable1; };
        }
        SELF.DotDummy = DotDummy;

})(__RegGen);
