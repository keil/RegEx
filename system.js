/*
 * JavaScript Reflection API
 *  for Access Permission Contracts
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



//////////////////////////////////////////////////
// ARRAY FOREACH / APPEND / REMOVE
//////////////////////////////////////////////////

Array.prototype.foreach = function( callback ) {
		for( var k=0; k<this .length; k++ ) {
				callback( k, this[ k ] );
		}
}

Array.prototype.append = function( array ) {
		var global = this;
		array.foreach(function(i, v) {
				global.push(v);
		});
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
};

Array.prototype.has  = function(arg) {
		var has = false;
		Array.prototype.foreach.call(this, function(i, v) {
				has = (arg==v) ? true : has;
		});
		return has;
};

Array.prototype.add  = function(arg) {
		if(!Array.prototype.has.call(this, arg)) return this.push(arg);
		else return (-1); 
};

Array.prototype.addAll  = function(arg) {
		var global = this;
		arg.foreach(function(i,v) {
				Array.prototype.add.call(global, v);});
		return this;
};



//////////////////////////////////////////////////
// SYSOUT
//////////////////////////////////////////////////

/* API Standard Output
*/
function __sysout(value) {
		if(typeof print != "undefined")
				// JS Shell concole oputput
				print(value);
		else if(document.write != "undefined")
				document.write(value);
		else if(typeof alert  != "undefined")
				// Standard alert notification
				alert(value);
}



//////////////////////////////////////////////////
// DUMP
//////////////////////////////////////////////////

/* Dump Values to String Output
*/
function __dump(value) {
		if (value === Object(value)) return "[" + typeof value + "]";
		if (typeof value == "string") return "\"" + value + "\"";
		return "" + value;
}



//////////////////////////////////////////////////
// CHECK
//////////////////////////////////////////////////

/* Check function
*/
function __look() {
		__APC.Access.dump();
		__APC.Violation.dump();
}

/* Check function
 * append output to DOM node
 * @param domNode DOM node
 */
function __appendLook(domNode) {
		var headingAP = document.createElement("h2"),
			headingV = document.createElement("h2"),
			divChildAP = document.createElement("div"),
			divChildV = document.createElement("div");

		headingAP.innerHTML = "EVALUATION of ACCESS";
		headingV.innerHTML = "EVALUATION of VIOLATIONS";

		domNode.appendChild(headingAP);
		domNode.appendChild(divChildAP);
		domNode.appendChild(headingV);
		domNode.appendChild(divChildV);

		function mkDtTag(v) {
				tmpDt = document.createElement("dt");
				tmpDt.innerHTML = v.type.toString();
				tmpDt.style.cssFloat = "left";

				switch(v.type) {

						case __APC.Access.Type.READ:
								tmpDt.style.width = "50px";	
								tmpDt.style.background = "#8793a1";

								break;
						case __APC.Access.Type.WRITE:
								tmpDt.style.width = "50px";	
								tmpDt.style.background = "#919191";

								break;
						case __APC.Violation.Type.READ:
								tmpDt.style.width = "100px";	
								tmpDt.style.background = "#5f9be3";

								break;
						case __APC.Violation.Type.WRITE:
								tmpDt.style.width = "100px";	
								tmpDt.style.background = "#849be1";

								break;
				}

				tmpDt.style.padding = "2px";
				tmpDt.style.margin = "0 1em 0 0";
				return tmpDt;
		}

		function mkDdTag(v) {
				tmpDd = document.createElement("dd");
				tmpDd.innerHTML = v.path.toString();
				tmpDd.style.padding = "2px";
				return tmpDd;
		}

		dlAP = document.createElement("dl");
		__APC.Access.Logger.foreach(function(v) {
				dlAP.appendChild(mkDtTag(v));
				dlAP.appendChild(mkDdTag(v));
		});
		divChildAP.appendChild(dlAP);

		dlV = document.createElement("dl");
		__APC.Violation.Logger.foreach(function(v) {
				dlV.appendChild(mkDtTag(v));
				dlV.appendChild(mkDdTag(v));

		});
		divChildV.appendChild(dlV);
}



//////////////////////////////////////////////////
// DUMP
//////////////////////////////////////////////////

/* Dump Values to String Output
*/
function __testcase(file) {
		__sysout("\n\n\n\n\n");
		__sysout("##################################################");
		__sysout("##")
				__sysout("## " + file);
		__sysout("##")
				__sysout("##################################################");
		__sysout("\n");

		(function() {
				load(file);
		})();
}
