//Sample user data
const users = [ 
    {id: 1, name: 'chandrika', age: 22, isActive: true},
    {id: 2, name: 'Rahul', age: 28, isActive: false},
    {id: 3, name: 'Ananya', age: 25, isActive: true},
];

//MAP - map is an array method that transforms every element of an array into new element and returns the newly transformed array.
// Here it return list of user names
const userNames = users.map(user => user.name);
console.log("User Names: ", userNames);

//FILTER - filter works similar to that of map except that the returned array consists of only those elements that satisfies condition.
const activeUsers = users.filter(user => user.isActive);
console.log("Active Users: ", activeUsers);

//REDUCE - reduce processes each element in the array and reduces it to a single value.
const totalAge = users.reduce((sum,user) => sum + user.age, 0);
console.log("Total Age: ", totalAge);
