(function(RegEx) {

		SELF = {};
		RegEx.Generator = SELF;


		function Result(regex, pool) {

				this.getRegEx = function() {
						return regex;
				};

				this.getPool = function() {
						return pool;
				};

				this.toString = function() {
						return "[" + regex.toString() + "] - {" + pool.toString() + "}";
				}
		}

		function make(depth) {
				var result = new Array();
				// TODO: aktuell arbeitet alles auf dem selben pool
				var pool = new RegEx.Pool.Pool();

				generate((dept), pool).foreach(function(i, r) {
						results.add(new Result(r,pool));
				});
		}


		function generate(depth, pool) {

				var result = new Array();

				if(depth==0) return result;



				// r?
				generate((dept-1), pool).foreach(function(i, r) {
						results.add(new QMArkRegEx(r,s));
				});

				// r*
				generate((dept-1), pool).foreach(function(i, r) {
						results.add(new StarRegEx(r,s));
				});

				// r+s
				generate((dept-1), pool).foreach(function(i, r) {
						generate((dept-1), pool).foreach(function(j, s) {
								results.add(new OrRegEx(r,s));
						});
				});

				// r&s
				generate((dept-1), pool).foreach(function(i, r) {
						generate((dept-1), pool).foreach(function(j, s) {
								results.add(new AndRegEx(r,s));
						});
				});

				// !r
				generate((dept-1), pool).foreach(function(i, r) {
						results.add(new NegRegEx(r,s));
				});

				// r.s
				generate((1), pool).foreach(function(i, r) {
						generate((dept-1), pool).foreach(function(j, s) {
								results.add(new ConcatRegEx(r,s));
						});
				});

				// {} 
				// OPTINAL: represents real/used regex
				resuls.push(new EmptySetLitieral());

				// ^
				// OPTINAL: represents real/used regex
				resuls.push(new EmptyLitieral());

				// @
				// OPTINAL: represents a SET
				resuls.push(new AtLiteral());

				// ?
				// OPTINAL: represents a SET
				resuls.push(new QMarkLiteral());

				// 
				// TODO change "name" to the correspondig english word used in RegEx 
				literal = pool.newLiteral();
				resuls.push(new NameLiteral(literal));




		}




})(__RegEx);
