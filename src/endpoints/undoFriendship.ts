import {Request, Response} from 'express'
import { UserBusiness } from '../business/UserBusiness'

export const undoFriendship = async (req: Request, res: Response) => {
  try {
    
    const token = req.headers.authorization as string
    const undoFriendshipUserId = req.body.undoFriendshipUserId

    const userBusiness = new UserBusiness();
    await userBusiness.undoFriend(token, undoFriendshipUserId);

    res.status(200).send({
      message: "Amizade desfeita com sucesso",
    })

  } catch (error) {
    res.status(400).send({
      messege: error.messege
    })
  }
}