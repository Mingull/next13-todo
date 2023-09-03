export class UnauthorizedResponse extends Response {
	constructor(body: BodyInit | null = "Unauthorized", { headers, status = 401, statusText }: ResponseInit = {}) {
		super(body, { headers, status, statusText });
	}
}
export class BadRequestResponse extends Response {
	constructor(body: BodyInit | null, { headers, status = 400, statusText }: ResponseInit = {}) {
		super(body, { headers, status, statusText });
	}
}
export class InternalServerResponse extends Response {
	constructor(
		body: BodyInit | null = "Internal Server Error",
		{ headers, status = 500, statusText }: ResponseInit = {}
	) {
		super(body, { headers, status, statusText });
	}
}
