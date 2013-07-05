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
(function(APC) {

		//////////////////////////////////////////////////
		// TRACE PATH
		// data structure to log access paths
		// Property	p = "x" |  p{n}
		// Path 	P = [] | p | P.P | (P:p)
		//////////////////////////////////////////////////


		/** Empty Trace Property
		*/
		function __TraceEmpty() {
				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return true;
						},

					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   array.push("");
							   return array;
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return "";
					   },
				});
		}

		/** Trace Property
		 * @param variable Variable name
		 */
		function __TraceProperty(property) {
				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return false;
						},

					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   if(array.length === 0) {
									   array.push(property);
									   return array;
							   }

							   array.foreach(function(k, v){
									   array[k] = v + "." + property;
							   });
							   return array;
					   },
					   test: function() {return "foreach";},
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return property;
					   },
				});
		}

		/** Trace Argument
		 * @param path Function path
		 * @param property Argument name
		 */
		function __TraceArgument(path, property) {
				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return (path.isEmpty() && property.isEmpty());
						},

					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   array = path.dump(array);
							   array = property.dump(array);
							   return array;
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return "function " + path.toString() + ": " + property.toString();
					   },
				});
		}

		/** Trace Path
		 * @param path Path prefix
		 * @param property Path property
		 */
		function __TracePath(path, property) {
				// REDUCTION	
				if(path.isEmpty() && property.isEmpty()) return new __TraceEmpty();
				else if(path.isEmpty()) return property;
				else if(property.isEmpty()) return path;

				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return (path.isEmpty() && property.isEmpty());
						},

					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   array = path.dump(array);
							   array = property.dump(array);
							   return array;
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return path.toString() + "." + property.toString();
					   },
				});
		}



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath = {};
		APC.TracePath.TraceEmpty	= __TraceEmpty;
		APC.TracePath.TraceProperty	= __TraceProperty;
		APC.TracePath.TraceArgument	= __TraceArgument;
		APC.TracePath.TracePath		= __TracePath;






		//////////////////////////////////////////////////
		//  PATH CACHE
		//  cache for access (trace)paths
		//////////////////////////////////////////////////

		/** Path Cache 
		*/
		function __PathCache() {

				// cache array
				var cache = new StringMap();

				return {

						/* cache function
						 * @param path trace path
						 * @return trace path
						 */
						c: function(path) {
								if(this.contains(path.toString())) {
										return this.get(path.toString());
								} else {
										this.put(path.toString(), path);
										return path;
								}
						},

								/* put
								 * @param key cache key
								 * @param value cache value
								 * @return value
								 */
								put: function(key, value) {
										cache.set(key, value);
										return value;
								},

								/* get
								 * @param key cache key
								 * @return value
								 */
								get: function(key) {
										return cache.get(key);
								},

								/* contains
								 * @param key cache key
								 * @return true, if key in cache, false otherwise
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
		var __cache = new __PathCache();



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.Cache = __cache;





		//////////////////////////////////////////////////
		//  ACCESS LOGGER
		//  logger for access (trace)paths
		//////////////////////////////////////////////////

		/** Access Type
		*/
		var __AccessType = {
				READ : {value: 0, name: "READ", toString: function() { return this.name;} }, 
				WRITE: {value: 1, name: "WRITE", toString: function() { return this.name;} }
		};

		/** Access Logger 
		*/
		function __AccessLogger() {

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
						/** put a new value
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
		__accessLogger = new __AccessLogger();

		/** Evaluation Function
		*/
		function __evaluateAccess() {
				__sysout("\n\n\n\n\n");
				__sysout("##################################################");
				__sysout("# EVALUATION of ACCESS                           #");
				__sysout("##################################################");
				__accessLogger.print();
				__sysout("##################################################");
		}

		function __clearAccess() {
				__accessLogger = new __AccessLogger();
				APC.Access.Logger = __accessLogger;
		}

		function __dumpAccess() {
				__sysout("##################################################");
				__sysout("# EVALUATION of ACCESS                           #");
				__accessLogger.print();
				__clearAccess();
		}

		//////////////////////////////////////////////////
		// APC . Access
		//////////////////////////////////////////////////
		APC.Access = {};
		APC.Access.Type				= __AccessType;
		APC.Access.Logger			= __accessLogger;
		APC.Access.evaluate			= __evaluateAccess;
		APC.Access.dump				= __dumpAccess;





		//////////////////////////////////////////////////
		//  JsConTest
		//  contract/effect generator
		//////////////////////////////////////////////////

		/** Make Read Effects
		 * returns a list with dumped TracePath Elements in <acp>-style
		 * @see __JSConTest.events.handler.effects / acpToPath
		 * @return Array
		 */
		function __makeReadEffects() {
				var rEffects = new Array();
				__accessLogger.foreach(function(v) {
						if(v.type == APC.Access.Type.READ) {
								(v.path.dump(new Array())).foreach(function(k, v) {
										rEffects.push(__makeEffectPath(v.split(".")));
								});
						}
				});
				return rEffects;
		}

		/** Make Write Effects
		 * returns a list with dumped TracePath Elements in <acp>-style
		 * @see __JSConTest.events.handler.effects / acpToPath
		 * @return Array
		 */
		function __makeWriteEffects() {
				var wEffects = new Array();
				__accessLogger.foreach(function(v) {
						if(v.type == APC.Access.Type.WRITE) {
								(v.path.dump(new Array())).foreach(function(k,v) {
										wEffects.push(__makeEffectPath(v.split(".")));
								});
						}
				});
				return wEffects;
		}

		/** Make Write Effects
		 * generates a TracePath to an <acp>-like path
		 * @see __JSConTest.events.handler.effects / acpToPath
		 * @return <acp>-Path
		 */
		function __makeEffectPath(pathArray) {

				// an access path <acp> is
				// {type: PROP, property: "name", effect: <acp>}
				// {type: PARAMETER, number: anInt, fname: "fun_identifier"}
				// {type: VARIABLE, name: "var_identifier", }


				// <acp>-Types
				var PARAMETER = 1,
					VARIABLE = 2,
					PROP = 3,
					QUESTIONMARK = 4,
					STAR = 5,
					ALL = 6,
					noPROP = 7,
					regExProp = 8,
					regExVar = 9;


				/** Make <acp>-Variable
				 * @param varname Variable name
				 * @return <acp>-Variable
				 */
				function makeVariable(varname) {
						return {type: VARIABLE, name:varname, toString: function() {return varname;}}
				}

				/** Make <acp>-Parameter
				 * @param parnum Parameter number
				 * @param fname Function name
				 * @return <acp>-Parameter
				 */
				function makeParameter(parnum, fname) {
						return {type: PARAMETER, number: parnum, fname: fname, toString: function() {return fname + ".argumentsXX." + parnum;}}
				}

				/** Make <acp>-Property
				 * @param pname Property name
				 * @param effect Parent effect
				 * @return <acp>-Parameter
				 */	
				function makeProperty(pname, effect) {
						return {type: PROP, property: pname, effect: effect, toString: function() {return effect.toString + "." + pname;}}
				}

				if(pathArray[1] == "arguments") {
						var tmp = makeParameter(pathArray[2], pathArray[0]);
						var i = 3;
				} else {
						var tmp = makeVariable(pathArray[0]);
						var i = 1;
				}

				for(; i<pathArray.length; i++ ) {
						tmp = {type: PROP, property:  pathArray[i], effect: tmp}
				}
				return tmp;
		}



		/** Append Effect Inference to DOM node
		 * @param domNode DOM node
		 */
		function __appendEffects(domNode) {
				var handler = __JSConTest.events.handler.effects.create(domNode);

				var rEffect = __makeReadEffects();
				handler.assertEffectsRead(0,0,0,0,rEffect);

				var wEffect = __makeWriteEffects();
				handler.assertEffectsWrite(0,0,0,0,wEffect);

				handler.statistic();
		}

		//////////////////////////////////////////////////
		// APC . Effect
		//////////////////////////////////////////////////
		APC.Effect = {};
		APC.Effect.getReadEffect		= __makeReadEffects;
		APC.Effect.getWriteEffect		= __makeWriteEffects;
		APC.Effect.appendEffectsToNode	= __appendEffects;

})(__APC);
