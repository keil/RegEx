(function(RegEx) {

		SELF = {};
		RegEx.Pool = SELF;

		function Pool(pool, counterIn, counteNotIn) {

				
				// cache array
				var cache = new StringMap();
				// TODO chache for NotIn
__sysout(counterIn);
				var counterIn = (counterIn==undefined) ? 0 : counterIn;
				var counteNotIn = (counteNotIn==undefined) ? 0 : counteNotIn;

				if(pool!=undefined) {
						pool.foreach(function(key, literal) {
							cache.set(key, literal);
						});
				}


				// TODO CHANGE to RegEx Notation
				var stringIn = 'l';
				var stringNotIn = 'k';

				this.newLiteral = function() {

						pool = new Pool(this, counterIn, counteNotIn);
						literal = pool.getLiteralIn();
						pool.set(literal)
												
						return {literal:literal, pool:pool};
				};

				this.getLiteralIn = function() {
						counterIn++;
						key = stringIn+counterIn;

						return cache.has(key)? this.newLiteral(): new RegEx.Expressions.NameLiteral(key);				
				};

				this.getLiteralNotIn = function() {
						counterNotIn++;
						key = stringNotIn+counterNotIn;

						return new RegEx.Expressions.NameLiteral(key);
				};

				this.set = function() {
						cache.set(key, literal);
				};

				this.contains = function(literal) {
						return cache.has(key);
				};

				this.toString = function() {
						// TODO
						return "";
				};

				this.foreach = function(callback) {
						cache.foreach(callback);
				};
		}
		SELF.Pool = Pool;





})(__RegEx);

// RegExSubSet



