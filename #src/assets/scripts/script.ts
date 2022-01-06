const dropdown = () => {
	interface Properties {
		isHover?: boolean;
		isCanChoice?: boolean;
		isMultiopen?: boolean;
		isCloseAfterChoice?: boolean;
	}

	class Dropdown {
		properties: Properties;
		isHover: boolean = false;
		isCanChoice: boolean = true;
		isCloseAfterChoice: boolean = true;
		isMultiopen: boolean = true;

		constructor(elements: NodeListOf<Element>, properties: Properties) {
			this.isHover = properties.isHover;
			this.isCanChoice = properties.isCanChoice;
			this.isCloseAfterChoice = properties.isCloseAfterChoice;
			this.isMultiopen = properties.isMultiopen;

			elements.forEach((element) => {
				const header = element.querySelector('.js-dropdown-header') as Element,
					value = element.querySelector('.js-dropdown-value') as Element,
					list = element.querySelector('.js-dropdown-list') as Element,
					listItem = list.childNodes as NodeListOf<Element>;

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
							value.innerHTML = item.innerHTML;
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
	});

	const numberContainer = document.querySelectorAll('.number') as NodeListOf<Element>;
	const numberDropdown = new Dropdown(numberContainer, {
		isHover: true,
		isCloseAfterChoice: false,
		isMultiopen: false,
		isCanChoice: false,
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
	}

	class Popup {
		properties: Properties;
		classClose: HTMLButtonElement;
		classOpen: HTMLButtonElement;

		constructor(popup: Element, properties: Properties) {
			this.classOpen = properties.classOpen;
			this.classClose = properties.classClose;

			if (this.classOpen) {
				this.classOpen.addEventListener('click', () => {
					popup.classList.add('active');
				});
			}

			if (this.classClose) {
				this.classClose.addEventListener('click', () => {
					popup.classList.remove('active');
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
};

popupFN();
