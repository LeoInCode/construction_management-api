import { inject, injectable } from "tsyringe";
import { IGetUserEndpoint } from "../../shared/interfaces/endpoints/IGetUserEndpoint";
import { IMaterialPrice } from "../../shared/interfaces/IMaterialPrice.interface";
import { IMaterialPriceRepository } from "../../shared/repositories/IMaterialPriceRepository";
import HandleContent from "../../shared/services/handleContent";

@injectable()
class CreateMaterialPriceService {
    
    private handleContent: HandleContent;
    
    constructor(
        @inject('MaterialPriceRepository')
        private materialPriceRepository: IMaterialPriceRepository,
        @inject('GetUserEndpoint')
        private getUserEndpoint: IGetUserEndpoint
    ) { }

    public async execute(body: IMaterialPrice, accessToken: string) {
        try {
            console.log(body);
            
            this.handleContent = new HandleContent(this.getUserEndpoint);

            const user = await this.handleContent.getUser(accessToken, 'price', 'create');
            
            const material = this.materialPriceRepository.createMaterialPrice(body);
    
            return material;
        } catch (error) {
            throw {
                status: 400,
                data: {
                    message: error
                }
            };
        }
    }
}

export default CreateMaterialPriceService;