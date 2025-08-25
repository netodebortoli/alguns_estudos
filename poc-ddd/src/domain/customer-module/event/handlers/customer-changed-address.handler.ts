import Event from "../../../@shared/event/event";
import EventHandler from "../../../@shared/event/event.handler";

export default class CustomerChangedAddresHandler implements EventHandler {
    handle(event: Event): void {
        const id = event.data.id.getValue();
        const nome = event.data.name;
        const endereco = event.data.address;
        console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${JSON.stringify(endereco)}`);
    }

}