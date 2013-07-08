/*
 * Efficient Solving of Regular Expression Inequalities 
 *  Regular Expression Generator
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date$
 * $Rev$
 */
(function(RegEx) {

		CONFIG = {};
		RegEx.config = CONFIG;

		//////////////////////////////////////////////////
		// Depth / Nesting Index
		// Default: 3
		//////////////////////////////////////////////////
		CONFIG.depth = 3;

		//////////////////////////////////////////////////
		// Full Regular Expression Set
		// true - complete power set (including x, {}, ^, @, ?)
		// false - only name literals
		// Default: false
		//////////////////////////////////////////////////
		CONFIG.full = false;

		//////////////////////////////////////////////////
		// Debug Output
		// Default: false
		//////////////////////////////////////////////////
		CONFIG.debug = false;

		//////////////////////////////////////////////////
		// Verbose Unfolding 
		// Default: false
		//////////////////////////////////////////////////
		CONFIG.verbose = false;

		//////////////////////////////////////////////////
		// Full Output
		//  Print failed and indeterminable cases
		// Default: false
		//////////////////////////////////////////////////
		CONFIG.fulloutput = true;

})(__RegEx);;
