import express from "express";
import { createPost } from "../endpoints/createPost";

export const postRouter = express.Router();

postRouter.post('/', createPost);