import { Client, Account, ID, TablesDB, Storage } from "appwrite";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID).setSession("auto");

export const account = new Account(client);
export const tabelsDB = new TablesDB(client);
export const storage = new Storage(client);
export const ID_ = ID;
export const DB_ID = DATABASE_ID;
export const USER_COLLECTIONS_ID = import.meta.env.VITE_USER_COLLECTIONS_ID;
export const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;
export const SPACES_COLLECTIONS_ID = import.meta.env.VITE_SPACES_COLLECTIONS_ID;
