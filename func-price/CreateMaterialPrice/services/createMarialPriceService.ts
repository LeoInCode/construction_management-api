import { inject, injectable } from "tsyringe";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IMaterialPrice } from "../../shared/interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../shared/repositories/IMaterialPriceRepository";

@injectable()
class CreateMaterialPriceService {

    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(body: IMaterialPrice) {
        try {
            const material = this.materialPriceRepository.createMaterialPrice(body);
    
            return material;
        } catch (error) {
            throw error;
        }
    }
}

export default CreateMaterialPriceService;