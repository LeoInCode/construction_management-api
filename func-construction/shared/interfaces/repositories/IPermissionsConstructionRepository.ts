import Construction from "../../infra/typeorm/entities/Construction";
import PermissionsConstruction from "../../infra/typeorm/entities/PermissionsConstruction";

export interface IPermissionsConstructionRepository {
    createPermissionsConstruction(construction: Construction, position: string): Promise<PermissionsConstruction>;
}