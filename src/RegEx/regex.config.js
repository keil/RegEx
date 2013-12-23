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
 * $Date: 2013-07-23 15:59:13 +0200 (Tue, 23 Jul 2013) $
 * $Rev: 23389 $
 */

__RegEx.Config = (function() {

		CONFIG = new Object();

		/* enables expression caching
		 * enables: true, disabled: false
		 * default: true
		 */
		CONFIG.CachingEnabled = true;

		/* enables verbose output
		 * enables: true, disabled: false
		 * default: false
		 */
		CONFIG.Verbose = true;

		/* Use Containment Calculus PROVE AXIOMS
		 * enables: true, disabled: false
		 * default: true
		 */
		CONFIG.ProveAxioms = false;

		/* Use Containment Calculus DISPROVE AXIOMS
		 * enables: true, disabled: false
		 * default: true
		 */
		CONFIG.DisproveAxioms = false;

		return CONFIG;
})();
