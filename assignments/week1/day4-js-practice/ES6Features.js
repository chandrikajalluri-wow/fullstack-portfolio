//Arrow Function + Default Parameters

const multiply = (a = 1, b = 1) => a * b;
console.log("Multiply: ", multiply(5,4))

//Rest Operator + Spread

const sumAll = (...nums) => nums.reduce((a, b) => a + b, 0);
const evens = [2, 4, 6]
console.log("Sum All: ", sumAll(5, 10, 15, ...evens))

//Async / Await

const loadData = async () => {
    const result = await fetchData();
    console.log("Async/Await:", result)
};
loadData();

