export class CustomError {
    notFoundError(message = "Not found") {
      const error = new Error(message);
      error.status = 404;
      return error;
    }
  
    unauthorizedError(message = "Unauthorized") {
      const error = new Error(message);
      error.status = 401;
      return error;
    }
  }
  
  export const customError = new CustomError();