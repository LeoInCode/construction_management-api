import * as bcrypt from 'bcrypt';
import * as passport from 'passport'
import * as LocalStrategy from 'passport-local';
import * as BearerStrategy from 'passport-http-bearer';
import IUserRepository from '../repositories/IUserRepository';
import tokens from '../utils/tokens'

class AuthService {
    
    constructor(
        // private userRepository: IUserRepository
        ) { }

    public async generatePasswordHash(password:string): Promise<string> {
        try {
            const costHash = 13;
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

    // public async localStrategy() {
    //     try {
            
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async bearerStrategy() {
    //     try {
    //         passport.use(
    //             new BearerStrategy.Strategy(async (token, done) => {
    //                 const id = + await tokens.access.verify(token); //id

    //                 const user = await this.userRepository.getUser(id);
                    
    //                 done(null, user, token); //{token}
    //             })
    //           )
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

export default AuthService;