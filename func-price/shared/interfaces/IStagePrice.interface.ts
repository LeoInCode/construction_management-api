export interface IStagePrice {
    constructionId: number;
    stage: string;
    description: string;
    amount: number;
    position?: string;
    creationDate?: Date;
    lastUpdate?: Date;
}