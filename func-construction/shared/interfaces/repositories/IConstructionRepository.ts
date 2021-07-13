import { IRequestConstruction } from "../../../createConstruction/interfaces/IRequestConstruction.interface";
import Construction from "../../infra/typeorm/entities/Construction";

export interface IConstructionRepository {
    createConstruction(construction: IRequestConstruction): Promise<Construction>;
    getConstruction(constructionId: number): Promise<Construction>
}