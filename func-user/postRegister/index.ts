import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import PostRegisterUserService from './services/postRegisterUserService';
import { RequestValidation } from '../shared/utils/requestValidation';
import * as path from 'path';
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const responseSchemaValidation = RequestValidation.validate(context, req, path.join(__dirname, './schemas/requestDefinition.json'));
    if (responseSchemaValidation.status == 400) {
        context.res = responseSchemaValidation;
        return;
    }

    try {
        const postUser = container.resolve(PostRegisterUserService);
        const userResponse = await postUser.execute(req.body);
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