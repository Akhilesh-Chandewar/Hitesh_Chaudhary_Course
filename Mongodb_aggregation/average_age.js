// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : Find average age of all users?
db.getCollection("Users").aggregate([
    {
        $group: {
            _id: "$gender",
            avgAge: {
                $avg: "$age"
            }
        }
    }
]);
