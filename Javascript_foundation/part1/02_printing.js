console.log("Hello World");
process.stdout.write("Hello World \n");

console.table([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
]);

console.warn("This is a warning message");
console.error("This is an error message");
console.info("This is an info message");
console.debug("This is a debug message");
console.assert(1 === 2, "This is an assertion error");
console.time("Timer");
console.timeEnd("Timer");
console.trace("This is a trace message");
console.group("Group");
console.log("This is a message in a group");
console.groupEnd("Group");
console.count("Count");
console.count("Count");
console.countReset("Count");
console.clear();
console.dir({ name: "Alice", age: 25 }, { depth: 2 });
console.log("This is a message with a %s placeholder", "string");
console.log("This is a message with a %d placeholder", 42);
console.log("This is a message with a %j placeholder", { name: "Alice" });  