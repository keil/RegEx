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
var __RegEx = (function(APC) {

		// Global Scope
		SELF = {};
		RegEx = {};
		RegEx.Expressions = SELF;

		//////////////////////////////////////////////////
		// Interface to APC
		//////////////////////////////////////////////////

		RegEx.APC = APC;

		//////////////////////////////////////////////////
		// Interface to Access Permission Contracts
		//////////////////////////////////////////////////

		/** Call Statistics
		*/
		function CallStatistics() {
				var sumDerive = 0;
				var sumLDerive = 0;
				var sumUDerive = 0;
				var sumSuperSetOf = 0;
				var sumSubSetOf = 0;
				//////////////////////////////////////////////////
				this.incDerive = function() {sumDrive++;};
				this.incLDerive = function() {sumLDerive++;};
				this.incUDerive = function() {sumUDerive++;};
				this.incSuperSetOf = function() {sumSuperSetOf++;};
				this.incSubSetOf = function() {sumSubSetOf++;};
				//////////////////////////////////////////////////
				this.getDerive = function() {return sumDrive;};
				this.getLDerive = function() {return sumLDerive;};
				this.getUDerive = function() {return sumUDerive;};
				this.getSuperSetOf = function() {return sumSuperSetOf;};
				this.getSubSetOf = function() {return sumSubSetOf;};
				//////////////////////////////////////////////////
				this.toString = function() {
						return "Derive:" + sumDerive + 
								" LDerive" + sumLDerive +
								" UDerive" + sumUDerive +	
								" SuperSetOf" + sumSuperSetOf +
								" SubSetOf" + sumSubSetOf; 
				}
		}
		SELF.CallStatistics = CallStatistics;

		/** RegEx Wrapper
		 * Wrapper Object for Regular Expression Objects
		 * @param target AccessPermissionContract
		 * @param statistics Call Statistics
		 */
		function RegExWrapper(target, statistics) {
				//////////////////////////////////////////////////
				this.isEmpty = function() {return target.isEmpty();};
				this.isBlank = function() {return target.isBlank();};
				this.isIndifferent = function() {return target.isIndifferent();};
				this.isUniversal = function() {return target.isNullable();};
				this.isNullable = function() {return target.isNullable();};
				//////////////////////////////////////////////////
				this.first = function() {return target.first()};
				this.derive = function(name) {
						/* Increase counter */statistics.incDerive();
						return target.derive(name);
				};
				this.lderive = function(larg) {
						/* Increase counter */statistics.incLDerive();
						return target.lderive(larg);
				};
				this.uderive = function(larg) {
						/* Increase counter */statistics.incUDerive();
						return target.uderive(larg);
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function(arg, ctx) {
						/* Increase counter */statistics.incSuperSetOf();
						return target.isSuperSetOf(arg, ctx)
				};
				this.isSubSetOf = function(arg, ctx) {
						/* Increase counter */statistics.incSubSetOf();
						return target.isSubSetOf(arg, ctx);
				};
				this.reduce = function() {return target.reduce();};
				//////////////////////////////////////////////////
				this.dump = function() {return target.dump();};
				this.toString = function() {return "wrapperof " + target.toString();};
				//////////////////////////////////////////////////
				this.getStatistics = function() {return statistics;};
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
