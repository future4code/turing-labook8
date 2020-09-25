import {Request, Response} from 'express'
import { UserBusiness } from '../business/UserBusiness'

export const makeFriendship = async (req: Request, res: Response) => {
  try {
    
    const token = req.headers.authorization as string
    const makeFriendshipUserId = req.body.makeFriendshipUserId

    const userBusiness = new UserBusiness();
    await userBusiness.makeFriend(token, makeFriendshipUserId);

    res.status(200).send({
      message: "Amizade feita com sucesso",
    })

  } catch (error) {
    res.status(400).send({
      messege: error.messege
    })
  }
}