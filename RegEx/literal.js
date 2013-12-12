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

// TODO revisit, rework, check implementation 

//TODO, normalization
//TODO, check uses of new

__RegEx.Literal = (function() {

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

		//////////////////////////////////////////////////
		// Advanced Regular Expressions
		//
		// Literal           l   = a | A | ^A (| ? | [digit] | [char] | [lchar] | [uchar] | [alpha])
		// Expression        r,s = Ø | ϵ | l | r* | r+s | r&s | !r | r·s 
		//////////////////////////////////////////////////

		// literal cache
		var cache = __RegEx.Cache.Literals;

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
						return cache.c(new Atom (a));
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
						return (a == b) ? __RegEx.Expression.Empty() : __RegEx.Expression.Null();
				};
				this.nderiv = function(l) {
						return (l == this) ? __RegEx.Expression.Empty() : __RegEx.Expression.Null();
				};
				this.pderiv = function(l) {

						//	if(larg==this) return new __RegEx.Expression.Empty(); 
						//	 else if (larg==new __RegEx.Expression.Empty()) return this;
						//	 else if (larg==new Wildcard()) return new __RegEx.Expression.Empty();
						//	 else return new __RegEx.Expression.Null();

						// TODO: chech for character set
						return (l == this) ? new __RegEx.Expression.Empty() : new __RegEx.Expression.Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return _RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return _RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return a.toString();
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
						return cache.c(new Set (A));
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
						var result = __RegEx.Expression.Null();
						A.foreach(function(i, a) {
								result = (a == b) ? __RegEx.Expression.Empty() : result;
						});
						return result;
				};
				this.nderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = __RegEx.Expression.Empty();
								l.foreach(function(i, a) {
										result = (result instanceof Null) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								return __RegEx.Expression.Null(); // TODO, check
						} else if(l instanceof Wildcard) {
								return __RegEx.Expression.Null();
						}
				};
				this.pderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = __RegEx.Expression.Null();
								l.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								var result = __RegEx.Expression.Null();
								A.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : l.deriv(a);
								});
								return result;
						} else if(l instanceof Wildcard) {
								return __RegEx.Expression.Empty();
						}
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return _RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return _RegEx.Containment.solve(this, sup);
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
								str += v.toString();
						});
						return "[" + str + "]";
				};
		}

		// TODO, implement invertet set as negated set 

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
						return cache.c(new Inv (A));
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
						var result = __RegEx.Expression.Empty();
						A.foreach(function(i, a) {
								result = (a == b) ? __RegEx.Expression.Null() : result;
						});
						return result;
				};
				this.nderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = __RegEx.Expression.Empty();
								l.foreach(function(i, a) {
										result = (result instanceof Null) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								return l.contains(A);
						} else if(l instanceof Wildcard) {
								return __RegEx.Expression.Null(); // TODO
						}
				};
				this.pderiv = function(l) {
						if(l instanceof Atom) {
								return this.deriv(l);
						} else if(l instanceof Set) {
								var result = __RegEx.Expression.Null();
								l.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : this.deriv(a);
								});
								return result;
						} else if(l instanceof Inv) {
								var result = __RegEx.Expression.Null();
								A.foreach(function(i, a) {
										result = (result instanceof Empty) ? result : (l.contains(a) ? __RegEx.Expression.Null() : __RegEx.Expression.Empty());
								});
								return result;
						} else if(l instanceof Wildcard) {
								return __RegEx.Expression.Null();
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
						return cache.c(new Wildcard ());
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
						return __RegEx.Expression.Empty();
				};
				this.nderiv = function(l) {
						return __RegEx.Expression.Null();
				};
				this.pderiv = function(l) {
						return __RegEx.Expression.Empty();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (sub) {
						// sub <= this
						return _RegEx.Containment.solve(sub, this);
				};
				this.isSubSetOf = function (sup) {
						// sub <= this
						return _RegEx.Containment.solve(this, sup);
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return "?";
				};
		}

		//   _____ _                          _                   _                         
		//  / ____| |                        | |                 | |                        
		// | |    | |__   __ _ _ __ __ _  ___| |_ ___ _ __    ___| | __ _ ___ ___  ___  ___ 
		// | |    | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__|  / __| |/ _` / __/ __|/ _ \/ __|
		// | |____| | | | (_| | | | (_| | (__| ||  __/ |    | (__| | (_| \__ \__ \  __/\__ \
		//  \_____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|     \___|_|\__,_|___/___/\___||___/


		var digit = Array(0,1,2,3,4,5,6,7,8,9);
		var lchar = Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		var uchar = Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		var char = lchar.concat(uchar);
		var alpha = char.concat(digit);

		//  _____  _       _ _   
		// |  __ \(_)     (_) |  
		// | |  | |_  __ _ _| |_ 
		// | |  | | |/ _` | | __|
		// | |__| | | (_| | | |_ 
		// |_____/|_|\__, |_|\__|
		//            __/ |      
		//           |___/       

		function Digit() {
				if(!(this instanceof Digit)) {
						return cache.c(new Digit ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[digit]";
				};
		}
		Digit.prototype = new Set(digit);

		//   _____ _                
		//  / ____| |               
		// | |    | |__   __ _ _ __ 
		// | |    | '_ \ / _` | '__|
		// | |____| | | | (_| | |   
		//  \_____|_| |_|\__,_|_|   

		function Char() {
				if(!(this instanceof Char)) {
						return cache.c(new Char ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[char]";
				};

		}
		Char.prototype = new Set(char);

		//  _                               _____ _                
		// | |                             / ____| |               
		// | |     _____      _____ _ __  | |    | |__   __ _ _ __ 
		// | |    / _ \ \ /\ / / _ \ '__| | |    | '_ \ / _` | '__|
		// | |___| (_) \ V  V /  __/ |    | |____| | | | (_| | |   
		// |______\___/ \_/\_/ \___|_|     \_____|_| |_|\__,_|_|   

		function LowerChar() {
				if(!(this instanceof LowerChar)) {
						return cache.c(new LowerChar ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[lchar]";
				};

		}
		LowerChar.prototype = new Set(lchar);

		//  _    _                          _____ _                
		// | |  | |                        / ____| |               
		// | |  | |_ __  _ __   ___ _ __  | |    | |__   __ _ _ __ 
		// | |  | | '_ \| '_ \ / _ \ '__| | |    | '_ \ / _` | '__|
		// | |__| | |_) | |_) |  __/ |    | |____| | | | (_| | |   
		//  \____/| .__/| .__/ \___|_|     \_____|_| |_|\__,_|_|   
		//        | |   | |                                        
		//        |_|   |_|                                        

		function UpperChar() {
				if(!(this instanceof UpperChar)) {
						return cache.c(new UpperChar ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[uchar]";
				};

		}
		UpperChar.prototype = new Set(uchar);

		//           _       _           
		//     /\   | |     | |          
		//    /  \  | |_ __ | |__   __ _ 
		//   / /\ \ | | '_ \| '_ \ / _` |
		//  / ____ \| | |_) | | | | (_| |
		// /_/    \_\_| .__/|_| |_|\__,_|
		//            | |                
		//            |_|                

		function Alpha() {
				if(!(this instanceof Alpha)) {
						return cache.c(new Alpha ());
				}
				//////////////////////////////////////////////////
				this.toString = function () {
						return "[alpha]";
				};
		}
		Alpha.prototype = new Set(alpha);


// TODO, append und co an sets hängen .. ? mit flighweigth function


		// TODO
		// make test
		function union(e, f) {
				if(e instanceof Blank) {
						return Blank();
				} else if(e instanceof Atom) {
						if(f instanceof Blank) return Blank();
						if(f instanceof Atom) return (e==f) ? e : Blank();
						else if(f instanceof Set) return f.contains(e) ? e : Blank();
						else if(f instanceof Inv) return f.contains(e) ? e : Blank();
						else if(f instanceof Wildcard) return e;
				} else if(e instanceof Set) {
						if(f instanceof Blank) return Blank();
						if(f instanceof Atom) return e.contains(f) ? f : Blank();
						else if(f instanceof Set) {
								var result = Array();
								e.foreach(function(i, a) {
										if(f.contains(a)) reuslt.push(a);
								});
								return Set(result);
						}
						else if(f instanceof Inv) {
								var result = Array();
								e.foreach(function(i, a) {
										if(!(f.contains(a))) reuslt.push(a);
								});
								return Set(result);
						}
						else if(f instanceof Wildcard) return e;
				} else if(e instanceof Inv) {
						if(f instanceof Blank) return Blank();
						if(f instanceof Atom) return e.contains(f) ? f : Blank();
						else if(f instanceof Set) {
							var result = Array();
								f.foreach(function(i, a) {
										if(!(e.contains(a))) reuslt.push(a);
								});
								return Set(result);
						}
						else if(f instanceof Inv) {
								var result = e.array().concat(f.array());
								return Inv(reulst);
						}
						else if(f instanceof Wildcard) return e;
				} else if(e instanceof Wildcard) {
						return f;
				}
		}



		// TODO
		// make test
		function invert(l) {
				if(l instanceof Inv) return Set(l.array());
				else if(l instanceof Set) return Inv(l.array());
				else if(l instanceof Atom) return Inv(l);
				else if(l instanceof Wildcard) return Set();
		}

			// TODO
		// make test
		function subset(e, f) {
				if(e instanceof Blank) {
						return true;
				} else if(e instanceof Atom) {
						if(f instanceof Blank) return false;
						if(f instanceof Atom) return (e==f) ? true : false;
						else if(f instanceof Set) return f.contains(e);
						else if(f instanceof Inv) return !(f.contains(e));
						else if(f instanceof Wildcard) return true;
				} else if(e instanceof Set) {
						if(f instanceof Blank) return false; // TODOm check if set is emnpot
						if(f instanceof Atom) {
								// TODO, check if e is a set with only one element
						}
						else if(f instanceof Set) {
							// check sets
						}
						else if(f instanceof Inv) {
							// check sets
						}
						else if(f instanceof Wildcard) return true;
				} else if(e instanceof Inv) {
						if(f instanceof Blank) return false; // TODO, roght
						if(f instanceof Atom) {
								// TODO, check if e is a set with only one element
						}
						else if(f instanceof Set) {
							// check sets
						}
						else if(f instanceof Inv) {
							// check sets
						}
						else if(f instanceof Wildcard) return true;

				} else if(e instanceof Wildcard) {
						return f;
				}

		}










		return SELF;
})();
