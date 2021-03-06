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

__RegEx.Literal = (function() {

        SELF = new Object();

        SELF.Atom		= Atom;
        SELF.Set		= Set;
        SELF.Inv		= Inv;

        SELF.Digit		= Digit;
        SELF.Char		= Char;
        SELF.LowerChar	= LowerChar;
        SELF.UpperChar	= UpperChar;
        SELF.Alpha		= Alpha;
        SELF.Wildcard	= Wildcard;

        SELF.intersection 	= intersection;
        SELF.invert			= invert;
        SELF.subset			= subset;
        SELF.disjoint		= disjoint;

        //////////////////////////////////////////////////
        // Advanced Regular Expressions
        //
        // Literal           l   = a | A | ^A (| ? | [digit] | [char] | [lchar] | [uchar] | [alpha])
        // Expression        r,s = Ø | ϵ | l | r* | r+s | r&s | !r | r·s 
        //////////////////////////////////////////////////

        // literal cache
        var cache = __RegEx.Cache.Literals;

        //          _                  
        //     /\  | |                 
        //    /  \ | |_ ___  _ __ ___  
        //   / /\ \| __/ _ \| '_ ` _ \ 
        //  / ____ \ || (_) | | | | | |
        // /_/    \_\__\___/|_| |_| |_|

        /**
         * Atom (a,b,c,...)
         */
        function Atom(a) {			
                if(!(this instanceof Atom)) {
                        return cache.c(new Atom (a));
                }
                //////////////////////////////////////////////////
                this.nullable = function() {
                        return false;
                };
                this.first = function() {
                        return Array(this);
                };
                //////////////////////////////////////////////////
                this.empty = function() {
                        return false;
                };
                this.indifferent = function() {
                        return false;
                };
                this.universal = function() {
                        return false;
                };
                //////////////////////////////////////////////////
                this.deriv = function(b) {
                        return (a == b) ? __RegEx.Expression.Empty() : __RegEx.Expression.Null();
                };
                this.nderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Star(__RegEx.Literal.Wildcard);
                        else return (l == this) ? __RegEx.Expression.Empty() : __RegEx.Expression.Null();
                };
                this.pderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Null();
                        else return (disjoint(l, this)) ? __RegEx.Expression.Null() : __RegEx.Expression.Empty();
                };
                //////////////////////////////////////////////////
                this.isSuperSetOf = function (sub) {
                        // sub <= this
                        return __RegEx.Containment.solve(sub, this);
                };
                this.isSubSetOf = function (sup) {
                        // sub <= this
                        return __RegEx.Containment.solve(this, sup);
                };
                //////////////////////////////////////////////////
                this.toString = function () {
                        return a.toString();
                };
        }

        //  _____ _                          _               _____      _   
        //  / ____| |                        | |             / ____|    | |  
        // | |    | |__   __ _ _ __ __ _  ___| |_ ___ _ __  | (___   ___| |_ 
        // | |    | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__|  \___ \ / _ \ __|
        // | |____| | | | (_| | | | (_| | (__| ||  __/ |     ____) |  __/ |_ 
        //  \_____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|    |_____/ \___|\__|

        /**
         * Set (A,B,C,...)
         */
        function Set(A) {
                if(!(this instanceof Set)) {
                        return cache.c(new Set (A));
                }

                if(A instanceof Array) {
                        A.foreach(function(i, a) {
                                A[i] = (a instanceof Atom) ? a : Atom(a);
                        });
                } else if (A instanceof Atom) {
                        A = Array(A);
                } else {
                        A = Array();
                }
                //////////////////////////////////////////////////
                this.nullable = function() {
                        return false;
                };
                this.first = function() {
                        return Array(this);
                };
                //////////////////////////////////////////////////
                this.empty = function() {
                        return (A.length==0) ? true : false;
                };
                this.indifferent = function() {
                        return false;
                };
                this.universal = function() {
                        return false;
                };
                //////////////////////////////////////////////////
                this.deriv = function(b) {
                        var result = __RegEx.Expression.Null();
                        A.foreach(function(i, a) {
                                result = (a == b) ? __RegEx.Expression.Empty() : result;
                        });
                        return result;
                };
                this.nderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Star(__RegEx.Literal.Wildcard);
                        else return (subset(l, this)) ? __RegEx.Expression.Empty() : __RegEx.Expression.Null()
                };
                this.pderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Null();
                        else return (disjoint(l, this)) ? __RegEx.Expression.Null() : __RegEx.Expression.Empty()
                };
                //////////////////////////////////////////////////
                this.isSuperSetOf = function (sub) {
                        // sub <= this
                        return __RegEx.Containment.solve(sub, this);
                };
                this.isSubSetOf = function (sup) {
                        // sub <= this
                        return __RegEx.Containment.solve(this, sup);
                };
                //////////////////////////////////////////////////
                this.foreach = function(callback) {
                        A.foreach(callback);
                };
                this.has = function (a) {
                        var contains = false;
                        if(a instanceof Atom) {
                                A.foreach(function(i,b) {
                                        contains = (a==b) ? true : contains;
                                });
                        }
                        return contains;
                };
                this.size = function () {
                        return A.length;
                };
                this.array = function () {
                        return (Array).concat(A);
                };
                this.toString = function () {
                        var str = "";
                        A.foreach(function(i,v) {
                                str += v.toString();
                        });
                        return "[" + str + "]";
                };
        }

        //  _____                     _           _    _____      _   
        // |_   _|                   | |         | |  / ____|    | |  
        //   | |  _ ____   _____ _ __| |_ ___  __| | | (___   ___| |_ 
        //   | | | '_ \ \ / / _ \ '__| __/ _ \/ _` |  \___ \ / _ \ __|
        //  _| |_| | | \ V /  __/ |  | ||  __/ (_| |  ____) |  __/ |_ 
        // |_____|_| |_|\_/ \___|_|   \__\___|\__,_| |_____/ \___|\__|

        /**
         * Inv (^A,^B,^C,...)
         */
        function Inv(A) {			
                if(!(this instanceof Inv)) {
                        return cache.c(new Inv (A));
                }

                if(A instanceof Array) {
                        A.foreach(function(i, a) {
                                A[i] = (a instanceof Atom) ? a : Atom(a);
                        });
                } else if (A instanceof Atom) {
                        A = Array(A);
                } else {
                        A = Array();
                }
                //////////////////////////////////////////////////
                this.nullable = function() {
                        return false;
                };
                this.first = function() {
                        return Array(this);
                };
                //////////////////////////////////////////////////
                this.empty = function() {
                        return false;
                };
                this.indifferent = function() {
                        return false;
                };
                this.universal = function() {
                        return (A.length==0) ? true : false;
                };
                //////////////////////////////////////////////////
                this.deriv = function(b) {
                        var result = __RegEx.Expression.Empty();
                        A.foreach(function(i, a) {
                                result = (a == b) ? __RegEx.Expression.Null() : result;
                        });
                        return result;
                };
                this.nderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Star(__RegEx.Literal.Wildcard);
                        else return (subset(l, this)) ? __RegEx.Expression.Empty() :  __RegEx.Expression.Null();
                };
                this.pderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Null();
                        else return (disjoint(l, this)) ? __RegEx.Expression.Null() :  __RegEx.Expression.Empty();
                };
                //////////////////////////////////////////////////
                this.isSuperSetOf = function (sub) {
                        // sub <= this
                        return __RegEx.Containment.solve(sub, this);
                };
                this.isSubSetOf = function (sup) {
                        // sub <= this
                        return __RegEx.Containment.solve(this, sup);
                };
                //////////////////////////////////////////////////
                this.foreach = function(callback) {
                        A.foreach(callback);
                };
                this.has = function (a) {
                        var contains = false;
                        if(a instanceof Atom) {
                                A.foreach(function(i, b) {
                                        contains = (a==b) ? true : contains;
                                });
                        }
                        return contains;
                };
                this.size = function () {
                        return A.length;
                };
                this.array = function () {
                        return (Array).concat(A);
                };
                this.toString = function () {
                        var str = "";
                        A.foreach(function(i,v) {
                                str += v;
                        });
                        return "[^" + str + "]";
                };
        }

        // __          ___ _     _                   _ 
        // \ \        / (_) |   | |                 | |
        //  \ \  /\  / / _| | __| | ___ __ _ _ __ __| |
        //   \ \/  \/ / | | |/ _` |/ __/ _` | '__/ _` |
        //    \  /\  /  | | | (_| | (_| (_| | | | (_| |
        //     \/  \/   |_|_|\__,_|\___\__,_|_|  \__,_|

        /**
         * QMArk (?)
         */
        function Wildcard() {			
                if(!(this instanceof Wildcard)) {
                        return cache.c(new Wildcard ());
                }
                //////////////////////////////////////////////////
                this.nullable = function() {
                        return false;
                };
                this.first = function() {
                        return Array(this);
                };
                //////////////////////////////////////////////////
                this.empty = function() {
                        return false;
                };
                this.indifferent = function() {
                        return true;
                };
                this.universal = function() {
                        return false;
                };
                //////////////////////////////////////////////////
                this.deriv = function(b) {
                        return __RegEx.Expression.Empty();
                };
                this.nderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Star(__RegEx.Literal.Wildcard);
                        else return __RegEx.Expression.Empty();
                };
                this.pderiv = function(l) {
                        if(l.empty()) return __RegEx.Expression.Null();
                        else return __RegEx.Expression.Empty();
                };
                //////////////////////////////////////////////////
                this.isSuperSetOf = function (sub) {
                        // sub <= this
                        return __RegEx.Containment.solve(sub, this);
                };
                this.isSubSetOf = function (sup) {
                        // sub <= this
                        return __RegEx.Containment.solve(this, sup);
                };
                //////////////////////////////////////////////////
                this.toString = function () {
                        return "?";
                };
        }

        //   _____ _                          _                   _                         
        //  / ____| |                        | |                 | |                        
        // | |    | |__   __ _ _ __ __ _  ___| |_ ___ _ __    ___| | __ _ ___ ___  ___  ___ 
        // | |    | '_ \ / _` | '__/ _` |/ __| __/ _ \ '__|  / __| |/ _` / __/ __|/ _ \/ __|
        // | |____| | | | (_| | | | (_| | (__| ||  __/ |    | (__| | (_| \__ \__ \  __/\__ \
        //  \_____|_| |_|\__,_|_|  \__,_|\___|\__\___|_|     \___|_|\__,_|___/___/\___||___/

        var digit = Array(0,1,2,3,4,5,6,7,8,9);
        var lchar = Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
        var uchar = Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        var char = lchar.concat(uchar);
        var alpha = char.concat(digit);

        //  _____  _       _ _   
        // |  __ \(_)     (_) |  
        // | |  | |_  __ _ _| |_ 
        // | |  | | |/ _` | | __|
        // | |__| | | (_| | | |_ 
        // |_____/|_|\__, |_|\__|
        //            __/ |      
        //           |___/       

        function Digit() {
                if(!(this instanceof Digit)) {
                        return cache.c(new Digit ());
                }
                //////////////////////////////////////////////////
                this.toString = function () {
                        return "[digit]";
                };
        }
        Digit.prototype = new Set(digit);

        //   _____ _                
        //  / ____| |               
        // | |    | |__   __ _ _ __ 
        // | |    | '_ \ / _` | '__|
        // | |____| | | | (_| | |   
        //  \_____|_| |_|\__,_|_|   

        function Char() {
                if(!(this instanceof Char)) {
                        return cache.c(new Char ());
                }
                //////////////////////////////////////////////////
                this.toString = function () {
                        return "[char]";
                };

        }
        Char.prototype = new Set(char);

        //  _                               _____ _                
        // | |                             / ____| |               
        // | |     _____      _____ _ __  | |    | |__   __ _ _ __ 
        // | |    / _ \ \ /\ / / _ \ '__| | |    | '_ \ / _` | '__|
        // | |___| (_) \ V  V /  __/ |    | |____| | | | (_| | |   
        // |______\___/ \_/\_/ \___|_|     \_____|_| |_|\__,_|_|   

        function LowerChar() {
                if(!(this instanceof LowerChar)) {
                        return cache.c(new LowerChar ());
                }
                //////////////////////////////////////////////////
                this.toString = function () {
                        return "[lchar]";
                };

        }
        LowerChar.prototype = new Set(lchar);

        //  _    _                          _____ _                
        // | |  | |                        / ____| |               
        // | |  | |_ __  _ __   ___ _ __  | |    | |__   __ _ _ __ 
        // | |  | | '_ \| '_ \ / _ \ '__| | |    | '_ \ / _` | '__|
        // | |__| | |_) | |_) |  __/ |    | |____| | | | (_| | |   
        //  \____/| .__/| .__/ \___|_|     \_____|_| |_|\__,_|_|   
        //        | |   | |                                        
        //        |_|   |_|                                        

        function UpperChar() {
                if(!(this instanceof UpperChar)) {
                        return cache.c(new UpperChar ());
                }
                //////////////////////////////////////////////////
                this.toString = function () {
                        return "[uchar]";
                };

        }
        UpperChar.prototype = new Set(uchar);

        //           _       _           
        //     /\   | |     | |          
        //    /  \  | |_ __ | |__   __ _ 
        //   / /\ \ | | '_ \| '_ \ / _` |
        //  / ____ \| | |_) | | | | (_| |
        // /_/    \_\_| .__/|_| |_|\__,_|
        //            | |                
        //            |_|                

        function Alpha() {
                if(!(this instanceof Alpha)) {
                        return cache.c(new Alpha ());
                }
                //////////////////////////////////////////////////
                this.toString = function () {
                        return "[alpha]";
                };
        }
        Alpha.prototype = new Set(alpha);

        //  ____                        _                    
        // |  _ \                      | |                   
        // | |_) | __ _ ___  ___ ______| |_ _   _ _ __   ___ 
        // |  _ < / _` / __|/ _ \______| __| | | | '_ \ / _ \
        // | |_) | (_| \__ \  __/      | |_| |_| | |_) |  __/
        // |____/ \__,_|___/\___|       \__|\__, | .__/ \___|
        //                                   __/ | |         
        //                                  |___/|_|         
        //  _      _ _                 _    ____                       _                 
        // | |    (_) |               | |  / __ \                     | |                
        // | |     _| |_ ___ _ __ __ _| | | |  | |_ __   ___ _ __ __ _| |_ ___  _ __ ___ 
        // | |    | | __/ _ \ '__/ _` | | | |  | | '_ \ / _ \ '__/ _` | __/ _ \| '__/ __|
        // | |____| | ||  __/ | | (_| | | | |__| | |_) |  __/ | | (_| | || (_) | |  \__ \
        // |______|_|\__\___|_|  \__,_|_|  \____/| .__/ \___|_|  \__,_|\__\___/|_|  |___/
        //                                       | |                                     
        //                                       |_|                                     

        /** INTERSECTION 
         * @param e literal
         * @param f literal
         * @return literal
         */
        function intersection(e, f) {

                // GENERAL RULES

                // e:Wildcard ∏ f:Literal
                if(e instanceof Wildcard) return f;
                // e:Literal ∏ f:Wildcard
                else if(f instanceof Wildcard) return e;

                // MATRIX

                // e:Atom
                if(e instanceof Atom) {
                        // e:Atom ∏ f:Atom
                        if(f instanceof Atom) 
                                return (e==f) ? e : Set();
                        // e:Atom ∏ f:Set
                        else if(f instanceof Set)
                                return f.has(e) ? e : Set();
                        // e:Atom ∏ f:Inv
                        else if(f instanceof Inv)
                                return f.has(e) ? Set() : e;		
                        // e:Set
                } else if(e instanceof Set) {
                        // e:Set ∏ f:Atom
                        if(f instanceof Atom)
                                return e.has(f) ? f :Set();
                        // e:Set ∏ f:Set
                        else if(f instanceof Set) {
                                var result = Array();
                                e.foreach(function(i, a) {
                                        if(f.has(a)) result.add(a);
                                });
                                return Set(result);
                        }
                        // e:Set ∏ f:Inv
                        else if(f instanceof Inv) {
                                var result = Array();
                                e.foreach(function(i, a) {
                                        if(!(f.has(a))) result.add(a);
                                });
                                return Set(result);
                        }
                        // e:Inv
                } else if(e instanceof Inv) {
                        // e:Inv ∏ f:Atom
                        if(f instanceof Atom) return e.has(f) ? Set() : f;
                        // e:Inv ∏ f:Set
                        else if(f instanceof Set) {
                                var result = Array();
                                f.foreach(function(i, a) {
                                        if(!(e.has(a))) result.add(a);
                                });
                                return Set(result);
                        }
                        // e:Inv ∏ f:Inv
                        else if(f instanceof Inv) {
                                var result = e.array();
                                f.array().foreach(function(i, a) {
                                        if(!(function() {
                                                var contains = false;
                                                result.foreach(function(j, b) {
                                                        contains = (a==b) ? true : contains;	
                                                });
                                                return contains;
                                        })()) result.add(a);
                                });
                                return Inv(result);
                        }
                }
        }

        /** INVERT
         * @param e literal
         * @return literal
         */
        function invert(l) {
                // l:Atom
                if(l instanceof Atom) return Inv(l);
                // l:Set 
                else if(l instanceof Set) return Inv(l.array());
                // l:Inv
                else if(l instanceof Inv) return Set(l.array());
                // l:Wildcard
                else if(l instanceof Wildcard) return Set();
        }

        /** SUBSET e <= f
         * @param e left literal
         * @param f right literal
         * @return literal
         */
        function subset(e, f) {

                // GENERAL RULES

                // e:Atom <= f:Wildcard
                if(f instanceof Wildcard) return true;

                // MATRIX

                // e:Atom
                if(e instanceof Atom) {
                        // e:Atom <= f:Atom
                        if(f instanceof Atom)
                                return (e==f) ? true : false;
                        // e:Atom <= f:Set
                        else if(f instanceof Set)
                                return f.has(e);
                        // e:Atom <= f:Inv
                        else if(f instanceof Inv)
                                return !(f.has(e));
                        // e:Set
                } else if(e instanceof Set) {
                        // e:Set <= f:Atom
                        if(f instanceof Atom)
                                return (e.size()==1 && e.has(f)) ? true : false; 
                        // e:Set <= f:Set
                        else if(f instanceof Set) {
                                var result = true;
                                e.foreach(function(i, a) {
                                        result = (f.has(a)) ? result : false;
                                });
                                return result;
                        }
                        // e:Set <= f:Inv
                        else if(f instanceof Inv) {
                                var result = true;
                                e.foreach(function(i, a) {
                                        result = (f.has(a)) ? false : result;
                                });
                                return result;
                        }
                        // e:Inv
                } else if(e instanceof Inv) {
                        // e:Inv <= f:Atom
                        if(f instanceof Atom) {
                                // NOTE: Alphabet-dependent
                                return false;
                        }
                        // e:Inv <= f:Set
                        else if(f instanceof Set) {
                                // NOTE: Alphabet-dependent
                                return false;
                        }
                        // e:Inv <= f:Inv
                        else if(f instanceof Inv) {
                                var result = true;
                                f.foreach(function(i, a) {
                                        result = (e.has(a)) ? result : false;
                                });
                                return result;
                        }
                        // e:Wildcard
                } else if(e instanceof Wildcard) {
                        // e:Wildcard <= f:Wildcard
                        // NOTE: Alphabet-dependent
                        return (f instanceof Wildcard) ? true : false; 
                }
        }

        /** DISJOINT e ∏ f = Ø
         * @param e left literal
         * @param f right literal
         * @return literal
         */
        function disjoint(e, f) {

                // MATRIX

                // e:Atom
                if(e instanceof Atom) {
                        // e:Atom ∏  f:Atom = Ø
                        if(f instanceof Atom)
                                return (e==f) ? false : true;
                        // e:Atom ∏  f:Set = Ø
                        else if(f instanceof Set)
                                return !(f.has(e));
                        // e:Atom ∏  f:Inv = Ø
                        else if(f instanceof Inv)
                                return f.has(e);
                        // e:Atom ∏  f:Wildcard = Ø
                        else if(f instanceof Wildcard)
                                return false;
                        // e:Set
                } else if(e instanceof Set) {
                        // e:Set ∏  f:Atom = Ø
                        if(f instanceof Atom)
                                return (e.has(f)) ? false : true; 
                        // e:Set ∏  f:Set = Ø
                        else if(f instanceof Set) {
                                var result = true;
                                e.foreach(function(i, a) {
                                        result = (f.has(a)) ? false : result;
                                });
                                return result;
                        }
                        // e:Set ∏  f:Inv = Ø
                        else if(f instanceof Inv) {
                                var result = true;
                                e.foreach(function(i, a) {
                                        result = (f.has(a)) ? result : false;
                                });
                                return result;
                        }
                        // e:Set ∏  f:Wildcard = Ø
                        else if(f instanceof Wildcard)
                                return (e.size()==0) ? true : false;

                        // e:Inv
                } else if(e instanceof Inv) {
                        // e:Inv ∏  f:Atom = Ø
                        if(f instanceof Atom) {
                                return e.has(f);
                        }
                        // e:Inv ∏  f:Set = Ø
                        else if(f instanceof Set) {
                                var result = true;
                                f.foreach(function(i, a) {
                                        result = (e.has(a)) ? result : false;
                                });
                                return result;
                        }
                        // e:Inv ∏  f:Inv = Ø
                        else if(f instanceof Inv) {
                                // NOTE: Alphabet-dependent
                                return false;
                        }
                        // e:Set ∏  f:Wildcard = Ø
                        else if(f instanceof Wildcard)
                                // NOTE: Alphabet-dependent
                                return false;
                        // e:Wildcard
                } else if(e instanceof Wildcard) {
                        // e:Wildcard ∏  f:Atom = Ø
                        if(f instanceof Atom) {
                                return false;
                        }
                        // e:Wildcard ∏  f:Set = Ø
                        else if(f instanceof Set) {
                                return (f.size()==0) ? true : false;
                        }
                        // e:Wildcard ∏  f:Inv = Ø
                        else if(f instanceof Inv) {
                                // NOTE: Alphabet-dependent
                                return false;
                        }
                        // e:Wildcard ∏  f:Wildcard = Ø
                        else if(f instanceof Wildcard)
                                return false;
                }
        }

        return SELF;
})();
