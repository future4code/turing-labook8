import express from "express";
import { createPost } from "../endpoints/createPost";
import { getFeed } from "../endpoints/feed";

export const postRouter = express.Router();

postRouter.post('/createpost', createPost);
postRouter.get('/posts', getFeed);