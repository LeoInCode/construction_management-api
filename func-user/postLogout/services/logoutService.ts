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
            if(error.event) {
                error = error.event;
            }
            throw {
                status: error.status,
                data: {
                    event: {
                        code: error.code,
                        type: error.eventType,
                        message: error.message,
                        details: error.detail
                    }
                }
            };
        }
    }
}

export default LogoutService;