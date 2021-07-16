export interface IRequestInformationActivity {
    constructionId: number;
    activityId: number;
    responsible: string;
    deadline?: string;
    description?: string;
    description_img?: string;
    progress?: number;
    result?: string;
    result_img?: string;
}