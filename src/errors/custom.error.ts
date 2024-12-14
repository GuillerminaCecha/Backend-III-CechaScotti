export class NotFoundError extends Error {
	private status: number;
	constructor(message: string = 'Not found') {
		super(message);
		this.status = 404;
	}
}
export class BadRequestError extends Error {
	private status: number;
	constructor(message: string = 'Not found') {
		super(message);
		this.status = 400;
	}
}
export class UnauthorizedError extends Error {
	private status: number;
	constructor(message: string = 'Not found') {
		super(message);
		this.status = 401;
	}
}