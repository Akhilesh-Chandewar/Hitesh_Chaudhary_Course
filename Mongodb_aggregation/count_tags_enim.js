// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : How many users have 'enim' in their tags?
db.getCollection("Users").aggregate([
    {
        $match: {
            tags: "enim" // match documents where 'tags' array contains 'enim'
        }
    },
    {
        $group: {
            _id: "$_id" // group by user ID to ensure uniqueness
        }
    },
    {
        $count: "userCount" // count how many unique users matched
    }
]);

