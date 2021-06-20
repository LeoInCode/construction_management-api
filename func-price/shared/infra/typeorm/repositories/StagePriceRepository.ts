import { getRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "../../../exception/internalServerError.exception";
import { NotFoundException } from "../../../exception/notFound.exception";
import { IStagePrice } from "../../../interfaces/IStagePrice.interface";
import { IStagePriceRepository } from "../../../interfaces/repositories/IStagePriceRepository";
import StagePrice from "../entities/StagePrice";

class StagePriceRepository implements IStagePriceRepository {
    private ormRepository: Repository<StagePrice>;

    constructor() {
        this.ormRepository = getRepository(StagePrice);
    }

    public async getStagePrice(id: number): Promise<StagePrice> {
        try {
         const stagePrice = await this.ormRepository.findOne({id: id});

         if(!StagePrice) {
            throw new NotFoundException(
                "400",
                "Stage não encontrado",
                "Stage não encontrado",
                "ERROR"
            );
         }
         
         return stagePrice;
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async listStagePrice(constructionId: number): Promise<StagePrice[]> {
        try {
         const stagePrice = await this.ormRepository.find({
             where: {
                 construction_id: constructionId
             }
         });

         if(stagePrice?.length == 0) {
            throw new NotFoundException(
                "400",
                "Stage da contrução não encontrados",
                "Stage da contrução não encontrados",
                "ERROR"
            );
         }
         
         return stagePrice;
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async createStagePrice(
        { constructionId, stage, description, amount } : IStagePrice): Promise<StagePrice> {
        try {
            const stagePrice = this.ormRepository.create({
                construction_id: constructionId,
                stage: stage,
                description: description,
                amount: amount,
                creation_date: new Date(),
                last_update: new Date()
            });

            return await this.ormRepository.save(stagePrice);
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async updateStagePrice(id: number,
        { stage, description, amount }: IStagePrice): Promise<any> {
        try {
            const stagePrice = await this.ormRepository.findOne({id: id});

            if(!stagePrice) {
                throw new NotFoundException(
                    "400",
                    "Stage não encontrado",
                    "Stage não encontrado",
                    "ERROR"
                );
            }

            if(stage){
                stagePrice.stage = stage;
            }
            if(description){
                stagePrice.description = description;
            }
            if(amount){
                stagePrice.amount = amount;
            }
            stagePrice.last_update = new Date();

            return await this.ormRepository.save(stagePrice);
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async deleteStagePrice(id: number): Promise<number> {
        try {
            const stagePrice = await this.ormRepository.delete({id: id});

            return stagePrice.affected;
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

export default StagePriceRepository;