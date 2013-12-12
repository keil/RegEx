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
				this.isSuperSetOf = function (sub, ctx) {
						return(arg==this) ? true : false;



						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (sup, ctx) {
						return true;
				};

				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//						return this;
				//				};
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
				this.isSuperSetOf = function (sub, ctx) {
						//						/** C <= C' |= true  | C=C' */
						//						if(arg==this) return true;
						//						/** C <= C' |= true  | n(C) */
						//						else if (arg.isEmpty()) return true;
						//						/** C <= C' |= true  | w(C) */
						//						else if(arg.isBlank()) return true;

						//						/** C <= C' |= true  | ctx(C <= C') */
						//						ccExp = new Exp(arg, this);
						//						if(ctx.contains(ccExp)) return true;
						//						/** otherwise */
						//						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));




						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));



				};

				this.isSubSetOf = function (sup, ctx) {
						return (sub.isNullable()) ? true : false;
				};

				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//						return this;
				//				};
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
				// TODO
				// NORMALIZATION
				if(r instanceof Empty) return Empty();
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
						return Dot(r.derive(b), this);
				};
				this.nderiv = function(l) {
						return Dot(r.nderive(l),this);
				};
				this.pderiv = function(l) {
						return Dot(r.pderive(l),this);
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						/** C <= C' |= true  | C=C' */
						//						if(arg==this) return true;
						//						/** ^ <= C' |= true  | v(C') */
						//						else if((arg==new Empty())) return true;
						//						/** C <= C' |= true  | n(C) */
						//						else if(arg.isEmpty()) return true;
						//						/** C <= C' |= true  | w(C) & !n(C') */
						//						else if(arg.isBlank()) return true;
						//						/** C <= C' |= true  | m(C') */
						//						else if(this.isUniversal()) return true;
						//
						//						/** C <= C' |= true  | ctx(C <= C') */
						//						ccExp = new Exp(arg, this);
						//						if(ctx.contains(ccExp)) return true;
						//						/** otherwise */
						//						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));


						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));



				};

				this.isSubSetOf = function (sup, ctx) {
						return sup.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//
				//						// TODO
				//						/** C* ~ ^ | n(C) */
				//						if(contract.isEmpty()) return new Empty();
				//						/** C* ~ ^ | w(C) */
				//						else if(contract.isBlank()) return new Empty();
				//						/** reduce C* ::= (reduce C)* */
				//						else return new Star(contract.reduce());
				//
				//						return this;
				//				};
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

				// TODO
				// NORMALIZATION
				/** (C+C) ~ C */
				//				if(r==s) return r;
				/** ({}+C) ~ C */
				//				else if(r==new Null()) return s;
				//				else if(s==new Null()) return r;
				/** (@+C) ~ C */
				//				else if(r==new __AtLiteral()) return s;
				//				else if(s==new __AtLiteral()) return r;

				if(!(this instanceof Or)) {
						return cache.c(new Or (r,s));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return (r.nullable() || s.nullable());
				};
				this.first = function() {
						return r.first().concat(s.first());
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
						return new Or(r.derive(b), s.derive(b));
				};
				this.nderiv = function(l) {
						return new Or(r.nderive(l), s.nderive(l))
				};
				this.pderiv = function(l) {
						return new Or(r.pderive(l), s.pderive(l))

				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						//						/** C <= C' |= true  | C=C' */
						//						if(arg==this) return true;
						//						/** ^ <= C' |= true  | v(C') */
						//						else if((arg==new Empty()) && this.isNullable()) return true;
						//						/** C <= C' |= false  | v(C) and ~v(C') */
						//						else if(arg.isNullable() && !this.isNullable()) return false;
						//						/** C <= C' |= true  | n(C) */
						//						else if(arg.isEmpty()) return true;
						//						/** C <= C' |= true  | w(C) & !n(C') */
						//						else if(arg.isBlank()) return true;
						//						/** C <= C' |= true  | m(C') */
						//						else if(this.isUniversal()) return true;

						//						/** C <= C' |= true  | ctx(C <= C') */
						//						ccExp = new Exp(arg, this);
						//						if(ctx.contains(ccExp)) return true;
						//						/** otherwise */
						//						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));



						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));



				};

				this.isSubSetOf = function (sup, ctx) {
						return sup.isSuperSetOf(this, ctx);

				};

				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//
				//						/** (C+C') ~ {} | n(C)&n(C') */
				//						if(r.isEmpty()&&s.isEmpty()) return new Null();
				//						/** (C+C') ~ {} | w(C)&w(C') */
				//						else if(r.isBlank()&&s.isBlank()) return new __AtLiteral();
				//						/** (C+C') ~ C/C' | n(C)/n(C') */
				//						else if(r.isEmpty()) return s.reduce();
				//						else if(s.isEmpty()) return r.reduce();
				//						/** (C+C') ~ C/C' | w(C)/w(C') */
				//						else if(r.isBlank()) return s.reduce();
				//						else if(s.isBlank()) return r.reduce();
				//						/** (C+C') ~ C | C >= C' */
				//						else if(r.isSuperSetOf(s, new Ctx())) return r.reduce();
				//						/** (C+C') ~ C' | C <= C' */
				//						else if(s.isSuperSetOf(r, new Ctx())) return s.reduce();
				//						/** reduce C+C' ::= (reduce C)+(reduce C') */
				//						else return new Or(r.reduce(), s.reduce());
				//
				//						return this;
				//				};
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
				// TODO
				// NORMALIZATION
				//				/** (C&C) ~ C */
				//				if(r==s) return r;
				//				/** ({}&C) ~ {} */
				//				else if(r==new Null()) return new Null();
				//				else if(s==new Null()) return new Null();
				//				/** (@&C) ~ @ */
				//				else if(r==new __AtLiteral()) return new __AtLiteral();
				//				else if(s==new __AtLiteral()) return new __AtLiteral();



				if(!(this instanceof And)) {
						return cache.c(new And (r,s));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return (r.nullable() && s.nullable());
				};
				this.first = function() {
						// TODO
						return r.first().concat(s.first());
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
						return And(r.derive(name), s.derive(name));
				};
				this.nderiv = function(l) {
						return And(r.nderive(l), s.nderive(l));
				};
				this.pderiv = function(l) {
						return And(r.pderive(l), s.pderive(l))
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						//						/** C <= C' |= true  | C=C' */
						//						if(arg==this) return true;
						//						/** ^ <= C' |= true  | v(C') */
						//						else if((arg==new Empty()) && this.isNullable()) return true;
						//						/** C <= C' |= false  | v(C) and ~v(C') */
						//						else if(arg.isNullable() && !this.isNullable()) return false;
						//						/** C <= C' |= true  | n(C) */
						//						else if (arg.isEmpty()) return true;
						//						/** C <= C' |= true  | w(C) & !n(C') */
						//						else if(arg.isBlank()) return true;
						//						/** C <= C' |= true  | m(C') */
						//						else if(this.isUniversal()) return true;
						//
						//						/** C <= C' |= true  | ctx(C <= C') */
						//						ccExp = new Exp(arg, this);
						//						if(ctx.contains(ccExp)) return true;
						//						/** otherwise */
						//						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));


						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));


				};

				this.isSubSetOf = function (sup, ctx) {
						return sup.isSuperSetOf(this, ctx);
				};

				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//						/** (C&C') ~ C/C' | n(C)/n(C') */
				//						if(r.isEmpty()) return new Null();
				//						else if(s.isEmpty()) return new Null();
				//						/** (C&C') ~ C/C' | w(C)/w(C') */
				//						else if(r.isBlank()) return new __AtLiteral();
				//						else if(s.isBlank()) return new __AtLiteral();
				//						/** (C&C') ~ C' | C >= C' */
				//						else if(r.isSubSetOf(s, new Ctx())) return r.reduce();
				//						/** (C&C') ~ C | C <= C' */
				//						else if(s.isSubSetOf(r, new Ctx())) return s.reduce();
				//						/** reduce C&C' ::= (reduce C)&(reduce C') */
				//						else return new And(r.reduce(), s.reduce());
				//
				//						return this;
				//				};
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
				if(!(this instanceof Neg)) {
						return cache.c(new Neg (r));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return r.nullable() ? false : true;;
				};
				this.first = function() {
						// TODO
						return r.first();
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						// TODO
						return r.universal() ? true : false;
				};
				this.indifferent = function() {
						// TODO
						return (r.empty() || r.nullable()) ? true : false;
				};
				this.universal = function() {
						// TODO
						return r.universal() ? true : false;;
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return new Neg(contract.derive(b));
				};
				this.nderiv = function(l) {
						return new Neg(contract.pderive(l));
				};
				this.pderiv = function(l) {
						return new Neg(contract.nderive(l));
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						//						/** C <= C' |= true  | C=C' */
						//						if(arg==this) return true;
						//						/** ^ <= C' |= true  | v(C') */
						//						else if((arg==new Empty()) && this.isNullable()) return true;
						//						/** C <= C' |= false  | v(C) and ~v(C') */
						//						else if(arg.isNullable() && !this.isNullable()) return false;
						//						/** C <= C' |= true  | n(C) */
						//						else if(arg.isEmpty()) return true;
						//						/** C <= C' |= true  | w(C) & !n(C') */
						//						else if(arg.isBlank()) return true;
						//						/** C <= C' |= true  | m(C') */
						//						else if(this.isUniversal()) return true;
						//						/** C <= C' |= false  | m(C) and !m(C') */
						//
						//						/** C <= C' |= true  | ctx(C <= C') */
						//						var ccExp = new Exp(arg, this);
						//						if(ctx.contains(ccExp)) return true;
						//						/** otherwise */
						//						//else return unfold(this, arg, contract.first(), ctx.bind(ccExp)) && unfold(this, arg, arg.first(), ctx.bind(ccExp));
						//						// TODO
						//						else return /*unfold(this, arg, contract.first(), ctx.bind(ccExp)) &&*/ unfold(this, arg, arg.first(), ctx.bind(ccExp));
						//
						//
						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));
				};

				this.isSubSetOf = function (sup, ctx) {
						return sup.isSuperSetOf(this, ctx);

				};

				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//
				//						if(contract.isUniversal()) return new __AtLiteral();
				//						/** SPECIAL: !(C) ~ @ | m(C) */
				//						//	   else if(contract.isIndifferent()) return  new __AtLiteral();
				//						/** SPECIAL: !(^) ~ ? | m(C) */
				//						else if(contract==new Empty()) return new Wildcard();
				//						/** reduce !(C) ::= !(reduce C) */
				//						else return new Neg(contract.reduce());
				//
				//						return this;
				//				};
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

				// TODO
				// NORMALIZATION
				/** (^.C) ~ C */
				//if(r == Empty()) return s;
				/** ({}.C) ~ C */
				//if(r == Null()) return Null();
				/** (@.C) ~ C */
				//if(r == new __AtLiteral()) return new __AtLiteral();


				if(!(this instanceof Dot)) {
						return cache.c(new Dot (r, s));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return (r.nullable() && s.nullable());	
				};
				this.first = function() {
						return (r.nullable() ? r.first().concat(r.first()) : r.first());
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
						if(r.isNullable()) return new Or(Dot(r.derive(name), s), s.derive(b));
						else return new Dot(r.derive(name), s);
				};
				this.nderiv = function(l) {
						if(r.isNullable()) return new Or(new Dot(r.nderive(l), s), s.nderive(l));
						else return new Dot(r.nderive(l), s);
				};
				this.pderiv = function(l) {
						if(r.isNullable()) return new Or(new Dot(r.pderive(l), s), s.pderive(l));
						else return new Dot(r.pderive(larg), s);

				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						//						/** C <= C' |= true  | C=C' */
						//						if(arg==this) return true;
						//						/** ^ <= C' |= true  | v(C') */
						//						else if((arg==new Empty()) && this.isNullable()) return true;
						//						/** C <= C' |= false  | v(C) and ~v(C') */
						//						else if(arg.isNullable() && !this.isNullable()) return false;
						//						/** C <= C' |= true  | n(C) */
						//						else if(arg.isEmpty()) return true;
						//						/** C <= C' |= true  | w(C) & !n(C') */
						//						else if(arg.isBlank()) return true;
						//						/** C <= C' |= true  | m(C') */
						//						else if(this.isUniversal()) return true;


						/** DISPROVE */
						// TODO

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));
				};
				this.isSubSetOf = function (sup, ctx) {
						return sup.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				//				this.reduce = function () {
				//						// TODO second null?
				//						return (r.Empty()) ? Null() : Dot(r.reduce(), c.reduce());
				//				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return (r.toString() + "·" + s.toString());
				};
		}













	return SELF;

})();

