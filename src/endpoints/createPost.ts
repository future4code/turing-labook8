import {Request, Response} from "express";
import {BaseDatabase} from "../data/BaseDatabase";
import {Authenticator} from "../services/Authenticator";
import {IdGenerator} from "../services/IdGenerator";
import {PostDatabase} from "../data/PostDatabase";
import moment from "moment"

export const createPost = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);
    const userId = authenticationData.id;

    const idGenerator = new IdGenerator();
    const postId = idGenerator.generateId();

    const {title, description, photoPost, typePost} = req.body;
    const creationDate = moment().format("YYYY-MM-DD")

    const postDatabase = new PostDatabase();
    await postDatabase.createPost(
      postId,
      userId,
      title,
      photoPost,
      typePost,
      description,
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