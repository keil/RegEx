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

// TODO add comments

__RegEx.Containment = (function() {

		SELF = new Object();

		SELF.solve = init;

		/** FIRST
		 * @param s super-regular expression
		 * @param r sub-regular expression
		 * @return Array of literals
		 */
		function first(r, s) {
			return __RegEx.First.intersection(r.first(), __RegEx.First.negation(s.first()));
		}

		/** INIT
		 * @param s super-regular expression
		 * @param r sub-regular expression
		 * @return true|false
		 */
		function init(r, s) {
				return solve(r, s, new Context());
		}

		/** SOLVE
		 * @param s super-regular expression
		 * @param r sub-regular expression
		 * @param context context
		 * @return true|false
		 */
		function solve(r, s, context) {
				/** DISPROVE */
				if(r.nullable() && !(s.nullable())) return false;

				/** PROVE AXIOMS */
				if(__RegEx.Config.ProveAxioms) prove(r, s);
				
				/** DISPROVE AXIOMS */
				if(__RegEx.Config.DispoveAxioms) disprove(r, s);

				/** DELETE */
				var e = new Expression(r, s);
				if(context.contains(e)) return true;

				/** UNFOLD */
				else return unfold(r, s, context);
		}

		/** UNFOLD (s >= r)
		 * @param s super-regular expression
		 * @param r sub-regular expression
		 * @param context containment context 
		 * @return true|false
		 */
		function unfold(r, s, context) {

				var e = new Expression(r, s);
				var context = context.bind(e);

				// verbose - true, print output: false, do not print the output
				var verbose  = false || __RegEx.Congif.verbos;
				if(verbose) __sysout("\n\n\n##################################################");
				if(verbose) __sysout("## isSuperSetOf: " + s + ">=" + r);

				var result = true;
				first.foreach(function(i, l) {
						var derivR = r.nderive(l);
						var derivS = s.pderive(l);

						if(verbose) __sysout("## first: " + first);
						if(verbose) __sysout("## literal: " + l);
						if(verbose) __sysout("## N _{" + l + "} r: " + deriveR);
						if(verbose) __sysout("## P _{" + l + "} s: " + deriveS);

						result = result && deriveS.isSuperSetOf(deriveR, context);

						if(verbose) __sysout("## result: " + result);

						if(!result) return result; // break
				});
				return result;
		}


		/** PROVE AXIOMS (s >= r)
		 * @param s super-regular expression
		 * @param r sub-regular expression
		 * @return true|false
		 */
		function prove(r, s) {
				// TODO, extend prove axioms

				// CC-IDENTITY
				if(r===s) return true;
				// CC-PROOF-EDGE
				else if(r.empty()) return true;
				// CC-PROOF-EDGE
				else if(s.universal()) return true;
				// CC-NULLABLE
				else if((r instanceof __RegEx.Expression.Empty) && s.nullable()) return true;
		}
		

		/** DISPROVE AXIOMS (s >= r)
		 * @param s super-regular expression
		 * @param r sub-regular expression
		 * @return true|false
		 */
		function disprove(r, s) {
				// TODO, extend disprove axiom

				// CC=EMPTY
				if(r.indifferent() && s.empty()) return false;
				// CC-EMPTY
				else if(r.universal() && s.empty()) return false;
		}

		/**
		 * Containment Calculus
		 * Expression: phi,psi,pi ::= r <= s
		 */
		function Expression(r, s) {
				/** To String
				 * @return string
				 */
				this.toString = function() {
						return r.toString() + "<=" + s.toString();
				}
		}

		/**
		 * Containment Calculus
		 * Context: {} | <Context, Expression>
		 */
		function Context() {	
				// cache array
				var context = new StringMap();

				var key = function(v) {
						return ("\"" + v + "\"");		
				};

				/* bind function
				 * @param CC Expression
				 * @return <CC Context, CC Expression>
				 */
				this.bind = function(ccExp) {
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
				};

				/* put
				 * @param ccExp CC Expression
				 * $return CC Expression
				 */
				this.put = function(ccExp) {
						context.set(ccExp.toString(), ccExp);
						return ccExp;
				};

				/* get
				 * @param ccExp CC Expression
				 * $return CC Expression
				 */
				this.get = function(ccExp) {
						return context.get(ccExp.toString());
				};

				/* contains
				 * @param ccExp CC Expression
				 * $return true, if ccExp in cache, false otherwise
				 */
				this.contains = function(ccExp) {
						return context.has(ccExp.toString());
				};
		};

		return SELF;
})();
