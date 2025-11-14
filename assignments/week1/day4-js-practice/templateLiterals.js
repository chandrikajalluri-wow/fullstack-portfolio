const { use } = require("react");

const username = 'Chandrika';
const age = 22;

//using template literals to embed variables
const greet = `Hi, ${username}. You revolved ${age} times on earth.`
console.log(greet);
//Output: Hi, Chandrika. You revolved 22 times on earth.

const user = { name: 'Chandrika', isActive: true};
const statusMessage = `${user.name} is ${user.isActive ? "active" : "inactive"}.`;
console.log(statusMessage) 
// Output: Chandrika is active.