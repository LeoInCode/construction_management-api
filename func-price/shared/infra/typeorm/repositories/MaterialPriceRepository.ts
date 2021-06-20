import { getRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "../../../exception/internalServerError.exception";
import { NotFoundException } from "../../../exception/notFound.exception";
import { IMaterialPrice } from "../../../interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../../repositories/IMaterialPriceRepository";
import MaterialPrice from "../entities/MaterialPrice";

class MaterialPriceRepository implements IMaterialPriceRepository {
    private ormRepository: Repository<MaterialPrice>;

    constructor() {
        this.ormRepository = getRepository(MaterialPrice);
    }

    public async getMaterialPrice(id: number): Promise<MaterialPrice> {
        try {
         const materialPrice = await this.ormRepository.findOne({id: id});

         if(!materialPrice) {
            throw new NotFoundException(
                "400",
                "Preço do material não encontrado",
                "Preço do material não encontrado",
                "ERROR"
            );
         }
         
         return materialPrice;
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
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
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async updateMaterialPrice(id: number,
        { displayName, quantity, unitPrice }: IMaterialPrice): Promise<any> {
        try {
            const materialPrice = await this.ormRepository.findOne({id: id});

            if(!materialPrice) {
                throw new NotFoundException(
                    "400",
                    "Preço do material não encontrado",
                    "Preço do material não encontrado",
                    "ERROR"
                );
            }

            if(displayName){
                materialPrice.display_name = displayName;
            }
            if(quantity){
                materialPrice.quantity = quantity;
            }
            if(unitPrice){
                materialPrice.unit_price = unitPrice;
            }
            materialPrice.last_update = new Date();

            return await this.ormRepository.save(materialPrice);
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async deleteMaterialPrice(id: number): Promise<number> {
        try {
            const materialPrice = await this.ormRepository.delete({id: id});

            return materialPrice.affected;
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }
}

export default MaterialPriceRepository;