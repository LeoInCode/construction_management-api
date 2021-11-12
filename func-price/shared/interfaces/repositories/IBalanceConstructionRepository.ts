import BalanceConstruction from "../../infra/typeorm/entities/BalanceConstruction";
import { IBalanceConstruction } from "../IBalanceConstruction.interface";

export interface IBalanceConstructionRepository {
    getBalanceConstruction(id: number): Promise<BalanceConstruction>;
    createBalanceConstruction(BalanceConstructions: IBalanceConstruction): Promise<BalanceConstruction>;
    updateBalanceConstruction(id: number, BalanceConstructions: IBalanceConstruction): Promise<BalanceConstruction>;
    deleteBalanceConstruction(id: number): Promise<number>;
    listBalanceConstruction(constructionId: number): Promise<BalanceConstruction[]>;
}