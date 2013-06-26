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
				var origin = dummy;
				this.replaceBy = function(newdummy) { dummy = newdummy; };
				this.restore = function() { dummy = origin; };
				this.getOrigin = function() { return origin; };
				this.dump = function() { return dummy.dump(); };
				this.toString = function () { return "[" + dummy + "]" };
		}
		SELF.Replaceable = Replaceable;

		//////////////////////////////////////////////////
		// Store
		//////////////////////////////////////////////////

		/** Replaceable Store
		 * @param literalCache	Cache
		 * @param optCache		Cache
		 * @param starCache		Cache
		 * @param orCache		Cache
		 * @param andCache		Cache
		 * @param negCache		Cache
		 */
		function Store(literalCache, optCache, starCache, orCache, andCache, negCache) {

				/** x */
				this.pushLiteral = function(regex) {
						return new Store(literalCache.push(literalCache, literal), optCache, starCache, negCache);
				};

				/** r? */
				this.pushOptional = function(regex) {
						return new Store(literalCache.push(literalCache, literal), optCache, starCache, negCache);
				};

				/** r* */
				this.pushStar = function(regex) {
						return new Store(literalCache.push(literalCache, literal), optCache, starCache, negCache);
				};

				/** r+s */
				this.pushOr = function(regex) {
						return new Store(literalCache.push(literalCache, literal), optCache, starCache, negCache);
				};

				/** r&s */
				this.pushAnd = function(regex) {
						return new Store(literalCache.push(literalCache, literal), optCache, starCache, negCache);
				};

				/** !r */
				this.pushNegation = function(regex) {
						return new Store(literalCache.push(literalCache, literal), optCache, starCache, negCache);
				};

				/** To String */
				this.toString = function () { return literalCache + " / " + optCache + " / " + starCache + " / " + orCache + " / " + andCache + " / " + negCache };
		}
		SELF.Store = Store;




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
				/** For Each*/
				this.foreach = function(callback) { cache.foreach(callback); };
		}
		SELF.Cache = Cache;

})(__RegEx);
