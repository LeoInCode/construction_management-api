import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MemberNotAuthenticatedException } from "../shared/exception/memberNotAuthenticatedexception";
import { RequestValidation } from "../shared/utils/requestValidation";
import UpdateMaterialPriceService from './services/updateMaterialPriceService';
import * as path from 'path';
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

        const updateMaterialPrice = container.resolve(UpdateMaterialPriceService);
        const materialPrice = await updateMaterialPrice.execute(req.body, req.params.id, accessToken);
        context.res = {
            status: materialPrice.status,
            body: materialPrice.data
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