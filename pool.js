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
		 * @param pool			Pre-pool
		 * @param literal		Regular Expression Literal
		 */
		function Pool(pool) {

				/** Merge 
				 * @param cache	Pool-cache
				 * @return Cloned Pool-cache
				 */
				function merge(cache, literal) {
						var newCache = new StringMap();
						cache.foreach(function(key, literal) {
								newCache.set(key, literal);
						});
						if(literal!=undefined) newCache.set(literal.toString(), literal);
						return newCache;
				}

				var inString = 'a';
				var notInstring = 'b';

				var inCache = (pool==undefined) ? new StringMap() : merge(pool.getInCache(), literal);
				var notInCache = (pool==undefined) ? new StringMap() : merge(pool.getNotInCache());

				var inCounter = (pool==undefined) ? 0 : pool.getInCounter();
				var notIncounter = (pool==undefined) ? 0 :  pool.getNotInCounter();

				var inLast = null;
				var notInLast = null;

				/* @return new In-literal
				 */
				this.getInLiteral = function() {
						inCounter++;
						key = inString+inCounter;
						return inCache.has(key)? getInLiteral(): new RegEx.Dummy.NameDummy(key);
				};

				/* @return new NotIn-literal
				 */
				this.getNotInLiteral = function() {
						notInCounter++;
						key = notInString+notInCounter;
						return notInCache.has(key)? getNotInLiteral(): new RegEx.Dummy.NameDummy(key);
				};

				/** New Literal
				 * @param literal	Regular Expression Literal
				 * @retrun Pool 
				 */
				this.newPool = function(literal) {
						return new Pool(this, literal);
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
