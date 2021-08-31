export interface IRequestConstruction {
    constructionId: number;
    responsible: string;
    client: string;
    type: string;
    occupation: string;
    permissions: string; //JSON em formto de string: "{\"profileId\":\"9128039281\",\"occupation\":\"employee\"}"
    displayName: string;
    refreshToken: string;
}