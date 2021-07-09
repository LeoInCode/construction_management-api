import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestValidation } from "../shared/utils/requestValidation";
import CreateConstructionService from './services/createConstructionService';
import * as path from 'path';
import '../container';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const responseSchemaValidation = RequestValidation.validate(context, req, path.join(__dirname, './schemas/requestDefinition.json'));
    if (responseSchemaValidation.status == 400) {
        context.res = responseSchemaValidation;
        return;
    }
    
    try {            
        const construction = container.resolve(CreateConstructionService);
        const createConstruction = await construction.execute(req.body);
        context.res = {
            status: createConstruction.status,
            body: createConstruction.data
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