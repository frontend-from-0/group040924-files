
// Single line comment example in JS

/*
Multi-line comment example in JS
*/

/* 
Keywords in JS:
const - used to declare a constant variable
let - used to declare a variable (that can be changed)
var - used to declare a variable that can be changed (the old of declaring variables)
function - used to declare a function
false - boolean value
true - boolean value
undefined
null

*/

// Variables
const greeting = 'Hello, world!';

console.log(greeting);

let today = "Wednesday";

console.log('Today is ' + today);

var name = "John";


// Data types
// String
const string = 'This is a string';

// Number
let number = 0;
number = 123.23;

console.log('The number is ', number);

// Boolean
let isTrue = true;
console.log('Is true? ', isTrue);

isTrue = false;

console.log('Is true? ', isTrue);

// Undefined - absence of value
let empty;

console.log('Empty is ', empty);

// Null - absence of value (on purpose)
let nothing = null;

console.log('Nothing is ', nothing);

// Object - collection of key-value pairs
const person = {
    name: 'John',
    age: 25,
    isStudent: false,
    address: {
        city: 'New York',
        country: 'USA'
    }
};

console.log('Person is ', person);
console.table(person);

// Array - collection of values
const fruits = ['apple', 'banana', 'orange'];

console.log('Fruits are ', fruits);


// Avoid this:
const messyArray = ['apple', 123, true, {name: 'John'}, ['a', 'b', 'c']];

function add (a, b) {
  return a + b;
}


// To name different variables in JS, we use camelCase (firstSecondThird)

