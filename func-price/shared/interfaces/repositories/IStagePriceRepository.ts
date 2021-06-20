import StagePrice from "../../infra/typeorm/entities/StagePrice";
import { IStagePrice } from "../IStagePrice.interface";

export interface IStagePriceRepository {
    getStagePrice(id: number): Promise<StagePrice>;
    createStagePrice(stagePrices: IStagePrice): Promise<StagePrice>;
    updateStagePrice(id: number, stagePrices: IStagePrice): Promise<StagePrice>;
    deleteStagePrice(id: number): Promise<number>;
    listStagePrice(constructionId: number): Promise<StagePrice[]>;
}