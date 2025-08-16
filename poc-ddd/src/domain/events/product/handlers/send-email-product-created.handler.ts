import EventHandler from "../../@shared/event.handler";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductCreatedHandler implements EventHandler<ProductCreatedEvent> {

    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email...`);
    }

}