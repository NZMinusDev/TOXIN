class ErrorWrapper extends Error {
  public cause: Error;

  constructor(message: string, cause: Error) {
    super(message);
    this.cause = cause;
    this.name = 'ReadError';
  }
}

export { ErrorWrapper as default };
