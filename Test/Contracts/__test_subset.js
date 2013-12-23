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

tpe1 = new __APC.TracePath.TraceEmpty();
tpe2 = new __APC.TracePath.TraceEmpty();

tpA1 = new __APC.TracePath.TraceProperty("a");
tpA2 = new __APC.TracePath.TraceProperty("a");

tpB1 = new __APC.TracePath.TraceProperty("b");
tpB2 = new __APC.TracePath.TraceProperty("b");

tpC1 = new __APC.TracePath.TraceProperty("c");
tpC2 = new __APC.TracePath.TraceProperty("c");

tpF1 = new __APC.TracePath.TraceProperty("f");
tpF2 = new __APC.TracePath.TraceProperty("f");


tpAA1 =  new __APC.TracePath.TracePath(tpA1, tpA2);
tpAA2 =  new __APC.TracePath.TracePath(tpA1, tpA2);

tpAB1 =  new __APC.TracePath.TracePath(tpA1, tpB2);

tpAB2 =  new __APC.TracePath.TracePath(tpA1, tpB1);

tpBC1 =  new __APC.TracePath.TracePath(tpB1, tpC1);
tpBC2 =  new __APC.TracePath.TracePath(tpB1, tpC1);

tpAAuAB = new __APC.TracePath.TraceSet(tpAA1, tpAB1);
tpABuBC = new __APC.TracePath.TraceSet(tpAB1, tpBC1);


tpFA = new __APC.TracePath.TraceArgument(tpF1, tpA1);

function testT(p0, p1) {
	__sysout(p0.toString() + " isSupSetEqOf " + p1.toString());
	//__sysout("# " + p0.isSubSetEqOf(p1));

	// TODO: deactivated
	//assertTrue(p0.isSubSetEqOf(p1));
}

function testF(p0, p1) {
	__sysout(p0.toString() + " isSupSetEqOf " + p1.toString());
	//__sysout("# " + p0.isSubSetEqOf(p1));

	// TODO: deactivated
	// assertFalse(p0.isSubSetEqOf(p1));
}


testT(tpe1,tpe2);

testT(tpA1,tpA2);
testF(tpA1,tpB1);

testT(tpA1,tpAA1);
testF(tpB1,tpAA1);

testT(tpA1,tpABuBC);
testT(tpAB1,tpABuBC);
testT(tpB1,tpABuBC);
testT(tpBC1,tpABuBC);

testF(tpB1,tpAAuAB);
testF(tpBC1,tpAAuAB);
