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
(function(RegEx) {

		SELF = {};
		RegEx.Statistic = SELF;

		function __Container(RegExContainer) {


// TODO, vergl;eichoperation mit Antimirov ableitung
// in respect to all literals in POOL (inCache/ notInCache)

				var depth = undefined;

				var counter = 0;

				function derive(litersal) {
						RegExContainer.derive(literal);
				}


				this.getStatistic = function() {

						// TODO	
						return new Statistic();
				}

				return this;

		}


		function Statistic(container) {

				this.toString = function() {
						// TODO
						return "CALL TOSTRING";
				};

				this.dump = function() {
						// TODO
						return "CALL DUMP";
				}

				return this;
		}





		//		//////////////////////////////////////////////////
		///		// APC . Effect
		//		//////////////////////////////////////////////////
		//		APC.Effect = {};
		//		APC.Effect.getReadEffect		= __makeReadEffects;
		//		APC.Effect.getWriteEffect		= __makeWriteEffects;
		//		APC.Effect.appendEffectsToNode	= __appendEffects;

})(__RegEx);

// RegExSubSet


