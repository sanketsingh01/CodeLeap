class ApiResponse {
  constructor(statusCode, DataTransfer, message = 'Success') {
    this.statusCode = statusCode;
    this.data = this.data;
    this.message = message;
    this.success = true;
  }
}

export { ApiResponse };
