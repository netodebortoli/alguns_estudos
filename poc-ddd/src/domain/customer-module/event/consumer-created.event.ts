import Event from "../../@shared/event/event";

export default class ConsumerCreatedEvent implements Event {
    timestamp: Date;
    data: any;

    constructor(eventData: any) {
        this.timestamp = new Date();
        this.data = eventData;
    }

}