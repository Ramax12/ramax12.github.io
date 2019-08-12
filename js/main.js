'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var About = function () {
    function About(element) {
        var _this = this;

        _classCallCheck(this, About);

        // переменные
        this.$element = $(element);
        this.$shareLink = this.$element.find('.about__share-link');
        this.$share = this.$element.find('.about__share-block');
        this.$slider = this.$element.find('.about__slider');
        this.$scroll = this.$slider.find('.about__slider-scroll');
        this.$left = this.$slider.find('.about__slider-arrow--prev');
        this.$right = this.$slider.find('.about__slider-arrow--next');
        this.$slides = this.$slider.find('.about__slider-item');
        this.$currentNumber = this.$slider.find('.about__slider-number--current');
        this.$totalNumber = this.$slider.find('.about__slider-number--total');
        this.currentIndex = 0;
        this.startX = null;
        this.canAnimate = true;

        this.$expertsButton = this.$element.find('.about__experts-button');
        this.$contentHide = this.$element.find('.about__experts-content-wrapper');
        this.$expertsButtonTextShow = this.$element.find('.about__experts-button-text--show');
        this.$expertsButtonTextHide = this.$element.find('.about__experts-button-text--hide');

        // функции
        this.setListeners();
        this.changeNumber();

        this.checkOpenBlock = function (event) {
            if (!_this.$share.is(event.target) // если клик был не по нашему блоку
            && _this.$share.has(event.target).length === 0) {
                // и не по его дочерним элементам
                _this.$shareLink.parent().removeClass('is-open');

                document.body.removeEventListener('click', _this.checkOpenBlock);
            }
        };
    }

    _createClass(About, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this2 = this;

            /* eslint-disable no-unused-vars */
            var player = new Plyr('#player'); // eslint-disable-line no-undef
            /* eslint-enable no-unused-vars */

            // скрытие контента
            this.$expertsButton.each(function (index, item) {
                $(item).on('click', function (event) {
                    event.preventDefault();

                    _this2.$contentHide.eq(index).toggleClass('is-show');
                    _this2.$expertsButtonTextShow.eq(index).toggleClass('is-hide');
                    _this2.$expertsButtonTextHide.eq(index).toggleClass('is-hide');
                });
            });

            // открытие поделиться
            this.$shareLink.on('click', function (event) {
                event.preventDefault();
                _this2.$shareLink.parent().toggleClass('is-open');

                if (_this2.$shareLink.parent().hasClass('is-open')) {
                    setTimeout(function () {
                        document.body.addEventListener('click', _this2.checkOpenBlock);
                    }, 33);
                }
            });

            // swipe detected
            this.$slider.on('touchstart', function (event) {
                _this2.startX = (event.touches || event.originalEvent.touches)[0].clientX;
            });

            this.$slider.on('touchmove', function (event) {
                if (!_this2.startX) return;

                var xDelta = _this2.startX - (event.touches || event.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    _this2.$right.trigger('click');
                    _this2.startX = null;
                } else if (xDelta < -15) {
                    _this2.$left.trigger('click');
                    _this2.startX = null;
                }
            });

            // влево
            this.$left.on('click', function (event) {
                event.preventDefault();

                _this2.toLeftSlide();
            });

            // вправо
            this.$right.on('click', function (event) {
                event.preventDefault();

                _this2.toRightSlide();
            });

            // при изменение размера окна, возвращаем позицию на текущий слайд
            $(window).on('resize', function () {
                var newX = _this2.$scroll.width() * _this2.currentIndex;

                _this2.$scroll.scrollLeft(newX);
            });
        }
    }, {
        key: 'toLeftSlide',
        value: function toLeftSlide() {
            if (this.canAnimate) {
                this.canAnimate = false;

                this.currentIndex = this.currentIndex - 1;
                this.$right.removeClass('is-disabled');

                if (this.currentIndex < 0) {
                    this.currentIndex = 0;
                }

                if (this.currentIndex < 1) {
                    this.$left.addClass('is-disabled');
                }

                this.moveSlider();
            }
        }
    }, {
        key: 'toRightSlide',
        value: function toRightSlide() {
            if (this.canAnimate) {
                this.canAnimate = false;

                this.currentIndex = this.currentIndex + 1;
                this.$left.removeClass('is-disabled');

                if (this.currentIndex > this.$slides.length - 1) {
                    this.currentIndex = this.$slides.length - 1;
                }

                if (this.currentIndex > this.$slides.length - 2) {
                    this.$right.addClass('is-disabled');
                }

                this.moveSlider();
            }
        }
    }, {
        key: 'changeNumber',
        value: function changeNumber() {
            var _this3 = this;

            this.$totalNumber.each(function (index, item) {
                var span = item;
                span.textContent = _this3.$slides.length;
            });
            this.$currentNumber.each(function (index, item) {
                var span = item;
                span.textContent = _this3.currentIndex + 1;
            });
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this4 = this;

            var newX = this.$scroll.width() * this.currentIndex;
            this.changeNumber();

            anime({
                targets: this.$scroll[0],
                scrollLeft: {
                    value: newX,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this4.canAnimate = true;
                }
            });
        }
    }]);

    return About;
}();

$(function () {
    $('.about').each(function (i, item) {
        return new About(item);
    });
});

var AboutSpecification = function () {
    function AboutSpecification(element) {
        _classCallCheck(this, AboutSpecification);

        // переменные
        this.$element = $(element);
        this.$slider = this.$element.find('.about-specification__list');
        this.$scroll = this.$slider.find('.about-specification__scroll');
        this.$slides = this.$slider.find('.about-specification__item');
        this.$dots = this.$slider.find('.about-specification__dots span');
        this.currentIndex = 0;
        this.startX = null;
        this.canAnimate = true;

        // функции
        this.setListeners();
    }

    _createClass(AboutSpecification, [{
        key: 'setListeners',
        value: function setListeners() {
            var _this5 = this;

            this.$slider.on('touchstart', function (event) {
                _this5.startX = (event.touches || event.originalEvent.touches)[0].clientX;
            });

            this.$slider.on('touchmove', function (event) {
                if (!_this5.startX) return;

                var xDelta = _this5.startX - (event.touches || event.originalEvent.touches)[0].clientX;

                if (xDelta > 15) {
                    if (_this5.canAnimate) {
                        _this5.canAnimate = false;

                        _this5.currentIndex = _this5.currentIndex + 1;
                        _this5.moveSlider();
                    }
                    _this5.startX = null;
                } else if (xDelta < -15) {
                    if (_this5.canAnimate) {
                        _this5.canAnimate = false;

                        _this5.currentIndex = _this5.currentIndex - 1;
                        _this5.moveSlider();
                    }
                    _this5.startX = null;
                }
            });
        }
    }, {
        key: 'moveSlider',
        value: function moveSlider() {
            var _this6 = this;

            var radix = false;
            var newX = (this.$slides.eq(0).outerWidth() + parseInt(this.$slides.eq(0).css('margin-right'), radix)) * this.currentIndex;

            if (this.currentIndex < 0) {
                this.currentIndex = 0;
            }

            if (this.currentIndex > this.$slides.length - 1) {
                this.currentIndex = this.$slides.length - 1;
            }

            this.$dots.each(function (index, item) {
                $(item).removeClass('is-active');
            });
            this.$dots.eq(this.currentIndex).addClass('is-active');

            anime({
                targets: this.$scroll[0],
                scrollLeft: {
                    value: newX,
                    duration: 500,
                    easing: 'easeInOutCirc'
                },
                complete: function complete() {
                    _this6.canAnimate = true;
                }
            });
        }
    }]);

    return AboutSpecification;
}();

$(function () {
    $('.about-specification').each(function (i, item) {
        return new AboutSpecification(item);
    });
});