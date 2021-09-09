import { getRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "../../../exception/internalServerError.exception";
import { NotFoundException } from "../../../exception/notFound.exception";
import { IManpowerPrice } from "../../../interfaces/IManpowerPrice.interface";
import { IManpowerPriceRepository } from "../../../interfaces/repositories/IManpowerPriceRepository";
import ManpowerPrice from "../entities/ManpowerPrice";

class ManpowerPriceRepository implements IManpowerPriceRepository {
    private ormRepository: Repository<ManpowerPrice>;

    constructor() {
        this.ormRepository = getRepository(ManpowerPrice);
    }

    public async getManpowerPrice(id: number): Promise<ManpowerPrice> {
        try {
            const manpowerPrice = await this.ormRepository.findOne({ id: id });

            if (!ManpowerPrice) {
                throw new NotFoundException(
                    "400",
                    "Manpower não encontrado",
                    "Manpower não encontrado",
                    "ERROR"
                );
            }

            return manpowerPrice;
        } catch (error) {
            if(error.code == "400"){
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async listManpowerPrice(constructionId: number): Promise<ManpowerPrice[]> {
        try {
            const manpowerPrice = await this.ormRepository.find({
                where: {
                    construction_id: constructionId
                }
            });

            if (manpowerPrice?.length == 0) {
                throw new NotFoundException(
                    "400",
                    "Manpower da construção não encontrados",
                    "Manpower da construção não encontrados",
                    "ERROR"
                );
            }

            return manpowerPrice;
        } catch (error) {
            if(error.code == "400"){
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async createManpowerPrice(
        { constructionId, occupation, service, amount }: IManpowerPrice): Promise<ManpowerPrice> {
        try {
            const manpowerPrice = this.ormRepository.create({
                construction_id: constructionId,
                occupation: occupation,
                service: service,
                amount: amount,
                creation_date: new Date(),
                last_update: new Date()
            });

            return await this.ormRepository.save(manpowerPrice);
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async updateManpowerPrice(id: number,
        { occupation, service, amount }: IManpowerPrice): Promise<any> {
        try {
            const manpowerPrice = await this.ormRepository.findOne({ id: id });

            if (!manpowerPrice) {
                throw new NotFoundException(
                    "400",
                    "Manpower não encontrado",
                    "Manpower não encontrado",
                    "ERROR"
                );
            }

            manpowerPrice.occupation = occupation;
            manpowerPrice.service = service;
            manpowerPrice.amount = amount;
            manpowerPrice.last_update = new Date();

            return await this.ormRepository.save(manpowerPrice);
        } catch (error) {
            if(error.code == "400"){
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Prices"
            );
        }
    }

    public async deleteManpowerPrice(id: number): Promise<number> {
        try {
            const manpowerPrice = await this.ormRepository.delete({ id: id });

            return manpowerPrice.affected;
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

export default ManpowerPriceRepository;