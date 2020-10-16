import { BaseDatabase } from "./BaseDatabase"

export class UserRelationDatabase extends BaseDatabase {
  private static TABLE_NAME = 'user_relation'

  public async makeFriend (userId: string, makeFriendshipUserId: string): Promise<void>{
    await this.getConnection()
    .insert({
      user_id: userId,
      user_to_be_friend: makeFriendshipUserId
    }).into(UserRelationDatabase.TABLE_NAME)
  }

  public async undoFriend (userId: string, undoFriendshipUserId: string): Promise<void>{
    await this.getConnection()
    .delete()
    .from(UserRelationDatabase.TABLE_NAME)
    .where({
      user_id: userId,
      user_to_be_friend: undoFriendshipUserId
    })
  }
}