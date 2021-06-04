import 'reflect-metadata';
import { container } from "tsyringe";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import LoginService from "./services/loginService";
import { RequestValidation } from '../shared/utils/requestValidation';
import * as path from 'path';
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    // const responseSchemaValidation = RequestValidation.validate(context, req, path.join(__dirname, './schemas/requestDefinition.json'));
    // if (responseSchemaValidation.status == 400) {
    //     context.res = responseSchemaValidation;
    //     return;
    // }

    try {
        if(!req.headers['email'] || !req.headers['password']) {
            throw {data: {message: 'invalid fields'}};
        }
    
        const getUser = container.resolve(LoginService);
        const userResponse = await getUser.execute(req.headers['email'], req.headers['password']);
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