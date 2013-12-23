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
 * $Date: 2013-07-23 15:59:13 +0200 (Tue, 23 Jul 2013) $
 * $Rev: 23389 $
 */

// the global object
__RegEx = function (string) {
		return __RegEx.Parser.parse(string);
}

// shortcut 
this["$"] = __RegEx;
this["$RegEx"] = __RegEx;

this["$typeof"] = function(r) {
		if(r instanceof __RegEx.Literal.Atom) return "Atom";
		else if(r instanceof  __RegEx.Literal.Set) return "Set";
		else if(r instanceof __RegEx.Literal.Inv) return "Inv";
		else if(r instanceof __RegEx.Literal.Digit) return "Digit";
		else if(r instanceof __RegEx.Literal.Char) return "Char";
		else if(r instanceof __RegEx.Literal.LowerChar) return "LowerChar";
		else if(r instanceof __RegEx.Literal.UpperChar) return "UpperChar";
		else if(r instanceof __RegEx.Literal.Alpha) return "Alpha";
		else if(r instanceof __RegEx.Literal.Wildcard) return "Wildcard";
		else if(r instanceof __RegEx.Expression.Empty) return "Empty";
		else if(r instanceof __RegEx.Expression.Null) return "Null";
		else if(r instanceof __RegEx.Expression.Star) return "Star";
		else if(r instanceof __RegEx.Expression.Or) return "Or";
		else if(r instanceof __RegEx.Expression.And) return "And";
		else if(r instanceof __RegEx.Expression.Neg) return "Neg";
		else if(r instanceof __RegEx.Expression.Dot) return "Dot";
		else return "unknown";
}
