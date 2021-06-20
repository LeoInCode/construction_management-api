export interface IStagePrice {
    constructionId: number;
    stage: string;
    description: string;
    amount: number;
    creationDate?: Date;
    lastUpdate?: Date;
}