export class Router {
	constructor() {
		this.routes = new Map();
		window.addEventListener('hashchange', () => this.handle());
	}

	register(path, handler) {
		this.routes.set(path, handler);
		return this;
	}

	start() {
		if (!location.hash) location.hash = '#/';
		this.handle();
	}

	handle() {
		const hash = location.hash || '#/';
		const [path, qs] = hash.slice(1).split('?');
		const handler = this.routes.get(path) || this.routes.get('404');
		const params = Object.fromEntries(new URLSearchParams(qs || ''));
		handler?.(params);
	}
}


