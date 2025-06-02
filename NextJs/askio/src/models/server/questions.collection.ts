import { IndexType, Permission, Role } from 'node-appwrite';
import { db, questionCollection } from '../name';
import { databases } from './config';

export default async function createQuestionCollection() {
    try {
        // Create collection with permissions
        await databases.createCollection(
            db,
            questionCollection,
            'questionCollection',
            [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('Collection created.');

        // Create attributes
        await Promise.all([
            databases.createStringAttribute(db, questionCollection, 'title', 100, true),
            databases.createStringAttribute(db, questionCollection, 'content', 1000, true),
            databases.createStringAttribute(db, questionCollection, 'authorId', 100, true),
            databases.createStringAttribute(db, questionCollection, 'attachmentId', 100, false),
            databases.createStringAttribute(db, questionCollection, 'tags', 100, true, undefined, true), // array = true
        ]);
        console.log('Attributes created successfully.');

        // Create indexes
        await Promise.all([
            databases.createIndex(db, questionCollection, 'title', IndexType.Fulltext, ['title']),
            databases.createIndex(db, questionCollection, 'content', IndexType.Fulltext, ['content']),
            databases.createIndex(db, questionCollection, 'authorId', IndexType.Key, ['authorId'], ['asc']),
            databases.createIndex(db, questionCollection, 'attachmentId', IndexType.Key, ['attachmentId'], ['asc']),
            databases.createIndex(db, questionCollection, 'tags', IndexType.Key, ['tags'], ['asc']),
        ]);
        console.log('Indexes created successfully.');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to create collection:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
    }
}
