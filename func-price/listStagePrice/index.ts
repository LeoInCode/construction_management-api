import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MemberNotAuthenticatedException } from "../shared/exception/memberNotAuthenticatedexception";
import ListStagePriceService from './services/listStagePriceService';
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        if(!req.headers['authorization']) {
            throw new MemberNotAuthenticatedException();
        }
            
        let accessToken = req.headers.authorization.split(' ')[1];

        const listStagePrice = container.resolve(ListStagePriceService);
        const stagePrice = await listStagePrice.execute(req.params.id, accessToken);
        context.res = {
            status: stagePrice.status,
            body: stagePrice.data
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