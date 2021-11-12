import { getRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "../../../exception/internalServerError.exception";
import { NotFoundException } from "../../../exception/notFound.exception";
import { IBalanceConstruction } from "../../../interfaces/IBalanceConstruction.interface";
import { IBalanceConstructionRepository } from "../../../interfaces/repositories/IBalanceConstructionRepository";
import BalanceConstruction from "../entities/BalanceConstruction";

class BalanceConstructionRepository implements IBalanceConstructionRepository {
    private ormRepository: Repository<BalanceConstruction>;

    constructor() {
        this.ormRepository = getRepository(BalanceConstruction);
    }

    public async getBalanceConstruction(id: number): Promise<BalanceConstruction> {
        try {
            const balanceConstruction = await this.ormRepository.findOne({ id: id });

            if (!balanceConstruction) {
                throw new NotFoundException(
                    "400",
                    "Balance não encontrado",
                    "Balance não encontrado",
                    "ERROR"
                );
            }

            return balanceConstruction;
        } catch (error) {
            if(error.code == "400"){
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Balance"
            );
        }
    }

    public async listBalanceConstruction(constructionId: number): Promise<BalanceConstruction[]> {
        try {
            const balanceConstruction = await this.ormRepository.find({
                where: {
                    construction_id: constructionId
                }
            });

            if (balanceConstruction?.length == 0) {
                throw new NotFoundException(
                    "400",
                    "Balance da construção não encontrado",
                    "Balance da construção não encontrado",
                    "ERROR"
                );
            }

            return balanceConstruction;
        } catch (error) {
            if(error.code == "400"){
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Balance"
            );
        }
    }

    public async createBalanceConstruction(
        { constructionId, month, amount }: IBalanceConstruction): Promise<BalanceConstruction> {
        try {
            const BalanceConstruction = this.ormRepository.create({
                construction_id: constructionId,
                month: month,
                amount: amount
            });

            return await this.ormRepository.save(BalanceConstruction);
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Balance"
            );
        }
    }

    public async updateBalanceConstruction(id: number,
        { month, amount }: IBalanceConstruction): Promise<any> {
        try {
            const balanceConstruction = await this.ormRepository.findOne({ id: id });

            if (!balanceConstruction) {
                throw new NotFoundException(
                    "400",
                    "Balance não encontrado",
                    "Balance não encontrado",
                    "ERROR"
                );
            }

            balanceConstruction.month = month ? month : balanceConstruction.month;
            balanceConstruction.amount = amount ? amount : balanceConstruction.amount;
            balanceConstruction.last_update = new Date();

            return await this.ormRepository.save(balanceConstruction);
        } catch (error) {
            if(error.code == "400"){
                throw error;
            }
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Balance"
            );
        }
    }

    public async deleteBalanceConstruction(id: number): Promise<number> {
        try {
            const BalanceConstruction = await this.ormRepository.delete({ id: id });

            return BalanceConstruction.affected;
        } catch (error) {
            throw new InternalServerErrorException(
                "500",
                error.message,
                "ERROR",
                "Balance"
            );
        }
    }
}

export default BalanceConstructionRepository;