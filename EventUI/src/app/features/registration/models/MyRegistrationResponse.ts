export interface MyRegistrationResponse {
    id: string;
    eventId: string;
    userId: string;
    registeredAt: Date;
    
    eventName: string;
    eventDescription: string;
    eventLocation: string;
    eventDate: Date;
    imgUrl: string;
}