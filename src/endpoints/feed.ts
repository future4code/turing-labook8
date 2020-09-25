import {Request, Response} from "express";
import {UserBusiness} from "../business/UserBusiness";
import { Authenticator } from "../services/Authenticator";
import { FeedDatabase} from "../data/FeedDatabase";

export const getFeed = async (req:  Request, res: Response)=>{
    try{
        const userBusiness = new UserBusiness();
        const token = req.headers.authorization as string; 
        const users = await userBusiness.get(token);

        res.status(200).send(users)
    }catch(err){
        res.status(400).send({
            message:err.message
        })
    }
}