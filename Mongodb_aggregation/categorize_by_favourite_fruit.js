// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : Categorized the users by favourite fruits
db.getCollection("Users").aggregate([
    {
        $group: {
            _id: "$favoriteFruit",
            users: {
                $push: "$name"
            }
        }
    }
])
