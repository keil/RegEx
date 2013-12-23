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
(function(RegGen) {

        SELF = {};
        RegGen.Pool = SELF;

        //////////////////////////////////////////////////
        //  Literal Pool
        //////////////////////////////////////////////////

        /** Literal Pool
         * @param pool	Pre-pool
         */
        function Pool(pool) {

                /** Clone 
                 * @param cache	Pool-cache
                 */
                function clone(cache) {
                        var newCache = new StringMap();
                        cache.foreach(function(key, literal) {
                                newCache.set(key, literal);
                        });
                        return newCache;
                }

                var inString = 'a';
                var notInString = 'b';

                var inCache = (pool==undefined) ? new StringMap() : clone(pool.getInCache());
                var notInCache = (pool==undefined) ? new StringMap() : clone(pool.getNotInCache());

                var inCounter = (pool==undefined) ? 0 : pool.getInCounter();
                var notInCounter = (pool==undefined) ? 0 :  pool.getNotInCounter();

                /* @return new In-atom
                */
                this.getInAtom = function() {
                        inCounter++;
                        var key = inString+inCounter;

                        if(inCache.has(new RegGen.Dummy.AtomDummy(key).dump().toString())) {
                                return this.getInLiteral();
                        } else {
                                var literal = new RegGen.Dummy.AtomDummy(key);
                                inCache.set(literal.dump().toString(), literal);
                                return literal;
                        }
                };

                /* @return new NotIn-atom
                */
                this.getNotInAtom = function() {	
                        notInCounter++;
                        var key = notInString+notInCounter;

                        if(notInCache.has(new RegGen.Dummy.AtomDummy(key).dump().toString())) {
                                return this.getInLiteral();
                        } else {
                                var literal = new RegGen.Dummy.AtomDummy(key);
                                notInCache.set(literal.dump().toString(), literal);
                                return literal;
                        }
                };


                /* @return new In-set
                */
                this.getInSet = function() {
                        return new RegGen.Dummy.AtomDummy(this.getInAtom());                        
                };

                /* @return new NotIn-set
                */
                this.getNotInSet = function() {	
                        return new RegGen.Dummy.AtomDummy(this.getNotInAtom());	
                };

                /* @return new In-set
                */
                this.getInInv = function() {
                        return new RegGen.Dummy.AtomDummy(this.getNotInAtom());                        
                };

                /* @return new NotIn-set
                */
                this.getNotInInv = function() {	
                        return new RegGen.Dummy.AtomDummy(this.getInAtom());	
                };

                /** Invert */
                this.invert = function() {
                        var tmp;

                        tmp = inString;
                        inString = notInString;
                        notInString = tmp;

                        tmp = inCache;
                        inCache = notInCache;
                        notInCache = inCache;

                        tmp = inCounter;
                        inCounter = notInCounter;
                        notInCounter = inCounter;
                }

                /** To String
                 * @return String
                 */
                this.toString = function() {
                        var string = "";
                        inCache.foreach(function(key, literal) {string += key + ';';});
                        notInCache.foreach(function(key, literal) {string += key + ';';});
                        return '{' + string + '}';
                };

                /** Get In-Cache */
                this.getInCache = function() { return inCache; };
                /** Get NotIn-Cache */
                this.getNotInCache = function() { return notInCache; };
                /** Get In-Counter */
                this.getInCounter = function() { return inCounter; };
                /** Get NotIn-Cache */
                this.getNotInCounter = function() { return notInCounter; };

                /** For Each */
                this.foreach = function(callback) {
                        cache.foreach(callback);
                };
        }
        SELF.Pool = Pool;

})(__RegGen);
