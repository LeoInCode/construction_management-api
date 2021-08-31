export interface IMaterialPrice {
    constructionId: number;
    displayName: string;
    unitPrice: number;
    quantity: number;
    position?: string;
    creationDate?: Date;
    lastUpdate?: Date;
}