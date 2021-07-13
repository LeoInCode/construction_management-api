import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestValidation } from "../shared/utils/requestValidation";
import CreateStageService from './services/createStageService';
import * as path from 'path';
import '../container';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const responseSchemaValidation = RequestValidation.validate(context, req, path.join(__dirname, './schemas/requestDefinition.json'));
    if (responseSchemaValidation.status == 400) {
        context.res = responseSchemaValidation;
        return;
    }
    
    try {
        const stage = container.resolve(CreateStageService);
        const createStage = await stage.execute(req.body.stageName, req.body.constructionId);
        context.res = {
            status: createStage.status,
            body: createStage.data
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