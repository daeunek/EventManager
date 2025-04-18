import { Category } from "../../category/models/category.model";


export interface pEvent {
    id : string;
    name : string;
    date : Date;
    location : string;
    description: string;
    detailDescription: string;
    attendeesCount: number;
    urlHandle: string;
    featuredImageUrl: string;
    isVisible: boolean;

    categories: Category[];
}