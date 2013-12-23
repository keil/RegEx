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

contract = __APC.Parser.parse("");
contract = __APC.Parser.parse("a");
contract = __APC.Parser.parse("aaaa");
contract = __APC.Parser.parse("a123");
contract = __APC.Parser.parse("@");
contract = __APC.Parser.parse("?");

contract = __APC.Parser.parse("/a*/");
contract = __APC.Parser.parse("/^a?$/");
contract = __APC.Parser.parse("/[a-z]/");
contract = __APC.Parser.parse("/abc*/");
contract = __APC.Parser.parse("/(abc)*/");

contract = __APC.Parser.parse("a.b.c");
contract = __APC.Parser.parse("a.@.c");
contract = __APC.Parser.parse("a.?.c");
contract = __APC.Parser.parse("a./reg/.c");
contract = __APC.Parser.parse("a.(a+b).c");
contract = __APC.Parser.parse("a.(a+b).c");
contract = __APC.Parser.parse("a.!(a).c");
contract = __APC.Parser.parse("a.!(@).c");
contract = __APC.Parser.parse("a.!(?).c");
contract = __APC.Parser.parse("a.!(/reg/).c");

contract = __APC.Parser.parse("a.b?.c");
contract = __APC.Parser.parse("a.b*.c");
contract = __APC.Parser.parse("a.(a+b)?.c");
contract = __APC.Parser.parse("a.(a&b)*.c");
contract = __APC.Parser.parse("a.!(a)?.c");
contract = __APC.Parser.parse("a.!(@)*.c");

contract = __APC.Parser.parse("((/^get.*$/+length)&!(/^set.*$/)).@");
