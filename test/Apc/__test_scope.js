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
 * $Date: 2013-04-02 11:47:32 +0200 (Tue, 02 Apr 2013) $
 * $Rev: 23166 $
 */


function func(s) {
	__sysout(this.secret);
	this.x = 765;
	this.c;
}


test = __APC.permitArgs("(arguments.0.@+secret)", func);
test2 = {secret: "chacha", func: test};


//test.call(this, {});
test2.func();
__look();




/*
(function() {
x = __permit("@", x);
func();
})();
__dump();
*/
