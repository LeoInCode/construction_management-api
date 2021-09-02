import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import ListConstructionService from './services/listConstructionService';
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {    
    try {
        const construction = container.resolve(ListConstructionService);
        const listConstruction = await construction.execute(req.params.profileId);
        context.res = {
            status: listConstruction.status,
            body: listConstruction.data
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