import { Post } from "./Post"

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password?: string,
        private posts?: Post[]
    ){ }

    getId() {return this.id};
    getName() {return this.name};
    getEmail() {return this.email};
    getPassword() {return this.password};
    getPosts() {return this.posts};

    setId(id: string) { this.id = id};
    setName(name: string) { this.name = name};
    setEmail(email: string) { this.email = email};
    setPassword(password: string) { this.password = password};
    setPosts(posts: Post[]) {this.posts = posts};
    

   static toUserModel(user: any): User{
       return new User(user.id, user.name, user.email);
    }

}

export interface SignupInputDTO {
    email: string,
    name: string,
    password: string
}