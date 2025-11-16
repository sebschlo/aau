const yearEl = document.getElementById('year');
if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}

const navLinks = Array.from(document.querySelectorAll('.top-nav a'));
const sections = Array.from(document.querySelectorAll('main section'));

if (navLinks.length) {
	navLinks[0].classList.add('active');
}

if ('IntersectionObserver' in window && navLinks.length && sections.length) {
	const linkMap = new Map(
		navLinks
			.map(link => {
				const href = link.getAttribute('href');
				return href && href.startsWith('#') ? [href.slice(1), link] : null;
			})
			.filter(Boolean)
	);

	const observer = new IntersectionObserver(
		entries => {
			entries
				.filter(entry => entry.isIntersecting)
				.forEach(entry => {
					const id = entry.target.id;
					navLinks.forEach(link => link.classList.toggle('active', link === linkMap.get(id)));
				});
		},
		{
			rootMargin: '-45% 0px -45% 0px',
			threshold: 0
		}
	);

	sections.forEach(section => observer.observe(section));
}

navLinks.forEach(link => {
	link.addEventListener('click', event => {
		const targetId = link.getAttribute('href');
		if (!targetId || !targetId.startsWith('#')) return;
		const targetSection = document.querySelector(targetId);
		if (!targetSection) return;
		event.preventDefault();
		
		const dropdown = link.closest('.nav-dropdown');
		if (dropdown) {
			link.blur();
			dropdown.classList.remove('dropdown-open');
			setTimeout(() => {
				document.activeElement?.blur();
				if (document.body) {
					document.body.focus();
				}
			}, 0);
		}
		
		targetSection.scrollIntoView({ behavior: 'smooth' });
	});
});

const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
dropdowns.forEach(dropdown => {
	let closeTimeout = null;
	
	dropdown.addEventListener('mouseenter', () => {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		dropdown.classList.add('dropdown-open');
	});
	
	dropdown.addEventListener('mouseleave', () => {
		closeTimeout = setTimeout(() => {
			dropdown.classList.remove('dropdown-open');
			document.activeElement?.blur();
		}, 150);
	});
});

const modal = document.querySelector('[data-modal]');
const modalImage = modal?.querySelector('[data-modal-image]');
const modalCaption = modal?.querySelector('[data-modal-caption]');
let lastActiveElement = null;

function closeModal() {
	if (!modal) return;
	modal.setAttribute('hidden', '');
	document.body.classList.remove('modal-open');
	if (modalImage) {
		modalImage.src = '';
		modalImage.alt = '';
	}
	if (modalCaption) {
		modalCaption.textContent = '';
	}
	if (lastActiveElement) {
		lastActiveElement.focus();
		lastActiveElement = null;
	}
}

function openModal(src, alt, caption) {
	if (!modal || !modalImage) return;
	const active = document.activeElement;
	if (active instanceof HTMLElement) {
		lastActiveElement = active;
	}
	modalImage.src = src;
	modalImage.alt = alt || '';
	if (modalCaption) {
		modalCaption.textContent = caption || '';
	}
	modal.removeAttribute('hidden');
	document.body.classList.add('modal-open');
	modal.focus();
}

const collageItems = Array.from(document.querySelectorAll('.collage-item'));
collageItems.forEach(item => {
	item.addEventListener('click', () => {
		const span = item.querySelector('span');
		const isUrbanWarfare = span && span.textContent.trim() === 'Urban Warfare';
		
		if (isUrbanWarfare) {
			window.location.href = 'urban-warfare.html';
			return;
		}
		
		const src = item.dataset.image;
		if (!src) return;
		const img = item.querySelector('img');
		const alt = img?.getAttribute('alt') || '';
		const caption = item.dataset.caption || img?.getAttribute('alt') || '';
		openModal(src, alt, caption);
	});
});

const modalCloseButtons = Array.from(document.querySelectorAll('[data-modal-close]'));
modalCloseButtons.forEach(btn => btn.addEventListener('click', closeModal));

document.addEventListener('keydown', event => {
	if (event.key === 'Escape') {
		closeModal();
	}
});
