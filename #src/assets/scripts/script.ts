const dropdown = () => {
	interface Properties {
		isHover?: boolean;
		isCanChoice?: boolean;
		isMultiopen?: boolean;
		isCloseAfterChoice?: boolean;
		isValueSet?: boolean;
	}

	class Dropdown {
		properties: Properties;
		isHover: boolean = false;
		isCanChoice: boolean = true;
		isCloseAfterChoice: boolean = true;
		isMultiopen: boolean = true;
		isValueSet: boolean = true;

		constructor(elements: NodeListOf<Element>, properties: Properties) {
			this.isHover = properties.isHover;
			this.isCanChoice = properties.isCanChoice;
			this.isCloseAfterChoice = properties.isCloseAfterChoice;
			this.isMultiopen = properties.isMultiopen;
			this.isValueSet = properties.isValueSet;

			elements.forEach((element) => {
				const header = element.querySelector('.js-dropdown-header') as Element,
					list = element.querySelector('.js-dropdown-list') as Element,
					listItem = list.childNodes as NodeListOf<Element>;

				let value: Element;

				if (this.isValueSet) {
					value = element.querySelector('.js-dropdown-value') as Element;
				}

				if (this.isHover) {
					element.addEventListener('mouseover', (): void => {
						if (this.isMultiopen) {
							element.classList.add('active');
						} else {
							if (element.classList.contains('active')) {
								element.classList.remove('active');
							} else {
								elements.forEach((closeAll): void => {
									closeAll.classList.remove('active');
								});

								element.classList.add('active');
							}
						}
					});
					element.addEventListener('mouseout', (): void => {
						element.classList.remove('active');
					});
				} else {
					header.addEventListener('click', (): void => {
						if (this.isMultiopen) {
							element.classList.add('active');
						} else {
							if (element.classList.contains('active')) {
								element.classList.remove('active');
							} else {
								elements.forEach((closeAll): void => {
									closeAll.classList.remove('active');
								});

								element.classList.add('active');
							}
						}
					});
				}

				if (this.isCanChoice) {
					listItem.forEach((item): void => {
						item.addEventListener('click', (): void => {
							if (this.isValueSet) {
								value.innerHTML = item.innerHTML;
							}

							if (this.isCloseAfterChoice) {
								element.classList.remove('active');
							}
						});
					});
				}

				header.addEventListener('keydown', (event: KeyboardEventInit): void => {
					if (event.code === 'Space') {
						if (this.isMultiopen) {
							element.classList.add('active');
						} else {
							if (element.classList.contains('active')) {
								element.classList.remove('active');
							} else {
								elements.forEach((closeAll): void => {
									closeAll.classList.remove('active');
								});

								element.classList.add('active');
							}
						}
					}
				});
			});
		}
	}

	const langContainer = document.querySelectorAll('.lang') as NodeListOf<Element>;
	const langDropdown = new Dropdown(langContainer, {
		isHover: true,
		isCloseAfterChoice: true,
		isMultiopen: false,
		isCanChoice: true,
		isValueSet: true,
	});

	const numberContainer = document.querySelectorAll('.number') as NodeListOf<Element>;
	const numberDropdown = new Dropdown(numberContainer, {
		isHover: true,
		isCloseAfterChoice: false,
		isMultiopen: false,
		isCanChoice: false,
	});

	const fillterContainer = document.querySelectorAll('.filter-dropdown') as NodeListOf<Element>;
	const fillterDropdown = new Dropdown(fillterContainer, {
		isHover: false,
		isCloseAfterChoice: true,
		isMultiopen: false,
		isCanChoice: true,
		isValueSet: false,
	});

	const sortContainer = document.querySelectorAll('.sort-dropdown') as NodeListOf<Element>;
	const sortDropdown = new Dropdown(sortContainer, {
		isHover: false,
		isCloseAfterChoice: true,
		isMultiopen: false,
		isCanChoice: true,
		isValueSet: true,
	});

	const reviewContainer = document.querySelectorAll('.review-dropdown') as NodeListOf<Element>;
	const reviewDropdown = new Dropdown(reviewContainer, {
		isHover: false,
		isCloseAfterChoice: true,
		isMultiopen: false,
		isCanChoice: true,
		isValueSet: true,
	});
};

dropdown();

const choice = () => {
	interface Properties {
		isMultiChoice?: boolean;
	}

	class Choice {
		properties: Properties;
		isMultiChoice: boolean = false;
		constructor(elements: NodeListOf<Element>, properties: Properties) {
			this.isMultiChoice = properties.isMultiChoice;

			elements.forEach((element) => {
				element.addEventListener('click', (): void => {
					if (this.isMultiChoice) {
						element.classList.toggle('active');
					} else {
						elements.forEach((closeAll) => {
							closeAll.classList.remove('active');
						});
						element.classList.add('active');
					}
				});
			});
		}
	}

	const categoryFilter = document.querySelectorAll('.catalog-filter__item') as NodeListOf<Element>;
	const categoryChoice = new Choice(categoryFilter, {
		isMultiChoice: false,
	});
};

choice();

const popupFN = () => {
	interface Properties {
		classClose?: HTMLButtonElement;
		classOpen?: HTMLButtonElement;
		openClose?: boolean;
		background?: boolean;
	}

	class Popup {
		properties: Properties;
		classClose: HTMLButtonElement;
		classOpen: HTMLButtonElement;
		openClose: boolean = false;
		background: boolean = false;
		backgroundElement = document.querySelector('.black');
		constructor(popup: Element, properties: Properties) {
			this.classOpen = properties.classOpen;
			this.classClose = properties.classClose;
			this.background = properties.background;
			this.openClose = properties.openClose;

			if (this.openClose) {
				this.classOpen.addEventListener('click', () => {
					popup.classList.toggle('active');
					if (this.background) {
						this.backgroundElement.classList.toggle('active');
					}
				});
			} else {
				this.classOpen.addEventListener('click', () => {
					popup.classList.add('active');
					if (this.background) {
						this.backgroundElement.classList.add('active');
					}
				});
			}

			if (this.classClose) {
				this.classClose.addEventListener('click', () => {
					popup.classList.remove('active');
					if (this.background) {
						this.backgroundElement.classList.remove('active');
					}
				});
			}
		}
	}

	const searchPopup = document.querySelector('.search-popup') as Element;
	const searchPopupClose = document.querySelector('#closeSearch') as HTMLButtonElement;
	const searchPopupOpen = document.querySelector('#openSearch') as HTMLButtonElement;
	const search = new Popup(searchPopup, {
		classClose: searchPopupClose,
		classOpen: searchPopupOpen,
	});

	const catalogPopup = document.querySelector('.catalog-popup') as Element;
	const catalogPopupClose = document.querySelector('#CloseCatalog') as HTMLButtonElement;
	const catalogPopupOpen = document.querySelector('#OpenCatalog') as HTMLButtonElement;
	const catalog = new Popup(catalogPopup, {
		classClose: catalogPopupClose,
		classOpen: catalogPopupOpen,
		openClose: true,
		background: true,
	});
};

popupFN();

const accardion = () => {
	class Accardion {
		constructor(elements: NodeListOf<Element>) {
			elements.forEach((element) => {
				const header = element.querySelector('.js-accardion-header') as Element,
					list = element.querySelector('.js-accardion-list') as Element,
					items = element.querySelectorAll('.js-accardion-item') as NodeListOf<Element>;

				header.addEventListener('click', () => {
					element.classList.toggle('active');
				});

				items.forEach((item) => {
					item.addEventListener('focus', () => {
						element.classList.add('active');
					});
				});
			});
		}
	}

	const catalogAccardion = document.querySelectorAll('.js-accardion') as NodeListOf<Element>;
	const catalogAccardionCreate = new Accardion(catalogAccardion);
};

accardion();
