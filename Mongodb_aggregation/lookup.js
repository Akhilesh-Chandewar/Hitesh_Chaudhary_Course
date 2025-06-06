// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Find a document in a collection.
db.getCollection("Books").aggregate([
    {
        $lookup: {
            from: "Authors",
            localField: "author_id",
            foreignField: "_id",
            as: "Author_details"
        }
    },
    {
        $addFields: {
            author_details: { $first: "$Author_details" }
        }
    },
    {
        $project: {
            Author_details: 0
        }
    }
]);

