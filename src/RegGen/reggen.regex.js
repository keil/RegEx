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
 * $Date: 2013-12-23 10:13:41 +0100 (Mon, 23 Dec 2013) $
 * $Rev: 23659 $
 */
var __RegGen = (function(RegEx) {

		// Global Scope
		SELF = {};
		RegGen = {};
		
        RegGen.Expressions = SELF;
        // TODO USE THSI AS SWITCH

        //////////////////////////////////////////////////
		// Renaming of Access Permission Contracts
		//////////////////////////////////////////////////

		SELF.Atom               = RegEx.Literal.Atom;
        SELF.Set                = RegEx.Literal.Set;
        SELF.Inv                = RegEx.Literal.Inv;

        SELF.Wildcard           = RegEx.Literal.Wildcard;
        
        SELF.Digit              = RegEx.Literal.Digit;
        SELF.Char               = RegEx.Literal.Char;
        SELF.LowerChar          = RegEx.Literal.LowerChar;
        SELF.UpperChar          = RegEx.Literal.UpperChar;
        SELF.Alpha              = RegEx.Literal.Alpha;

		SELF.Null               = RegEx.Expression.Null;;
		SELF.Empty      		= RegEx.Expression.Empty;

		SELF.Star   			= RegEx.Expression.Star;
		SELF.Or     			= RegEx.Expression.Or;
		SELF.And    			= RegEx.Expression.And;
		SELF.Neg    			= RegEx.Expression.Neg;
		SELF.Dot           		= RegEx.Expression.Dot;

		//////////////////////////////////////////////////
		// Interface to APC
		//////////////////////////////////////////////////

		RegGen.RegEx = RegEx;
		RegEx.RegGen = RegGen;

		//////////////////////////////////////////////////
		// Interface to Access Permission Contracts
		//////////////////////////////////////////////////

		/** RegGen Wrapper
		 * Wrapper Object for Regular Expression Objects
		 * @param target AccessPermissionContract
		 */

		function RegGenWrapper(target) {
                // TODO, used ?
                // Maybee use this to use cintratcs and expressions
                // is Empty und cuch stuff is nur required, only to string, and is subset of and the deriv methods 
               
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

	
		return RegGen;

})(__RegEx);

