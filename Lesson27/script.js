// 1. Array Destructuring
// Given the following array, use array destructuring to assign the values of x, y, and z to their respective variables: 
const coordinates = [10, 20, 30];

const [x, y, z] = coordinates;

console.log(coordinates);
console.log(x, y, z);



// 2. Object Destructuring
// Given the following object, use object destructuring to assign the values of name and age to their respective variables:
const personE14 = {
  name: 'John Doe',
  age: 25,
};
const {name , age} = personE14;
// const name = personE14.name;
// const age = personE14.age;
console.log(name , age);
console.log('-------------------------');


// 3. Array Destructuring with Default Values
// Given the following array, use array destructuring with default values to assign the values of a, b, and c, with default values of 1, 2, and 3 respectively:
let numbers = [4, undefined, true];
// Null - absence on purpose
// Undefined - absence (by mistake)

const [a = 1, b = 2, c = 3] = numbers;

console.log(a); //4
console.log(b);//2
console.log(c); // true


// 4. Object Destructuring with Renaming
// Given the following object, use object destructuring with renaming to assign the value of name to a variable named fullName:
const personE16 = {
  name: 'Jane Doe',
};

personE16.name = 'Alice';

const {name: fullName, lastname='Placeholder surname'} = personE16;

// const fullName = personE16.name;
// const lastname = personE16.lastname || 'Placeholder surname';
console.log('-------------------------');

console.log(`fullName: ${fullName}, lastname: ${lastname}`);
console.log('-------------------------');



// 5. Nested Object Destructuring
// Given the following nested object, use object destructuring to assign the values of name, age, and city to their respective variables:
const personE17 = {
  name: 'John Doe',
  age: 25,
  address: {
    city: 'New York',
  },
};

// 6. Default Parameters + Arrow function
// Convert Named Function to Arrow Function with Default Parameters
// function greet (name, greeting) {
//   return `${greeting}, ${name}!`;
// }

// Default Parameters will ONLY be used if the value is undefined!
const greet = (name = 'Guest', greeting = 'Hello') => {
  return `${greeting}, ${name}`;
}
console.log(greet(name));
console.log(greet('Alice', 'Hey'));
console.log(greet());
console.log(greet(undefined, 'Hi'));


const greetV2 = (name, greeting) => {
  // Default Parameters will be used if the value is undefined or null!
  const name2 = name ?? 'Guest';
  const greeting2 = greeting ?? 'Hello';
  return `${greeting2}, ${name2}`;
}

const greetV3 = (name, greeting) => {
  // Default Parameters will be used if the value is any falsy value (0, '', null, undefined, etc.)
  const name2 = name || 'Guest';
  const greeting2 = greeting || 'Hello';
  return `${greeting2}, ${name2}`;
}

console.log(greetV3('', 0));


// 7. Default Parameters
// Add Default Parameters to an Existing Arrow Function, Default tax rate 0.1, default discount is 0.
const calculateTotal = (price, taxRate, discount) => {
  return price + (price * taxRate) - discount;
};

// Optional Chaining
// Optional chaining allows you to safely access deeply nested properties.

// 8. Safe Access to Nested Object Properties
// Update the code to safely access userName and userCity using optional chaining to handle cases where properties might be missing.
const userEx8 = {
  profile: { // optional 
    name: 'Alice',
    address: {
      city: 'Wonderland'
    }
  }
};

const userName = userEx8?.profile?.name;
const userCity = userEx8?.profile?.address?.city;

console.log(userName);
console.log(userCity);

// 9. Handle Missing Properties
// Update the code to use optional chaining to safely access userCountry and provide a default value of 'Unknown' if the property is missing.

const userEx9 = {
  profile: {
    name: 'Alice'
  }
};

// 10. Optional Chaining with Function Calls
// Update the code to safely call the getName function using optional chaining, considering that profile or getName might be missing.

const userEx10 = {
  profile: {
    getName: () => 'Alice'
  }
};

// 11. Rewrite the code using the nullish coalescing operator to assign a default value to storedData only if userInput is null or undefined.
let userInput;
let storedData = userInput ? userInput : 'Default Value';

console.log(storedData); // Default Value


// 12. Rewrite the code using the nullish coalescing operator to display number of users even if it is 0.
let userCount = 0;
let displayCount = userCount || 'No users';

console.log(displayCount); // No users


// 13. Rewrite the code using the nullish coalescing operator to assign a default value of 3000 to timeout if config.timeout is null or undefined.

const config = {
  timeout: null
};

const timeout = config.timeout !== undefined && config.timeout !== null ? config.timeout : 3000;

console.log(timeout); // 3000

