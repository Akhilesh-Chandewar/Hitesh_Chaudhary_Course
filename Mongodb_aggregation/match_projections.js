// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : What are name and age of users who has inactive and have velit in as a tags?
db.getCollection("Users").aggregate([
    {
        $match: {
            isActive: false,
            tags: "velit",
        },
    },
    {
        $project: {
            name: 1,
            age: 1,
        },
    },
]);
