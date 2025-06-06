// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : find average number of tags for users
db.getCollection("Users").aggregate([
    {
        $unwind: "$tags"
    },
    {
        $group: {
            _id: "$_id",
            numberOfTags: {
                $sum: 1
            }
        }
    },
    {
        $group: {
            _id: null,
            averageNumberOfTags: {
                $avg: "$numberOfTags"
            }
        }
    }
]);
