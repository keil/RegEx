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
				var sign = true;
				this.replaceBy = function(newdummy) { dummy = newdummy; };
				this.restore = function() { dummy = origin; };
				this.invert = function() { sign = !sign; }
				this.getOrigin = function() { return origin; };
				this.getSign = function() {return sign; };
				this.dump = function(statistics) { return dummy.dump(statistics); };
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
		 * @param concatCache	Cache
		 */
		function Store(literalCache, optCache, starCache, orCache, andCache, negCache, concatCache) {

				/** x */
				this.pushLiteral = function(regex) {
						return new Store(
										literalCache.push(regex),
										optCache,
										starCache,
										orCache,
										andCache,
										negCache,
										concatCache
										);
				};

				/** r? */
				this.pushOptional = function(regex) {
						return new Store(
										literalCache,
										optCache.push(regex),
										starCache,
										orCache,
										andCache,
										negCache,
										concatCache
										);
				};

				/** r* */
				this.pushStar = function(regex) {
						return new Store(
										literalCache,
										optCache,
										starCache.push(regex),
										orCache,
										andCache,
										negCache,
										concatCache
										);
				};

				/** r+s */
				this.pushOr = function(regex) {
						return new Store(
										literalCache,
										optCache,
										starCache,
										orCache.push(regex),
										andCache,
										negCache,
										concatCache
										);
				};

				/** r&s */
				this.pushAnd = function(regex) {
						return new Store(
										literalCache,
										optCache,
										starCache,
										orCache,
										andCache.push(regex),
										negCache,
										concatCache
										);
				};

				/** !r */
				this.pushNegation = function(regex) {
						return new Store(
										literalCache,
										optCache,
										starCache,
										orCache,
										andCache,
										negCache.push(regex),
										concatCache
										);
				};

				/** r.s */
				this.pushConcat = function(regex) {
						return new Store(
										literalCache,
										optCache,
										starCache,
										orCache,
										andCache,
										negCache,
										concatCache.push(regex)
										);
				};

				/** Get Literal Cache */
				this.getLiteralCache = function() { return literalCache; };
				/** Get Opt Cache */
				this.getOptionalCache = function() { return optCache; };
				/** Get Star Cache */
				this.getStarCache = function() { return starCache; };
				/** Get Or Cache */
				this.getOrCache = function() { return orCache; };
				/** Get And Cache */
				this.getAndCache = function() { return andCache; };
				/** Get Neg Cache */
				this.getNegationCache = function() { return negCache; };
				/** Get Concat Cache */
				this.getConcatCache = function() { return concatCache; };

				/** Get All */
				this.getAllCaches = function() {
						var set = new Array();
						set.append(literalCache);
						set.append(optCache);
						set.append(starCache);
						set.append(orCache);
						set.append(andCache);
						set.append(negCache);
						set.append(concatCache);
						return set;
				}

				/** Get All without Negation */
				this.getAllCachesWithoutNegation = function() {
						var set = new Array();
						set.append(literalCache);
						set.append(optCache);
						set.append(starCache);
						set.append(orCache);
						set.append(andCache);
						set.append(concatCache);
						return set;
				}


				/** To String */
				this.toString = function () {
						return literalCache.toString() + " & " + 
								optCache.toString() + " & " +
								starCache.toString() + " & " +
								orCache.toString() + " & " +
								andCache.toString() + " & " +
								negCache.toString() + " & " +
								concatCache.toString();
				};

				/** Invert */
				this.invert = function() {
						literalCache.invert();
						optCache.invert();
						starCache.invert();
						orCache.invert();
						andCache.invert();
						negCache.invert();
						concatCache.invert();
				}

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
				/** Invert */
				this.invert = function() {
						cache.foreach(function(i, result) {
								result.invert();
						});
				}
		}
		SELF.Cache = Cache;

})(__RegEx);
