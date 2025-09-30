import Notification from "../notification/notification";
import NotificationError from "../notification/notification.error";
import UUID from "../vo/uuid";

export default abstract class Entity {

    protected _id!: UUID;
    protected notificationErrors: Notification;

    constructor() {
        this.notificationErrors = new Notification();
    }

    get id() {
        return this._id.getValue();
    }

    get notification() {
        return this.notificationErrors;
    }

    isValid() {
        return !this.notification.hasErrors(this.constructor.name);
    }

    protected validate() {
        if (!this.isValid()) {
            throw new NotificationError(this.notification.errors);
        }
    }

}