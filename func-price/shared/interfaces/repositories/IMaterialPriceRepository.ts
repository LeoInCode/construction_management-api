import MaterialPrice from "../../infra/typeorm/entities/MaterialPrice";
import { IMaterialPrice } from "../IMaterialPrice.interface";

export interface IMaterialPriceRepository {
    getMaterialPrice(id: number): Promise<MaterialPrice>;
    createMaterialPrice(materialPrices: IMaterialPrice): Promise<MaterialPrice>;
    updateMaterialPrice(id: number, materialPrices: IMaterialPrice): Promise<MaterialPrice>;
    deleteMaterialPrice(id: number): Promise<number>;
    listMaterialPrice(constructionId: number): Promise<MaterialPrice[]>;
}