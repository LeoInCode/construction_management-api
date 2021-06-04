import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import GetUserService from './services/getUserService';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    if(!req.headers['authorization']) {
        throw {data: {message: 'not authorized'}};
    }

    let token = req.headers.authorization.split(' ')[1];
    
    try {
        const userResponse = await new GetUserService().execute(token);
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