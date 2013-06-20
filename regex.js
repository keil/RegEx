var __RegEx = (function(APC) {

		SELF = {};
		RegEx = {};
		RegEx.Expressions = SELF;


		SELF.EmptySetLiteral	= APC.Contract.EmptySetLiteral;
		SELF.EmptyLiteral		= APC.Contract.EmptyLiteral;

		SELF.AtLiteral			= APC.Contract.AtLiteral;
		SELF.QMarkLiteral		= APC.Contract.QMarkLiteral;
		SELF.NameLiteral		= APC.Contract.NameLiteral;
		SELF.RegExLiteral		= APC.Contract.RegExLiteral;

		SELF.QMarkRegEx			= APC.Contract.QMarkContract;
		SELF.StarRegEx			= APC.Contract.StarContract;
		SELF.OrRegEx			= APC.Contract.OrContract;
		SELF.AndRegEx			= APC.Contract.AndContract;
		SELF.NegRegEx			= APC.Contract.NegContract;
		SELF.ConcatRegEx		= APC.Contract.ConcatContract;

		return RegEx;

})(__APC);
