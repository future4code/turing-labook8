import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "users";

  public async getUserByEmail(email: string): Promise<any> {
    try {

      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
			if(!result[0]){
				throw new Error("Usuário não encontrado");
			}
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async get(): Promise<any[]> {
        try {
            const users: any = [];

            const result = await this.getConnection()
                .select("*")
                .from(UserDatabase.TABLE_NAME);
            for(let user of result){
                users.push(user);
            }
            return users;

        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}
