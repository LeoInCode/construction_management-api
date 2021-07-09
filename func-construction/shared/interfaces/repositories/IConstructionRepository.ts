import { IRequestConstruction } from "../../../createConstruction/interfaces/IRequestConstruction.interface";

export interface IConstructionRepository {
    createConstruction(construction: IRequestConstruction): Promise<any>;
}