
const swipers = () => {
	const mainSwiper = new Swiper('.main-swiper', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 40,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	const catalogSwiper = new Swiper('.catalog-swiper', {
		slidesPerView: 4,
		loop: true,
		spaceBetween: 30,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	const reviewSwiper = new Swiper('.review-swiper', {
		slidesPerView: 2,
		loop: true,
		spaceBetween: 40,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});

	const mainOneSwiper = new Swiper('.collection-one', {
		slidesPerView: 1,
		loop: true,
		spaceBetween: 40,
		pagination: {
			clickable: true,
			el: '.swiper-pagination',
			type: 'bullets',
		},
	});
};


swipers();
