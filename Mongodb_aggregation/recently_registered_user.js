// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// Who ha registered more recently
db.getCollection("Users").find().sort({ registered: -1 }).limit(1);
db.getCollection("Users").aggregate([{ $sort: { registered: -1 } }, { $limit: 1 }, {
    $project: {
        name: 1,
        registered: 1,
    }
}]);
