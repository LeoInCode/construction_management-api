import 'reflect-metadata';
import { container } from "tsyringe";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import RefreshTokenService from './services/refreshTokenService';
import { MemberNotAuthenticatedException } from '../shared/exception/memberNotAuthenticatedexception';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        if(!req.body.refreshToken) {
            throw new MemberNotAuthenticatedException();
        }
    
        const userResponse = await new RefreshTokenService().execute(req.body.refreshToken);
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