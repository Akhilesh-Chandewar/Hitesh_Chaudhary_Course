import { db } from "../name"
import createQuestionCollection from "./questions.collection";
import createAnswerCollection from "./answers.collection";
import createCommentCollection from "./comments.collection";
import createVoteCollection from "./votes.collection";
import { databases } from "./config";

export default async function seedDatabase() {
    try {
        // Create collections
        await databases.get(db)
        console.log("Database connection established.");
    } catch (error) {
        try{
            await databases.create(db, db);
            console.log("Database created successfully.");
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ]);
            console.log("Collections created successfully.");
            console.log("Database connected successfully.");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Failed to create database:", error.message);
            } else {
                console.error("Unknown error:", error);
            }   
        }
    }
    return databases;
}