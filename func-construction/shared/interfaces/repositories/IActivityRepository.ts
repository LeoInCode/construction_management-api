import { IRequestActivity } from "../../../createActivity/interfaces/IRequestActivity.interface";
import Activity from "../../infra/typeorm/entities/Activity";
import Construction from "../../infra/typeorm/entities/Construction";

export interface IActivityRepository {
    createActivity(activity: IRequestActivity): Promise<Activity>;
    getActivity(id: number, construction: Construction): Promise<Activity>;
}