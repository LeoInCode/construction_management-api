import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import '../container';
import PostUserService from './services/postUserService';
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {
        const postUser = container.resolve(PostUserService);
        const userResponse = await postUser.postUserService(req.body);
        context.res = {
            status: userResponse.status,
            body: userResponse.data
        };
    } catch (error) {
        context.res = {
            status: error.status,
            body: error.data
        };
    }  
};

export default httpTrigger;