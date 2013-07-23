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
(function(RegEx) {

		SELF = {};
		RegEx.Dummy = SELF;

		/** Dummy of {} */
		function EmptySetDummy() {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.EmptySetLiteral()); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.EmptySetLiteral()) };
		}
		SELF.EmptySetDummy = EmptySetDummy;

		/** Dummy of ^ */
		function EmptyDummy() {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.EmptyLiteral()); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.EmptyLiteral()) };
		}
		SELF.EmptyDummy = EmptyDummy;

		/** Dummy of @ */
		function AtDummy() {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.AtLiteral()); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.AtLiteral()) };
		}
		SELF.AtDummy = AtDummy;

		/** Dummy of ? */
		function QMarkDummy() {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.QMarkLiteral()); };
				this.toString = function() { return "dummyof " + (RegEx.Expressions.QMarkLiteral()) };
		}
		SELF.QMarkDummy = QMarkDummy;

		/** Dummy of a */
		function NameDummy(varname) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.NameLiteral(varname)); };	
				this.toString = function() { return "dummyof " + (RegEx.Expressions.NameLiteral(varname)) };
		}
		SELF.NameDummy = NameDummy;

		/** Dummy of A */
		function RegExDummy(regex) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.RegExLiteral(regex)); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.RegExLiteral(regex)) };
		}
		SELF.RegExDummy = RegExDummy;

		/** Dummy of r? */
		function OptionalDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.OptionalRegEx(dumpable.dump())); };
				this.toString = function() { return "dummyof " +  (new RegEx.Expressions.OptionalRegEx(dumpable.dump())) };
				this.getSubDummy = function() { return dumpable; };
		}
		SELF.OptionalDummy = OptionalDummy;

		/** Dummy of r* */
		function StarDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.StarRegEx(dumpable.dump())); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.StarRegEx(dumpable.dump())) };
				this.getSubDummy = function() { return dumpable; };
		}
		SELF.StarDummy = StarDummy;

		/** Dummy of r+s */
		function OrDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.OrRegEx(dumpable0.dump(), dumpable1.dump())); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.OrRegEx(dumpable0.dump(), dumpable1.dump())) };
				this.getLeftSubDummy = function() { return dumpable0; };
				this.getRightSubDummy = function() { return dumpable1; };
		}
		SELF.OrDummy = OrDummy;

		/** Dummy of r&s */
		function AndDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.AndRegEx(dumpable0.dump(), dumpable1.dump())); };
				this.toString = function() { return "dummyof " + (new RegEx.Expressions.AndRegEx(dumpable0.dump(), dumpable1.dump())) };
				this.getLeftSubDummy = function() { return dumpable0; };
				this.getRightSubDummy = function() { return dumpable1; };
		}
		SELF.AndDummy = AndDummy;

		/** Dummy of !r */
		function NegationDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.NegRegEx(dumpable.dump())); };
				this.toString = function () { return "dummyof " + (new RegEx.Expressions.NegRegEx(dumpable.dump())) };
				this.getSubDummy = function() { return dumpable; };
		}
		SELF.NegationDummy = NegationDummy;

		/** Dummy of r,s */
		function ConcatDummy(dumpable0, dumpable1) {
				this.dump = function() {return new RegEx.Expressions.RegExWrapper(new RegEx.Expressions.ConcatRegEx(dumpable0.dump(), dumpable1.dump())); }
				this.toString = function () { return "dummyof " + (new RegEx.Expressions.ConcatRegEx(dumpable0.dump(), dumpable1.dump())) };
				this.getLeftSubDummy = function() { return dumpable0; };
				this.getRightSubDummy = function() { return dumpable1; };
		}
		SELF.ConcatDummy = ConcatDummy;

})(__RegEx);
