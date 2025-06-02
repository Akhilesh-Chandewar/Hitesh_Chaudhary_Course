import { IndexType, Permission, Role } from 'node-appwrite';
import { db, questionCollection } from '../name';
import { databases } from './config';

export default async function createQuestionCollection() {
    try {
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
        console.log('Question collection created.');

        await databases.createStringAttribute(db, questionCollection, 'title', 100, true);
        await databases.createStringAttribute(db, questionCollection, 'content', 1000, true);
        await databases.createStringAttribute(db, questionCollection, 'authorId', 100, true);
        await databases.createStringAttribute(db, questionCollection, 'attachmentId', 100, false);
        await databases.createStringAttribute(db, questionCollection, 'tags', 100, true, undefined, true);
        console.log('Question attributes created.');

        await new Promise((res) => setTimeout(res, 1000));

        await databases.createIndex(db, questionCollection, 'title', IndexType.Fulltext, ['title']);
        await databases.createIndex(db, questionCollection, 'content', IndexType.Fulltext, ['content']);
        await databases.createIndex(db, questionCollection, 'authorId', IndexType.Key, ['authorId'], ['asc']);
        await databases.createIndex(db, questionCollection, 'attachmentId', IndexType.Key, ['attachmentId'], ['asc']);
        await databases.createIndex(db, questionCollection, 'tags', IndexType.Key, ['tags'], ['asc']);
        console.log('Question indexes created.');
    } catch (error) {
        console.error('Failed to create question collection:', error instanceof Error ? error.message : error);
    }
}
