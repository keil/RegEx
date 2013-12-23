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
        RegGen.Replaceable = SELF;

        /** Replaceable 
         * @param dummy	Dummy Object
         * @param sign Sign
         */
        function Replaceable(dummy, sign) {
                var origin = dummy;
                var sign = (sign==undefined) ? true: sign;

                this.replaceWith = function(newdummy) { dummy = newdummy; };
                this.restore = function() { dummy = origin; };
                this.invert = function() { sign = !sign; }
                this.getOrigin = function() { return origin; };
                this.getSign = function() { return sign; };
                this.dump = function() { return dummy.dump(); };
                this.toString = function () { return "[" + ((sign)?"+":"-") + dummy.toString() + "]" };
        }
        SELF.Replaceable = Replaceable;

        Replaceable.prototype = {

                _inOpt: false,
                _inStar: false,
                _inOr: false,
                _inAnd: false,
                _inNeg: false,
                _inConcat: false,

                _isOpt: false,
                _isStar: false,
                _isOr: false,
                _isAnd: false,
                _isNeg: false,
                _isConcat: false,

                set inOpt(val) { this._inOpt = val; },
                set inStar(val) { this._inStar = val; },
                set inOr(val) { this._inOr = val; },
                set inAnd(val) { this._inAnd = val; },
                set inNeg(val) { this._inNeg = val; },
                set inConcat(val) { this._inConcat = val; },

                set isOpt(val) { this._isOpt = val; },
                set isStar(val) { this._isStar = val; },
                set isOr(val) { this._isOr = val; },
                set isAnd(val) { this._isAnd = val; },
                set isNeg(val) { this._isNeg = val; },
                set isConcat(val) { this._isConcat = val;},

                get inOpt() { return this._inOpt; },
                get inStar() { return this._inStar; },
                get inOr() { return this._inOr; },
                get inAnd() { return this._inAnd; },
                get inNeg() { return this._inNeg; },
                get inConcat() { return this._inConcat; },

                get isOpt() { return this._isOpt; },
                get isStar() { return this._isStar; },
                get isOr() { return this._isOr; },
                get isAnd() { return this._isAnd; },
                get isNeg() { return this._isNeg; },
                get isConcat() { return this._isConcat;  },


                showFlags: function () {
                        return "[" + this._inOpt + "," + this.inStar + "," + this._inOr + "," + this._inAnd + "," + this._inNeg + "," + this._inConcat + "/"
                                + this._isOpt + "," + this._isStar + "," + this._isOr + "," + this._isAnd + "," + this._isNeg + "," + this._isConcat + "]"; 
                }
        };


        //////////////////////////////////////////////////
        // Store
        //////////////////////////////////////////////////

        /** Replaceable Store
        */
        function Store() {

                //gc();

                var cache = new Cache();



                //
                this.getCache = function() {
                        return cache;
                }

                this.push = function(arg) {
                        cache.push(arg);
                }


                this.merge = function(arg) {
                        cache.append(arg.getCache());
                }



                this.setIsOpt = function () {
                        cache.foreach(function(i, v) {v.isOpt = true;});
                }

                this.setIsStar = function () {
                        cache.foreach(function(i, v) {v.isStar = true;});
                }

                this.setIsOr = function () {
                        cache.foreach(function(i, v) {v.isOr = true;});
                }

                this.setIsAnd = function () {
                        cache.foreach(function(i, v) {v.isAnd = true;});
                }

                this.setIsNeg = function () {
                        cache.foreach(function(i, v) {v.isNeg = true;});
                }

                this.setIsConcat = function () {
                        cache.foreach(function(i, v) {v.isConcat = true;});
                }



                this.setInOpt = function () {
                        cache.foreach(function(i, v) {v.inOpt = true;});
                }

                this.setInStar = function () {
                        cache.foreach(function(i, v) {v.inStar = true;});
                }

                this.setInOr = function () {
                        cache.foreach(function(i, v) {v.inOr = true;});
                }

                this.setInAnd = function () {
                        cache.foreach(function(i, v) {v.inAnd = true;});
                }

                this.setInNeg = function () {
                        cache.foreach(function(i, v) {v.inNeg = true;});
                }

                this.setInConcat = function () {
                        cache.foreach(function(i, v) {v.inConcat = true;});
                }



                /** To String */
                this.toString = function () {
                        return cache.toString();
                };

                /** Invert */
                this.invert = function() {
                        cache.invert();
                }
        }
        SELF.Store = Store;

        //////////////////////////////////////////////////
        // Cache
        //////////////////////////////////////////////////

        /** Replaceable Cache
         * @param arg	Replaceable Cache
         */
        function Cache(arg, replaceable) {

                /** Clone 
                 * @param cache	Replaceable-cache
                 * @return Cloned Replaceable-cache
                 */
                function clone(oldCache, replaceable) { // TODO, needed ?
                        var newCache = new Array();
                        oldCache.foreach(function(key, replaceable) {
                                newCache.push(replaceable);
                        });
                        if(replaceable!=null) newCache.push(replaceable);
                        return newCache;
                }

                // copy elements from arg
                var cache = (arg==undefined) ? new Array() : clone(arg, replaceable);

                /** Push
                 * @param replaceable	Replaceable
                 */
                this.push = function(replaceable) {
                        cache.push(replaceable);
                };

                /** Append
                 * @param arg	Cache
                 */
                this.append = function(arg) {
                        arg.foreach(function(i, result) {
                                cache.push(result);
                        });
                }

                /** To String */
                this.toString = function () { return cache.toString(); };
                /** Get Length */
                this.getLength = function() { return cache.length; }
                /** For Each*/
                this.foreach = function(callback) { cache.foreach(callback); };
                /** Invert */
                this.invert = function() {
                        cache.foreach(function(i, result) {
                                result.invert();
                        });
                }
        }
        SELF.Cache = Cache;

})(__RegGen);
