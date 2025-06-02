import { Permission, Role } from "node-appwrite";
import { attachmentCollection } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(attachmentCollection);
        console.log("Storage Connected");
    } catch (error) {
        try {
            await storage.createBucket(
                attachmentCollection, // bucketId
                attachmentCollection, // name
                [
                    Permission.create(Role.users()),
                    Permission.read(Role.any()),
                    Permission.update(Role.users()),
                    Permission.delete(Role.users()),
                ],
                false, // fileSecurity
                undefined, // enabled (optional, can be skipped)
                undefined, // maximumFileSize (optional)
                ["jpg", "png", "gif", "jpeg", "webp", "heic"] // allowedFileExtensions
            );

            console.log("Storage Created");
            console.log("Storage Connected");
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error creating storage:", error.message);
            } else {
                console.error("Unknown error:", error);
            }
        }
    }
}
