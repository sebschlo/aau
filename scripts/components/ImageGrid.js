export function renderImageGrid({ container, items, className =  }) {
	const grid = document.createElement(div);
	grid.className = `grid ${className}`.trim();
	items.forEach(item => {
		const col = document.createElement(item.href ? a : div);
		if (item.href) col.href = item.href;
		col.className = `card col-span-${item.colSpan || 4}`;
		col.setAttribute(tabindex, item.href ? 0 : -1);

		const img = document.createElement(img);
		img.loading = lazy;
		img.decoding = async;
		img.src = item.src;
		img.alt = item.alt || item.title || ;
		col.appendChild(img);

		if (item.title) {
			const t = document.createElement(div);
			t.className = card-title;
			t.textContent = item.title;
			col.appendChild(t);
		}

		grid.appendChild(col);
	});
	container.appendChild(grid);
	return grid;
}
