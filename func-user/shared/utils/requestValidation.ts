import { Context, HttpRequest } from "@azure/functions";
import Ajv from 'ajv';
import * as fs from 'fs';

export class RequestValidation {
    public static validate(context: Context, request: HttpRequest, pathFile: string) {
        
        //Default HTTP 200 Response
        const response = { status: 200, message: '' };

        //Get body Request
        const body = request.body;

        //Start AJV (Another Json Validate)
        var ajv = new Ajv();

        //Get Schema to validate
        let dataSchema = fs.readFileSync(pathFile, 'utf8');

        //Parse to JSON Schema file
        var schemaValidate = ajv.validate(JSON.parse(dataSchema), body);

        //Validate Schema Error
        if (!schemaValidate) {
            return {
                status: 400,
                body: {
                    message: ajv.errorsText()
                }
            } 
        }

        return response;
    }
}