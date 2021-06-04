import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import LogoutService from "./services/logoutService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
      
    try {
        if(!req.headers['authorization'] || !req.body.refreshToken) {
            throw {data: {message: 'not authorized'}};
        }
    
        let bearerToken = req.headers.authorization.split(' ')[1];
        let refreshToken = req.body.refreshToken

        const userResponse = await new LogoutService().execute(refreshToken,bearerToken);
        context.res = {
            status: userResponse.status,
            body: userResponse.data
        };
    } catch (error) {
        context.res = {
            status: error.status ? error.status : 500,
            body: error.data
        };
    }

};

export default httpTrigger;