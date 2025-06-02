import { Permission, Role, IndexType } from 'node-appwrite';
import { db, voteCollection } from '../name';
import { databases } from './config';

export default async function createVoteCollection() {
    try {
        await databases.createCollection(
            db,
            voteCollection,
            'voteCollection',
            [
                Permission.create(Role.users()),
                Permission.read(Role.any()),
                Permission.update(Role.users()),
                Permission.delete(Role.users()),
            ]
        );
        console.log('Vote collection created.');

        await databases.createEnumAttribute(db, voteCollection, 'type', ['question', 'answer'], true);
        await databases.createStringAttribute(db, voteCollection, 'typeId', 50, true);
        await databases.createEnumAttribute(db, voteCollection, 'voteStatus', ['upvoted', 'downvoted'], true);
        await databases.createStringAttribute(db, voteCollection, 'votedById', 50, true);
        console.log('Vote attributes created.');

        await new Promise((res) => setTimeout(res, 1000));

        await databases.createIndex(db, voteCollection, 'type', IndexType.Key, ['type'], ['asc']);
        await databases.createIndex(db, voteCollection, 'typeId', IndexType.Key, ['typeId'], ['asc']);
        await databases.createIndex(db, voteCollection, 'votedById', IndexType.Key, ['votedById'], ['asc']);
        await databases.createIndex(db, voteCollection, 'voteStatus', IndexType.Key, ['voteStatus'], ['asc']);
        console.log('Vote indexes created.');
    } catch (error) {
        console.error('Failed to create vote collection:', error instanceof Error ? error.message : error);
    }
}
