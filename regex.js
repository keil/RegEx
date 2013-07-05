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


		// TODO, schalter um empty und co aus zu schalten

		// TODO zurückgegebene werde einpacken

		/** Wrapper */
		function RegExWrapper(target, statistics) {

				__sysout("CREATE WRAPPER for " + target);
				__sysout(statistics);

				//////////////////////////////////////////////////
				this.isEmpty = function() {return target.isEmpty();};
				this.isBlank = function() {return target.isBlank();};
				this.isIndifferent = function() {return target.isIndifferent();};
				this.isUniversal = function() {return target.isNullable();};
				this.isNullable = function() {return target.isNullable();};
				//////////////////////////////////////////////////
				this.first = function() {return target.first()};
				this.derive = function(name) {
						 statistics.incDerive();
						//result = target.derive(name);
						//return new RegExWrapper(result, statistics);
						return target.derive(name);
				};
				this.lderive = function(larg) {
						 statistics.incLDerive();
					//	result = target.lderive(larg);
					//	return new RegExWrapper(result, statistics);
					return target.lderive(larg);
				};
				this.uderive = function(larg) {
						__sysout("CALL UDERIVE");
						 statistics.incUDerive();
						//result = target.uderive(larg);
						//return new RegExWrapper(result, statistics);
						return target.uderive(larg);
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function(arg, ctx) {
					//	__sysout("CALL IS SUPERSET" + statistics.getSuperSetOf());
							statistics.incSuperSetOf();
					//	__sysout("CALL IS SUPERSET" + statistics.getSuperSetOf());
						return target.isSuperSetOf(arg, ctx)
				};
				this.isSubSetOf = function(arg, ctx) {
				//			__sysout("CALL IS SUBERSET" + statistics.getSubSetOf() );
						 statistics.incSubSetOf();
				//			__sysout("CALL IS SUBERSET" + statistics.getSubSetOf() );
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
