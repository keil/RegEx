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

		function Replaceable(dumpable) {
				this.replaceBy = function(newdumpable) { dumpable = newdumpable; };
				this.dump = function() { return dumpable.dump(); };
				this.toString = function () { return "[" + dumpable + "]" };
		}
		SELF.Replaceable = Replaceable;


		function Cache(arg) {

				var cache = new Array();

				if(arg!=undefined) {
						arg.foreach(function(key, replaceable) {
							cache.push(replaceable);
						});
				}

				this.add = function(replaceable) {
						var newCache = new Array();
						cache.foreach(function(key, replaceable) {
								newCache.push(replaceable);
						});
						newCache.push(replaceable);

						return new Cache(newCache);
				};

				this.toString = function () { return cache.toString(); };

				this.getLength = function() { return cache.length; }
		}
		SELF.Cache = Cache;


})(__RegEx);
