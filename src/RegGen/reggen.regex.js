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
                return target;
        }
        SELF.RegGenWrapper = RegGenWrapper;


        return RegGen;

})(__RegEx);

