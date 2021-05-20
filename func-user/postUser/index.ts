import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import PostUserService from './services/postUserService';
import { RequestValidation } from '../shared/utils/requestValidation';
import * as path from 'path'
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const responseSchemaValidation = RequestValidation.validate(context, req, path.join(__dirname, './schemas/requestDefinition.json'));
    if (responseSchemaValidation.status == 400) {
        context.res = responseSchemaValidation;
        return;
    }

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