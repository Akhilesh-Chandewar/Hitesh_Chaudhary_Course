import multiply from "./mathOperationsM.js";
import { add, subtract } from "./mathOperationsM.js";

const a = 5;
const b = 3;
const sum = add(a, b);
const difference = subtract(a, b);
const product = multiply(a, b);
console.log(`Sum: ${sum}`);
console.log(`Difference: ${difference}`);
console.log(`Product: ${product}`);