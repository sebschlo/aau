import { renderImageGrid } from /scripts/components/ImageGrid.js;

export function renderGalleryGrid(container, images) {
	const items = images.map(img => ({
		src: img.src,
		alt: img.alt,
		title: img.caption,
		colSpan: 4
	}));
	return renderImageGrid({ container, items, className: gallery-grid });
}

export function renderGalleryStrip(container, images) {
	const strip = document.createElement(div);
	strip.className = gallery-strip;
	images.forEach(img => {
		const el = document.createElement(img);
		el.loading = lazy;
		el.decoding = async;
		el.src = img.src;
		el.alt = img.alt || ;
		strip.appendChild(el);
	});
	container.appendChild(strip);
	return strip;
}
