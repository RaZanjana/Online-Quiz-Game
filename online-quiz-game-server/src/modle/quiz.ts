import * as mongodb from "mongodb";

export interface Quiz {
    quiz: string;
    answers: string[];
    correct_answer:string
    _id?: mongodb.ObjectId;
 }