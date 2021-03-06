import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestValidation } from "../shared/utils/requestValidation";
import CreateInformationActivityService from './services/createInformationActivityService';
import * as path from 'path';
import '../container';
import { MemberNotAuthenticatedException } from '../shared/exception/memberNotAuthenticatedexception';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const responseSchemaValidation = RequestValidation.validate(context, req, path.join(__dirname, './schemas/requestDefinition.json'));
    if (responseSchemaValidation.status == 400) {
        context.res = responseSchemaValidation;
        return;
    }
    
    try {
        if(!req.headers['authorization']) {
            throw new MemberNotAuthenticatedException();
        }
        let accessToken = req.headers.authorization.split(' ')[1];

        const informationActivity = container.resolve(CreateInformationActivityService);
        const createInformationActivity = await informationActivity.execute(req.body, accessToken);
        context.res = {
            status: createInformationActivity.status,
            body: createInformationActivity.data
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