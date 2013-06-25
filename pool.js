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
		RegEx.Pool = SELF;

		//////////////////////////////////////////////////
		// Interface to Access Permission Contracts
		//////////////////////////////////////////////////

		/** Literal Pool
		 * @param pool	Pre-pool
		 */
		function Pool(pool) {

				/** Clone 
				 * @param cache	Pool-cache
				 */
				function clone(cache) {
						var newCache = new StringMap();
						cache.foreach(function(key, literal) {
								newCache.set(key, literal);
						});
						return newCache;
				}

				var inString = 'a';
				var notInString = 'b';

				var inCache = (pool==undefined) ? new StringMap() : clone(pool.getInCache());
				var notInCache = (pool==undefined) ? new StringMap() : clone(pool.getNotInCache());

				var inCounter = (pool==undefined) ? 0 : pool.getInCounter();
				var notInCounter = (pool==undefined) ? 0 :  pool.getNotInCounter();

				var inLast = null;
				var notInLast = null;

				/* @return new In-literal
				*/
				this.getInLiteral = function() {
						inCounter++;
						var key = inString+inCounter;

						if(inCache.has(new RegEx.Dummy.NameDummy(key).dump().toString())) {
								return this.getInLiteral();
						} else {
								var literal = new RegEx.Dummy.NameDummy(key);
								inCache.set(literal.dump().toString(), literal);
								return literal;
						}
				};

				/* @return new NotIn-literal
				*/
				this.getNotInLiteral = function() {
						notInCounter++;
						var key = notInString+notInCounter;

						if(notInCache.has(new RegEx.Dummy.NameDummy(key).dump().toString())) {
								return this.getInLiteral();
						} else {
								var literal = new RegEx.Dummy.NameDummy(key);
								notInCache.set(literal.dump().toString(), literal);
								return literal;
						}
				};

				/** To String
				 * @return String
				 */
				this.toString = function() {
						var string = "";
						inCache.foreach(function(key, literal) {string += key + ';';});
						notInCache.foreach(function(key, literal) {string += key + ';';});
						return '{' + string + '}';
				};

				/** Get In-Cache */
				this.getInCache = function() { return inCache; };
				/** Get NotIn-Cache */
				this.getNotInCache = function() { return notInCache; };
				/** Get In-Counter */
				this.getInCounter = function() { return inCounter; };
				/** Get NotIn-Cache */
				this.getNotInCounter = function() { return notInCounter; };

				/** For Each */
				this.foreach = function(callback) {
						cache.foreach(callback);
				};
		}
		SELF.Pool = Pool;

})(__RegEx);
