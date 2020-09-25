import { BaseDatabase } from "./BaseDatabase";
import { Post, PostAndUserNameOutputDTO } from "../model/Post";
import { POST_TYPE } from '../model/Post'

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = 'Posts';

  public async createPost(post_id: string, user_id: string, title: string, photoPost: string, typePost: POST_TYPE, description: string, createdAt: string): Promise<void> {
    await this.getConnection()
      .insert({
        post_id,
        user_id,
        title,
        photoPost,
        typePost,
        description,
        createdAt
      }).into(PostDatabase.TABLE_NAME)
  }

  public async getPostById(postId: string): Promise<Post> {
    const result = await this.getConnection()
      .select('*')
      .from(PostDatabase.TABLE_NAME)
      .where({ post_id: postId });

    return Post.toPostModel(result[0]);
  }

  public async getPostByUserId(userId: string): Promise<Post[]> {
    const result = await this.getConnection()
      .select('*')
      .from(PostDatabase.TABLE_NAME)
      .where({ user_id: userId });

    const posts: Post[] = [];

    for (let post of result) {
      posts.push(Post.toPostModel(post));
    }

    return posts;
  }

  public async getPostInfoAndUserName(): Promise<PostAndUserNameOutputDTO[]> {

    const result = await this.getConnection().raw(`
    select r.*, u.name from Posts r
    JOIN Users u
    ON r.user_id = u.id;
    `);

    const posts: PostAndUserNameOutputDTO[] = [];
    for(let post of result[0]){
      posts.push({
         id: post.post_id,
         userId: post.user_id,
         title: post.title,
         photoPost: post.photoPost,
         typePost: post.typePost,
         description: post.description,
         createdAt: post.createdAt,
         userName: post.name});
    }  
    
    return posts;  
  }
}