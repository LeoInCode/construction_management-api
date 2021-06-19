import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MemberNotAuthenticatedException } from "../shared/exception/memberNotAuthenticatedexception";
import LogoutService from "./services/logoutService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
      
    try {
        if(!req.headers['authorization'] || !req.body.refreshToken) {
            throw new MemberNotAuthenticatedException();
        }
    
        let bearerToken = req.headers.authorization.split(' ')[1];
        let refreshToken = req.body.refreshToken

        const userResponse = await new LogoutService().execute(refreshToken,bearerToken);
        context.res = {
            status: userResponse.status,
            body: userResponse.data
        };
    } catch (error) {
        if (error.code === "400") {
            error.data = {
                event: {
                    code: error.code,
                    type: error.eventType,
                    message: error.message,
                    details: error.detail
                }
            }
        }
        context.res = {
            status: error.status ? error.status : 500,
            body: error.data
        };
    }

};

export default httpTrigger;