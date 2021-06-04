import tokens from "../../shared/utils/tokens";

class LogoutService {

    constructor() { }

    public async execute(refreshToken: string, bearerToken: string) {
        try {
            
            await tokens.refresh.invalid(refreshToken)
            await tokens.access.invalid(bearerToken)

            return {
                status: 200,
                data: {
                    message: "success"
                }
            } 
        } catch (error) {
            throw {
                status: 400,
                data: {
                    message: error.message
                }
            }
        }
    }
}

export default LogoutService;