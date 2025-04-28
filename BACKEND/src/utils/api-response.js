class ApiResponse {
  constructor(statusCode, DataTransfer, message = 'Success') {
    this.statusCode = statusCode;
    this.DataTransfer = DataTransfer;
    this.message = message;
    this.success = true;
  }
}

export { ApiResponse };
