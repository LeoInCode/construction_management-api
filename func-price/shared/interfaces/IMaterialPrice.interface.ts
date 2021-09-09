export interface IMaterialPrice {
    constructionId: number;
    displayName: string;
    unitPrice: number;
    quantity: number;
    position?: string;
    totalBalance?: number;
    creationDate?: Date;
    lastUpdate?: Date;
}