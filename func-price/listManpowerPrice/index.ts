import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MemberNotAuthenticatedException } from "../shared/exception/memberNotAuthenticatedexception";
import ListManpowerPriceService from './services/listManpowerPriceService';
import '../container';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        if(!req.headers['authorization']) {
            throw new MemberNotAuthenticatedException();
        }
            
        let accessToken = req.headers.authorization.split(' ')[1];

        const listManpowerPrice = container.resolve(ListManpowerPriceService);
        const manpowerPrice = await listManpowerPrice.execute(req.params.id, req.query.position, accessToken);
        context.res = {
            status: manpowerPrice.status,
            body: manpowerPrice.data
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