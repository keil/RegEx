(function(RegEx) {

		SELF = {};
		RegEx.Dummy = SELF;

		function EmptySetDummy() {
				this.dump = function() { return new RegEx.Expressions.EmptySetLiteral(); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.EmptySetLiteral()) };
		}
		SELF.EmptySetDummy = EmptySetDummy;

		function EmptyDummy() {
				this.dump = function() { return new RegEx.Expressions.EmptyLiteral(); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.EmptyLiteral()) };		
		}
		SELF.EmptyDummy = EmptyDummy;

		function AtDummy() {
				this.dump = function() { return new RegEx.Expressions.AtLiteral(); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.AtLiteral()) };
		}
		SELF.AtDummy = AtDummy;

		function QMarkDummy() {
				this.dump = function() { return new RegEx.Expressions.QMarkLiteral(); };
				this.toString = function () { return "dumpof " + (RegEx.Expressions.QMarkLiteral()) };
		}
		SELF.QMarkDummy = QMarkDummy;

		function NameDummy(varname) {
				this.dump = function() { return new RegEx.Expressions.NameLiteral(varname); };	
				this.toString = function () { return "dumpof " + (RegEx.Expressions.NameLiteral(varname)) };	
		}
		SELF.NameDummy = NameDummy;

		function RegExDummy(regex) {
				this.dump = function() { return new RegEx.Expressions.RegExLiteral(regex); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.RegExLiteral(regex)) };
		}
		SELF.RegExDummy = RegExDummy;

		function OptionalDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.OptionalRegEx(dumpable.dump()); };
				this.toString = function () { return "dumpof " +  (new RegEx.Expressions.OptionalRegEx(dumpable.dump())) };
		}
		SELF.OptionalDummy = OptionalDummy;

		function StarDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.StarRegEx(dumpable.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.StarRegEx(dumpable.dump())) };
		}
		SELF.StarDummy = StarDummy;

		function OrDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.OrRegEx(dumpable0.dump(), dumpable1.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.OrRegEx(dumpable0.dump(), dumpable1.dump())) };		
		}
		SELF.OrDummy = OrDummy;

		function AndDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.AndRegEx(dumpable0.dump(), dumpable1.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.AndRegEx(dumpable0.dump(), dumpable1.dump())) };
		}
		SELF.AndDummy = AndDummy;

		function NegDummy(dumpable) {
				this.dump = function() { return new RegEx.Expressions.NegRegEx(dumpable.dump()); };
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.NegRegEx(dumpable.dump())) };
		}
		SELF.NegDummy = NegDummy;

		function ConcatDummy(dumpable0, dumpable1) {
				this.dump = function() { return new RegEx.Expressions.ConcatRegEx(dumpable0.dump(), dumpable1.dump()); }
				this.toString = function () { return "dumpof " + (new RegEx.Expressions.ConcatRegEx(dumpable0.dump(), dumpable1.dump())) };
		}
		SELF.ConcatDummy = ConcatDummy;







})(__RegEx);
