import { Permission, Role, IndexType } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
    try {
        // Creating Collection with appropriate permissions
        await databases.createCollection(db, voteCollection, voteCollection, [
            Permission.create(Role.users()),
            Permission.read(Role.any()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]);
        console.log("Vote Collection Created");

        // Creating Attributes
        await Promise.all([
            databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
            databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
            databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
            databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
        ]);
        console.log("Vote Attributes Created");

        // Creating Indexes
        await Promise.all([
            databases.createIndex(db, voteCollection, "type", IndexType.Key, ["type"], ["asc"]),
            databases.createIndex(db, voteCollection, "typeId", IndexType.Key, ["typeId"], ["asc"]),
            databases.createIndex(db, voteCollection, "votedById", IndexType.Key, ["votedById"], ["asc"]),
            databases.createIndex(db, voteCollection, "voteStatus", IndexType.Key, ["voteStatus"], ["asc"]),
        ]);
        console.log("Vote Indexes Created");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating vote collection:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}
