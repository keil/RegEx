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
        RegGen.Statistics = SELF;

        //////////////////////////////////////////////////
        // Container
        //////////////////////////////////////////////////

        /** Call Statistics
        */
        function CallStatistics() {
                var sumDerive = 0;
                var sumLDerive = 0;
                var sumUDerive = 0;
                var sumSuperSetOf = 0;
                var sumSubSetOf = 0;
                //////////////////////////////////////////////////
                this.incDeriveStat = function() {sumDrive++;};
                this.incLDeriveStat = function() {sumLDerive++;};
                this.incUDeriveStat = function() {sumUDerive++;};
                this.incSuperSetOfStat = function() {sumSuperSetOf++;};
                this.incSubSetOfStat = function() {sumSubSetOf++;};
                //////////////////////////////////////////////////
                this.getDeriveStat = function() {return sumDrive;};
                this.getLDeriveStat = function() {return sumLDerive;};
                this.getUDeriveStat = function() {return sumUDerive;};
                this.getSuperSetOfStat = function() {return sumSuperSetOf;};
                this.getSubSetOfStat = function() {return sumSubSetOf;};
                //////////////////////////////////////////////////
                this.toString = function() {
                        return "Derive:" + sumDerive + 
                                " LDerive" + sumLDerive +
                                " UDerive" + sumUDerive +	
                                " SuperSetOf" + sumSuperSetOf +
                                " SubSetOf" + sumSubSetOf; 
                }
        }
        SELF.CallStatistics = CallStatistics;

        //////////////////////////////////////////////////
        // Container
        //////////////////////////////////////////////////

        /** Container
         * @param left left RegGen Wrapper
         * @param right right RegGen Wrapper
         * @param depth nesting index
         * @param isValid true, if left <= right, false otherwise
         * @param type Transformation Type
         */
        function Container(left, right, depth, isValid, type) {
                // true, if left <= right, false otherwise
                var isSubset = undefined;
                var callStatistics = new CallStatistics();	

                /** Solve Inequality
                */	
                this.solveInequality = function() {
                        RegGen.Statistics.currentCallStatistics = callStatistics;
                        isSubset = left.isSubSetOf(right); //, new RegGen.APC.Contract.Containment.Context()); // TODO other direction
                        //isSubset = right.isSuperSetOf(left); //, new RegGen.APC.Contract.Containment.Context());
                        RegGen.Statistics.currentCallStatistics = undefined;
                }

                /** Return Statistics
                */	
                this.getStatistics = function() {
                        return new Statistic(this, isSubset)
                }

                /** To String
                */
                this.toString = function() {
                        return left.toString() + " <= " + right.toString();
                }

                /** Left
                 * @return left RegGen
                 */
                this.getLeft = function() {
                        return left;
                }

                /** Right
                 * @return right RegGen
                 */
                this.getRight = function() {
                        return right;
                }

                /** Depth
                 * @return depth
                 */
                this.getDepth = function() {
                        return depth;
                }

                /** Is Valid SubSet
                 * @return isValid
                 */
                this.isValid = function() {
                        return isValid;
                }

                /** get Type
                 * @return type
                 */
                this.getType = function() {
                        return type;
                }


                /** get Call Statistics
                 * @return callStatistics
                 */
                this.getCallStatistics = function() {
                        return callStatistics;
                }

        }

        //////////////////////////////////////////////////
        // Statistic (Result)
        //////////////////////////////////////////////////

        /** Statistic
         * @param container the evaluated container
         * @param isSubset the evaluated result
         */
        function Statistic(container, isSubset) {
                // Call Statistics
                var callStat = container.getCallStatistics();

                this.getCallStat = function() {
                        return callStat;
                }

                /** Sum of called symbol-derivations
                */
                this.getDerivationsStat = function() {
                        return callStat.getDeriveStat();
                }

                /** Sum of called lower-derivations
                */
                this.getLowerDerivationsStat = function() {
                        return callStat.getLDeriveStat();
                }

                /** Sum of called upper-derivations
                */
                this.getUpperDerivationsStat = function() {
                        return callStat.getUDeriveStat();
                }

                /** Is Valid
                 * @return true, if left <= rigth, false othweise
                 */
                this.isValid = function() {
                        return container.isValid();
                };

                /** Is Subset (Evaluation Result)
                 * @return true, if left <= rigth, false othweise
                 */
                this.isSubset = function() {
                        return isSubset;
                };

                /** Depth
                 * @return depth
                 */
                this.getDepth = function() {
                        return container.getDepth();
                };

                /** To String
                */
                this.toString = function() {
                        return "[:" + container.getType()  + "] " + ((isSubset==container.isValid()) ? "OK" : "FAIL") + " " + container.toString() + " RESULT:" + isSubset + " VALID:" + container.isValid();
                };

                /** Print
                */
                this.print = function() {
                        var result = "";
                        result += this.toString() + "\n";
                        result += "#" + this.getDerivationsStat() + "\n";
                        result += "#" + this.getLowerDerivationsStat() + "\n";
                        result += "#" + this.getUpperDerivationsStat() + "\n";

                }
        }

        //////////////////////////////////////////////////
        // Comvert
        //////////////////////////////////////////////////

        function convert(transformations) {
                var results = new Array();
                transformations.foreach(function(i, r) {
                        results.push(new Container(r.getLeft(), r.getRight(), r.getDepth(), r.isValid(), r.getType()));
                });
                return results
        }
        SELF.convert = convert;

        //////////////////////////////////////////////////
        // Make
        //////////////////////////////////////////////////

        function make(container) {
                var results = new Array();
                container.foreach(function(i, c) {
                        c.solveInequality();
                        results.push(c.getStatistics());
                });
                return results
        }
        SELF.make = make;

})(__RegGen);
