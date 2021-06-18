import MaterialPrice from "../infra/typeorm/entities/MaterialPrice";
import { IMaterialPrice } from "../interfaces/IMaterialPrice.interface";

export interface IMaterialPriceRepository {
    createMaterialPrice(materialPrices: IMaterialPrice): Promise<MaterialPrice>;
}