export interface IDescriptionResponseInformation {
    id: number;
    responsible: string;
    creationDate: Date;
    deadline: Date;
    description: string;
    description_img: string;
}

export interface IActivityResponseInformation {
    id: number;
    progress: number;
    result: string;
    result_img: string;
}