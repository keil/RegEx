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
var __RegEx = (function(APC) {

		// Global Scope
		SELF = {};
		RegEx = {};
		RegEx.Expressions = SELF;

		//////////////////////////////////////////////////
		// Interface to APC
		//////////////////////////////////////////////////

		RegEx.APC = APC;
		APC.RegEx = RegEx;

		//////////////////////////////////////////////////
		// Interface to Access Permission Contracts
		//////////////////////////////////////////////////

		/** RegEx Wrapper
		 * Wrapper Object for Regular Expression Objects
		 * @param target AccessPermissionContract
		 */

		var counter = 0;
		function RegExWrapper(target) {
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
//						/* Increase counter */ if(RegEx.Statistics.currentCallStatistics!=undefined) RegEx.Statistics.currentCallStatistics.incDeriveStat();
						return target.derive(name);
				};
				this.lderive = function(larg) {
//						/* Increase counter */if(RegEx.Statistics.currentCallStatistics!=undefined) RegEx.Statistics.currentCallStatistics.incLDeriveStat();
						return target.lderive(larg);
				};
				this.uderive = function(larg) {
//						/* Increase counter */if(RegEx.Statistics.currentCallStatistics!=undefined) RegEx.Statistics.currentCallStatistics.incUDeriveStat();
						return target.uderive(larg);
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function(arg, ctx) {
//						/* Increase counter */if(RegEx.Statistics.currentCallStatistics!=undefined) RegEx.Statistics.currentCallStatistics.incSuperSetOfStat();
						return target.isSuperSetOf(arg, ctx)
				};
				this.isSubSetOf = function(arg, ctx) {
//						/* Increase counter */if(RegEx.Statistics.currentCallStatistics!=undefined) RegEx.Statistics.currentCallStatistics.incSubSetOfStat();
						return target.isSubSetOf(arg, ctx);
				};
				this.reduce = function() {
		//				var tmp;
						/* Deactivate Statistics */
		//				tmp = RegEx.Statistics.currentCallStatistics;
		//				RegEx.Statistics.currentCallStatistics=undefined;

		//				target = target.reduce();

		//				/* Deactivate Statistics */
		//				RegEx.Statistics.currentCallStatistics = tmp;

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
		SELF.RegExWrapper = RegExWrapper;

		//////////////////////////////////////////////////
		// Renaming of Access Permission Contracts
		//////////////////////////////////////////////////

		SELF.EmptySetLiteral	= APC.Contract.EmptySetLiteral;
		SELF.EmptyLiteral		= APC.Contract.EmptyLiteral;

		SELF.AtLiteral			= APC.Contract.AtLiteral;
		SELF.QMarkLiteral		= APC.Contract.QMarkLiteral;
		SELF.NameLiteral		= APC.Contract.NameLiteral;
		SELF.RegExLiteral		= APC.Contract.RegExLiteral;

		SELF.OptionalRegEx		= APC.Contract.QMarkContract;
		SELF.StarRegEx			= APC.Contract.StarContract;
		SELF.OrRegEx			= APC.Contract.OrContract;
		SELF.AndRegEx			= APC.Contract.AndContract;
		SELF.NegRegEx			= APC.Contract.NegContract;
		SELF.ConcatRegEx		= APC.Contract.ConcatContract;

		return RegEx;

})(__APC);
