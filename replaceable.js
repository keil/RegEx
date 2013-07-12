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
 * $Date$
 * $Rev$
 */
(function(RegEx) {

		SELF = {};
		RegEx.Replaceable = SELF;

		/** Replaceable 
		 * @param dummy	Dummy Object
		 * @param sign Sign
		 */

		function Replaceable(dummy, sign) {
				var origin = dummy;
				var sign = (sign==undefined) ? true: sign;

				this.replaceWith = function(newdummy) { dummy = newdummy; };
				this.restore = function() { dummy = origin; };
				this.invert = function() { sign = !sign; }
				this.getOrigin = function() { return origin; };
				this.getSign = function() { return sign; };
				this.dump = function(statistics) { return dummy.dump(statistics); };
				this.toString = function () { return "[" + ((sign)?"+":"-") + dummy + "]" };
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

				literalCache = (literalCache==undefined)? new Cache():  new Cache(literalCache);
				optCache = (optCache==undefined)? new Cache():  new Cache(optCache);
				starCache = (starCache==undefined)? new Cache():  new Cache(starCache);
				orCache = (orCache==undefined)? new Cache():  new Cache(orCache);
				andCache = (andCache==undefined)? new Cache():  new Cache(andCache);
				negCache = (negCache==undefined)? new Cache():  new Cache(negCache);
				concatCache = (concatCache==undefined)? new Cache():  new Cache(concatCache);

				/** Merge 
				 * @param store	Store
				 */
				this.merge = function(store) {
						literalCache.append(store.getLiteralCache()),
								optCache.append(store.getOptionalCache()),
								starCache.append(store.getStarCache()),
								orCache.append(store.getOrCache()),
								andCache.append(store.getAndCache()),
								negCache.append(store.getNegationCache()),
								concatCache.append(store.getConcatCache())
				};

				/** x */
				this.pushLiteral = function(regex) {
						literalCache.push(regex);
				};

				/** r? */
				this.pushOptional = function(regex) {
						optCache.push(regex);
				};

				/** r* */
				this.pushStar = function(regex) {
						starCache.push(regex);
				};

				/** r+s */
				this.pushOr = function(regex) {
						orCache.push(regex);
				};

				/** r&s */
				this.pushAnd = function(regex) {
						andCache.push(regex);
				};

				/** !r */
				this.pushNegation = function(regex) {
						negCache.push(regex); 
				};

				/** r.s */
				this.pushConcat = function(regex) {
						concatCache.push(regex);
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
						return new Store(
										literalCache.invert(),
										optCache.invert(),
										starCache.invert(),
										orCache.invert(),
										andCache.invert(),
										negCache.invert(),
										concatCache.invert()
										);
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

				// copy elements from arg
				var cache = (arg==undefined) ? new Array() : clone(arg, replaceable);

				/** Push
				 * @param replaceable	Replaceable
				 */
				this.push = function(replaceable) {
						cache.push(replaceable);
				};

				/** Append
				 * @param arg	Cache
				 */
				this.append = function(arg) {
						arg.foreach(function(i, result) {
								cache.push(result);
						});
				}

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
