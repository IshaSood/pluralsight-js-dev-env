/*The first import weback undertsands, but mocha does not.
Therefore, in testSetup.js we have disabled this feature on line 8*/
import './index.css'
import numeral from 'numeral';

const courseValue = numeral(1000).format('$0,0.00');
console.log(`I would pay ${courseValue} for this awesome course!`);