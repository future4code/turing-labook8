import { Request, Response } from "express";
import { UserBusiness } from "../business/UseBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const login = async (req: Request, res: Response) => {
    try {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        };

        const userBusiness = new UserBusiness();
        const token = await userBusiness.getUserByEmail(loginData);

        res.status(200).send({ token });

    } catch (error) {
        res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
}