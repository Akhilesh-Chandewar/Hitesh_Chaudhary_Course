import env from "@/env";

import {Avatars, Client, Databases, Storage, Users} from "node-appwrite";

const client = new Client()
  .setEndpoint(env.appwrite.endpoint) 
  .setProject(env.appwrite.projectId) 
  .setKey(env.appwrite.apiKey); 

const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, avatars, storage, users };