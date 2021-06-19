import { getRepository, Repository } from "typeorm";
import { IMaterialPrice } from "../../../interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../../repositories/IMaterialPriceRepository";
import MaterialPrice from "../entities/MaterialPrice";

class MaterialPriceRepository implements IMaterialPriceRepository {
    private ormRepository: Repository<MaterialPrice>;

    constructor() {
        this.ormRepository = getRepository(MaterialPrice);
    }

    public async createMaterialPrice(
        { constructionId, displayName, unitPrice, quantity} : IMaterialPrice): Promise<MaterialPrice> {
        try {
            const materialPrice = this.ormRepository.create({
                construction_id: constructionId,
                display_name: displayName,
                unit_price: unitPrice,
                quantity: quantity,
                creation_date: new Date(),
                last_update: new Date()
            });

            return await this.ormRepository.save(materialPrice);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default MaterialPriceRepository;