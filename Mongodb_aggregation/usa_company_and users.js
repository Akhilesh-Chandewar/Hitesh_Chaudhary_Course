// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("Aggregation");

// List all comapnies in usa and their total number of employees
db.getCollection("Users").aggregate([
    {
        $match: {
            "company.location.country": "USA"
        }
    },
    {
        $group: {
            _id: "$company.title",
            count: {
                $sum: 1
            }
        }
    }
])
