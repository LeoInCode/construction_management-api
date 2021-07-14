import { IRequestActivity } from "../../../createActivity/interfaces/IRequestActivity.interface";
import Activity from "../../infra/typeorm/entities/Activity";

export interface IActivityRepository {
    createActivity(activity: IRequestActivity): Promise<Activity>;
}