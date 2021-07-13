import Stage from "../../infra/typeorm/entities/Stage";

export interface IStageRepository {
    createStage(stageName: string, constructionId: number): Promise<Stage>;
}