import { IndexType, Permission, Role } from 'node-appwrite';
import { answerCollection, db } from '../name';
import { databases } from './config';

export default async function createAnswerCollection() {
    try {
        await databases.createCollection(
            db,
            answerCollection,
            'answerCollection',
            [
                Permission.create(Role.users()),
                Permission.read(Role.any()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('Answer collection created.');

        await databases.createStringAttribute(db, answerCollection, 'questionId', 100, true);
        await databases.createStringAttribute(db, answerCollection, 'authorId', 100, true);
        await databases.createStringAttribute(db, answerCollection, 'content', 1000, true);
        console.log('Answer attributes created.');

        await new Promise((res) => setTimeout(res, 1000));

        await databases.createIndex(db, answerCollection, 'questionId', IndexType.Key, ['questionId'], ['asc']);
        await databases.createIndex(db, answerCollection, 'authorId', IndexType.Key, ['authorId'], ['asc']);
        await databases.createIndex(db, answerCollection, 'content', IndexType.Fulltext, ['content']);
        console.log('Answer indexes created.');
    } catch (error) {
        console.error('Failed to create answer collection:', error instanceof Error ? error.message : error);
    }
}
