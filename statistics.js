(function(RegEx) {

		SELF = {};
		RegEx.Statistic = SELF;

		function __Container(RegExContainer) {




				var depth = undefined;

				var counter = 0;

				function derive(litersal) {
						RegExContainer.derive(literal);
				}


				this.getStatistic = function() {

						// TODO	
						return new Statistic();
				}

				return this;

		}


		function Statistic(container) {

				this.toString = function() {
						// TODO
						return "CALL TOSTRING";
				};

				this.dump = function() {
						// TODO
						return "CALL DUMP";
				}

				return this;
		}





		//		//////////////////////////////////////////////////
		///		// APC . Effect
		//		//////////////////////////////////////////////////
		//		APC.Effect = {};
		//		APC.Effect.getReadEffect		= __makeReadEffects;
		//		APC.Effect.getWriteEffect		= __makeWriteEffects;
		//		APC.Effect.appendEffectsToNode	= __appendEffects;

})(__RegEx);

// RegExSubSet


