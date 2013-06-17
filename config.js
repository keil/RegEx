/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date: 2013-03-07 13:26:21 +0100 (Thu, 07 Mar 2013) $
 * $Rev: 23145 $
 */
(function(APC) {

		//////////////////////////////////////////////////
		// EVALUATION MODE
		// PROTECTOR: return undefined, if property access in not allowed
		// OBSERVER: recorded access violations
		//////////////////////////////////////////////////

		// Violation Mode
		var __EvaluationMode = { PROTECTOR: "protector", OBSERVER: "observer" }

		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Evaluation = {};
		APC.Evaluation.Mode = __EvaluationMode;





		//////////////////////////////////////////////////
		// APC . Config
		//////////////////////////////////////////////////
		APC.Config = {};
		APC.Config.EvaluationMode = __EvaluationMode.OBSERVER;

})(__APC);
