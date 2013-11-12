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

(function(RegEx) {

		SELF = {};
		RegEx.AReg = SELF;

		//////////////////////////////////////////////////
		// Advanced Regular Expressions
		//
		// Literal           l   = a | A | ^A (| ?)
		// Expression        r,s = Ø | ϵ | l | r* | r+s | r&s | !r | r·s 
		//////////////////////////////////////////////////

		//          _                  
		//     /\  | |                 
		//    /  \ | |_ ___  _ __ ___  
		//   / /\ \| __/ _ \| '_ ` _ \ 
		//  / ____ \ || (_) | | | | | |
		// /_/    \_\__\___/|_| |_| |_|

		/**
		 * Atom (a,b,c,...)
		 */
		function __Atom(a) {			
				if(!(this instanceof __Atom)) {
						return __cache.c(new __Atom (a));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return false;
				};
				this.first() {
						return Array(this);
				};
				//////////////////////////////////////////////////
				this.empty() {
						return false;
				};
				this.indifferent:() {
						return false;
				};
				this.universal() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						return (a == b) ? new __Empty() : new __Null();
				};
				this.nderiv(l) {
						return (l == this) ? new __Empty() : new __Null();
				};
				this.pderiv(literal) {

						//	if(larg==this) return new __Empty(); 
						//	 else if (larg==new __Empty()) return this;
						//	 else if (larg==new __QMark()) return new __Empty();
						//	 else return new __Null();

						// TODO: chech for character set
						return (l == this) ? new __Empty() : new __Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {

						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
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
		function __Set(A) {			
				if(!(this instanceof __Set)) {
						return __cache.c(new __Set (A));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return false;
				};
				this.first() {
						return Array(this);
				};
				//////////////////////////////////////////////////
				this.empty() {
						return false;
				};
				this.indifferent:() {
						// TODO
						return false;
				};
				this.universal() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						// TODO
						//return (a == b) ? new __Empty() : new __Null();
				};
				this.nderiv(l) {
						// TODO
						//return (l == this) ? new __Empty() : new __Null();
				};
				this.pderiv(literal) {

						//	if(larg==this) return new __Empty(); 
						//	 else if (larg==new __Empty()) return this;
						//	 else if (larg==new __QMark()) return new __Empty();
						//	 else return new __Null();

						// TODO: chech for character set
						return (l == this) ? new __Empty() : new __Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {

						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
						return r.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						var str = "";
						A.foreach(function(i,v) {
								str += v;
						});
						return "[" + str + "]";
				};
		}

		//  _   _                  _           _    _____      _   
		// | \ | |                | |         | |  / ____|    | |  
		// |  \| | ___  __ _  __ _| |_ ___  __| | | (___   ___| |_ 
		// | . ` |/ _ \/ _` |/ _` | __/ _ \/ _` |  \___ \ / _ \ __|
		// | |\  |  __/ (_| | (_| | ||  __/ (_| |  ____) |  __/ |_ 
		// |_| \_|\___|\__, |\__,_|\__\___|\__,_| |_____/ \___|\__|
		//              __/ |                                      
		//             |___/                                       		

		/**
		 * NSet (^A,^B,^C,...)
		 */
		function __Set(A) {			
				if(!(this instanceof __Set)) {
						return __cache.c(new __Set (A));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						// TODO
						//return false;
				};
				this.first() {
						return Array(this);
				};
				//////////////////////////////////////////////////
				this.empty() {
						// TODO
						return false;
				};
				this.indifferent:() {
						// TODO
						return false;
				};
				this.universal() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						// TODO
						//return (a == b) ? new __Empty() : new __Null();
				};
				this.nderiv(l) {
						// TODO
						//return (l == this) ? new __Empty() : new __Null();
				};
				this.pderiv(literal) {

						//	if(larg==this) return new __Empty(); 
						//	 else if (larg==new __Empty()) return this;
						//	 else if (larg==new __QMark()) return new __Empty();
						//	 else return new __Null();

						// TODO: chech for character set
						return (l == this) ? new __Empty() : new __Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {

						// TODO
						return false;
				};

				this.isSubSetOf = function (r, ctx) {
						return r.isSuperSetOf(this, ctx);
				};
				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
				};
				//////////////////////////////////////////////////
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
		function __QMark() {			
				if(!(this instanceof __QMark)) {
						return __cache.c(new __QMark ());
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return false;
				};
				this.first() {
						return Array(this);
				};
				//////////////////////////////////////////////////
				this.empty() {
						return false;
				};
				this.indifferent:() {
						return true;
				};
				this.universal() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						// TODO
						return new __Empty();
				};
				this.nderiv(l) {
						// TODO
						return new __Empty();
				};
				this.pderiv(literal) {

						//	if(larg==this) return new __Empty(); 
						//	 else if (larg==new __Empty()) return this;
						//	 else if (larg==new __QMark()) return new __Empty();
						//	 else return new __Null();

						// TODO: chech for character set
						return new __Empty();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {

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
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
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

		//  _   _       _ _ 
		// | \ | |     | | |
		// |  \| |_   _| | |
		// | . ` | | | | | |
		// | |\  | |_| | | |
		// |_| \_|\__,_|_|_|

		/**
		 * Null (Ø)
		 */
		function __Null() {
				if(!(this instanceof __Null)) {
						return __cache.c(new __Null ());
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return false;
				};
				this.first() {
						return Array();
				};
				//////////////////////////////////////////////////
				this.empty() {
						return false;
				};
				this.indifferent:() {
						return false;
				};
				this.universal() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						return this;
				};
				this.nderiv(l) {
						return this;
				};
				this.pderiv(l) {
						return this;
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {

						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;

						/** otherwise */
						else return false;

				};

				this.isSubSetOf = function (r, ctx) {
						return true;
				};

				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
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
		function __Empty() {
				if(!(this instanceof __Empty)) {
						return __cache.c(new __Empty ());
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return true;
				};
				this.first() {
						return Array();
				};
				//////////////////////////////////////////////////
				this.empty() {
						return false;
				};
				this.indifferent:() {
						return false;
				};
				this.universal() {
						return false;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						return new __Null();
				};
				this.nderiv(l) {
						return new __Null();
				};
				this.pderiv(l) {
						return new __Null();
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {

						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) */
						else if(arg.isBlank()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
						/* CALLSTAT */ if(RegEx.Statistics.currentCallStatistics) RegEx.Statistics.currentCallStatistics.incSubSetOfStat();

						/** C <= C' |= true  | n(C') */
						if(arg.isNullable()) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else return false;

				};

				//////////////////////////////////////////////////
				this.reduce = function () {
						return this;
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
		function __Star(r) {

				// TODO
				// NORMALIZATION
				/** ^* ~ ^ */
				if(contract==new __Empty()) return new __Empty();
				/** ^* ~ ^ */
				else if(contract==new __Empty()) return new __Empty();
				/** @* ~ ^ */
				else if(contract==new __AtLiteral()) return new __Empty();


				if(!(this instanceof __Star)) {
						return __cache.c(new __Star (r));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return true;
				};
				this.first() {
						return r.first();
				};
				//////////////////////////////////////////////////
				this.empty() {
						return false;
				};
				this.indifferent:() {
						return r.indifferent();
				};
				this.universal() {
						return (r.indifferent() || r.universal());
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						// TODO
						return new __Dot(contract.derive(name), this);
				};
				this.nderiv(l) {
						// TODO
						/** (d_^ C*) ::= C* */
						if (larg==new __Empty()) return this;
						else return new __Dot(contract.nderive(larg), new __Star(contract));

				};
				this.pderiv(l) {
						// TODO
						/** (d_^ C*) ::= C* */
						if (larg==new __Empty()) return this;
						else return new __Dot(contract.pderive(larg), new __Star(contract));
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** ^ <= C' |= true  | v(C') */
						else if((arg==new __Empty())) return true;
						/** C <= C' |= true  | n(C) */
						else if(arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;
						/** C <= C' |= true  | m(C') */
						else if(this.isUniversal()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
						return arg.isSuperSetOf(this, ctx);
				};

				//////////////////////////////////////////////////
				this.reduce = function () {

						// TODO
						/** C* ~ ^ | n(C) */
						if(contract.isEmpty()) return new __Empty();
						/** C* ~ ^ | w(C) */
						else if(contract.isBlank()) return new __Empty();
						/** reduce C* ::= (reduce C)* */
						else return new __Star(contract.reduce());

						return this;
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
		function __Alt(r, s) {

				// TODO
				// NORMALIZATION
				/** (C+C) ~ C */
				if(contract0==contract1) return contract0;
				/** ({}+C) ~ C */
				else if(contract0==new __Null()) return contract1;
				else if(contract1==new __Null()) return contract0;
				/** (@+C) ~ C */
				else if(contract0==new __AtLiteral()) return contract1;
				else if(contract1==new __AtLiteral()) return contract0;

				if(!(this instanceof __Alt)) {
						return __cache.c(new __Alt (r,s));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return (r.nullable() || s.nullable());
				};
				this.first() {
						return r.first().concat(s.first());
				};
				//////////////////////////////////////////////////
				this.empty() {
						return (contract0.empty() && contract1.empty());
				};
				this.indifferent:() {
						return (contract0.indifferent() || contract1.indifferent());
				};
				this.universal() {
						return (contract0.universal() || contract1.universal());
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						return new __Alt(r.derive(name), s.derive(name));
				};
				this.nderiv(l) {
						// TODO
						return new __Alt(contract0.nderive(larg), contract1.nderive(larg))
				};
				this.pderiv(l) {
						// TODO
						return new __Alt(contract0.pderive(larg), contract1.pderive(larg))

				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** ^ <= C' |= true  | v(C') */
						else if((arg==new __Empty()) && this.isNullable()) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable() && !this.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if(arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;
						/** C <= C' |= true  | m(C') */
						else if(this.isUniversal()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
						return arg.isSuperSetOf(this, ctx);

				};

				//////////////////////////////////////////////////
				this.reduce = function () {

						/** (C+C') ~ {} | n(C)&n(C') */
						if(contract0.isEmpty()&&contract1.isEmpty()) return new __Null();
						/** (C+C') ~ {} | w(C)&w(C') */
						else if(contract0.isBlank()&&contract1.isBlank()) return new __AtLiteral();
						/** (C+C') ~ C/C' | n(C)/n(C') */
						else if(contract0.isEmpty()) return contract1.reduce();
						else if(contract1.isEmpty()) return contract0.reduce();
						/** (C+C') ~ C/C' | w(C)/w(C') */
						else if(contract0.isBlank()) return contract1.reduce();
						else if(contract1.isBlank()) return contract0.reduce();
						/** (C+C') ~ C | C >= C' */
						else if(contract0.isSuperSetOf(contract1, new __CcContext())) return contract0.reduce();
						/** (C+C') ~ C' | C <= C' */
						else if(contract1.isSuperSetOf(contract0, new __CcContext())) return contract1.reduce();
						/** reduce C+C' ::= (reduce C)+(reduce C') */
						else return new __Alt(contract0.reduce(), contract1.reduce());

						return this;
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return  return "(" + r.toString() + "+" + s.toString() + ")";
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
		function __And(r, s) {
				// TODO
				// NORMALIZATION
				/** (C&C) ~ C */
				if(contract0==contract1) return contract0;
				/** ({}&C) ~ {} */
				else if(contract0==new __Null()) return new __Null();
				else if(contract1==new __Null()) return new __Null();
				/** (@&C) ~ @ */
				else if(contract0==new __AtLiteral()) return new __AtLiteral();
				else if(contract1==new __AtLiteral()) return new __AtLiteral();



				if(!(this instanceof __And)) {
						return __cache.c(new __And (r,s));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return (r.nullable() && s.nullable());
				};
				this.first() {
						// TODO
						return r.first().concat(s.first());
				};
				//////////////////////////////////////////////////
				this.empty() {
						return (r.empty() && s.empty());
				};
				this.indifferent:() {
						return (r.indifferent() && s.indifferent());
				};
				this.universal() {
						return (r.universal() && s.universal());
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						return new __And(contract0.derive(name), contract1.derive(name));
				};
				this.nderiv(l) {
						return new __And(contract0.nderive(larg), contract1.nderive(larg));
				};
				this.pderiv(l) {
						return new __And(contract0.pderive(larg), contract1.pderive(larg))
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** ^ <= C' |= true  | v(C') */
						else if((arg==new __Empty()) && this.isNullable()) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable() && !this.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if (arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;
						/** C <= C' |= true  | m(C') */
						else if(this.isUniversal()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
						return arg.isSuperSetOf(this, ctx);
				};

				//////////////////////////////////////////////////
				this.reduce = function () {
						/** (C&C') ~ C/C' | n(C)/n(C') */
						if(contract0.isEmpty()) return new __Null();
						else if(contract1.isEmpty()) return new __Null();
						/** (C&C') ~ C/C' | w(C)/w(C') */
						else if(contract0.isBlank()) return new __AtLiteral();
						else if(contract1.isBlank()) return new __AtLiteral();
						/** (C&C') ~ C' | C >= C' */
						else if(contract0.isSubSetOf(contract1, new __CcContext())) return contract0.reduce();
						/** (C&C') ~ C | C <= C' */
						else if(contract1.isSubSetOf(contract0, new __CcContext())) return contract1.reduce();
						/** reduce C&C' ::= (reduce C)&(reduce C') */
						else return new __And(contract0.reduce(), contract1.reduce());

						return this;
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
		function __Neg(r) {
				if(!(this instanceof __Neg)) {
						return __cache.c(new __Neg (r));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return r.nullable() ? false : true;;
				};
				this.first() {
						// TODO
						return r.first();
				};
				//////////////////////////////////////////////////
				this.empty() {
						// TODO
						return r.universal() ? true : false;
				};
				this.indifferent:() {
						// TODO
						return (r.empty() || r.nullable()) ? true : false;
				};
				this.universal() {
						// TODO
						return r.universal() ? true : false;;
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						return new __Neg(contract.derive(name));
				};
				this.nderiv(l) {
						return new __Neg(contract.pderive(larg));
				};
				this.pderiv(l) {
						return new __Neg(contract.nderive(larg));
				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** ^ <= C' |= true  | v(C') */
						else if((arg==new __Empty()) && this.isNullable()) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable() && !this.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if(arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;
						/** C <= C' |= true  | m(C') */
						else if(this.isUniversal()) return true;
						/** C <= C' |= false  | m(C) and !m(C') */

						/** C <= C' |= true  | ctx(C <= C') */
						var ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						//else return unfold(this, arg, contract.first(), ctx.bind(ccExp)) && unfold(this, arg, arg.first(), ctx.bind(ccExp));
						// TODO
						else return /*unfold(this, arg, contract.first(), ctx.bind(ccExp)) &&*/ unfold(this, arg, arg.first(), ctx.bind(ccExp));

				};

				this.isSubSetOf = function (r, ctx) {
						return arg.isSuperSetOf(this, ctx);

				};

				//////////////////////////////////////////////////
				this.reduce = function () {

						if(contract.isUniversal()) return new __AtLiteral();
						/** SPECIAL: !(C) ~ @ | m(C) */
						//	   else if(contract.isIndifferent()) return  new __AtLiteral();
						/** SPECIAL: !(^) ~ ? | m(C) */
						else if(contract==new __Empty()) return new __QMark();
						/** reduce !(C) ::= !(reduce C) */
						else return new __Neg(contract.reduce());

						return this;
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
		function __Dot(r, s) {

				// TODO
				// NORMALIZATION
				/** (^.C) ~ C */
				if(contract0 == new __Empty()) return contract1;
				/** ({}.C) ~ C */
				if(contract0 == new __Null()) return new __Null();
				/** (@.C) ~ C */
				if(contract0 == new __AtLiteral()) return new __AtLiteral();


				if(!(this instanceof __Dot)) {
						return __cache.c(new __Dot (s));
				}
				//////////////////////////////////////////////////
				this.nullable() {
						return (r.nullable() && s.nullable());	
				};
				this.first() {
						return (r.nullable() ? r.first().concat(r.first()) : r.first());
				};
				//////////////////////////////////////////////////
				this.empty() {
						return (r.empty() || s.empty());
				};
				this.indifferent:() {
						return (r.indifferent() || (r.nullable() && s.indifferent()));
				};
				this.universal() {
						return ((r.universal() && s.nullable()) || (r.nullable() && s.universal()) || (r.universal() && s.universal()));
				};
				//////////////////////////////////////////////////
				this.deriv(b) {
						if(contract0.isNullable()) return new __Alt(__Dot(contract0.derive(name), contract1), contract1.derive(name));
						else return new __Dot(contract0.derive(name), contract1);

						// TODO
				};
				this.nderiv(l) {
						// TODO
						if (larg==new __Empty()) return this;
						else if(contract0.isNullable()) return new __Alt(new __Dot(contract0.nderive(larg), contract1), contract1.nderive(larg));
						else return new __Dot(contract0.nderive(larg), contract1);

				};
				this.pderiv(l) {
						// TODO
						if (larg==new __Empty()) return this;
						else if(contract0.isNullable()) return new __Alt(new __Dot(contract0.pderive(larg), contract1), contract1.pderive(larg));
						else return new __Dot(contract0.pderive(larg), contract1);

				};
				//////////////////////////////////////////////////
				this.isSuperSetOf = function (r, ctx) {
						/** C <= C' |= true  | C=C' */
						if(arg==this) return true;
						/** ^ <= C' |= true  | v(C') */
						else if((arg==new __Empty()) && this.isNullable()) return true;
						/** C <= C' |= false  | v(C) and ~v(C') */
						else if(arg.isNullable() && !this.isNullable()) return false;
						/** C <= C' |= true  | n(C) */
						else if(arg.isEmpty()) return true;
						/** C <= C' |= true  | w(C) & !n(C') */
						else if(arg.isBlank()) return true;
						/** C <= C' |= true  | m(C') */
						else if(this.isUniversal()) return true;

						/** C <= C' |= true  | ctx(C <= C') */
						ccExp = new __CcExp(arg, this);
						if(ctx.contains(ccExp)) return true;
						/** otherwise */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));
				};

				this.isSubSetOf = function (r, ctx) {
						return arg.isSuperSetOf(this, ctx);
				};

				//////////////////////////////////////////////////
				this.reduce = function () {

						/** (C.C') ~ {} | n(C) */
						if(contract0.isEmpty()) return new __Null();
						/** (C.C') ~ {} | w(C) */
						else if(contract0.isBlank()) return new __AtLiteral();
						/** reduce C.C' ::= (reduce C).(reduce C') */
						else return new __Dot(contract0.reduce(), contract1.reduce());

						return this;
				};
				//////////////////////////////////////////////////
				this.toString = function () {
						return (r.toString() + "." + s.toString());
				};
		}



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
		APC.Contract = {};

		APC.Contract.EmptySetLiteral	= __Null;
		APC.Contract.EmptyLiteral		= __Empty;

		APC.Contract.AtLiteral			= __AtLiteral;
		APC.Contract.QMarkLiteral		= __QMark;
		APC.Contract.NameLiteral		= __Atom;
		APC.Contract.RegExLiteral		= __RegExLiteral;

		APC.Contract.QMarkContract		= __QMarkContract;
		APC.Contract.StarContract		= __Star;
		APC.Contract.OrContract			= __Alt;
		APC.Contract.AndContract		= __And;
		APC.Contract.NegContract		= __Neg;
		APC.Contract.ConcatContract		= __Dot;





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

						// TODO
						var nderive_E = E.nderive(literal);
						var nderive_F = F.pderive(literal);

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
		function __CcExp(contract0, contract1) {
				return {
						/** To String
						 * @return string
						 */
						toString: function() {
								return contract0.toString() + "<=" + contract1.toString();
						}
				}
		}

		/** Containment Calculus
		 * Context: {} | <Context, Expression>
		 */
		function __CcContext() {	
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
								var newCtx = new __CcContext();
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
		APC.Contract.Containment = {};
		APC.Contract.Containment.Expression = __CcExp;
		APC.Contract.Containment.Context = __CcContext;





		//////////////////////////////////////////////////
		//  CONTRACT CACHE
		//  cache for access permission contracts
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

								var key = contract.toString();
								var value = contract;

								if(this.contains(key)) {
										return this.get(key);
								} else {
										if(!reduced[key]) {
												reduced[contract.toString()]=true;

												//		var	tmp = RegEx.Statistics.currentCallStatistics;
												//		RegEx.Statistics.currentCallStatistics=undefined;

												contract = contract.reduce();

												//		RegEx.Statistics.currentCallStatistics=tmp;

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



		//////////////////////////////////////////////////
		// APC . Contract
		//////////////////////////////////////////////////
		APC.Contract.Cache = __cache;



})(__APC);

