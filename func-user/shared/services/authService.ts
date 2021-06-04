import * as bcrypt from 'bcrypt';

class AuthService {
    
    constructor() { }

    public async generatePasswordHash(password:string): Promise<string> {
        try {
            const costHash = 14;
            return await bcrypt.hash(password, costHash);
        } catch (error) {
            throw new Error(error);
        }
    }

    public async verifyPassword(password: string, passwordHash: string): Promise<void> {
        try {
            const validPassword = await bcrypt.compare(password, passwordHash);
            
            if(!validPassword){
              throw 'incorrect password';
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default AuthService;