import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { UserRelationDatabase } from "../data/UserRelationDatabase";

export class UserBusiness {

    public async signUp(name: string, email: string, password: string): Promise<string> {

        if (!name || !email || !password) {
            throw new Error('Insira todas as informações necessárias para o cadastro');
        }

        if (password.length < 6) {
            throw new Error('A senha deve conter no mínimo seis caracteres');
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager(); 
        const hashPassword = await hashManager.hash(password);

        const userDataBase = new UserDatabase(); 
        await userDataBase.registerUser(
            id,
            name,
            email,
            hashPassword
        );

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({ id });

        return token;
    }


    public async makeFriend(token: string, makeFriendshipUserId: string): Promise<void> {

        const authenticator = new Authenticator;
        const authenticationData = authenticator.verify(token) 
        const userId = authenticationData.id

        if(!makeFriendshipUserId){
            throw new Error("Insira um ID válido")
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(makeFriendshipUserId)

        if(!user){
            throw new Error("Usuário não existe")
        }

        const userRelationDatabase = new UserRelationDatabase();
        await userRelationDatabase.makeFriend(userId, makeFriendshipUserId)
        await userRelationDatabase.makeFriend(makeFriendshipUserId, userId)
        
    }

    public async undoFriend(token: string, undoFriendshipUserId: string): Promise<void> {

        const authenticator = new Authenticator;
        const authenticationData = authenticator.verify(token) 
        const userId = authenticationData.id

        if(!undoFriendshipUserId){
            throw new Error("Insira um ID válido")
        }

        const userDatabase = new UserDatabase();
        const user = await userDatabase.getUserById(undoFriendshipUserId)

        if(!user){
            throw new Error("Usuário não existe")
        }

        const userRelationDatabase = new UserRelationDatabase();
        await userRelationDatabase.undoFriend(userId, undoFriendshipUserId)
        await userRelationDatabase.undoFriend(undoFriendshipUserId, userId)
    }
    async getUserByEmail(user:any) {
        
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        if (userFromDB === undefined) {
            throw new Error('Email ou senha incorretos');
        }

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.password);
        
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.id });
        

        if (!hashCompare) {
            throw new Error("Email ou senha incorretos");
        }

        return accessToken;

    }

}