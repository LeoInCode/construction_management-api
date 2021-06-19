import 'reflect-metadata';
import { container } from "tsyringe";
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import LoginService from "./services/loginService";
import { RequestValidation } from '../shared/utils/requestValidation';
import * as path from 'path';
import '../container';
import { GeneralErrorException } from '../shared/exception/generalError.exception';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {
        if (!req.headers['email'] || !req.headers['password']) {
            throw new GeneralErrorException(
                "400",
                "Campos inválidos",
                "Campos inválidos",
                "ERROR",
                400
            )
        }

        const getUser = container.resolve(LoginService);
        const userResponse = await getUser.execute(req.headers['email'], req.headers['password']);
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