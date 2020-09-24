import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";


export class UserBusiness {

    async getUserByEmail(user:any) {
        
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);
        

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.password);
        
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.id });
        

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }

    async get(token: string) {
        const userDatabase = new UserDatabase();
        const authenticator = new Authenticator();
        authenticator.getData(token);
        return await userDatabase.get();
    }
    
}