var dropdown = function () {
    var Dropdown = /** @class */ (function () {
        function Dropdown(elements, properties) {
            var _this = this;
            this.isHover = false;
            this.isCanChoice = true;
            this.isCloseAfterChoice = true;
            this.isMultiopen = true;
            this.isHover = properties.isHover;
            this.isCanChoice = properties.isCanChoice;
            this.isCloseAfterChoice = properties.isCloseAfterChoice;
            this.isMultiopen = properties.isMultiopen;
            elements.forEach(function (element) {
                var header = element.querySelector('.js-dropdown-header'), value = element.querySelector('.js-dropdown-value'), list = element.querySelector('.js-dropdown-list'), listItem = list.childNodes;
                if (_this.isHover) {
                    element.addEventListener('mouseover', function () {
                        if (_this.isMultiopen) {
                            element.classList.add('active');
                        }
                        else {
                            if (element.classList.contains('active')) {
                                element.classList.remove('active');
                            }
                            else {
                                elements.forEach(function (closeAll) {
                                    closeAll.classList.remove('active');
                                });
                                element.classList.add('active');
                            }
                        }
                    });
                    element.addEventListener('mouseout', function () {
                        element.classList.remove('active');
                    });
                }
                else {
                    header.addEventListener('click', function () {
                        if (_this.isMultiopen) {
                            element.classList.add('active');
                        }
                        else {
                            if (element.classList.contains('active')) {
                                element.classList.remove('active');
                            }
                            else {
                                elements.forEach(function (closeAll) {
                                    closeAll.classList.remove('active');
                                });
                                element.classList.add('active');
                            }
                        }
                    });
                }
                if (_this.isCanChoice) {
                    listItem.forEach(function (item) {
                        item.addEventListener('click', function () {
                            value.innerHTML = item.innerHTML;
                            if (_this.isCloseAfterChoice) {
                                element.classList.remove('active');
                            }
                        });
                    });
                }
                header.addEventListener('keydown', function (event) {
                    if (event.code === 'Space') {
                        if (_this.isMultiopen) {
                            element.classList.add('active');
                        }
                        else {
                            if (element.classList.contains('active')) {
                                element.classList.remove('active');
                            }
                            else {
                                elements.forEach(function (closeAll) {
                                    closeAll.classList.remove('active');
                                });
                                element.classList.add('active');
                            }
                        }
                    }
                });
            });
        }
        return Dropdown;
    }());
    var langContainer = document.querySelectorAll('.lang');
    var langDropdown = new Dropdown(langContainer, {
        isHover: true,
        isCloseAfterChoice: true,
        isMultiopen: false,
        isCanChoice: true
    });
    var numberContainer = document.querySelectorAll('.number');
    var numberDropdown = new Dropdown(numberContainer, {
        isHover: true,
        isCloseAfterChoice: false,
        isMultiopen: false,
        isCanChoice: false
    });
};
dropdown();
var choice = function () {
    var Choice = /** @class */ (function () {
        function Choice(elements, properties) {
            var _this = this;
            this.isMultiChoice = false;
            this.isMultiChoice = properties.isMultiChoice;
            elements.forEach(function (element) {
                element.addEventListener('click', function () {
                    if (_this.isMultiChoice) {
                        element.classList.toggle('active');
                    }
                    else {
                        elements.forEach(function (closeAll) {
                            closeAll.classList.remove('active');
                        });
                        element.classList.add('active');
                    }
                });
            });
        }
        return Choice;
    }());
    var categoryFilter = document.querySelectorAll('.catalog-filter__item');
    var categoryChoice = new Choice(categoryFilter, {
        isMultiChoice: false
    });
};
choice();
var popupFN = function () {
    var Popup = /** @class */ (function () {
        function Popup(popup, properties) {
            this.classOpen = properties.classOpen;
            this.classClose = properties.classClose;
            if (this.classOpen) {
                this.classOpen.addEventListener('click', function () {
                    popup.classList.add('active');
                });
            }
            if (this.classClose) {
                this.classClose.addEventListener('click', function () {
                    popup.classList.remove('active');
                });
            }
        }
        return Popup;
    }());
    var searchPopup = document.querySelector('.search-popup');
    var searchPopupClose = document.querySelector('#closeSearch');
    var searchPopupOpen = document.querySelector('#openSearch');
    var search = new Popup(searchPopup, {
        classClose: searchPopupClose,
        classOpen: searchPopupOpen
    });
};
popupFN();
