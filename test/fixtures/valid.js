'use strict';
function namedFunction () {

}

namedFunction();

const obj = {
    key: 'value'
};

namedFunction(obj);

const a = 1;
const b = 2;
let c = 0;

c = 3;

namedFunction(a, b, c);
