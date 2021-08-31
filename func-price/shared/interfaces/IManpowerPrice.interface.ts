export interface IManpowerPrice {
  constructionId: number;
  occupation: string;
  service: string;
  amount: number;
  position?: string;
  creationDate?: Date;
  lastUpdate?: Date;
}