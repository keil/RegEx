(function(RegEx) {

		SELF = {};
		RegEx.Replaceable = SELF;

		function Replaceable(dumpable) {
				this.replaceBy = function(newdumpable) { dumpable = newdumpable; };
				this.dump = function() { return dumpable.dump(); };
				this.toString = function () { return "[" + dumpable.dump() + "]" };
		}
		SELF.Replaceable = Replaceable;


		function Cache(arg) {

				var cache = new Array();

				if(arg!=undefined) {
						arg.foreach(function(key, replaceable) {
							cache.push(replaceable);
						});
				}

				this.add = function(newReplaceable) {
						var newCache = new Array();
						cache.foreach(function(key, replaceable) {
								newCache.push(replaceable);
						});
						newCache.push(replaceable)
				};
		}

})(__RegEx);
