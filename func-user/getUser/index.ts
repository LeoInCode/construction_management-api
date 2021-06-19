import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MemberNotAuthenticatedException } from "../shared/exception/memberNotAuthenticatedexception";
import GetUserService from './services/getUserService';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        if(!req.headers['authorization']) {
            throw new MemberNotAuthenticatedException();
        }
            
        let token = req.headers.authorization.split(' ')[1];
    
        const userResponse = await new GetUserService().execute(token, req.query.entity, req.query.action);
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