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

		/** Edges
		*/
		function __Edges() {
				var keys = [];
				var values = [];
				return Object.freeze({
						/* Length
						 * @return length of key array
						 */
						get length() {
								return keys.length;
						},
					   /* Set
						* @return key
						* @param value
						* @return true|false
						*/
					   set: function(key, value) {
							   if (key !== Object(key)) { 
									   return false;
							   }

							   var i = keys.indexOf(key);
							   if (i < 0) { i = keys.length; }
							   keys[i] = key;
							   values[i] = value;
							   return true;
					   },
					   /* Get
						* @return key
						* @return undefined|values[i]
						*/
					   get: function(key) {
							   var i = keys.indexOf(key);
							   return i < 0 ? undefined : values[i];
					   },
					   /* Remove
						* @param key
						* @return true|false
						*/
					   remove: function(key) {
							   var i = keys.indexOf(key);
							   if(i >= 0) {
									   return (keys.remove(i) && values.remove(i));
							   }
					   },
					   /* Contains
						* @param key
						* @return true|false
						*/
					   contains: function(key) {
							   var i = keys.indexOf(key);
							   return i < 0 ? false : true;
					   },
					   /* Foreach
						* @param callback
						*/
					   foreach: function(callback) {
							   keys.foreach(function(i,key){
									   callback(key, values[i]);
							   });
					   }
				});
		}



		/** Empty Path Trie
		 * @param trieArg PathTrie to clone
		 */
		function __EmptyPathTrie() {
				var trie = new __PathTrie();
				return trie.makeEndOfPath();
		}



		/** Path Trie
		 * @param trieArg PathTrie to clone
		 */
		function __PathTrie(trieArg) {

				// edges E := {} | E[Property -> PathTrie]
				var edges = new __Edges();

				//////////////////////////////////////////////////
				/* If trieArg is set, than clone trieArg */
				if(trieArg != null) {
						trieArg.edges.foreach(function(property, trie) {
								edges.set(property, trie);
						});
				}

				//////////////////////////////////////////////////
				return {

						/* GET endOfPath
						 * @return true|false
						 */
						get endOfPath() {
								return this.contains(new APC.TracePath.TraceEmpty());
						},
							/* GET edges
							 * @return Array with Property-Trie Elements
							 */
							get edges() {
									return edges;
							},

							/* GET path
							 * @return Array with Path-Elements
							 */
							get paths() {
									return this.dump();
							},

							//////////////////////////////////////////////////
							/* GET
							 * @param property property name
							 * @return PathTrie|undefined
							 */
							get: function(property) {
									return edges.get(property);
							},

							/* SET
							 * @param property edge name
							 * @param trie subtrie
							 * @return PathTrie
							 */
							set: function(property, trie) {
									var newTrie = new __PathTrie(this);
									newTrie.edges.set(property, trie);

									// cache
									return __cache.c(newTrie); 
							},

							/* REMOVE
							 * @param property edge name
							 * @return PathTrie
							 */
							remove: function(property) {
									var newTrie = new __PathTrie(this);
									newTrie.edges.remove(property);

									// cache
									return __cache.c(newTrie); 
							},

							/* CONTAINS
							 * @param property edge name
							 * @return true|false
							 */
							contains: function(property) {
									return edges.contains(property);
							},

							//////////////////////////////////////////////////
							/* END OF PATH
							 * @return PathTrie
							 */
							makeEndOfPath: function() {
									var newTrie = new __PathTrie(this);
									newTrie.edges.set(new APC.TracePath.TraceEmpty(), new __PathTrie());

									// cache
									return __cache.c(newTrie); 
							},

							/* END OF PATH
							 * @return PathTrie
							 */
							removeEndOfPath: function() {
									var newTrie = new __PathTrie(this);
									newTrie.edges.remove(new APC.TracePath.TraceEmpty());

									// cache
									return __cache.c(newTrie); 
							},

							/* APPEND EDGE
							 * substitutes all endOfPath-Edges by property->{}
							 * @param property edge
							 */
							append: function(property) {
									var newTrie = new __PathTrie(this);

									// for all edges in this
									newTrie.edges.foreach(function(edge, trie) {
											if(edge!=new APC.TracePath.TraceEmpty()) newTrie.edges.set(edge, newTrie.edges.get(edge).append(property));
									});

									// if, this == endOfPath
									if(newTrie.endOfPath) {
											newTrie = newTrie.removeEndOfPath();

											// if property not in edges 
											if(newTrie.contains(property)) {
													newTrie = newTrie.set(property, newTrie.get(property).makeEndOfPath());
											} else {
													newTrie = newTrie.set(property, new __EmptyPathTrie());
											}
									}

									// cache
									return __cache.c(newTrie);
							},

							/* MERGE
							 * merges this with trie
							 * @param subtrie Path Trie
							 */
							merge: function(trie) {
									var newTrie = new __PathTrie(this);

									// for ll edges in trie
									trie.edges.foreach(function(edge, trie) {

											// if property not in edges
											if(newTrie.contains(edge)) {
													newTrie = newTrie.set(edge, newTrie.get(edge).merge(trie));
											} else {
													newTrie = newTrie.set(edge, trie);
											}
									});

									// cache
									return __cache.c(newTrie);
							},

							//////////////////////////////////////////////////
							/* To String
							 * returns a string representation
							 * @return String
							 */
							toString: function() {
									var tmp = ''; 
									edges.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) string = "($)";
											else string = ("(" + property.toString() + ") {" + trie.toString() + "}");
											tmp += string;
									});
									return tmp;
							},

							/* Print
							 * returns a line based tree-representation
							 * @return String
							 */
							print: function(l) {
									var level = (l==null) ? 0 : l;
									var tmp = '';
									edges.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) string = "($)";
											else string = ("(" + property.toString() + ") {" + trie.print(level+1) + "\n" + margin_left("}", ' ', (level*3)));
											tmp += "\n" + margin_left(string, ' ', (level*3));
									});
									return tmp;	
							},

							/* Dump
							 * returns an array containing all path elements
							 * @return Array
							 */
							dump: function() {
									var result = new Array();
									edges.foreach(function(property, trie) {
											if(property==new APC.TracePath.TraceEmpty()) {
													path = new APC.TracePath.TraceEmpty();
													result.push(path);
											}
											trie.dump().foreach(function(i, subpath) {
													path = new APC.TracePath.TracePath(property, subpath);
													result.push(path);
											});
									});
									return result;
							},
				}
		}



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.PathTrie			= __EmptyPathTrie;





		//////////////////////////////////////////////////
		//  TRIE CACHE
		//  cache for tries
		//////////////////////////////////////////////////

		/** Trie Cache 
		*/
		function __TrieCache() {

				// cache array
				var cache = new StringMap();

				//////////////////////////////////////////////////
				return {

						/* cache function
						 * @param path trace path
						 * @return trace path
						 */
						c: function(path) {
								//return path;
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

		// current trie cache
		var __cache = new __TrieCache();



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.TrieCache = __cache;

})(__APC);
