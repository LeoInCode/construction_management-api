export interface IRequestInformationActivity {
    constructionId: number;
    activityId: number;
    responsible: string;
    deadline?: string;
    description?: string;
    descriptionImg?: string;
    progress?: number;
    result?: string;
    resultImg?: string;
    position: string;
}