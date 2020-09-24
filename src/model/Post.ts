export class Post{
    constructor(
        private id: string,
        private title: string,
        private description: string,
        private userId: string,
        private createdAt: Date,
        private photoPost: string,
        private typePost: POST_TYPE
    ){}

    getId() {return this.id};
    getTitle() {return this.title};
    getDescription() {return this.description};
    getUserId() {return this.userId};
    getCreatedAt() {return this.createdAt};
    getPhoto() { return this.photoPost}
    getTypePost() { return this.typePost}


    setId(id: string) {this.id = id};
    setTitle(title: string) {this.title = title};
    setDescription(description: string) {this.description = description};
    setUserId(userId: string) {this.userId = userId};
    setCreatedAt(createdAt: Date) { this.createdAt = createdAt};
    setPhoto(photoPost: any) { this.photoPost = photoPost }
    setType(typePost: POST_TYPE) { this.typePost = typePost }


    static toPostModel(post: any): Post {
        return new Post(post.post_id, post.title, post.photoPost, post.typePost, post.description, post.user_id, post.createdAt);
    }
}

export type PostAndUserNameOutputDTO = {
    id: string,
    title: string,
    photoPost: any,
    typePost: POST_TYPE,
    description: string,
    createdAt: Date,
    userId: string,
    userName: string
}

export enum POST_TYPE {
    NORMAL = "NORMAL",
    EVENT = "EVENT"
}