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

__RegEx.Expression = (function() {

		SELF = new Object();

		SELF.Null		= Null;
		SELF.Empty		= Empty;
		SELF.Star		= Star;
		SELF.Or			= Or;
		SELF.And		= And;
		SELF.Neg		= Neg;
		SELF.Dot		= Dot;

		//////////////////////////////////////////////////
		// Advanced Regular Expressions
		//
		// Literal           l   = a | A | ^A (| ? | [digit] | [char] | [lchar] | [uchar] | [alpha])
		// Expression        r,s = Ø | ϵ | l | r* | r+s | r&s | !r | r·s 
		//////////////////////////////////////////////////

		// basic literals
		var Atom		= __RegEx.Literal.Atom;
		var Set			= __RegEx.Literal.Set;
		var Inv			= __RegEx.Literal.Inv;

		// predefined character classes 
		var Digit		= __RegEx.Literal.Digit;
		var Char		= __RegEx.Literal.Char;
		var LChar		= __RegEx.Literal.LChar;
		var UChar		= __RegEx.Literal.UCHar;
		var Alpha		= __RegEx.Literal.Alpha;
		var Wildcard	= __RegEx.Literal.Wilcard;

		// literal cache
		var cache = __RegEx.Cache.Expressions;

		//  _   _       _ _ 
		// | \ | |     | | |
		// |  \| |_   _| | |
		// | . ` | | | | | |
		// | |\  | |_| | | |
		// |_| \_|\__,_|_|_|

		/**
		 * Null (Ø)
		 */
		function Null() {
				if(!(this instanceof Null)) {
						return cache.c(new Null ());
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return false;
				};
				this.first = function() {
						return Array();
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return true;
				};
				this.indifferent = function() {
						return false;
				};
				this.universal = function() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return this;
				};
				this.nderiv = function(l) {
						return this;
				};
				this.pderiv = function(l) {
						return this;
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return "Ø";
				};
		}

		//  ______                 _         
		// |  ____|               | |        
		// | |__   _ __ ___  _ __ | |_ _   _ 
		// |  __| | '_ ` _ \| '_ \| __| | | |
		// | |____| | | | | | |_) | |_| |_| |
		// |______|_| |_| |_| .__/ \__|\__, |
		//                  | |         __/ |
		//                  |_|        |___/ 

		/**
		 * Empty (ϵ)
		 */
		function Empty() {
				if(!(this instanceof Empty)) {
						return cache.c(new Empty ());
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return true;
				};
				this.first = function() {
						return Array();
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return false;
				};
				this.indifferent = function() {
						return false;
				};
				this.universal = function() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return Null();
				};
				this.nderiv = function(l) {
						return Null();
				};
				this.pderiv = function(l) {
						return Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return "ϵ";
				};
		}		
		//  _  ___                         _____ _             
		// | |/ / |                       / ____| |            
		// | ' /| | ___  ___ _ __   ___  | (___ | |_ __ _ _ __ 
		// |  < | |/ _ \/ _ \ '_ \ / _ \  \___ \| __/ _` | '__|
		// | . \| |  __/  __/ | | |  __/  ____) | || (_| | |   
		// |_|\_\_|\___|\___|_| |_|\___| |_____/ \__\__,_|_|   

		/**
		 * Kleene Star (r*)
		 */
		function Star(r) {

				// THIS
				this.sub = r;

				// NORMALIZATION
				// Ø* ~ Ø
				if(r instanceof Null) return Null();
				// ϵ* ~ ϵ
				else if(r instanceof Empty) return Empty();
				// r** ~ r
				else if(r instanceof Star) return r;

				//////////////////////////////////////////////////
				if(!(this instanceof Star)) {
						return cache.c(new Star (r));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return true;
				};
				this.first = function() {
						return r.first();
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return false;
				};
				this.indifferent = function() {
						return r.indifferent();
				};
				this.universal = function() {
						return (r.indifferent() || r.universal());
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return Dot(r.deriv(b), this);
				};
				this.nderiv = function(l) {
						return Dot(r.nderiv(l),this);
				};
				this.pderiv = function(l) {
						return Dot(r.pderiv(l),this);
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return (r.toString()+"*");
				};
		}

		//           _ _                        _   _           
		//     /\   | | |                      | | (_)          
		//    /  \  | | |_ ___ _ __ _ __   __ _| |_ ___   _____ 
		//   / /\ \ | | __/ _ \ '__| '_ \ / _` | __| \ \ / / _ \
		//  / ____ \| | ||  __/ |  | | | | (_| | |_| |\ V /  __/
		// /_/    \_\_|\__\___|_|  |_| |_|\__,_|\__|_| \_/ \___|

		/**
		 * Alternative (r+s)
		 */
		function Or(r, s) {

				// THIS
				this.left = r;
				this.right = s;

				// NORMALIZATION
				// r + r ~ r
				if(r === s) return r;
				// Ø + s ~ s
				else if(r instanceof Null) return s;
				// r + Ø ~ r
				else if(s instanceof Null) return r;

				//////////////////////////////////////////////////
				if(!(this instanceof Or)) {
						return cache.c(new Or (r,s));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return (r.nullable() || s.nullable());
				};
				this.first = function() {
						return r.first().addAll(s.first());
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return (r.empty() && s.empty());
				};
				this.indifferent = function() {
						return (r.indifferent() || s.indifferent());
				};
				this.universal = function() {
						return (r.universal() || s.universal());
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return Or(r.deriv(b), s.deriv(b));
				};
				this.nderiv = function(l) {
						return Or(r.nderiv(l), s.nderiv(l))
				};
				this.pderiv = function(l) {
						return Or(r.pderiv(l), s.pderiv(l))

				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return  "(" + r.toString() + "+" + s.toString() + ")";
				};
		}

		//  _____       _                          _   _             
		// |_   _|     | |                        | | (_)            
		//   | |  _ __ | |_ ___ _ __ ___  ___  ___| |_ _  ___  _ __  
		//   | | | '_ \| __/ _ \ '__/ __|/ _ \/ __| __| |/ _ \| '_ \ 
		//  _| |_| | | | ||  __/ |  \__ \  __/ (__| |_| | (_) | | | |
		// |_____|_| |_|\__\___|_|  |___/\___|\___|\__|_|\___/|_| |_|

		/**
		 * Intersection (r&s)
		 */
		function And(r, s) {

				// THIS
				this.left = r;
				this.right = s;

				// NORMALIZATION
				// r & r ~ r
				if(r === s) return r;
				// Ø + s ~ Ø
				else if(r instanceof Null) return Null();
				// r + Ø ~ Ø
				else if(s instanceof Null) return Null();

				//////////////////////////////////////////////////
				if(!(this instanceof And)) {
						return cache.c(new And (r,s));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return (r.nullable() && s.nullable());
				};
				this.first = function() {
						return __RegEx.First.intersection(r.first(), s.first()); 
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return (r.empty() && s.empty());
				};
				this.indifferent = function() {
						return (r.indifferent() && s.indifferent());
				};
				this.universal = function() {
						return (r.universal() && s.universal());
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return And(r.deriv(b), s.deriv(b));
				};
				this.nderiv = function(l) {
						return And(r.nderiv(l), s.nderiv(l));
				};
				this.pderiv = function(l) {
						return And(r.pderiv(l), s.pderiv(l))
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return "(" + r.toString() + "&" + s.toString() + ")";
				};
		}

		//  _   _                  _   _             
		// | \ | |                | | (_)            
		// |  \| | ___  __ _  __ _| |_ _  ___  _ __  
		// | . ` |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
		// | |\  |  __/ (_| | (_| | |_| | (_) | | | |
		// |_| \_|\___|\__, |\__,_|\__|_|\___/|_| |_|
		//              __/ |                        
		//             |___/                         

		/**
		 * Negation !(r)
		 */
		function Neg(r) {

				// THIS
				this.sub = r;

				// NORMALIZATION
				// !!r  ~ r
				if(r instanceof Neg) return r.sub;

				//////////////////////////////////////////////////
				if(!(this instanceof Neg)) {
						return cache.c(new Neg (r));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return r.nullable() ? false : true;;
				};
				this.first = function() {
						return __RegEx.First.inversion(r.first()); 
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return r.universal() ? true : false;
				};
				this.indifferent = function() {
						return (r.empty() || r.nullable()) ? true : false;
				};
				this.universal = function() {
						return r.empty() ? true : false;
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return Neg(r.deriv(b));
				};
				this.nderiv = function(l) {
						return Neg(r.pderiv(l));
				};
				this.pderiv = function(l) {
						return Neg(r.nderiv(l));
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return "!(" + r.toString() + ")";
				};
		}

		//   _____                      _                   _   _             
		//  / ____|                    | |                 | | (_)            
		// | |     ___  _ __   ___ __ _| |_ ___ _ __   __ _| |_ _  ___  _ __  
		// | |    / _ \| '_ \ / __/ _` | __/ _ \ '_ \ / _` | __| |/ _ \| '_ \ 
		// | |___| (_) | | | | (_| (_| | ||  __/ | | | (_| | |_| | (_) | | | |
		//  \_____\___/|_| |_|\___\__,_|\__\___|_| |_|\__,_|\__|_|\___/|_| |_|

		/**
		 * Concatenation (r·s)
		 */
		function Dot(r, s) {

				// THIS
				this.left = r;
				this.right = s;

				// NORMALIZATION
				// ϵ·s ~ s
				if(r instanceof Empty) return s;	
				// Ø·s ~ Ø
				else if(r instanceof Null) return Null();

				//////////////////////////////////////////////////
				if(!(this instanceof Dot)) {
						return cache.c(new Dot (r, s));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return (r.nullable() && s.nullable());	
				};
				this.first = function() {
						return (r.nullable() ? r.first().addAll(r.first()) : r.first());
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return (r.empty() || s.empty());
				};
				this.indifferent = function() {
						return (r.indifferent() || (r.nullable() && s.indifferent()));
				};
				this.universal = function() {
						return ((r.universal() && s.nullable()) || (r.nullable() && s.universal()) || (r.universal() && s.universal()));
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						if(r.nullable()) return Or(Dot(r.deriv(b), s), s.deriv(b));
						else return Dot(r.deriv(b), s);
				};
				this.nderiv = function(l) {
						if(r.nullable()) return Or(Dot(r.nderiv(l), s), s.nderiv(l));
						else return Dot(r.nderiv(l), s);
				};
				this.pderiv = function(l) {
						if(r.nullable()) return Or(Dot(r.pderiv(l), s), s.pderiv(l));
						else return Dot(r.pderiv(l), s);

				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return __RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return __RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return (r.toString() + "·" + s.toString());
				};
		}

		return SELF;
})();
