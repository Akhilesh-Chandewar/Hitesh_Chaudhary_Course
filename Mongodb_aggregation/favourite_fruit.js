// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : List top 5 common fovourite fruits of all users
db.getCollection("Users").aggregate([
    {
        $group: {
            _id: "$favoriteFruit",
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    },
    {
        $limit: 1
    }
]);


