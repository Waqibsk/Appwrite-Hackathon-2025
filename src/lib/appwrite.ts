import { Client, Account, ID } from "appwrite";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;

const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const ID_ = ID;
