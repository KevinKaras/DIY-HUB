const values = new Set();

values.add(1)
values.add(1)
values.add('a')
values.add('a')
values.add(undefined)
values.add(undefined)
values.add({'isObject': "true"})
values.add({'isObject': "true"})

console.log("size:", values.size)


// ------------------------------------------------------------------------------------------


const fs = require('fs');

const A = "A"
const B = "B"
const C = "C"


function getA() {
  return A;
}

function getB(callback) {
  setTimeout(() => {
      console.log(B)
      callback(B);
  }, 1000);
}

function getC() {
  return Promise.resolve().then(() => C);
}

function getABC() {
    
    
  
  
}

getABC().then((arr) => console.log(arr));