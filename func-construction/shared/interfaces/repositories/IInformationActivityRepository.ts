import InformationActivity from "../../infra/typeorm/entities/InformationActivity";

export interface IInformationActivityRepository {
    createInformationActivity(informationActivity: any): Promise<InformationActivity>;
}