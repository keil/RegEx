(function(RegEx) {

		SELF = {};
		RegEx.Pool = SELF;

		function Pool() {

				// cache array
				var cache = new StringMap();

				var counterIn = 0;
				var counteNotIn = 0;

				// TODO CHANGE to RegEx Notation
				var stringIn = "l";
				var stringNotIn = "k";

				this.newLiteral = function() {
						counterIn++;
						key = stringIn+counterIn;

						var literal = new NameLiteral(key);
						cache.set(key, literal);
						return literal;
				};

				this.getLiteralNotIn = function() {
						counterNotIn++;
						key = stringNotIn+counterNotIn;

						return new NameLiteral(key);
				};

				this.contains = function(literal) {
						return cache.has(key);
				};

				this.toString = function() {
						// TODO
						return "";
				};
		}
		SELF.Pool = Pool;





})(__RegEx);

// RegExSubSet



