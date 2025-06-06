// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Find users who have both 'enim' and 'id' in their tags.
db.getCollection("Users").aggregate([
    {
        $match: {
            tags: {
                $all: ["enim", "id"],
            },
        },
    },
])