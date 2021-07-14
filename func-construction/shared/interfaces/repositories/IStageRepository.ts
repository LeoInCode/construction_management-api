import Construction from "../../infra/typeorm/entities/Construction";
import Stage from "../../infra/typeorm/entities/Stage";

export interface IStageRepository {
    createStage(stageName: string, constructionId: number): Promise<Stage>;
    getStage(id: number, construction: Construction): Promise<Stage>;
}