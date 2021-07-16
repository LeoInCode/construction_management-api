import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestValidation } from "../shared/utils/requestValidation";
import * as path from 'path';
import '../container';
import ListInformationActivityService from './services/listInformationActivityService';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const informationActivity = container.resolve(ListInformationActivityService);
        const createInformationActivity = await informationActivity.execute(+req.params.id);
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