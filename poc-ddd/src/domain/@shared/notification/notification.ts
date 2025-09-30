export type NotificationErrorData = {
    message: string;
    context: string;
}

export default class Notification {

    private _errors: NotificationErrorData[] = [];

    public addErros(erros: NotificationErrorData[]): void {
        erros.forEach(newError => this._errors.push(newError));
    }

    public addError(newError: NotificationErrorData): void {
        this._errors.push(newError)
    }

    public getMessages(context?: string): string {
        return this._errors.filter(error => !context || error.context === context)
            .map(error => `${error.context}: ${error.message}`)
            .join(", ");
    }

    public hasErrors(context: string): boolean {
        return this._errors.some(error => error.context === context);
    }

    get errors () {
        return this._errors;
    }

}