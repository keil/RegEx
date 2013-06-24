(function(RegEx) {

		SELF = {};
		RegEx.Replaceable = SELF;


		function Replaceable(regex) {

				this.replace = function(newregex) {
						regex = newregex;
				};

				this.getRegEx = function() {
						return regex;
				}
		}
		SELF.Replaceable = Replaceable;


	





})(__RegEx);
