import * as mongodb from "mongodb";
import {User} from "./modle/user";
import {Quiz} from "./modle/quiz";

export const collections: {
    users?: mongodb.Collection<User>;
    quizzes?: mongodb.Collection<Quiz>;
 } = {};
 export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
  
    const db = client.db("quizDB");
    await applySchemaValidation(db);
  
    const usersCollection = db.collection<User>("users");
    const quizzesCollection = db.collection<Quiz>("quiz");
    collections.users = usersCollection;
    collections.quizzes = quizzesCollection;
 }


 async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "username", "email" , "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                    minLength: 5
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is ",
                    
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is ",
                    
                },
            },
        },
    };

       // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "users",
    validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("users", {validator: jsonSchema});
    }
});

 };