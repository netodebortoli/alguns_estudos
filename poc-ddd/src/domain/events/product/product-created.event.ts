import Event from "../@shared/event";

export default class ProductCreatedEvent implements Event {
    timestamp: Date;
    data: any;

    constructor(eventData: any) {
        this.data = eventData;
        this.timestamp = new Date();
    }
}