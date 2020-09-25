import {Request, Response} from "express";
import {UserBusiness} from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator";

export const getFeed = async (req:  Request, res: Response)=>{
    try{
        const token = req.headers.authorization as string; 
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);
        const userId = authenticationData.id;

        const feedDatabase = FeedDatabase();
        const feed = await feedDatabase.getFeed(userId);
        const mappedFeed = feed.map((item:any)=>({
            title: item.title,
            photoPost: item.photoPost,
            description: item.description
        }))
        res.status(200).send(mappedFeed)
    }catch(err){
        res.status(400).send({
            message:err.message
        })
    }
}