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
 * $Date: 2013-03-08 07:46:31 +0100 (Fri, 08 Mar 2013) $
 * $Rev: 23151 $
 */


empty = new __APC.TracePath.TraceEmpty();

a = new __APC.TracePath.TraceProperty("a");
b = new __APC.TracePath.TraceProperty("b");
c = new __APC.TracePath.TraceProperty("c");
d = new __APC.TracePath.TraceProperty("d");
e = new __APC.TracePath.TraceProperty("e");
f = new __APC.TracePath.TraceProperty("f");

//p1 = new __APC.TracePath.TracePath(b, c);
//q1 =  new __APC.TracePath.TracePath(d, e);
//s0 = new __APC.TracePath.TraceSet(p1, q1);
//b0 = new __APC.TracePath.TracePath(start, a);
//b1 = new __APC.TracePath.TracePath(b0, s0);
//b2 = new __APC.TracePath.TracePath(b1, f);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

trie = new __APC.TracePath.PathTrie();
trie = trie.makeEndOfPath();
trie = trie.append(a);
trie = trie.append(b);
trie = trie.append(c);




//////////////////////////////////////////////////
trie1 = new __APC.TracePath.PathTrie();
trie1 = trie1.makeEndOfPath();
trie1 = trie1.append(a);

trie = trie.merge(trie1);



//////////////////////////////////////////////////
trie2 = new __APC.TracePath.PathTrie();
trie2 = trie2.makeEndOfPath();
trie2 = trie2.append(b);
trie2 = trie2.append(c);

trie = trie.merge(trie2);



//////////////////////////////////////////////////
trie3 = new __APC.TracePath.PathTrie();
trie3 = trie3.makeEndOfPath();

trie3 = trie3.append(b);
trie3 = trie3.append(c);
trie3 = trie3.append(c);

trie = trie.merge(trie3);


//////////////////////////////////////////////////
trieX = new __APC.TracePath.PathTrie();
trieX = trieX.makeEndOfPath();

trieX = trieX.append(a);
trieX = trieX.append(b);
trieX = trieX.append(c);

trieY = new __APC.TracePath.PathTrie();
trieY = trieY.makeEndOfPath();

trieY = trieY.append(a);
trieY = trieY.append(b);
trieY = trieY.append(c);
trieY = trieY.append(d);
trieY = trieY.append(f);

trieX = trieX.merge(trieY);


//////////////////////////////////////////////////
trie = trie.merge(trieX);

trieY = trieY.append(__APC.TracePath.TraceProperty("SASA"));

trie = trie.merge(trieY);


//////////////////////////////////////////////////
__sysout("\n\n### TO STRING");
__sysout(trie);
__sysout(trie.print());

__sysout("\n\n### DUMP");
__sysout(trie.paths);

trie.paths.foreach(function(s, o) {
__sysout("edge:: " + o);
});
