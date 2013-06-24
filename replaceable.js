(function(RegEx) {

		SELF = {};
		RegEx.Replaceable = SELF;

		function Replaceable(dumpable) {
				this.replaceBy = function(newdumpable) { dumpable = newdumpable; };
				this.dump = function() { return dumpable.dump(); };
				this.toString = function () { return "[" + dumpable.dump() + "]" };
		}
		SELF.Replaceable = Replaceable;

})(__RegEx);
