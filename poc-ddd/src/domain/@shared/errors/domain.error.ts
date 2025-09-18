export default class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Domain error';
  }
}