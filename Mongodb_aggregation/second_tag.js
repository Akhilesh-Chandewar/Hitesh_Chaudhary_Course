// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : How many users have 'ad' as their second tag?
db.getCollection("Users").aggregate([
    {
        $match: {
            "tags.1": "ad" // second tag is 'ad'
        }
    },
    {
        $count: "userCount" // count how many such users exist
    }
]);