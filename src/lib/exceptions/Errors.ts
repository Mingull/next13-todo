export class AuthRequiredError extends Error {
	constructor(message = "Authentication is required to access this page.") {
		super(message);
		this.name = "AuthRequiredError";
	}
}

export class AdminAccessError extends Error {
	constructor(message = "Only users with admin privileges can access this.") {
		super(message);
		this.name = "AdminAccessError";
	}
}

export class UserNotFoundError extends Error {
	constructor(message = "The requested user was not found in our records.") {
		super(message);
		this.name = "UserNotFoundError";
	}
}
