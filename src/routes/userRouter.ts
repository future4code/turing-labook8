import express from "express";
import { signUp } from "../endpoints/signUp";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
