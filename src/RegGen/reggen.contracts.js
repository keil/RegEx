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

        function RegGenWrapper(target) {
                return target;

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
