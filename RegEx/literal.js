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

__RegEx.Literal = (function() {

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
		var Empty	= __RegEx.Expression.Empty;
		var Null	= __RegEx.Expression.Null;
		var Star	= __RegEx.Expression.Star;
		var Or		= __RegEx.Expression.Or;
		var And		= __RegEx.Expression.And;
		var Neg		= __RegEx.Expression.Neg;
		var Dot		= __RegEx.Expression.Dot;



		this.Atom		= Atom;
		this.Set		= Set;
		this.Inv		= Inv;

		this.Digit		= Digit;
		this.Char		= Char;
		this.LowerChar	= LowerChar;
		this.UpperChar	= UpperChar;
		this.Alpha		= Alpha;
		this.Wildcard	= Wildcard;

		//////////////////////////////////////////////////
		//  LITERAL CACHE
		//  cache for regular expressions literals
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

								// TODO, enable chache
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

	
})();
