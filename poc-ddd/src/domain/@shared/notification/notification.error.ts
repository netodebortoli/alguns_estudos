import { NotificationErrorData } from "./notification";

export default class NotificationError extends Error {
    constructor(public readonly errors: NotificationErrorData[]) {
        super(
            errors.map(e => `${e.context}: ${e.message}`).join(", ")
        );
    }
}