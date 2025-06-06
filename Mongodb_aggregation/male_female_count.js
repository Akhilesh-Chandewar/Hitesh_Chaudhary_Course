// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : Find total number of males and females
db.getCollection("Users").aggregate([
    {
        $group: {
            _id: "$gender",
            genderCount: {
                $sum: 1
            }
        }
    }
]);
