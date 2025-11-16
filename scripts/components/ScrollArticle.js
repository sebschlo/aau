export function renderScrollArticle(container, project) {
	const article = document.createElement('div');
	article.className = 'article';

	const main = document.createElement('div');
	const aside = document.createElement('aside');
	aside.className = 'section';

	const h2 = document.createElement('h2');
	h2.textContent = project.title;
	aside.appendChild(h2);

	if (project.description) {
		const p = document.createElement('p');
		p.textContent = project.description;
		aside.appendChild(p);
	}

	project.images.forEach(img => {
		const figure = document.createElement('figure');
		figure.className = 'section';
		const el = document.createElement('img');
		el.loading = 'lazy';
		el.decoding = 'async';
		el.src = img.src;
		el.alt = img.alt || '';
		figure.appendChild(el);
		if (img.caption) {
			const cap = document.createElement('figcaption');
			cap.textContent = img.caption;
			cap.style.color = '#a7a7a7';
			cap.style.fontSize = '14px';
			cap.style.marginTop = '8px';
			figure.appendChild(cap);
		}
		main.appendChild(figure);
	});

	article.appendChild(main);
	article.appendChild(aside);
	container.appendChild(article);
	return article;
}


