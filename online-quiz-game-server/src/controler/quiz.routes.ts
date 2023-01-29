import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";
 
export const quizRouter = express.Router();
quizRouter.use(express.json());
 
quizRouter.get("/", async (_req, res) => {
   try {
       const employees = await collections.quizzes.find({}).toArray();
       res.status(200).send(employees);
   } catch (error) {
       res.status(500).send(error.message);
   }
});