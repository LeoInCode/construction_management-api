import Activity from "../../infra/typeorm/entities/Activity";

export interface IActivityRepository {
    createActivity(): Promise<Activity>;
}