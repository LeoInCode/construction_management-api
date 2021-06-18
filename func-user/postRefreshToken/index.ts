import 'reflect-metadata';
import { container } from "tsyringe";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import RefreshTokenService from './services/refreshTokenService';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        if(!req.body.refreshToken) {
            throw {data: {message: 'this user is not authenticated'}};
        }
    
        const userResponse = await new RefreshTokenService().execute(req.body.refreshToken);
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