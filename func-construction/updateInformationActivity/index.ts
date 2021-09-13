import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestValidation } from "../shared/utils/requestValidation";
import UpdateInformationActivityService from './services/updateInformationActivityService';
import * as path from 'path';
import { MemberNotAuthenticatedException } from '../shared/exception/memberNotAuthenticatedexception';
import '../container';


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

        const informationActivity = container.resolve(UpdateInformationActivityService);
        const updateInformationActivity = await informationActivity.execute(req.body, +req.params.id, accessToken);
        context.res = {
            status: updateInformationActivity.status,
            body: updateInformationActivity.data
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