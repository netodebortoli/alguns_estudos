import Event from "../../../@shared/event/event";
import EventHandler from "../../../@shared/event/event.handler";

export default class EnviaConsoleLog2Handler implements EventHandler {
    handle(event: Event): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated.", event);
    }

}