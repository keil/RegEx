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
 * $Date$
 * $Rev$
 */
(function(APC){

		//////////////////////////////////////////////////
		//  VIOLATION LOGGER
		//  logger for access violations
		//////////////////////////////////////////////////

		/** Access Type
		*/
		var __ViolationType = {
				READ: {value: 0, name: "READ VIOLATION", toString: function() { return this.name;} }, 
WRITE: {value: 1, name: "WRITE VIOLATION", toString: function() { return this.name;} }
		};

		/** Violation Logger 
		*/
		function __ViolationLogger() {

				/** hash function
				 * @param e Value
				 */
				function hashingFunction(e) {
						return e.toString();
				}

				/** compare to elements
				 * @param arg0 First argument
				 * @param arg1 Second argument
				 */
				function equalityFunction(arg0, arg1) {
						return ((arg0.type == arg1.type) && (arg0.path.toString() == arg1.path.toString()));
				}

				/** list entry
				 * @param type Access type
				 * @param path Access path
				 */
				function Entry(type, path) {
						return Object.freeze({
								type: type,
							   path: path,
							   toString: function() {
									   return padding_right(" [" + type.toString() + "] ", ' ', 9) + path.toString();
							   }
						});
				}

				// access map
				var accessMap = new HashSet(hashingFunction, equalityFunction);

				return {
						/** puts a new value
						 * @param type Access type
						 * @param path Access path
						 */
						put: function(type, path) {
								if(path instanceof Array) {
										path.foreach(function(i, path) {
												entryValue = Entry(type, path);
												accessMap.add(entryValue);
										});
								}
								else {
										entryValue = Entry(type, path);
										accessMap.add(entryValue);
								}
						},

								/** iterates over elements
								 * @param func Function to call for each element
								 */		
								foreach: function(func) {
										accessMap.values().forEach(func);
								},

								/** prints the list
								*/
								print: function () {
										accessMap.values().forEach(function(value) {
												__sysout(value.toString());
										});
								}
				}
		};

		// current access logger
		__violationLogger = new __ViolationLogger();

		/** Evaluation Function
		*/
		function __evaluateViolation() {
				__sysout("\n\n\n\n\n");
				__sysout("##################################################");
				__sysout("# EVALUATION of VIOLATIONS                       #");
				__sysout("##################################################");
				__violationLogger.print();
				__sysout("##################################################");
		}

		function __clearViolation() {
				__violationLogger = new __ViolationLogger();
				APC.Violation.Logger = __violationLogger;
		}

		function __dumpViolation() {
				__sysout("##################################################");
				__sysout("# EVALUATION of VIOLATIONS                       #");
				__violationLogger.print();
				__clearViolation()
		}

		//////////////////////////////////////////////////
		// APC . Violation
		//////////////////////////////////////////////////
		APC.Violation = {};
		APC.Violation.Type		= __ViolationType;
		APC.Violation.Logger	= __violationLogger;
		APC.Violation.evaluate	= __evaluateViolation;
		APC.Violation.dump		= __dumpViolation;

})(__APC);
