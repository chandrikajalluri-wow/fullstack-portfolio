const { use } = require("react");

//Object destructuring
const person = {
    firstName: 'Chandrika',
    lastName: 'Jalluri',
    location: 'India',
    role: 'Developer'
};

//Destructuring and renaming
const {firstName: fName, role} = person;
console.log(fName, role);

//Array Destructuring
const colors = ['red', 'green', 'blue'];

//Take first and third values
const [first, , third] = colors;
console.log("First: ", first);
console.log("Third: ", third)

//Nested Destructuring
const user = { 
    username: 'John',
    addresses: {
        home: 'Hyd',
        office: 'Bng'
    }
};

const {addresses: {home}} = user;
console.log("Home Address: ", home);
