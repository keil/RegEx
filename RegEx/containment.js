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

		// todo, use fresh solve for new solve from r and s
		// and a special solve with boundet ctx
		SELF.solve = solve;

		// TODO, add ctx and exp



		// r <= s
		function solve(r, s, ctx) {
	


			/** DISPROVE */
						if(sub.nullable() && !(this.nullable())) return false;

						/** DELETE */
						ccExp = new Exp(arg, this);
						if(ctx.contains(ccExp)) return true;

						/** UNFOLD */
						else return unfold(this, arg, arg.first(), ctx.bind(ccExp));
	
		}






		return SELF;
})();





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

