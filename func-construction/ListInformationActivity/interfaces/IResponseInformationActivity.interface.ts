export interface IDescriptionResponseInformation {
    id: number;
    responsible: string;
    creationDate: string;
    deadline: string;
    description: string;
    description_img: string;
}

export interface IActivityResponseInformation {
    id: number;
    progress: number;
    result: string;
    result_img: string;
}