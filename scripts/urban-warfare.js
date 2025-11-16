const yearEl = document.getElementById('year');
if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}

gsap.registerPlugin(ScrollTrigger);

let scrollTriggers = [];
const EXTRA_SCROLL_RATIO = 0.25;
const MIN_SCROLL_DISTANCE = 100;

function initHorizontalScroll() {
	scrollTriggers.forEach(st => st.kill());
	scrollTriggers = [];

	const section2 = document.getElementById('section-2');
	const section3 = document.getElementById('section-3');

	if (section2) {
		const scrollContent2 = section2.querySelector('.scroll-content');
		if (scrollContent2) {
			const scrollContainer2 = section2.querySelector('.scroll-container');
			const scrollWidth2 = scrollContent2.scrollWidth;
			const containerWidth2 = scrollContainer2.offsetWidth;
			const scrollDistance2 = Math.max(0, scrollWidth2 - containerWidth2);

			if (scrollDistance2 > 0) {
				const totalScroll2 = Math.max(scrollDistance2 * (1 + EXTRA_SCROLL_RATIO), MIN_SCROLL_DISTANCE);
				const tl2 = gsap.timeline({
					scrollTrigger: {
						trigger: section2,
						start: 'top top',
						end: () => `+=${totalScroll2}`,
						pin: true,
						scrub: 0.1,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					}
				});

				tl2.to(scrollContent2, { x: -scrollDistance2, ease: 'none', duration: 1 });
				tl2.to({}, { duration: EXTRA_SCROLL_RATIO });

				scrollTriggers.push(tl2.scrollTrigger);
			}
		}
	}

	if (section3) {
		const scrollContent3 = section3.querySelector('.scroll-content');
		if (scrollContent3) {
			const scrollContainer3 = section3.querySelector('.scroll-container');
			const scrollWidth3 = scrollContent3.scrollWidth;
			const containerWidth3 = scrollContainer3.offsetWidth;
			const scrollDistance3 = Math.max(0, scrollWidth3 - containerWidth3);

			if (scrollDistance3 > 0) {
				const totalScroll3 = Math.max(scrollDistance3 * (1 + EXTRA_SCROLL_RATIO), MIN_SCROLL_DISTANCE);
				const tl3 = gsap.timeline({
					scrollTrigger: {
						trigger: section3,
						start: 'top top',
						end: () => `+=${totalScroll3}`,
						pin: true,
						scrub: 0.1,
						anticipatePin: 1,
						invalidateOnRefresh: true,
					}
				});

				tl3.to(scrollContent3, { x: -scrollDistance3, ease: 'none', duration: 1 });
				tl3.to({}, { duration: EXTRA_SCROLL_RATIO });

				scrollTriggers.push(tl3.scrollTrigger);
			}
		}
	}
}

function setupScroll() {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			setTimeout(initHorizontalScroll, 100);
		});
	} else {
		setTimeout(initHorizontalScroll, 100);
	}

	window.addEventListener('resize', () => {
		setTimeout(() => {
			ScrollTrigger.refresh();
		}, 100);
	});
}

setupScroll();


