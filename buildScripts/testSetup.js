// This file is not transpiled, so must use CommonJS and ES55

//Register babel to transpile before our tests run.
/* Below line tells us - Babel should transpile our test before mocha runs our tests*/
require('babel-register')();

/*Disable any webpack specific features that Mocha don't understand.
Example - the first import on index.js - (import './index.css')
Below, we are telling mocha if it sees the LHS, treat it like an empty function (RHS)*/
require.extensions['.css'] = function() {};