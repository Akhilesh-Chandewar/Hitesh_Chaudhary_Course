// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : List all unique eye colors.
db.getCollection("Users").distinct("eyeColor");
db.getCollection("Users").aggregate([{ $group: { _id: "$eyeColor" } }]);
