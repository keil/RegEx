/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
 *  - TestCase
 *
 * Copyright (c) 2013, Proglang, University of Freiburg.
 *  http://proglang.informatik.uni-freiburg.de/
 * All rights reserved.
 *
 * Author Matthias Keil
 *  http://www.informatik.uni-freiburg.de/~keilr/
 *
 * $Date: 2013-03-07 11:18:52 +0100 (Thu, 07 Mar 2013) $
 * $Rev: 23136 $
 */

//////////////////////////////////////////////////
// TESTS

obj = {
	get value(){
        return this._value;
    },
    set value(val){
        this._value = val;
    }
}
test = __APC.permit("@", obj);
test.value;
test.value = "chacha";
__look();
