import {BaseDatabase} from "./BaseDatabase";

export class FeedDatabase extends BaseDatabase{
    public async getFeed(userId: string): Promise<any>{
        const result = await this.getConnection().raw(`
            SELECT title, photoPost, description
            FROM Posts
            JOIN user_relation
            ON user_relation.user_id = Posts.user_id
            AND user_relation.user_id = '${userId}'
            JOIN users
            ON Posts.user_id = users.id
        `)
        return result[0]
    }
}