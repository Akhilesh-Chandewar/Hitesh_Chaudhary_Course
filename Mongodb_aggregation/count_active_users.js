// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");


// Q : How many users are active?

db.getCollection("Users").find({
    isActive: true
}).count();

db.getCollection("Users").aggregate([
    {
        $match: {
            isActive: true
        }
    },
    {
        $count: "activeUsers"
    }
])