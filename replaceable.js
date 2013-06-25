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
