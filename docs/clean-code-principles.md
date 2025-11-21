1. Meaningful Names

Description: Give variables, functions, and files clear names that tell what they do.

Example:

//Bad

let x = 10;

//Good

let noOfHolidays = 5

2. Keep Functions Short

Description: Each function should do only one thing. Short functions are easier to read and fix.

Example:

//Bad

function handleUser() { //Here the function doing too much - it's managing valiadtion, database, and email all together.
    validateInput();
    saveUserToDB();
    sendWelcomeEmail();
}

//Good

function handleUser() {  //Here each helper function does just one small job.Main function just coordinates them.
    validateInput();
    saveUser();
    sendEmail();
}

3. Don't Repear Yourself (DRY Rule)

Description: Avoid writing the same code again and again. If needed in multiple places, make a function.

Example:

//Bad

console.log("Welcome Manager");
console.log("Welcome Developer");

//Good

function greetTeam(role) {
    console.log(`Welcome ${role}`);
}

4. Format Code Neatly

Description: Keep spacing, indentation and brackets clean so anyone can read your code easily.

Example:

//Bad

function add( a,b){
return a+b;
}

//Good

function add(a,b) {
    return a + b;
}

5. Avoid Magic Numbers or Strings

Description: Don't use random numbers or words directly in your code - use constants instead

Example:

//Bad

if (user.age > 18) {...}

//Good

const MIN_AGE = 18;
if (user.age > MIN_AGE) {...}

6. Write Helpful Comments

Description: Write comments to explain why something is done, not what it does (the code should tell that).

Example:

//Bad

//Add 1
count = count + 1; 

//Good 

//Increase count after successful login
count = count + 1;

7. Handle Errors Properly

Description: Always expect things might go wrong and handle them nicely.

Example:

//Bad

const data = JSON.parse(input);

//Good

try {
    const data = JSON.parse(input);
} catch (error) {
    console.error("Invalid data format");
}

8. Keep Code Simple (KISS Rule)

Description: Don't make your code more complicated than needed. Simple and clear code works best.

Example:

//Bad

if (user && user.isActive === true && user.role === 'admin') {
    return true;
}

//Good

function isActiveAdmin(user) {
    return user?.isActive && user.role === 'admin';
}

9. Avoid Deep Nesting

Description: Too many if or for loops inside each other make code confusing. Use early returns to make it cleaner.

Example:

//Bad

if (user) {
    if (user.isActive) {
        if (user.role === 'admin') {
            console.log("Welcome Admin");
        }
    }
}

//Good

if (!user || !user.isActive || user.role!=='admin') return;
console.log("Welcome Admin");

10. Give Each File or Function One Purpose

Description: Each file or class should do one clear job - not too many things at once.

Example:

//Bad

class User {
    saveToDatabase() {...}
    sendEmail() {...}
}

//Good

class UserRepository {
    saveUser() {...}
}

class EmailService {
    sendEmail() {...}
}

11. Refactor Often

Description: Keep improving your code when you find a better or cleaner way to write it.

Example:

//Bad

function addThree(a, b, c) {
    return a + b + c;
}

//Good

function addAll(...nums) {
    return nums.reduce((sum,n) => sum + n, 0);
}

12. Be Consistent

Description: Folllow the same style for naming, indentation, and structure everywhere in your code.

Example:

//Bad

const user_name = "John";
let userAge = 25;

//Good

const userName = "John";
const userAge = 25;