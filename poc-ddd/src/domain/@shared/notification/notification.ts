export type Notification = {
    message: string;
    context: string;
}

export default class NotificationError {

    private erros: Notification[] = [];

    public addErros(erros: Notification[]): void {
        erros.forEach(newError => this.erros.push(newError));
    }

    public addError(newError: Notification): void {
        this.erros.push(newError)
    }

    public getMessages(context?: string): string {
        return this.erros.filter(error => !context || error.context === context)
            .map(error => `${error.context}: ${error.message}`)
            .join(", ");
    }

    public hasErrors(context: string): boolean {
        return this.erros.some(error => error.context === context);
    }

}