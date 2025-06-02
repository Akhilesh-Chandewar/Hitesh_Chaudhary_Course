import { IndexType, Permission, Role } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
    try {
        // Create Collection
        await databases.createCollection(
            db,
            commentCollection,
            commentCollection,
            [
                Permission.create(Role.users()),
                Permission.read(Role.any()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log("Comment Collection Created");

        // Create Attributes
        await Promise.all([
            databases.createIndex(db, commentCollection, 'type', IndexType.Key, ['type'], ['asc']),
            databases.createIndex(db, commentCollection, 'typeId', IndexType.Key, ['typeId'], ['asc']),
            databases.createIndex(db, commentCollection, 'authorId', IndexType.Key, ['authorId'], ['asc']),
            databases.createIndex(db, commentCollection, 'content', IndexType.Fulltext, ['content']),
        ]);
        
        console.log("Comment Attributes Created");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to create comment collection:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}
