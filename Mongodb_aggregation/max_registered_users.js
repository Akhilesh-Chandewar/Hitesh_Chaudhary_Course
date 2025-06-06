// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : Which country has highes number of registered users?
db.getCollection("Users").aggregate([
    {
        $group: {
            _id: "$company.location.country",
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
])

