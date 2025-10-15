// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q: How many users have phone starting with +1 (940)?
db.getCollection("Users").aggregate([
    {
        $match: {
            "company.phone": { $regex: /^\+1\s*\(940\)/ }
        }
    },
    {
        $count: "userCount"
    }
]);