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
/*
// load hash set
load("__lib/__lib_apache_hashtable.js");
load("__lib/__lib_apache_hashset.js");
// load string padding
load("__lib/__lib_padding.js");
// Load new waek map
load("__lib/__lib_harmony_weakmap.js");
// Load reflect API
load("__lib/__lib_reflect.js");
// load assert
load("__lib/__lib_apache_assert.js");

// load logging engine
load("__lib/__lib_log4js.js");
var __logger = new __Log(__Log.NONE, __Log.consoleLogger);

// load system
load("system.js");

// load apc
load("apc.js");

// load configuration
load("config.js");

// load trace path
load("path.js");

// load contract
load("contract.js");

// load violation
load("violation.js")

// load parser
load("parser.js");

// load proxy
load("proxy.js");

// load permit
load("permit.js")
*/

//////////////////////////////////////////////////
// ENV JS
//////////////////////////////////////////////////

load("__EnvJS/envjs.spidermonkey2.js");

/**
 * this will now load and run all external javascript, 
 * emulating browser behavior
 */
Envjs({
    scriptTypes : {
        '': true, //inline and anonymous
        'text/javascript': true,
        'text/envjs': false
    }
});

window.location = 'http://www.w3c.org/';

function __replaceWindow() {
		tmp = window;
		delete window;
		window = __APC.permit("?*", this, "window");
}

function __replaceDocument() {
		tmp = document;
		delete document;
		document = __APC.permit("?*", this.document, "document");
}

//Envjs.scriptTypes['text/javascript'] = true;
//__replaceWindow();
//__replaceDocument();
//
/*
Envjs({
    // let it load the script from the html
    scriptTypes: {
        "text/javascript"   :true
    },
    // we dont need to load the commercial share this widget
    // for these continuous testing cycles, plus I like to
    // run my tests locally when I'm on the train without
    // a real network connection
    beforeScriptLoad: {
        'sharethis': function(script){
            script.src = '';
            return false;
        }
    },
    // we are also going to hook into qunit logging and 
    // qunit done so we can write messages to the console
    // as tests run, and when complete can write the resulting 
    // file out as a static report of test results
    afterScriptLoad: {
        'qunit': function(){
            //console.log('loaded test runner');
            //hook into qunit.log
            var count = 0,
                module;
            
            // plugin into qunit
            QUnit.moduleStart = function(name, testEnvironment) {
                module = name;
            };
            QUnit.log = function(result, message){
                console.log('{%s}(%s)[%s] %s',
                    module,
                    count++,
                    result ? 'PASS' : 'FAIL',
                    message
                );
            };
            QUnit.done = function(fail, pass){
                endtime = new Date().getTime();
                console.log(
                    'RESULTS: ( of %s total tests )\n' +
                    'PASSED: %s\n' +
                    'FAILED: %s\n' +
                    'Completed in %s milliseconds.',
                    pass+fail,
                    pass,
                    fail,
                    endtime-starttime
                );
                console.log('Writing Results to File');
                jQuery('#qunit-testrunner-toolbar').
                    text('').
                    attr('id', '#envjs-qunit-testrunner-toolbar');
                if(fail === 0){
                    jQuery('#qunit-banner').attr('class', 'qunit-pass');
                }
                Envjs.writeToFile(
                    document.documentElement.outerHTML, 
                    Envjs.uri(REPORTS + 'tests.html')
                );
            };
            
        },
        // when writing our report we dont want the tests
        // to be run again when we view the file in a
        // browser so set script tags to non-standard type
        '.': function(script){
            script.type = 'text/envjs';
        }
    }
});
*/
