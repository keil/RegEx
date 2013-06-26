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
