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

__RegEx.Cache = (function() {

		SELF = Cache;

		SELF.Literals		= new Cache();
		SELF.Expressions	= new Cache();

		//////////////////////////////////////////////////
		//  CACHE
		//  cache for regular expressions and literals
		//////////////////////////////////////////////////

		/** Cache 
		*/
		function Cache() {
				// cache array
				var cache = new StringMap();

				/* cache function
				 * @param r regular expression
				 * @return regular expression
				 */
				this.c = function(r) {
						if(!($.Config.CachingEnabled)) return r;

						var key = r.toString();
						var value = r;

						if(this.contains(key)) {
								return this.get(key);
						} else {	
								return this.put(key, value);
						}
				};

				/* put
				 * @param key cache key
				 * @param value cahe value
				 * $return value
				 */
				this.put = function(key, value) {
						cache.set(key, value);
						return value;
				};

				/* get
				 * @param key cache key
				 * $return value
				 */
				this.get = function(key) {
						return cache.get(key);
				};

				/* contains
				 * @param key cache key
				 * $return true, if key in cache, false otherwise
				 */
				this.contains = function(key) {
						return cache.has(key);
				};

				/* clear cache
				*/
				this.clear = function() {
						cache = new StringMap();
				};
		}

		return SELF;
})();
