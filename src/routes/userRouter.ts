import express from "express";
import { signUp } from "../endpoints/signUp";
import { makeFriendship } from "../endpoints/makeFriendship"
import { undoFriendship } from "../endpoints/undoFriendship"

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/makefriendship", makeFriendship);
userRouter.post("/undofriendship", undoFriendship);
