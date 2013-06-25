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
 * $Date: 2013-05-14 08:21:34 +0200 (Tue, 14 May 2013) $
 * $Rev: 23219 $
 */
(function(RegEx) {

		SELF = {};
		RegEx.Dummy = SELF;

		/** Dummy of {} */
		function EmptySetDummy() {
				this.dump = function() { return new RegEx.Expressions.EmptySetLiteral(); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.EmptySetLiteral()) };
		}
		SELF.EmptySetDummy = EmptySetDummy;

		/** Dummy of ^ */
		function EmptyDummy() {
				this.dump = function() { return new RegEx.Expressions.EmptyLiteral(); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.EmptyLiteral()) };		
		}
		SELF.EmptyDummy = EmptyDummy;

		/** Dummy of @ */
		function AtDummy() {
				this.dump = function() { return new RegEx.Expressions.AtLiteral(); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.AtLiteral()) };
		}
		SELF.AtDummy = AtDummy;

		/** Dummy of ? */
		function QMarkDummy() {
				this.dump = function() { return new RegEx.Expressions.QMarkLiteral(); };
				this.toString = function () { return "dumpof " + (RegEx.Expressions.QMarkLiteral()) };
		}
		SELF.QMarkDummy = QMarkDummy;

		/** Dummy of a */
		function NameDummy(varname) {
				this.dump = function() { return new RegEx.Expressions.NameLiteral(varname); };	
				this.toString = function () { return "dumpof " + (RegEx.Expressions.NameLiteral(varname)) };	
		}
		SELF.NameDummy = NameDummy;

		/** Dummy of A */
		function RegExDummy(regex) {
				this.dump = function() { return new RegEx.Expressions.RegExLiteral(regex); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.RegExLiteral(regex)) };
		}
		SELF.RegExDummy = RegExDummy;

		/** Dummy of r? */
		function OptionalDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.OptionalRegEx(dumpable.dump()); };
				this.toString = function () { return "dumpof " +  (new RegEx.Expressions.OptionalRegEx(dumpable.dump())) };
		}
		SELF.OptionalDummy = OptionalDummy;

		/** Dummy of r* */
		function StarDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.StarRegEx(dumpable.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.StarRegEx(dumpable.dump())) };
		}
		SELF.StarDummy = StarDummy;

		/** Dummy of r+s */
		function OrDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.OrRegEx(dumpable0.dump(), dumpable1.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.OrRegEx(dumpable0.dump(), dumpable1.dump())) };		
		}
		SELF.OrDummy = OrDummy;

		/** Dummy of r&s */
		function AndDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.AndRegEx(dumpable0.dump(), dumpable1.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.AndRegEx(dumpable0.dump(), dumpable1.dump())) };
		}
		SELF.AndDummy = AndDummy;

		/** Dummy of !r */
		function NegDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.NegRegEx(dumpable.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.NegRegEx(dumpable.dump())) };
		}
		SELF.NegDummy = NegDummy;

		/** Dummy of r,s */
		function ConcatDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.ConcatRegEx(dumpable0.dump(), dumpable1.dump()); }
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.ConcatRegEx(dumpable0.dump(), dumpable1.dump())) };
		}
		SELF.ConcatDummy = ConcatDummy;

})(__RegEx);
