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

		//////////////////////////////////////////////////
		// Advanced Regular Expressions
		//
		// Literal           l   = a | A | ^A (| ?)
		// Expression        r,s = Ø | ϵ | l | r* | r+s | r&s | !r | r·s 
		//////////////////////////////////////////////////
/*
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
*/

		//////////////////////////////////////////////////
		// Advanced Regular Expressions
		//
		// Literal           l   = a | A | ^A (| ?)
		// Expression        r,s = Ø | ϵ | l | r* | r+s | r&s | !r | r·s 
		//////////////////////////////////////////////////

			// current path cache
		var __cache = new __ContractCache();


		//          _                  
		//     /\  | |                 
		//    /  \ | |_ ___  _ __ ___  
		//   / /\ \| __/ _ \| '_ ` _ \ 
		//  / ____ \ || (_) | | | | | |
		// /_/    \_\__\___/|_| |_| |_|

		/**
		 * Atom (a,b,c,...)
		 */
		function Atom(a) {			
				if(!(this instanceof Atom)) {
						return __cache.c(new Atom (a));
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return false;
				};
				this.first = function() {
						return Array(this);
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
						return (a == b) ? Empty() : Null();
				};
				this.nderiv = function(l) {
						return (l == this) ? Empty() : Null();
				};
				this.pderiv = function(l) {

						//	if(larg==this) return new Empty(); 
						//	 else if (larg==new Empty()) return this;
						//	 else if (larg==new Wildcard()) return new Empty();
						//	 else return new Null();

						// TODO: chech for character set
						return (l == this) ? new Empty() : new Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (sup, ctx) {
						return r.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return a;
				};
		}

		//  _____ _                          _               _____      _   
		//  / ____| |                        | |             / ____|    | |  
		// | |    | |__   __ _ _ __ __ _  ___| |_ ___ _ __  | (___   ___| |_ 
		// | |    | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__|  \___ \ / _ \ __|
		// | |____| | | | (_| | | | (_| | (__| ||  __/ |     ____) |  __/ |_ 
		//  \_____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|    |_____/ \___|\__|

		/**
		 * Set (A,B,C,...)
		 */
		function Set(A) {
				if(!(this instanceof Set)) {
						return __cache.c(new Set (A));
				}
				if(A instanceof Array) {
						A.foreach(function(i, a) {
								A[i] = (a instanceof Atom) ? a : Atom(a);
						});
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return false;
				};
				this.first = function() {
						return Array(this);
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
						var result = Null();
						A.foreach(function(i, a) {
								result = (a == b) ? Empty() : result;
						});
						return result;
				};
				this.nderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = Empty();
								l.foreach(function(i, a) {
										result = (result instanceof Null) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								return Null(); // TODO, check
						} else if(l instanceof Wildcard) {
								return Null();
						}
				};
				this.pderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = Null();
								l.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								var result = Null();
								A.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : l.deriv(a);
								});
								return result;
						} else if(l instanceof Wildcard) {
								return Empty();
						}
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};
				this.isSubSetOf = function (sup, ctx) {
						return r.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
				};
				//////////////////////////////////////////////////
				this.foreach = function(callback) {
						A.foreach(callback);
				};
				this.contains = function (a) {
						var contains = false;
						if(a instanceof Atom) {
								A.foreach(function(i,b) {
										contains = (a==b) ? true : contains;
								});
						}
						else if (a instanceof Array) {
								a.foreach(function(i,b) {
										contains = (thia.contains(b)) ? true : contains;
								});
						}
						return contains;
				};
				this.toString = function () {
						var str = "";
						A.foreach(function(i,v) {
								str += v;
						});
						return "[" + str + "]";
				};
		}

		//  _____                     _           _    _____      _   
		// |_   _|                   | |         | |  / ____|    | |  
		//   | |  _ ____   _____ _ __| |_ ___  __| | | (___   ___| |_ 
		//   | | | '_ \ \ / / _ \ '__| __/ _ \/ _` |  \___ \ / _ \ __|
		//  _| |_| | | \ V /  __/ |  | ||  __/ (_| |  ____) |  __/ |_ 
		// |_____|_| |_|\_/ \___|_|   \__\___|\__,_| |_____/ \___|\__|

		/**
		 * Inv (^A,^B,^C,...)
		 */
		function Inv(A) {			
				if(!(this instanceof Inv)) {
						return __cache.c(new Inv (A));
				}
				if(A instanceof Array) {
						A.foreach(function(i, a) {
								A[i] = (a instanceof Atom) ? a : Atom(a);
						});
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return false;
				};
				this.first = function() {
						return Array(this);
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return (A.empty()) ? true : false;
				};
				this.indifferent = function() {
						return (A.empty()) ? true : false;
				};
				this.universal = function() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						var result = Empty();
						A.foreach(function(i, a) {
								result = (a == b) ? Null() : result;
						});
						return result;
				};
				this.nderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = Empty();
								l.foreach(function(i, a) {
										result = (result instanceof Null) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								return l.contains(A);
						} else if(l instanceof Wildcard) {
								return Null(); // TODO
						}
				};
				this.pderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = Null();
								l.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								var result = Null();
								A.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : (l.contains(a) ? Null() : Empty());
								});
								return result;
						} else if(l instanceof Wildcard) {
								return Null();
						}
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						// TODO
						return false;
				};

				this.isSubSetOf = function (sup, ctx) {
						return r.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
				};
				//////////////////////////////////////////////////
				this.foreach = function(callback) {
						A.foreach(callback);
				};
				this.contains = function (a) {
						var contains = false;
						if(a instanceof Atom) {
								A.foreach(function(i,b) {
										contains = (a==b) ? true : contains;
								});
						}
						else if (a instanceof Array) {
								a.foreach(function(i,b) {
										contains = (thia.contains(b)) ? true : contains;
								});
						}
						return contains;
				};
				this.toString = function () {
						var str = "";
						A.foreach(function(i,v) {
								str += v;
						});
						return "[" + str + "]";
				};
		}


		// __          ___ _     _                   _ 
		// \ \        / (_) |   | |                 | |
		//  \ \  /\  / / _| | __| | ___ __ _ _ __ __| |
		//   \ \/  \/ / | | |/ _` |/ __/ _` | '__/ _` |
		//    \  /\  /  | | | (_| | (_| (_| | | | (_| |
		//     \/  \/   |_|_|\__,_|\___\__,_|_|  \__,_|

		/**
		 * QMArk (?)
		 */
		function Wildcard() {			
				if(!(this instanceof Wildcard)) {
						return __cache.c(new Wildcard ());
				}
				//////////////////////////////////////////////////
				this.nullable = function() {
						return false;
				};
				this.first = function() {
						return Array(this);
				};
				//////////////////////////////////////////////////
				this.empty = function() {
						return false;
				};
				this.indifferent = function() {
						return true;
				};
				this.universal = function() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv = function(b) {
						return Empty();
				};
				this.nderiv = function(l) {
						return Null();
				};
				this.pderiv = function(l) {
						return Empty();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;
						/** C <= C' |= false  | m(C) and !m(C') */
						else if(arg.isUniversal()) return false;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (sup, ctx) {
						return r.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return "?";
				};
		}



		var digit = Array(0,1,2,3,4,5,6,7,8,9);
		var lchar = Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		var uchar = Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		var char = lchar.concat(uchar);
		var alpha = char.concat(digit);

		function Digit() {
				if(!(this instanceof Digit)) {
						return __cache.c(new Digit ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[digit]";
				};
		}
		Digit.prototype = new Set(digit);

		function Char() {
				if(!(this instanceof Char)) {
						return __cache.c(new Char ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[char]";
				};

		}
		Char.prototype = new Set(char);

		function LowerChar() {
				if(!(this instanceof LowerChar)) {
						return __cache.c(new LowerChar ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[lchar]";
				};

		}
		LowerChar.prototype = new Set(lchar);

		function UpperChar() {
				if(!(this instanceof UpperChar)) {
						return __cache.c(new UpperChar ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[uchar]";
				};

		}
		UpperChar.prototype = new Set(uchar);

		function Alpha() {
				if(!(this instanceof Alpha)) {
						return __cache.c(new Alpha ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[alpha]";
				};
		}
		Alpha.prototype = new Set(alpha);

		//////////////////////////////////////////////////
		// REGEX . AREG
		//////////////////////////////////////////////////

				// regular expressions
/*		var Empty	= __RegEx.Expression.Empty;
		var Null	= __RegEx.Expression.Null;
		var Star	= __RegEx.Expression.Star;
		var Or		= __RegEx.Expression.Or;
		var And		= __RegEx.Expression.And;
		var Neg		= __RegEx.Expression.Neg;
		var Dot		= __RegEx.Expression.Dot;
*/

		SELF = new Object();


		SELF.Atom		= Atom;
		SELF.Set		= Set;
		SELF.Inv		= Inv;

		SELF.Digit		= Digit;
		SELF.Char		= Char;
		SELF.LowerChar	= LowerChar;
		SELF.UpperChar	= UpperChar;
		SELF.Alpha		= Alpha;
		SELF.Wildcard	= Wildcard;

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
						return __cache.c(new Null ());
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
						return __cache.c(new Empty ());
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
						return __cache.c(new Star (r));
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
						return __cache.c(new Or (r,s));
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
						return __cache.c(new And (r,s));
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
				if(!(this instanceof Neg)) {
						return __cache.c(new Neg (r));
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
						return __cache.c(new Dot (r, s));
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






/// 
// TODO
// split


		//////////////////////////////////////////////////
		// REGEX . AREG
		//////////////////////////////////////////////////

		


		SELF.Null		= Null;
		SELF.Empty		= Empty;
		SELF.Star		= Star;
		SELF.Or			= Or;
		SELF.And		= And;
		SELF.Dot		= Dot;




		//////////////////////////////////////////////////
		//  CONTAINMENT CALCULUS
		//  context and expressions
		//////////////////////////////////////////////////


		/** UNFOLD
		 * @param
		 * E >= F ::= nderive_{c \in firstc(E)} (E>=F)
		 * {e>=f | e \in nderive_{c}(E), e \in nderive_{c}(F)}
		 * @param E super-contract
		 * @param F sub-contract
		 * @param first set of first literals
		 * @param ctx containment context 
		 * @return true|false
		 */
		function unfold(E, F, first, ctx) {

				// verbose - true, print output: false, do not print the output
				var verbose  = false || APC.RegEx.config.verbose;
				if(verbose) __sysout("\n\n\n##################################################");
				if(verbose) __sysout("## isSuperSetOf: " + E + ">=" + F);

				var result = true;

				first.foreach(function(k, literal) {
						var nderive_E = E.nderive(literal);
						var nderive_F = F.nderive(literal);

						if(verbose) __sysout("## first: " + first);
						if(verbose) __sysout("## literal: " + literal);
						if(verbose) __sysout("## nderive_E: " + nderive_E);
						if(verbose) __sysout("## nderive_F: " + nderive_F);

						result = result && nderive_E.isSuperSetOf(nderive_F, ctx);

						if(verbose) __sysout("## result: " + result);

						if(!result) return result; // break
				});
				return result;
		}



		/** Containment Calculus
		 * Expression: C0 <= C1
		 */
		function Exp(r, s) {
				return {
						/** To String
						 * @return string
						 */
						toString: function() {
								return r.toString() + "<=" + s.toString();
						}
				}
		}

		/** Containment Calculus
		 * Context: {} | <Context, Expression>
		 */
		function Ctx() {	
				// cache array
				var context = new StringMap();

				var key = function(v) {
						return ("\"" + v + "\"");		
				}

				return {

						/* bind function
						 * @param CC Expression
						 * @return <CC Context, CC Expression>
						 */
						bind: function(ccExp) {
								// clone context
								var newCtx = new Ctx();
								context.foreach(function(k, v) {
										newCtx.put(v);
								});
								// bind new CC Expression
								if(!newCtx.contains(ccExp)) {
										newCtx.put(ccExp);
								}
								return newCtx;
						},

								/* put
								 * @param ccExp CC Expression
								 * $return CC Expression
								 */
								put: function(ccExp) {
										context.set(ccExp.toString(), ccExp);
										return ccExp;
								},

								/* get
								 * @param ccExp CC Expression
								 * $return CC Expression
								 */
								get: function(ccExp) {
										return context.get(ccExp.toString());
								},

								/* contains
								 * @param ccExp CC Expression
								 * $return true, if ccExp in cache, false otherwise
								 */
								contains: function(ccExp) {
										return context.has(ccExp.toString());
								}
				}
		};



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
//		RegEx.Contract.Containment = {};
//		RegEx.Contract.Containment.Expression = Exp;
//		RegEx.Contract.Containment.Context = Ctx;





		//////////////////////////////////////////////////
		//  REGEX CACHE
		//  cache for regular expressions
		//////////////////////////////////////////////////

		/** Contract Cache 
		*/
		function __ContractCache() {
				// cache array
				var cache = new StringMap();
				var reduced = new Array();

				return {

						/* cache function
						 * @param contract access permission contract
						 * @return access permission contract
						 */
						c: function(contract) {

								return contract;

								var key = contract.toString();
								var value = contract;

								if(this.contains(key)) {
										return this.get(key);
								} else {
										if(!reduced[key]) {
												reduced[contract.toString()]=true;
												contract = contract.reduce();
												return this.c(contract);
										} else 
												return this.put(key, value);
								}
						},

								/* put
								 * @param key cache key
								 * @param value cahe value
								 * $return value
								 */
								put: function(key, value) {
										cache.set(key, value);
										return value;
								},

								/* get
								 * @param key cache key
								 * $return value
								 */
								get: function(key) {
										return cache.get(key);
								},

								/* contains
								 * @param key cache key
								 * $return true, if key in cache, false otherwise
								 */
								contains: function(key) {
										return cache.has(key);
								},

								/* clear cache
								*/
								clear: function() {
										cache = new StringMap();
								}
				}
		}

		// current path cache
		var __cache = new __ContractCache();


		return SELF;

})(__APC);

