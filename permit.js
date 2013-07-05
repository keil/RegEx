/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
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
(function(APC){

		////////////////////////////////////////////////////
		// OBJECT CONTRACTS
		////////////////////////////////////////////////////

		/** Permit
		 * @param string Access Permission Contract to apply
		 * @param obj Object
		 * @param name Object name [optional]
		 * @return Object proxy
		 */
		function __permit(string, obj, name) {
				// optional name
				objname = name!=null ? new APC.TracePath.TraceProperty(name) : new APC.TracePath.TraceEmpty();

				// trie
				var trie = new APC.TracePath.PathTrie();
				trie = trie.append(objname);

				// parse contracts
				contract = APC.Parser.parse(string);

				// create proxy
				return __APC.Proxy.wrap(obj, contract, trie);
		}

		/** Apply
		 * @param string Access Permission Contract
		 * @param base Current object
		 * @param name Property name
		 */
		function __apply(string, base, name) {
				obj = base[name];
				base[name] = __permit(string, obj, name);
		}





		////////////////////////////////////////////////////
		// FUNCTION CONTRACTS
		////////////////////////////////////////////////////

		/** Permit Arguments 
		 * @param string Access Permission Contract
		 * @param function Function
		 * @return Function proxy
		 */
		function __permitArgs(string, func, name) {
				// optional name
				fname = name!=null ? new APC.TracePath.TraceProperty(name) : new APC.TracePath.TraceEmpty();

				// trie
				var trie = new APC.TracePath.PathTrie();
				trie = trie.append(objname);

				// parse contracts
				contract = APC.Parser.parse(string);

				// create function proxy
				return __APC.Proxy.wrapArgs(func, contract, trie);
		}

		/** Apply Arguments 
		 * @param string Access Permission Contract
		 * @param base Current object
		 * @param name Function name
		 */
		function __applyArgs(string, base, name) {
				func = base[name];
				base[name] = __permitArgs(string, func, name);
		}



		//////////////////////////////////////////////////
		// APC
		//////////////////////////////////////////////////
		APC.permit		= __permit;
		APC.apply		= __apply;
		APC.permitArgs	= __permitArgs;
		APC.applyArgs	= __applyArgs;

})(__APC);
