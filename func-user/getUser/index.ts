import 'reflect-metadata';
import { container } from "tsyringe";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import GetUserService from './services/getUserService';
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        const putUser = container.resolve(GetUserService);
        const userResponse = await putUser.execute(req.params.id);
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