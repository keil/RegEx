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
var __RegGen = (function(APC) {

		// Global Scope
		SELF = {};
		RegGen = {};
		RegGen.Expressions = SELF;

		//////////////////////////////////////////////////
		// Interface to APC
		//////////////////////////////////////////////////

		RegGen.APC = APC;
		APC.RegGen = RegGen;

		//////////////////////////////////////////////////
		// Interface to Access Permission Contracts
		//////////////////////////////////////////////////

		/** RegGen Wrapper
		 * Wrapper Object for Regular Expression Objects
		 * @param target AccessPermissionContract
		 */

		var counter = 0;
		function RegGenWrapper(target) {
return target;

				var uid = counter++;
				//////////////////////////////////////////////////
				this.isEmpty = function() {return target.isEmpty();};
				this.isBlank = function() {return target.isBlank();};
				this.isIndifferent = function() {return target.isIndifferent();};
				this.isUniversal = function() {return target.isUniversal();};
				this.isNullable = function() {return target.isNullable();};
				//////////////////////////////////////////////////
				this.first = function() {return target.first()};
				this.derive = function(name) {
//						/* Increase counter */ if(RegGen.Statistics.currentCallStatistics!=undefined) RegGen.Statistics.currentCallStatistics.incDeriveStat();
						return target.derive(name);
				};
				this.lderive = function(larg) {
//						/* Increase counter */if(RegGen.Statistics.currentCallStatistics!=undefined) RegGen.Statistics.currentCallStatistics.incLDeriveStat();
						return target.lderive(larg);
				};
				this.uderive = function(larg) {
//						/* Increase counter */if(RegGen.Statistics.currentCallStatistics!=undefined) RegGen.Statistics.currentCallStatistics.incUDeriveStat();
						return target.uderive(larg);
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function(arg, ctx) {
//						/* Increase counter */if(RegGen.Statistics.currentCallStatistics!=undefined) RegGen.Statistics.currentCallStatistics.incSuperSetOfStat();
						return target.isSuperSetOf(arg, ctx)
				};
				this.isSubSetOf = function(arg, ctx) {
//						/* Increase counter */if(RegGen.Statistics.currentCallStatistics!=undefined) RegGen.Statistics.currentCallStatistics.incSubSetOfStat();
						return target.isSubSetOf(arg, ctx);
				};
				this.reduce = function() {
		//				var tmp;
						/* Deactivate Statistics */
		//				tmp = RegGen.Statistics.currentCallStatistics;
		//				RegGen.Statistics.currentCallStatistics=undefined;

		//				target = target.reduce();

		//				/* Deactivate Statistics */
		//				RegGen.Statistics.currentCallStatistics = tmp;

						return this;
				};
				//////////////////////////////////////////////////
				this.dump = function() {return target.dump();};
				this.toString = function() {
						//return "wrapperof " + target.toString();
						//return "<#" + uid + " " + target.toString() + ">";
						return target.toString();
				};
				//////////////////////////////////////////////////
				this.getTarget = function() {return target;};
		}
		SELF.RegGenWrapper = RegGenWrapper;

		//////////////////////////////////////////////////
		// Renaming of Access Permission Contracts
		//////////////////////////////////////////////////

		SELF.EmptySetLiteral	= APC.Contract.EmptySetLiteral;
		SELF.EmptyLiteral		= APC.Contract.EmptyLiteral;

		SELF.AtLiteral			= APC.Contract.AtLiteral;
		SELF.QMarkLiteral		= APC.Contract.QMarkLiteral;
		SELF.NameLiteral		= APC.Contract.NameLiteral;
		SELF.RegGenLiteral		= APC.Contract.RegGenLiteral;

		SELF.OptionalRegGen		= APC.Contract.QMarkContract;
		SELF.StarRegGen			= APC.Contract.StarContract;
		SELF.OrRegGen			= APC.Contract.OrContract;
		SELF.AndRegGen			= APC.Contract.AndContract;
		SELF.NegRegGen			= APC.Contract.NegContract;
		SELF.ConcatRegGen		= APC.Contract.ConcatContract;

		return RegGen;

})(__APC);
