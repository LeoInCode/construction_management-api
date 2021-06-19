import 'reflect-metadata';
import { container } from 'tsyringe';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { RequestValidation } from "../shared/utils/requestValidation";
import CreateMaterialPriceService from './services/createMaterialPriceService'
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
            throw {data: {message: 'not authorized'}};
        }
            
        let accessToken = req.headers.authorization.split(' ')[1];

        const createMaterialPrice = container.resolve(CreateMaterialPriceService);
        const materialPrice = await createMaterialPrice.execute(req.body, accessToken);
        context.res = {
            status: materialPrice.status,
            body: materialPrice.data
        };
    } catch (error) {
        context.res = {
            status: error.status ? error.status : 500,
            body: error.data
        };
    }
};

export default httpTrigger;