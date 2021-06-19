import MaterialPrice from "../infra/typeorm/entities/MaterialPrice";
import { IMaterialPrice } from "../interfaces/IMaterialPrice.interface";

export interface IMaterialPriceRepository {
    getMaterialPrice(id: number): Promise<MaterialPrice>;
    createMaterialPrice(materialPrices: IMaterialPrice): Promise<MaterialPrice>;
    updateMaterialPrice(id: number, materialPrices: IMaterialPrice): Promise<MaterialPrice>;
}