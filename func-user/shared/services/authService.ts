import * as bcrypt from 'bcrypt';
import { GeneralErrorException } from '../exception/generalError.exception';
import { MemberNotAuthorizedException } from '../exception/memberNotAuthorized.exception';

class AuthService {
    
    constructor() { }

    public async generatePasswordHash(password:string): Promise<string> {
        try {
            const costHash = 14;
            return await bcrypt.hash(password, costHash);
        } catch (error) {
            throw new GeneralErrorException(
                "400",
                "Error ao gerar criptografia",
                "Error ao gerar criptografia",
                "ERROR",
                400
            );
        }
    }

    public async verifyPassword(password: string, passwordHash: string): Promise<void> {
        try {
            const validPassword = await bcrypt.compare(password, passwordHash);
            
            if(!validPassword){
                throw new MemberNotAuthorizedException();
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default AuthService;