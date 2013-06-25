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
		RegEx.Replaceable = SELF;

		/** Replaceable 
		 * @param dummy	Dummy Object
		 */
		function Replaceable(dummy) {
				this.replaceBy = function(newdummy) { dummy = newdummy; };
				this.dump = function() { return dummy.dump(); };
				this.toString = function () { return "[" + dummy + "]" };
		}
		SELF.Replaceable = Replaceable;

		//////////////////////////////////////////////////
		// Cache
		//////////////////////////////////////////////////

		/** Replaceable Cache
		 * @param arg	Replaceable Cache
		 */
		function Cache(arg, replaceable) {

				/** Clone 
				 * @param cache	Replaceable-cache
				 * @return Cloned Replaceable-cache
				 */
				function clone(oldCache, replaceable) {
						var newCache = new Array();
						oldCache.foreach(function(key, replaceable) {
							newCache.push(replaceable);
						});
						if(replaceable!=null) newCache.push(replaceable);
						return newCache;
				}

				var cache = (arg==undefined) ? new Array() : clone(arg, replaceable);

				/** Push
				 * @param replaceable	Replaceable
				 * @return Replaceable Cache
				 */
				this.push = function(replaceable) {
						return new Cache(cache, replaceable);
				};

				/** To String */
				this.toString = function () { return cache.toString(); };
				/** Get Length */
				this.getLength = function() { return cache.length; }
		}
		SELF.Cache = Cache;

})(__RegEx);
