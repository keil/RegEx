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

		/** Dummy of {} */
		function EmptySetDummy() {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.EmptySetLiteral()); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.EmptySetLiteral()) };
		}
		SELF.EmptySetDummy = EmptySetDummy;

		/** Dummy of ^ */
		function EmptyDummy() {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.EmptyLiteral()); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.EmptyLiteral()) };
		}
		SELF.EmptyDummy = EmptyDummy;

		/** Dummy of @ */
		function AtDummy() {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.AtLiteral()); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.AtLiteral()) };
		}
		SELF.AtDummy = AtDummy;

		/** Dummy of ? */
		function QMarkDummy() {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.QMarkLiteral()); };
				this.toString = function() { return "dummyof " + (RegGen.Expressions.QMarkLiteral()) };
		}
		SELF.QMarkDummy = QMarkDummy;

		/** Dummy of a */
		function NameDummy(varname) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.NameLiteral(varname)); };	
				this.toString = function() { return "dummyof " + (RegGen.Expressions.NameLiteral(varname)) };
		}
		SELF.NameDummy = NameDummy;

		/** Dummy of A */
		function RegGenDummy(regex) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.RegGenLiteral(regex)); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.RegGenLiteral(regex)) };
		}
		SELF.RegGenDummy = RegGenDummy;

		/** Dummy of r? */
		function OptionalDummy(dumpable) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.OptionalRegGen(dumpable.dump())); };
				this.toString = function() { return "dummyof " +  (new RegGen.Expressions.OptionalRegGen(dumpable.dump())) };
				this.getSubDummy = function() { return dumpable; };
		}
		SELF.OptionalDummy = OptionalDummy;

		/** Dummy of r* */
		function StarDummy(dumpable) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.StarRegGen(dumpable.dump())); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.StarRegGen(dumpable.dump())) };
				this.getSubDummy = function() { return dumpable; };
		}
		SELF.StarDummy = StarDummy;

		/** Dummy of r+s */
		function OrDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.OrRegGen(dumpable0.dump(), dumpable1.dump())); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.OrRegGen(dumpable0.dump(), dumpable1.dump())) };
				this.getLeftSubDummy = function() { return dumpable0; };
				this.getRightSubDummy = function() { return dumpable1; };
		}
		SELF.OrDummy = OrDummy;

		/** Dummy of r&s */
		function AndDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.AndRegGen(dumpable0.dump(), dumpable1.dump())); };
				this.toString = function() { return "dummyof " + (new RegGen.Expressions.AndRegGen(dumpable0.dump(), dumpable1.dump())) };
				this.getLeftSubDummy = function() { return dumpable0; };
				this.getRightSubDummy = function() { return dumpable1; };
		}
		SELF.AndDummy = AndDummy;

		/** Dummy of !r */
		function NegationDummy(dumpable) {
				this.dump = function() { return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.NegRegGen(dumpable.dump())); };
				this.toString = function () { return "dummyof " + (new RegGen.Expressions.NegRegGen(dumpable.dump())) };
				this.getSubDummy = function() { return dumpable; };
		}
		SELF.NegationDummy = NegationDummy;

		/** Dummy of r,s */
		function ConcatDummy(dumpable0, dumpable1) {
				this.dump = function() {return new RegGen.Expressions.RegGenWrapper(new RegGen.Expressions.ConcatRegGen(dumpable0.dump(), dumpable1.dump())); }
				this.toString = function () { return "dummyof " + (new RegGen.Expressions.ConcatRegGen(dumpable0.dump(), dumpable1.dump())) };
				this.getLeftSubDummy = function() { return dumpable0; };
				this.getRightSubDummy = function() { return dumpable1; };
		}
		SELF.ConcatDummy = ConcatDummy;

})(__RegGen);
