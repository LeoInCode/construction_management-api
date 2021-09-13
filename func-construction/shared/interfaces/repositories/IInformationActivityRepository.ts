import { IRequestInformationActivity } from "../../../createInformationActivity/interfaces/IRequestInformationActivity.interface";
import InformationActivity from "../../infra/typeorm/entities/InformationActivity";

export interface IInformationActivityRepository {
    createInformationActivity(informationActivity: IRequestInformationActivity): Promise<InformationActivity>;
    getInformationActivity(id: number): Promise<InformationActivity>;
    updateInformationActivity(id: number, informationActivity: IRequestInformationActivity): Promise<void>;
}