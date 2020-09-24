import {Request, Response} from "express";
import {BaseDatabase} from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";
import {PostDatabase} from "../data/PostDatabase";

export const createPost = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);
    const userId = authenticationData.id;

    const idGenerator = new IdGenerator();
    const postId = idGenerator.generateId();

    const {title, description, photoPost, typePost} = req.body;
    const creationDate = Date.now();

    const postDatabase = new PostDatabase();
    await postDatabase.createPost(
      postId,
      title,
      userId,
      description,
      photoPost,
      typePost,
      creationDate,
    );
    res.status(200).send({
      message: 'Post criado com sucesso'
    })
  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  }
  await BaseDatabase.destroyConnection();
};