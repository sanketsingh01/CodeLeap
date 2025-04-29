class ApiResponse {
  constructor(statusCode, Data, message = 'Success') {
    this.statusCode = statusCode;
    this.Data = Data;
    this.message = message;
    this.success = true;
  }
}

export { ApiResponse };
