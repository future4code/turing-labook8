import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

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