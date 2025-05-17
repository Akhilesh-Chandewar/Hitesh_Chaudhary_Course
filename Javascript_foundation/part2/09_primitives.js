// Number

let balance = 1000;
console.log("Balance:", balance);
console.log("Typeof balance:", typeof balance);

let onatherBalance = new Number(1000);
console.log("OnatherBalance:", onatherBalance);
console.log("Typeof onatherBalance:", typeof onatherBalance);
console.log("OnatherBalance is instance of Number:", onatherBalance instanceof Number);
console.log("OnatherBalance is instance of Object:", onatherBalance instanceof Object);
console.log("OnatherBalance valueOf:" , onatherBalance.valueOf());

// Boolean
let isActive = true;
console.log("isActive:", isActive);
console.log("Typeof isActive:", typeof isActive);
let isActiveObj = new Boolean(true);
console.log("isActiveObj:", isActiveObj);
console.log("Typeof isActiveObj:", typeof isActiveObj);
console.log("isActiveObj is instance of Boolean:", isActiveObj instanceof Boolean);
console.log("isActiveObj is instance of Object:", isActiveObj instanceof Object);
console.log("isActiveObj valueOf:" , isActiveObj.valueOf());

// Null and Undefined
let isNull = null;
console.log("isNull:", isNull);
console.log("Typeof isNull:", typeof isNull);
let isUndefined = undefined;
console.log("isUndefined:", isUndefined);
console.log("Typeof isUndefined:", typeof isUndefined);
console.log("isNotDefined:", isNotDefined);
console.log("Typeof isNotDefined:", typeof isNotDefined);

// String
let str = "Hello World";
let str2 = new String("Hello World");
let str3 = 'Hello World';
let str4 = `Hello World`;