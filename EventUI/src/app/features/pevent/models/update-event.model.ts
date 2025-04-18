export interface UpdateEventModel {
    name: string;
    date: Date;
    location: string;
    description: string;
    detailDescription: string;
    attendeesCount: number;
    urlHandle: string;
    featuredImageUrl: string;
    isVisible: boolean;

    categories: string[];   //category ids
}