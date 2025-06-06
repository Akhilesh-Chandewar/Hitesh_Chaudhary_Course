// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Q : find average number of tags for users
// Part 1
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

// Part 2
db.getCollection("Users").aggregate([
    {
        $addFields: {
            numberOfTags: {
                $size: {
                    $ifNull: ["$tags", []]
                }
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

