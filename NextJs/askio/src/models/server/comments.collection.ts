import { IndexType, Permission, Role } from 'node-appwrite';
import { commentCollection, db } from '../name';
import { databases } from './config';

export default async function createCommentCollection() {
    try {
        await databases.createCollection(
            db,
            commentCollection,
            'commentCollection',
            [
                Permission.create(Role.users()),
                Permission.read(Role.any()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('Comment collection created.');

        await databases.createStringAttribute(db, commentCollection, 'type', 50, true);
        await databases.createStringAttribute(db, commentCollection, 'typeId', 100, true);
        await databases.createStringAttribute(db, commentCollection, 'authorId', 100, true);
        await databases.createStringAttribute(db, commentCollection, 'content', 1000, true);
        console.log('Comment attributes created.');

        await new Promise((res) => setTimeout(res, 1000));

        await databases.createIndex(db, commentCollection, 'type', IndexType.Key, ['type'], ['asc']);
        await databases.createIndex(db, commentCollection, 'typeId', IndexType.Key, ['typeId'], ['asc']);
        await databases.createIndex(db, commentCollection, 'authorId', IndexType.Key, ['authorId'], ['asc']);
        await databases.createIndex(db, commentCollection, 'content', IndexType.Fulltext, ['content']);
        console.log('Comment indexes created.');
    } catch (error) {
        console.error('Failed to create comment collection:', error instanceof Error ? error.message : error);
    }
}
