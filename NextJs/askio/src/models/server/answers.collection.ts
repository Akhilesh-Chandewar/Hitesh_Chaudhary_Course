import { IndexType, Permission, Role } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
    try {
        // Create collection
        await databases.createCollection(
            db,
            answerCollection,
            answerCollection,
            [
                Permission.create(Role.users()),
                Permission.read(Role.any()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log("Answer Collection Created");

        // Create attributes
        await Promise.all([
            databases.createIndex(db, answerCollection, 'questionId', IndexType.Key, ['questionId'], ['asc']),
            databases.createIndex(db, answerCollection, 'authorId', IndexType.Key, ['authorId'], ['asc']),
            databases.createIndex(db, answerCollection, 'content', IndexType.Fulltext, ['content']),
        ]);
        console.log('Answer Indexes Created');
        
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error creating Answer collection:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
    }
}
