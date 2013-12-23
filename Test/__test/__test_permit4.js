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
// OBJECTS

function createObject() {
		return {
				a: {a: {a: {a: {a: {a: 4711}}}}},
						b: {a: {b: {a: {b: {c: 4711}}}}},
						bb: {bb: 8},
						c: 4711,
						x: {x: 4711},
						y: {y: {y: {y: {y: 4711}}}},
						zzz: 4711,
						f: function(x) { return this.a },
						g: function(x) { return {a: 4711} },
						h: function(x) { this.zzz = 4712 }
		};
}

function createFunction() {
	test = function() {return 4711;}
	test.a = 4711;
	return test;
}

function test(contract, exp) {
		__sysout("\n\n\n");
		obj = createObject();
		__APC.apply(contract, this, "obj");
		__sysout("[" +contract+ "]: " + exp + " # " + __dump(eval(exp)));
		__look();
}

function testFunc(contract, exp) {
		__sysout("\n\n\n");
		func = createFunction();
		__APC.apply(contract, this, "func");
		__sysout("[" +contract+ "]: " + exp + " # " + __dump(eval(exp)));
		__look();
}



//////////////////////////////////////////////////
// TESTS

/*
{
  getOwnPropertyDescriptor: function(target,name) -> desc | undefined          // Object.getOwnPropertyDescriptor(proxy,name)
  getOwnPropertyNames:      function(target) -> [ string ]                     // Object.getOwnPropertyNames(proxy) 
  getPrototypeOf:           function(target) -> any                            // Object.getPrototypeOf(proxy)
  defineProperty:           function(target,name, desc) -> boolean             // Object.defineProperty(proxy,name,desc)
  deleteProperty:           function(target,name) -> boolean                   // delete proxy[name]
  freeze:                   function(target) -> boolean                        // Object.freeze(proxy)
  seal:                     function(target) -> boolean                        // Object.seal(proxy)
  preventExtensions:        function(target) -> boolean                        // Object.preventExtensions(proxy)
  isFrozen:                 function(target) -> boolean                        // Object.isFrozen(proxy)
  isSealed:                 function(target) -> boolean                        // Object.isSealed(proxy)
  isExtensible:             function(target) -> boolean                        // Object.isExtensible(proxy)
  has:                      function(target,name) -> boolean                   // name in proxy
  hasOwn:                   function(target,name) -> boolean                   // ({}).hasOwnProperty.call(proxy,name)
  get:                      function(target,name,receiver) -> any              // receiver[name]
  set:                      function(target,name,val,receiver) -> boolean      // receiver[name] = val
  enumerate:                function(target) -> iterator                       // for (name in proxy) (iterator should yield all enumerable own and inherited properties)
  keys:                     function(target) -> [string]                       // Object.keys(proxy)  (return array of enumerable own properties only)
  apply:                    function(target,thisArg,args) -> any               // proxy(...args)
  construct:                function(target,args) -> any                       // new proxy(...args)
}
*/

test("a", "Object.getOwnPropertyDescriptor(obj, \"a\");");
test("a", "Object.getOwnPropertyDescriptor(obj, \"b\");");
test("a.a", "Object.getOwnPropertyDescriptor(obj, \"b.a\");");
test("a.a", "Object.getOwnPropertyDescriptor(obj, \"a.b\");");

//test("a", "obj.getOwnPropertyDescriptor(\"a\");");
//test("a", "obj.getOwnPropertyDescriptor(\"b\");");
//test("a.a", "obj.getOwnPropertyDescriptor(\"b.a\");");
//test("a.a", "obj.getOwnPropertyDescriptor(\"a.b\");");



test("a", "Object.getOwnPropertyNames(obj);");
test("a", "Object.getOwnPropertyNames(obj);");

//test("a", "obj.getOwnPropertyNames();");
//test("a", "obj.getOwnPropertyNames();");



test("a", "Object.getPrototypeOf(obj);");



test("a", "Object.defineProperty(obj, \"a\", {value:2,configurable:false});");
test("a", "Object.defineProperty(obj, \"b\", {value:2,configurable:false});");
test("b.a", "Object.defineProperty(obj.b, \"a\", {value:2,configurable:false});");
test("b.a", "Object.defineProperty(obj.b, \"b\", {value:2,configurable:false});");

//test("a", "obj.defineProperty(\"a\", 4711);");
//test("a", "obj.defineProperty(\"b\", 4711);");
//test("b.a", "obj.b.defineProperty(\"a\", 4711);");
//test("b.a", "obj.b.defineProperty(\"b\", 4711);");



test("a", "delete obj.a;");
test("a", "delete obj.b;");



test("a", "Object.freeze(obj).c;");
test("a", "Object.freeze(obj).xx;");

//test("a", "obj.freeze().a;");
//test("a", "obj.freeze().b;");



test("a", "Object.seal(obj).a;");
test("a", "Object.seal(obj).xx;");

//test("a", "obj.seal().a;");
//test("a", "obj.seal().b;");



test("a", "Object.preventExtensions(obj).a;");
test("a", "Object.preventExtensions(obj).xx;");

//test("a", "obj.preventExtensions().a;");
//test("a", "obj.preventExtensions().b;");



test("a", "Object.isFrozen(obj).a;");
test("a", "Object.isFrozen(obj).xx;");

//test("a", "obj.isFrozen().a;");
//test("a", "obj.isFrozen().b;");



test("a", "Object.isSealed(obj).a;");
test("a", "Object.isSealed(obj).xx;");

//test("a", "obj.isSealed().a;");
//test("a", "obj.isSealed().b;");



test("a", "Object.isExtensible(obj).a;");
test("a", "Object.isExtensible(obj).xx;");

//test("a", "obj.isExtensible().a;");
//test("a", "obj.isExtensible().b;");


test("a", "('a' in obj);");
test("b", "('a' in obj.a);");



test("a", "obj.a.hasOwnProperty('a');");
test("b", "obj.a.hasOwnProperty('a');");


test("a", "obj.a;");
test("b", "obj.a;");
test("a", "obj.a = 4711;");
test("b", "obj.a = 4711;");



test("a", "for (x in obj) {obj[x];}");
test("b", "for (x in obj.a) {obj[x];}");
test("a", "for (x in obj) {obj[x]=4711;}");



test("a", "Object.keys(obj);");
test("a", "Object.keys(obj.a);");
test("a", "Object.keys(obj.b);");


//test("a", "obj.keys();");
//test("a", "obj.a.keys();");
//test("a", "obj.b.keys();");


//test("a", "obj.forEach(function(name) {obj[name];});");
//test("a", "obj.forEach(function(name) {obj[name];});");



testFunc("a", "func();");
testFunc("b", "func();");



testFunc("a", "new func();");
testFunc("b", "new func();");
