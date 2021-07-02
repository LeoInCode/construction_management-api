import ManpowerPrice from "../../infra/typeorm/entities/ManpowerPrice";
import { IManpowerPrice } from "../IManpowerPrice.interface";

export interface IManpowerPriceRepository {
    getManpowerPrice(id: number): Promise<ManpowerPrice>;
    createManpowerPrice(ManpowerPrices: IManpowerPrice): Promise<ManpowerPrice>;
    updateManpowerPrice(id: number, ManpowerPrices: IManpowerPrice): Promise<ManpowerPrice>;
    deleteManpowerPrice(id: number): Promise<number>;
    listManpowerPrice(constructionId: number): Promise<ManpowerPrice[]>;
}