// Checking if a number is greateter than other number

let num1 = 10;
let num2 = 5;
if (num1 > num2) {
    console.log(`${num1} is greater than ${num2}`);
}
else if (num1 < num2) {
    console.log(`${num1} is less than ${num2}`);
}
else {
    console.log(`${num1} is equal to ${num2}`);
}

// Checking if a string is equal to another string
let str1 = "hello";
let str2 = "world";
if (str1 === str2) {
    console.log(`${str1} is equal to ${str2}`);
}
else if (str1 !== str2) {
    console.log(`${str1} is not equal to ${str2}`);
}

// Checking if a variable is a number or not
let var1 = 9;
if (typeof var1 === "number") {
    console.log(`${var1} is a number`);
}
else {
    console.log(`${var1} is not a number`);
}

// Check if the boolean value is true or false
let bool1 = true;
if (bool1) {
    console.log(`${bool1} is true`);
}
else {
    console.log(`${bool1} is false`);
}

// check if array is empty or not
let arr1 = [2, 3, 4];
if (arr1.length === 0) {
    console.log(`Array is empty`);
}
else {
    console.log(`Array is not empty`);
}