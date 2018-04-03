/**
 * !variables
 * */

var $documentBody = $('body');
/**======================*/
var cookieColorTheme = 'colorTheme';
var themeDarkValue = 'theme-dark';
var themeLightValue = 'theme-light';

/* variables end */

/**
 * !resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth !== currentWidth;
	if (resizeByWidth) {
		$(window).trigger('resizeByWidth');
		prevWidth = currentWidth;
	}
});
/*resize only width end*/

/**
 * !device detected
 * */
var DESKTOP = device.desktop();
//console.log('DESKTOP: ', DESKTOP);
var MOBILE = device.mobile();
//console.log('MOBILE: ', MOBILE);
var TABLET = device.tablet();
//console.log('MOBILE: ', MOBILE);
/*device detected end*/

/**
 * detect ie9
 */
// Detecting IE
var ie9;
if ($('html').is('.ie9')) {
	ie9 = true;
}

if (ie9) {
	// Here's your JS for IE..
} else {
	// ..And here's the full-fat code for everyone else
}

/**
 * !cookie
 * */
function setCookie(name, value, options) {
	// https://learn.javascript.ru/cookie
	options = options || {};

	var expires = options.expires;

	if (typeof expires === "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function getCookie(name) {
	// https://learn.javascript.ru/cookie
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
/*cookie end*/

/**
 *  Add placeholder for old browsers
 * */
function placeholderInit() {
	$('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
	$('.view-print').on('click', function (e) {
		e.preventDefault();
		window.print();
	})
}

/**
 * !Switch cecutient version
 * */
function switchCecutientVersion() {
	$('.cecutient-version-toggle-js').on('click', function (e) {
		e.preventDefault();
		$('body').hide(); // hide content

		toggleCecutientVersion();

		location.reload();
	});
}

/**
 * !Check cecutient version cookie
 */
function checkCecutientVersionCookie() {
	if (getCookie('cecutientVersion') === 'true' && !$('#cecutient-css-link').length) {
		toggleCecutientVersion();
	}
}

/**
 * !Toggle cecutient version
 * */
function toggleCecutientVersion() {

	var $cecutientCssLink = $('#cecutient-css-link');
	var $body = $('body');
	var path = cssPath || 'css/';

	// console.log("path: ", path);

	if ($cecutientCssLink.length) {

		$cecutientCssLink.remove();

		setCookie('cecutientVersion', false, {
			// expires: expiresValue,
			// domain: "localhost:3000",
			path: "/"
		});

		$body.removeClass('cecutient-version');
		$body.removeClass('color-scheme-bw');
		$body.removeClass('images-bw');

		$(document).trigger('specialVersionOff');

	} else {
		setCookie('cecutientVersion', true, {
			// expires: expiresValue,
			// domain: "localhost:3000",
			path: "/"
		});

		$('<link/>', {
			id: 'cecutient-css-link',
			rel: 'stylesheet',
			href: path + 'cecutient.css'
		}).appendTo('head');

		$body.addClass('cecutient-version');
		$body.addClass('color-scheme-bw');
		$body.addClass('images-bw');

		$(document).trigger('specialVersionOn');
	}
}

/**
 * !Switch color version
 * */
function switchTheme() {
	$('.theme-toggle-js').on('click', function (e) {
		e.preventDefault();

		toggleTheme();
	});
}

/**
 * !Check cecutient version cookie
 */
/*На этапе программирования добавлять или удалять класс через php*/
/*Удалить после программирования*/
function checkThemeCookie() {
	if (getCookie(cookieColorTheme) === themeDarkValue && !$documentBody.hasClass(themeDarkValue)) {
		$documentBody.addClass(themeDarkValue);
		$(document).trigger('themeColorIsDark');
	}
}

/**
 * !Toggle cecutient version
 * */
function toggleTheme() {

	if (getCookie(cookieColorTheme) === themeDarkValue) {

		setCookie(cookieColorTheme, themeLightValue, {
			// expires: expiresValue,
			// domain: "localhost:3000",
			path: "/"
		});

		$documentBody.removeClass(themeDarkValue);

		$(document).trigger('themeColorIsLight');

	} else {
		setCookie(cookieColorTheme, themeDarkValue, {
			// expires: expiresValue,
			// domain: "localhost:3000",
			path: "/"
		});

		$documentBody.addClass(themeDarkValue);

		$(document).trigger('themeColorIsDark');
	}
}

/**
 * !Toggle class for input on focus
 * */
function inputToggleFocusClass() {
	// use for the "focus" state
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var _classFocus = 'input--focus';

		$inputsAll.focus(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.addClass(_classFocus);

		}).blur(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.removeClass(_classFocus);
		});
	}
}

function inputHasValueClass() {
	// use for the "has-value" state
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var classHasValue = 'input--has-value';

		$.each($inputsAll, function () {
			switchHasValue.call(this);
		});

		// $inputsAll.on('change', function () {
		// 	switchHasValue.call(this);
		// });

		$inputsAll.on('keyup change', function () {
			switchHasValue.call(this);
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			//first element of the select must have a value empty ("")
			if ($currentField.val().length === 0) {
				$currentFieldWrap.removeClass(classHasValue);
			} else if (!$currentFieldWrap.hasClass(classHasValue)) {
				$currentFieldWrap.addClass(classHasValue);
			}
		}
	}
}

function inputFilledClass() {
	// use if the "focus" state and the "has-value" state are the same
	var $fieldWrap = $('.field-effects-js');

	if ($fieldWrap.length) {
		var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
		var _classFilled = 'input--filled';

		$inputsAll.focus(function () {
			var $thisField = $(this);

			$thisField
				.closest($fieldWrap)
				.addClass(_classFilled);

		}).blur(function () {
			var $thisField = $(this);

			if ($thisField.val() === '') {
				$thisField
					.closest($fieldWrap)
					.removeClass(_classFilled);
			}
		});

		function switchHasValue() {
			var $currentField = $(this);
			var $currentFieldWrap = $currentField.closest($fieldWrap);

			$currentFieldWrap.removeClass(_classFilled);

			//first element of the select must have a value empty ("")
			if ($currentField.val() !== '') {
				$currentFieldWrap.addClass(_classFilled);
			}
		}

		$.each($inputsAll, function () {
			switchHasValue.call(this);
		});

		$inputsAll.on('change', function () {
			switchHasValue.call(this);
		});
	}
}
/* !toggle class for input on focus end */

/**
 * !Add class on scroll page
 * */
function addClassesOnScrollPage(){
	// external js:
	// 1) resizeByWidth (resize only width);

	var $page = $('html'),
		minScrollTop = 100,
		scrollClass = "page-is-scrolled",
		headerShowClass = 'header-show',
		headerHideClass = 'header-hide';

	var previousScrollTop = $(window).scrollTop();

	addClass();

	$(window).on('scroll resizeByWidth', function () {
		addClass();
	});

	function addClass() {
		var currentScrollTop = $(window).scrollTop();

		$page.toggleClass(scrollClass, (currentScrollTop >= minScrollTop));

		var showHeaderPanel = currentScrollTop < previousScrollTop || currentScrollTop <= minScrollTop;
		$page.toggleClass(headerShowClass, showHeaderPanel);
		$page.toggleClass(headerHideClass, !showHeaderPanel);

		previousScrollTop = currentScrollTop;
	}
}

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect(select) {
	$.each(select, function () {
		var $thisSelect = $(this);
		var placeholder = $thisSelect.attr('data-placeholder') || '';
		$thisSelect.select2({
			language: "ru",
			width: '100%',
			containerCssClass: 'cselect-head',
			dropdownCssClass: 'cselect-drop',
			placeholder: placeholder
		});
	})
}

/**
 * !Plugin HoverClass
 * */
(function ($) {
	var HoverClass = function (settings) {
		var options = $.extend({
			container: 'ul',
			item: 'li',
			drop: 'ul'
		},settings || {});

		var self = this;
		self.options = options;

		var container = $(options.container);
		self.$container = container;
		self.$item = $(options.item, container);
		self.$drop = $(options.drop, container);

		self.modifiers = {
			hover: 'hover',
			hoverNext: 'hover_next',
			hoverPrev: 'hover_prev'
		};

		self.addClassHover();

		if (!DESKTOP) {
			$(window).on('debouncedresize', function () {
				self.removeClassHover();
			});
		}
	};

	HoverClass.prototype.addClassHover = function () {
		var self = this,
			_hover = this.modifiers.hover,
			_hoverNext = this.modifiers.hoverNext,
			_hoverPrev = this.modifiers.hoverPrev,
			$item = self.$item,
			item = self.options.item,
			$container = self.$container;

		if (!DESKTOP) {

			$container.on('click', ''+item+'', function (e) {
				var $currentAnchor = $(this);
				var currentItem = $currentAnchor.closest($item);

				if (!currentItem.has(self.$drop).length){ return; }

				e.stopPropagation();

				if (currentItem.hasClass(_hover)){
					currentItem.removeClass(_hover).find('.'+_hover+'').removeClass(_hover);
					return;
				}

				$('.'+_hover+'').not($currentAnchor.parents('.'+_hover+''))
					.removeClass(_hover)
					.find('.'+_hover+'')
					.removeClass(_hover);
				currentItem.addClass(_hover);

				e.preventDefault();
			});

			$container.on('click', ''+self.options.drop+'', function (e) {
				e.stopPropagation();
			});

			$(document).on('click', function () {
				$item.removeClass(_hover);
			});

		} else {
			$container.on('mouseenter', ''+item+'', function () {

				var currentItem = $(this);

				if (currentItem.prop('hoverTimeout')) {
					currentItem.prop('hoverTimeout', clearTimeout(currentItem.prop('hoverTimeout')));
				}

				currentItem.prop('hoverIntent', setTimeout(function () {
					currentItem.addClass(_hover);
					currentItem.next().addClass(_hoverNext);
					currentItem.prev().addClass(_hoverPrev);
				}, 50));

			}).on('mouseleave', ''+ item+'', function () {

				var currentItem = $(this);

				if (currentItem.prop('hoverIntent')) {
					currentItem.prop('hoverIntent', clearTimeout(currentItem.prop('hoverIntent')));
				}

				currentItem.prop('hoverTimeout', setTimeout(function () {
					currentItem.removeClass(_hover);
					currentItem.next().removeClass(_hoverNext);
					currentItem.prev().removeClass(_hoverPrev);
				}, 50));

			});

		}
	};

	HoverClass.prototype.removeClassHover = function () {
		var self = this;
		self.$item.removeClass(self.modifiers.hover );
	};

	window.HoverClass = HoverClass;

}(jQuery));

/**
 * !Toggle "hover" class by hover on the item of the list
 * */
function hoverClassInit(){
	if($('.nav').length){
		new HoverClass({
			container: ('.header .nav'),
			drop: '.js-nav-drop'
		});
	}
	if($('.fame__list').length){
		new HoverClass({
			container: ('.fame__list'),
			item: '.fame__figure',
			drop: '.fame__info'
		});
	}
}

/**
 * !Toggle sibling classes by fire events on the item of the list
 * */
function toggleSiblingClasses() {
	var $container = $('.sibling-classes-js, .several-slider-js');
	var elem = 'a';
	var prevClass = 'hover-prev';
	var nextClass = 'hover-next';

	$container.on('mouseenter focusin', elem, function () {
		var $currentElem = $(this);
		var $parentCurrentElem = $currentElem.parent();
		$currentElem.prev().addClass(prevClass);
		$currentElem.next().addClass(nextClass);
		$parentCurrentElem.prev().addClass(prevClass);
		$parentCurrentElem.next().addClass(nextClass);
	}).on('mouseleave focusout', elem, function () {
		var $currentElem = $(this);
		var $parentCurrentElem = $currentElem.parent();
		$currentElem.prev().removeClass(prevClass);
		$currentElem.next().removeClass(nextClass);
		$parentCurrentElem.prev().removeClass(prevClass);
		$parentCurrentElem.next().removeClass(nextClass);
	})
}

/**
 * !Initial custom file input
 * */
function fileInput() {
	$('.upload-file').each(function () {
		$(this).filer({
			// limit: 3,
			changeInput: '' +
			'<div class="jFiler-input-dragDrop">' +
			'<div class="jFiler-input-inner">' +
			'<div class="jFiler-input-icon">' +
			'<i class="icon-jfi-cloud-up-o"></i>' +
			'</div>' +
			'<div class="jFiler-input-text">' +
			'<strong>Кликните по полю или перетащите сюда файл</strong>' +
			'</div>' +
			'</div>' +
			'</div>',
			showThumbs: true,
			theme: "dragdropbox",
			captions: {
				button: "Выберите файлы",
				feedback: "Выберите файлы для загрузки",
				feedback2: "Файлы выбраны",
				drop: "Кликните по полю или перетащите сюда файл",
				removeConfirmation: "Вы уверены, что хотите удалить этот файл?",
				errors: {
					filesLimit: "Максиальное количество файлов: {{fi-limit}}",
					filesType: "Загружать можно только изображения!",
					filesSize: "{{fi-name}} слишком велик! Пожалуйста, загрузите файл до {{fi-maxSize}} MB.",
					filesSizeAll: "Файлы, которые Вы выбрали слишком велики! Пожалуйста, загружайте файлы до {{fi-maxSize}} MB."
				}
			},
			templates: {
				box: '<ul class="jFiler-items-list jFiler-items-default list-reset"></ul>'
			},
			// captions: {
			// 	button: "Choose Files",
			// 	feedback: "Choose files To Upload",
			// 	feedback2: "files were chosen",
			// 	drop: "Drop file here to Upload",
			// 	removeConfirmation: "Вы уверены, что хотите удалить этот файл?",
			// 	errors: {
			// 		filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
			// 		filesType: "Only Images are allowed to be uploaded.",
			// 		filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
			// 		filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
			// 	}
			// },
			addMore: true,
			allowDuplicates: false,
			clipBoardPaste: true,
			dragDrop: {
				dragEnter: null,
				dragLeave: null,
				drop: null,
				dragContainer: null
			}
		});
	});
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
	//images carousel
	var $imagesCarousel = $('.images-slider');

	if($imagesCarousel.length){
		var slideCounterTpl = '' +
			'<div class="slider-counter">' +
				'<span class="slide-curr">0</span>/<span class="slide-total">0</span>' +
			'</div>';

		$imagesCarousel.each(function () {
			var $currentImagesCarousel = $(this);
			var $images = $currentImagesCarousel.find('.images-slider__list');
			var $titles = $currentImagesCarousel.find('.flashes');
			var dur = 200;

			$images.on('init', function (event, slick) {
				$(slick.$slider).append($(slideCounterTpl).clone());

				$('.slide-total', $(slick.$slider)).text(slick.$slides.length);
				$('.slide-curr', $(slick.$slider)).text(slick.currentSlide + 1);
			});

			$images.slick({
				fade: false,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: $titles,
				// initialSlide: 2,
				lazyLoad: 'ondemand',
				infinite: true,
				dots: true,
				arrows: true
			}).on('beforeChange', function (event, slick, currentSlide, nextSlider) {
				$('.slide-curr', $(slick.$slider)).text(nextSlider + 1);
			});

			$titles.slick({
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				asNavFor: $images,
				dots: false,
				arrows: false
			});

		});
	}

	/*promo slider*/
	var $promoSlider = $('.promo-slider-js');
	if ($promoSlider.length && getCookie('cecutientVersion') !== 'true') {
		$.each($promoSlider, function () {
			var $currentSlider = $(this);
			var $parentCurrentSlider = $currentSlider.parent();
			var $arrPrev = $parentCurrentSlider.find('.slider-arr-prev-js');
			var $arrNext = $parentCurrentSlider.find('.slider-arr-next-js');

			$currentSlider.on('init', function (event, el) {
				$(el.$slides).matchHeight({
					byRow: true, property: 'height', target: null, remove: false
				});
			}).slick({
				fade: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				swipe: false,
				touchMove: false,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				autoplay: true,
				// autoplaySpeed: 8000,
				infinite: true,
				dots: true,
				prevArrow: $arrPrev,
				nextArrow: $arrNext,
				// arrows: true
				responsive: [
					{
						breakpoint: 640,
						settings: {
							fade: false
						}
					}
				]

			});
		});
	}

	/*several slider*/
	var $severalSlider = $('.several-slider-js');
	if ($severalSlider.length && getCookie('cecutientVersion') !== 'true') {
		$.each($severalSlider, function () {
			var $currentSlider = $(this);
			var $parentCurrentSlider = $currentSlider.parent();
			var $arrPrev = $parentCurrentSlider.find('.slider-arr-prev-js');
			var $arrNext = $parentCurrentSlider.find('.slider-arr-next-js');

			$currentSlider.on('init', function (event, slick) {

				$(slick.$slider).find('.slick-slide').matchHeight({
					byRow: true, property: 'height', target: null, remove: false
				});

			});

			$currentSlider.slick({
				fade: false,
				speed: 300,
				slidesToShow: 4,
				slidesToScroll: 4,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				// autoplay: true,
				// autoplaySpeed: 8000,
				infinite: false,
				dots: false,
				prevArrow: $arrPrev,
				nextArrow: $arrNext,
				// arrows: true
				responsive: [
					{
						breakpoint: 1920,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 1440,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 1366,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 960,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		});
	}

	/*gov slider*/
	var $govSlider = $('.slider-gov-js');

	if ($govSlider.length && getCookie('cecutientVersion') !== 'true') {

		$govSlider.each(function () {
			var $currentSlider = $(this);
			var dur = 200;

			$currentSlider.on('init', function (event, el) {
				$(el.$slides).matchHeight({
					byRow: true, property: 'height', target: null, remove: false
				});
			}).slick({
				fade: false,
				speed: dur,
				slidesToShow: 4,
				slidesToScroll: 4,
				// autoplay: true,
				// autoplaySpeed: 5000,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				infinite: false,
				dots: false,
				arrows: true,
				responsive: [
					{
						breakpoint: 1920,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 1280,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 960,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});

		});
	}

	/*history slider*/
	var $historySlider = $('.history-slider-js');

	if ($historySlider.length) {
		$historySlider.each(function () {
			var $thisGroup = $(this);
			// var $wrap = $thisSlider.parent();
			var $thumbsSlider = $thisGroup.find('.tape-slider-js');
			var $thumbsSliderItem = $thisGroup.find('.tape-slider__item'); // only for ie9 fix
			var $panelsSlider = $thisGroup.find('.history-pages-js');
			var thumbsSlidesLength = $thisGroup.find('.swiper-slide').length;
			var $thisBtnNext = $('.swiper-button-next', $thisGroup);
			var $thisBtnPrev = $('.swiper-button-prev', $thisGroup);
			var currentClass = 'active';
			var dur = 300;
			var infinite = false;

			if(!ie9){
				var thumbsSliderInit = new Swiper($thumbsSlider, {
					loop: infinite,
					loopedSlides: thumbsSlidesLength,
					slidesPerView: 'auto',
					watchSlidesVisibility: true,
					keyboardControl: false,
					// slideToClickedSlide: true,

					nextButton: $thisBtnNext,
					prevButton: $thisBtnPrev
				});

				function addCurrentClass(index) {
					$(thumbsSliderInit.slides).children().removeClass(currentClass);
					$(thumbsSliderInit.slides[index]).children().addClass(currentClass);
				}
			} else {
				function addCurrentClassForIe9(index) {
					$($thumbsSlider).find($thumbsSliderItem).children().removeClass(currentClass);
					$($thumbsSlider).find($thumbsSliderItem).eq(index).children().addClass(currentClass);
				}
			}

			var panelsSliderInit = $panelsSlider.on('init', function (event, target) {
				if(!ie9) {
					addCurrentClass(target.currentSlide);
				} else {
					addCurrentClassForIe9(target.currentSlide);
				}
			}).slick({
				accessibility: false,
				adaptiveHeight: true,
				swipe: false,
				touchMove: false,
				fade: true,
				speed: dur,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				dots: false,
				arrows: false
			}).on('beforeChange', function (event, target, currentSlide, nextSlide) {
				if(!ie9) {
					addCurrentClass(nextSlide);
				} else {
					addCurrentClassForIe9(nextSlide);
				}
			});

			if(!ie9){
				thumbsSliderInit.on('tap', function (swiper, event) {
					if (infinite) {
						// if infinite is true
						panelsSliderInit.slick('slickGoTo', $(swiper.clickedSlide).data('swiper-slide-index'));
					} else {
						// if infinite is false
						panelsSliderInit.slick('slickGoTo', swiper.clickedIndex);
					}
				});
			} else {
				$($thumbsSlider).find($thumbsSliderItem).on('click', function (e) {
					e.preventDefault();

					panelsSliderInit.slick('slickGoTo', $(this).index());
				})
			}

			setTimeout(function () {
				if(!ie9) {
					thumbsSliderInit.update();
				}
			}, 1000);
		});
	}
}

/**
 * !Toggle drop
 * */
function toggleDrop() {

	var $choiceContainer = $('.js-choice-wrap');
	var openClass = 'choice-opened';

	if ($choiceContainer.length) {

		$.each($choiceContainer, function () {
			var $thisContainer = $(this);

			if ($thisContainer.attr('data-parent-position') !== undefined) {
				$thisContainer.parent().css({
					'position': 'relative',
					'padding-right': Math.round($thisContainer.outerWidth() + 10),
					'overflow': 'visible'
				});
			}
		});

		$('.js-choice-open').on('click', function (e) {
			e.preventDefault();
			var $currentContainer = $(this).closest('.js-choice-wrap');

			e.stopPropagation();

			if ($currentContainer.hasClass(openClass)) {
				$currentContainer.removeClass(openClass);
				return;
			}

			$choiceContainer.removeClass(openClass);
			$currentContainer.addClass(openClass);
		});

		$(document).on('click', function () {
			closeDrop();
		});

		$(document).keyup(function(e) {
			if ($choiceContainer.hasClass(openClass) && e.keyCode === 27) {
				closeDrop();
			}
		});

		$choiceContainer.on('closeChoiceDrop', function () {
			closeDrop();
		});

		function closeDrop() {
			$choiceContainer.removeClass(openClass);
		}

		$('.js-choice-drop').on('click', 'a', function (e) {
			var $this = $(this);

			// if data-window-location is true, prevent default
			if ($this.closest($choiceContainer).attr('data-window-location') === 'true') {
				e.preventDefault();
			}

			// if data-select is false, do not replace text
			if ($this.closest($choiceContainer).attr('data-select') === 'false') {
				return false;
			}

			$('a', '.js-choice-drop').removeClass('active');

			$this
				.addClass('active')
				.closest('.js-choice-wrap')
				.find('.js-choice-open span')
				.text($this.find('span').text());
		});
	}

}

/**
 * !Show search field
 * */
function toggleSearchForm(){
	var $searchFormContainer = $('.search-form-js');
	if(!$searchFormContainer.length){ return; }

	var $html = $('html');
	var $searchField = $('.search-field-js');
	var btnSearchCloseClass = 'btn-search-close-js';
	var classFormIsOpen = 'form-is-open';

	$html.on('click', '.btn-search-open-js', function(e){
		e.stopPropagation();

		// !important
		// var $searchForm = $searchFormContainer.find('form');
		// if ( $searchForm.find($searchField).val().length && $searchFormContainer.is(':visible') ){
		// 	$searchForm.submit();
		// 	return;
		// }

		// close lang drop
		$('.lang-js').trigger('langDropClose');

		if ($html.hasClass(classFormIsOpen)){
			closeSearchForm($searchFormContainer);
			return;
		}

		setTimeout(function () {
			$searchField.trigger('focus');

			// close lang drop
			var $choiceContainer = $('.js-choice-wrap');
			if($choiceContainer.hasClass('choice-opened')) {
				$choiceContainer.trigger('closeChoiceDrop');
			}
		}, 50);

		$html.addClass(classFormIsOpen);

		e.preventDefault();

	});

	$html.on('click', '.' + btnSearchCloseClass, function(e){
		e.stopPropagation();
		e.preventDefault();

		closeSearchForm($searchFormContainer);
	});

	$(document).on('click', function (e) {
		closeSearchForm();
	});

	$(document).keyup(function(e) {
		if ($html.hasClass(classFormIsOpen) && e.keyCode === 27) {
			closeSearchForm($searchFormContainer);
		}
	});

	$searchFormContainer.on('click', function (e) {
		if($(e.target).hasClass(btnSearchCloseClass)) {
			return
		}

		e.stopPropagation();
	});

	function closeSearchForm(){
		$('html').removeClass(classFormIsOpen)
	}
}

/**
 * !Collapse and expand blocks by fire events on the title of these blocks
 */
function simpleAccordion() {
	function simpleAccordion($hand, $panel, animateSpeed) {
		var activeClass = 'is-open';

		if ($panel.hasClass(activeClass)) {
			$panel.toggle().prev().addClass(activeClass);
		}

		$hand.on('click', function (e) {
			e.preventDefault();

			$(this).toggleClass(activeClass);
			$panel.stop().slideToggle(animateSpeed, function () {
				$(document.body).trigger("sticky_kit:recalc");
			});
		})
	}

	var $simpleAccordionHand = $('.simple-accordion-head-js');

	if ($simpleAccordionHand.length) {
		$simpleAccordionHand.each(function () {
			var $thisHand = $(this);

			simpleAccordion($thisHand, $thisHand.next(), 200);
		})
	}
}

/**
 * !Plugin collapse and expand blocks by fire events on the title of these blocks
 * !Extended capabilities
 * */
(function ($) {
	var JsAccordion = function (settings) {
		var options = $.extend(true, {
			accordionContainer: null,
			accordionItem: null,
			accordionHeader: null, // wrap for accordion's switcher
			accordionHand: null, // accordion's switcher
			accordionContent: null,
			indexInit: 0, // if "false", all accordion are closed
			showFromHash: true, // if "false", all accordion are closed
			animateSpeed: 300,
			scrollToTop: false, // if true, scroll to current accordion;
			scrollToTopSpeed: 300,
			scrollToTopOffset: 0,
			clickOutside: false, // if true, close current accordion's content on click outside accordion;
			collapseInside: true, // collapse attachments,
			modifiers: {
				activeItem: 'is-open',
				activeHeader: 'is-open',
				activeHand: 'is-open',
				activeContent: 'is-open',
				noHoverClass: 'is-open'
			}
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);

		this.$accordionContainer = container;
		this.$accordionItem = $(options.accordionItem, container);
		this.$accordionHeader = $(options.accordionHeader, container);
		this.$accordionHand = $(options.accordionHand, container);
		this.$accordionContent = options.accordionContent ?
			$(options.accordionContent, container) :
			this.$accordionHeader.next();

		this.scrollToTop = options.scrollToTop;
		this._scrollToTopSpeed = options.scrollToTopSpeed;
		this._scrollToTopOffset = options.scrollToTopOffset;
		this.clickOutside = options.clickOutside;
		this._indexInit = options.indexInit;
		this._animateSpeed = options.animateSpeed;
		this._collapseInside = options.collapseInside;

		this.modifiers = options.modifiers;

		this.bindEvents();
		if (options.indexInit !== false) {
			this.activeAccordion();
		}
		this.hashAccordion();
	};

	JsAccordion.prototype.bindEvents = function () {
		var self = this,
			$accordionContent = self.$accordionContent,
			animateSpeed = self._animateSpeed,
			modifiers = self.modifiers;

		self.$accordionHand.on('click', 'a', function (e) {
			e.stopPropagation();
		});

		self.$accordionHand.on('mouseenter', 'a', function () {
			$(this).closest(self.$accordionHand).addClass(modifiers.noHoverClass);
		}).on('mouseleave', 'a', function () {
			$(this).closest(self.$accordionHand).removeClass(modifiers.noHoverClass);
		});

		self.$accordionHand.on('click', function (e) {
			e.preventDefault();

			var $currentHand = $(this),
				$currentHeader = $currentHand.closest(self.$accordionHeader),
				$currentItem = $currentHand.closest(self.$accordionItem),
				$currentItemContent = $currentHeader.next();

			if ($accordionContent.is(':animated')) return;

			if ($currentHeader.hasClass(modifiers.activeHeader)){

				$currentItem.removeClass(modifiers.activeItem);
				$currentHeader.removeClass(modifiers.activeHeader);
				$currentHand.removeClass(modifiers.activeHand);
				$currentItemContent.removeClass(modifiers.activeContent);

				$currentItemContent.slideUp(animateSpeed, function () {

					// console.log('closed');

					if (self._collapseInside) {
						var $internalContent = $currentItem.find(self.$accordionHeader).next();

						$.each($internalContent, function () {
							if ($(this).hasClass(self.modifiers.activeContent)) {

								// self.scrollPosition($currentItem);

								$(this).slideUp(self._animateSpeed, function () {
									// console.log('closed attachment');
									self.scrollPosition($currentItem);
								});
							}
						});


						$currentItem.find(self.$accordionItem).removeClass(self.modifiers.activeItem);
						$currentItem.find(self.$accordionHeader).removeClass(self.modifiers.activeHeader);
						$currentItem.find(self.$accordionHand).removeClass(self.modifiers.activeHand);
						$internalContent.removeClass(self.modifiers.activeContent);
					}
				});

				return;
			}

			var $siblings = $currentItem.siblings();

			$siblings.find(self.$accordionHeader).next().slideUp(self._animateSpeed, function () {
				// console.log('closed siblings');
			});

			$siblings.removeClass(modifiers.activeItem);
			$siblings.find(self.$accordionHeader).removeClass(modifiers.activeHeader);
			$siblings.find(self.$accordionHand).removeClass(modifiers.activeHand);
			$siblings.find(self.$accordionHeader).next().removeClass(modifiers.activeContent);

			// self.scrollPosition($currentItem);

			$currentItemContent.slideDown(animateSpeed, function () {
				// console.log('opened');
				self.scrollPosition($currentItem);
			});

			$currentItem.addClass(modifiers.activeItem);
			$currentHeader.addClass(modifiers.activeHeader);
			$currentHand.addClass(modifiers.activeHand);
			$currentItemContent.addClass(modifiers.activeContent);

			e.stopPropagation();
		});

		$(document).click(function () {
			if (self.clickOutside) {
				self.closeAllAccordions();
			}
		});

		$accordionContent.on('click', function(e){
			e.stopPropagation();
		});
	};

	// show accordion's content from hash tag
	JsAccordion.prototype.hashAccordion = function() {
		var self = this;
		var modifiers = self.modifiers,
			hashTag = window.location.hash;

		if ( !hashTag ) return false;

		var activeItemClass = modifiers.activeItem;
		var activeHeaderClass = modifiers.activeHeader;
		var activeHandClass = modifiers.activeHand;
		var activeContentClass = modifiers.activeContent;

		var $accordionHeader = self.$accordionHeader;
		var $accordionItem = self.$accordionItem;

		var $currentItem = $(hashTag);
		var $currentItemParents = $currentItem.parents().filter($accordionItem);

		// open parents accordion

		if ($currentItemParents.length) {
			var $currentHeaderParents = $currentItemParents.children($accordionHeader),
				$currentHandParents = $currentItemParents.children($accordionItem),
				$currentItemContentParents = $currentHeaderParents.next();

			$currentItemContentParents.slideDown(0);

			$currentItemParents.addClass(activeItemClass);
			$currentHeaderParents.addClass(activeHeaderClass);
			$currentHandParents.addClass(activeHandClass);
			$currentItemContentParents.addClass(activeContentClass);
		}

		// open current accordion

		var $currentHeader = $currentItem.children($accordionHeader),
			$currentHand = $currentHeader.children($accordionItem),
			$currentItemContent = $currentHeader.next();

		$currentItemContent.slideDown(0, function () {
			self.scrollPosition($currentItem);
		});

		$currentItem.addClass(activeItemClass);
		$currentHeader.addClass(activeHeaderClass);
		$currentHand.addClass(activeHandClass);
		$currentItemContent.addClass(activeContentClass);
	};

	// show current accordion's content
	JsAccordion.prototype.activeAccordion = function() {
		var self = this;
		var indexInit = self._indexInit;

		if ( indexInit === false ) return false;

		$.each(self.$accordionContainer, function () {
			var $currentItem = $(this).children().eq(indexInit);

			$currentItem.addClass(self.modifiers.activeItem);
			$currentItem.children(self.$accordionHeader).addClass(self.modifiers.activeHeader);
			$currentItem.children(self.$accordionHeader).find(self.$accordionHand).addClass(self.modifiers.activeHand);

			// self.scrollPosition($currentItem);

			$currentItem.children(self.$accordionHeader).next().addClass(self.modifiers.activeContent).slideDown(self._animateSpeed, function () {
				// console.log('opened active');

				// self.scrollPosition($currentItem);
			});
		});
	};

	// close all accordions
	JsAccordion.prototype.closeAllAccordions = function() {
		var self = this;

		self.$accordionHeader.next().slideUp(self._animateSpeed, function () {
			// console.log('closed all');
		});

		var modifiers = self.modifiers;

		self.$accordionItem.removeClass(modifiers.activeItem);
		self.$accordionHeader.removeClass(modifiers.activeHeader);
		self.$accordionHand.removeClass(modifiers.activeHand);
		self.$accordionHeader.next().removeClass(modifiers.activeContent);
	};

	// open all accordions
	JsAccordion.prototype.openAllAccordions = function() {
		var self = this;

		self.$accordionHeader.next().slideDown(self._animateSpeed, function () {
			// console.log('open all');
		});

		var modifiers = self.modifiers;

		self.$accordionItem.addClass(modifiers.activeItem);
		self.$accordionHeader.addClass(modifiers.activeHeader);
		self.$accordionHand.addClass(modifiers.activeHand);
		self.$accordionHeader.next().addClass(modifiers.activeContent);
	};

	JsAccordion.prototype.scrollPosition = function (element) {
		var self = this;
		if (self.scrollToTop && !$('html, body').is('animated')) {
			$('html, body').animate({ scrollTop: element.offset().top - self._scrollToTopOffset }, self._scrollToTopSpeed);
		}
	};

	window.JsAccordion = JsAccordion;
}(jQuery));

/**
 * Initial accordion
 * */
function initMultiAccordion() {
	// accordion default
	var $accordion = $('.js-accordion__container');

	if($accordion.length){
		new JsAccordion({
			accordionContainer: '.js-accordion__container',
			accordionItem: '.js-accordion__item',
			accordionHeader: '.js-accordion__header',
			accordionHand: '.js-accordion__hand',
			// scrollToTop: true,
			// scrollToTopSpeed: 300,
			// scrollToTopOffset: $('.header').outerHeight(),
			indexInit: false,
			clickOutside: false,
			animateSpeed: 200
		});
	}

	// accordion periods
	var $accordionPeriods = $('.periods-js');

	if($accordionPeriods.length){
		new JsAccordion({
			accordionContainer: '.periods-js',
			accordionItem: '.periods-item-js',
			accordionHeader: '.periods-header-js',
			accordionHand: '.periods-hand-js',
			// scrollToTop: true,
			// scrollToTopSpeed: 300,
			// scrollToTopOffset: $('.header').outerHeight(),
			indexInit: false,
			clickOutside: false,
			animateSpeed: 200
		});
	}
}

/**
 * !main menu switcher
 * */
function mainMenuSwitcher() {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (widgets.js);
	// 2) resizeByWidth (resize only width);

	var $wrap = $('.js-mm-switcher');
	var $container = $('.js-mm-container');

	if (!$container.length) return false;

	if ($wrap.length) {
		var $toggler = $('.js-mm-anchor'),
			$content = $('.js-mm-content'),
			idMainMenu = '#main-menu',
			idSubMenu = '#sub-menu',
			activeClass = 'active',
			xSlide = 100,
			animationSpeed = 0.2,
			animationHeightSpeed = 0.08;

		$.each($wrap, function () {
			var $currentWrap = $(this),
				$currentToggler = $currentWrap.find($toggler),
				$currentContainer = $currentWrap.find($container),
				$currentContent = $currentWrap.find($content);

			var activeId = idMainMenu;

			if ($toggler.hasClass(activeClass)) {
				activeId = idSubMenu;
			}

			// prepare traffic content
			function prepareTabsContent() {
				$currentContainer.css({
					'display': 'block',
					'position': 'relative',
					'overflow': 'hidden'
				});

				$currentContent.css({
					'display': 'block',
					'position': 'absolute',
					'left': 0,
					'top': 0,
					'width': '100%',
					'z-index': -1
				});

				toggleContent();
				toggleActiveClass();
			}

			prepareTabsContent();

			// toggle content
			$currentToggler.on('click', function (e) {
				e.preventDefault();

				toggleContent();
				toggleActiveClass();
			});

			// show active content and hide other
			function toggleContent() {

				$currentContainer.css('height', $currentContainer.outerHeight());

				$currentContent.css({
					'position': 'absolute',
					'left': 0,
					'top': 0
				});

				var $initialContent, xPos;

				if(activeId === idMainMenu) {
					$initialContent = $(idSubMenu);
					$toggler.attr('title', $toggler.data('title'));
				} else {
					$initialContent = $(idMainMenu);
					$toggler.attr('title', $toggler.data('title-alt'));
				}

				TweenMax.to($currentContent, animationSpeed, {
					autoAlpha: 0,
					x: xSlide
				});

				TweenMax.to($initialContent, animationSpeed, {
					autoAlpha: 1,
					x: 0
				});

				$initialContent.css({
					'z-index': 2
				});

				TweenMax.to($currentContainer, animationHeightSpeed, {
					'height': $initialContent.outerHeight(),

					onComplete: function () {

						$currentContainer.css({
							'height': 'auto'
						});

						$currentContent.not($initialContent).css({
							'z-index': -1
						});

						TweenMax.set($currentContent.not($initialContent), {
							x: -xSlide
						});

						$initialContent.css({
							'position': 'relative',
							'left': 'auto',
							'right': 'auto'
						});

						activeId =  "#" + $initialContent.attr('id');
					}
				});
			}

			// toggle class active
			function toggleActiveClass() {
				$currentToggler.removeClass(activeClass);
				$currentContent.removeClass(activeClass);

				if (activeId === idMainMenu) {
					$currentToggler.removeClass(activeClass);
					$(idSubMenu).addClass(activeClass);
				} else {
					$currentToggler.addClass(activeClass);
					$(idMainMenu).addClass(activeClass);
				}
			}
		});
	}
}

/**
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	// popular
	var $popular = $('.popular-list');

	if($popular) {
		$popular.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}

	// navigation
	var $navDrop = $('.nav__drop ul');

	if($navDrop) {
		$navDrop.children().matchHeight({
			byRow: true, property: 'height', target: null, remove: false
		});
	}
}

/**
 * !Sticky element on the page by scroll
 * */
function stickyLayout() {

	if (!DESKTOP) {
		return;
	}

	/*aside sticky*/
	var $aside = $(".aside__holder");

	if ($aside.length && window.innerWidth >= 960) {
		$aside.stick_in_parent({
			parent: '.layout',
			offset_top: $('.header').outerHeight()
		});
	}

	$(window).on('debouncedresize', function () {
		if(window.innerWidth < 960) {
			$aside.trigger("sticky_kit:detach");
		}
	})
}

/**
 * !Add map on contacts page
 * */
function contactsMap() {

	var mapId = "#contacts-map",
		$mapId = $(mapId);

	/*initial map*/
	if ( $mapId.length ) {

		var myMap,
			myPlacemark,
			contactsMapCoord = contactMapInfo.coord,
			center = [];

		if (window.innerWidth > 768) {
			for (var i = 0; i < contactsMapCoord.length; i++) {
				if (i === 1) {
					center.push(contactsMapCoord[i] + 0.0006);
					continue
				}
				center.push(contactsMapCoord[i] + 0.0002);
			}
		} else {
			center = contactsMapCoord
		}

		ymaps.ready(init);

		var balloonContent = '' +
			'<div class="map-popup">' +
			'<div class="map-popup__title">' + contactMapInfo.name + '</div>' +
			'<div class="map-popup__list">' +
			'<div class="map-popup__row"><i class="depict-pin"></i><div>' + contactMapInfo.address + '</div></div>' +
			'<div class="map-popup__row"><i class="depict-time"></i><div>' + contactMapInfo.time + '</div></div>' +
			'<div class="map-popup__row"><i class="depict-phone"></i><div>' + contactMapInfo.phones + '</div></div>' +
			'</div>';

		function init(){
			/*create new map object*/
			myMap = new ymaps.Map (mapId.substring(1), {
				center: center,
				zoom: 15,
				controls: ['fullscreenControl', 'zoomControl']
			});

			myPlacemark = new ymaps.Placemark(contactsMapCoord, {
				balloonContentBody: balloonContent,
				hintContent: "ГПО «Белэнерго»"
			}, {
				iconLayout: 'default#image',
				iconImageHref: contactsMapBaseImageURL + 'pin-map.png',
				iconImageSize: [79, 88],
				iconImageOffset: [-35, -77]
			});

			myMap.geoObjects.add(myPlacemark);

			/*behaviors setting map*/
			myMap.behaviors.disable('scrollZoom');
		}
	}
}

/**
 * !extra popup jQuery plugin
 * */
(function ($) {
	// external js:
	// 1) TweetMax VERSION: 1.19.0 (libs);
	// 2) device.js (libs);
	// 3) resizeByWidth (resize only width);

	// add css style
	// .before-extra-popup-open{
	// 	width: 100%!important;
	// 	height: 100%!important;
	// 	max-width: 100%!important;
	// 	max-height: 100%!important;
	// 	margin: 0!important;
	// 	padding: 0!important;
	// 	overflow: hidden!important;
	// }

	// .before-extra-popup-open .wrapper{ z-index: 99; } // z-index of header must be greater than footer
	//
	// if nav need to hide
	// @media only screen and (min-width: [example: 1280px]){
	// .nav{
	// 		-webkit-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		-ms-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 	}
	// .nav-list > li{
	// 		-webkit-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		-ms-transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		transform: translate(0, 0) matrix(1, 0, 0, 1, 0, 0) !important;
	// 		opacity: 1 !important;
	// 		visibility: visible !important;
	// 	}
	// }

	var defaults = {
		mainContainer: 'html', // container wrapping all elements
		navContainer: null, // main navigation container
		navMenu: null, // menu
		btnMenu: null, // element which opens or switches menu
		btnMenuClose: null, // element which closes a menu
		navMenuItem: null,
		navMenuAnchor: 'a',
		staggerElement: null,
		overlayClass: 'popup-overlay', // overlay's class
		overlayAppendTo: 'body', // where to place overlay
		overlayAlpha: 0.8,
		overlayIndex: 997,
		overlayBg: 'black',
		classReturn: null,
		overlayBoolean: true,
		animationType: 'ltr', // rtl or ltr
		animationScale: 0.85, // default scale for animation
		animationSpeed: 300, // animation speed of the main element
		animationSpeedOverlay: null, // animation speed of the overlay
		alpha: 1,
		ease: Cubic.easeOut, // animation (gsap) https://greensock.com/customease
		minWidthItem: 100,
		mediaWidth: null,
		closeOnResize: true,
		cssScrollBlocked: false, // add class to body for blocked scroll
		closeEsc: true, // close popup on click Esc,
		activeClass: 'active',
		openedClass: 'extra-popup-opened',
		beforeOpenClass: 'extra-popup-before-open',
		extraPopupBeforeOpen: null
	};

	var ExtraPopup = function (settings) {
		var options = $.extend(defaults, settings || {});

		var container = $(options.navContainer),
			_animateSpeed = options.animationSpeed;

		var self = this;
		self.options = options;
		self.$mainContainer = $(options.mainContainer);            // . по умолчанию <html></html>
		self.$navMenu = $(options.navMenu);
		self.$btnMenu = $(options.btnMenu);
		self.$btnMenuClose = $(options.btnMenuClose);
		self.$navContainer = container;
		self.$navMenuItem = $(options.navMenuItem, container);     // Пункты навигации;
		self.$navMenuAnchor = $(options.navMenuAnchor, container); // Элемент, по которому производится событие (клик);
		self.$staggerElement = options.staggerElement;  //Элементы в стеке, к которым применяется анимация. По умолчанию null;

		self._animationType = options.animationType;
		self._animationScale = options.animationScale;
		self._animateSpeed = _animateSpeed;
		self.ease = options.ease;
		self.alpha = options.alpha;

		// overlay
		self.overlayBoolean = options.overlayBoolean;
		self.overlayAppendTo = options.overlayAppendTo;
		self.$overlay = $('<div class="' + options.overlayClass.substring(0) + '"></div>'); // Темплейт оверлея;
		self._overlayAlpha = options.overlayAlpha;
		self._overlayIndex = options.overlayIndex;
		self._animateSpeedOverlay = options.animationSpeedOverlay || _animateSpeed;
		self._overlayBg = options.overlayBg;
		self._minWidthItem = options.minWidthItem;
		self._mediaWidth = options.mediaWidth;
		self.closeOnResize = options.closeOnResize;
		self.cssScrollBlocked = options.cssScrollBlocked;
		self.closeEsc = options.closeEsc;

		self.desktop = device.desktop();

		self.modifiers = {
			active: options.activeClass,
			opened: options.openedClass,
			beforeOpen: options.beforeOpenClass,
			showShadow: 'show-shadow'
		};

		self.outsideClick();
		if ( self._mediaWidth === null || window.innerWidth < self._mediaWidth ) {
			self.preparationAnimation();
		}
		self.toggleMenu();
		self.eventsBtnMenuClose();
		self.clearStyles();
		self.closeNavOnEsc();
		self.closeNavMethod();
		self.addShadowOnScroll();
	};

	ExtraPopup.prototype.navIsOpened = false;

	// overlay append to "overlayAppendTo"
	ExtraPopup.prototype.createOverlay = function () {
		var self = this,
			$overlay = self.$overlay;

		$overlay.appendTo(self.overlayAppendTo);

		TweenMax.set($overlay, {
			autoAlpha: 0,
			position: 'fixed',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			background: self._overlayBg,
			'z-index': self._overlayIndex,
			onComplete: function () {
				TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {autoAlpha: self._overlayAlpha});
			}
		});
	};

	// toggle overlay
	ExtraPopup.prototype.toggleOverlay = function (close) {
		var self = this,
			$overlay = self.$overlay,
			ease = self.ease;

		if (close === false) {
			TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {
				autoAlpha: 0,
				ease: ease,
				onComplete: function () {
					$overlay.remove();
				}
			});
			return false;
		}

		self.createOverlay();
	};

	// toggle menu
	ExtraPopup.prototype.toggleMenu = function () {
		var self = this,
			$buttonMenu = self.$btnMenu;

		// $buttonMenu.on('mousedown touchstart vmousedown', function (e) {
		$buttonMenu.on('click', function (e) {

			if (self.navIsOpened) {
				self.closeNav();
			} else {
				self.openNav();
			}

			e.preventDefault();
			e.stopPropagation();
		});
	};

	// events btn close menu
	ExtraPopup.prototype.eventsBtnMenuClose = function () {

		var self = this;

		self.$btnMenuClose.on('click', function (e) {
			e.preventDefault();

			if ( self.navIsOpened ) {
				self.closeNav();
			}

			e.stopPropagation();
		});
	};

	// click outside menu
	ExtraPopup.prototype.outsideClick = function () {
		var self = this;

		$(document).on('click', function () {
			if ( self.navIsOpened ) {
				self.closeNav();
			}
		});

		self.$navContainer.on('click', function (e) {
			if ( self.navIsOpened ) {
				e.stopPropagation();
			}
		})
	};

	// close popup on click to "Esc" key
	ExtraPopup.prototype.closeNavOnEsc = function () {
		var self = this;

		$(document).keyup(function(e) {
			if (self.navIsOpened && self.closeEsc && e.keyCode === 27) {
				self.closeNav();
			}
		});
	};

	// close popup (method)
	ExtraPopup.prototype.closeNavMethod = function () {
		var self = this;

		self.$navContainer.on('extraPopupClose', function () {
			if (self.navIsOpened) {
				self.closeNav();
			}
		})
	};

	// open nav
	ExtraPopup.prototype.openNav = function() {
		// console.log("openNav");

		var self = this,
			$html = self.$mainContainer,
			$navContainer,
			$buttonMenu = self.$btnMenu,
			$buttonClose = self.$btnMenuClose,
			_animationSpeed = self._animateSpeedOverlay,
			$staggerElement = self.$staggerElement,
			ease = self.ease;

		var navContainerHref = $buttonMenu.attr('href');

		if(navContainerHref !== '#' && (navContainerHref).length){
			$navContainer = $(navContainerHref);
		} else {
			$navContainer = self.$navContainer;
		}

		var modifiers = self.modifiers;
		var classBeforeOpen = modifiers.beforeOpen;
		var classAfterOpen = modifiers.opened;

		$navContainer.trigger('extraPopupBeforeOpen');
		// self.options.extraPopupBeforeOpen(self.$navContainer);

		$html.addClass(classBeforeOpen);
		$buttonMenu.addClass(modifiers.active);
		$buttonClose.addClass(classBeforeOpen);

		if(self.cssScrollBlocked){
			self.cssScrollFixed();
		}

		$navContainer.css({
			'-webkit-transition-duration': '0s',
			'transition-duration': '0s'
		});

		// animation of stagger
		if($staggerElement) {
			TweenMax.staggerTo($staggerElement, 0.85, {
				autoAlpha: 1,
				scale: 1,
				y: 0,
				yPercent: 0,
				xPercent: 0,
				ease: ease
			}, 0.1);
		}

		TweenMax.to($navContainer, _animationSpeed / 1000, {
			xPercent: 0,
			scale: 1,
			autoAlpha: 1,
			ease: ease,
			onComplete: function () {
				$html.addClass(classAfterOpen);
				$buttonClose.addClass(classAfterOpen);

				// blocked scroll on page
				// if (DESKTOP) {
				// 	noScroll();
				// }
			}
		});

		if (self.overlayBoolean) {
			self.toggleOverlay();
		}

		self.navIsOpened = true;
	};

	// close nav
	ExtraPopup.prototype.closeNav = function() {
		// console.log("closeNav");

		var self = this,
			$html = self.$mainContainer,
			$navContainer,
			$buttonMenu = self.$btnMenu,
			$buttonClose = self.$btnMenuClose,
			$staggerElement = self.$staggerElement,
			_animationSpeed = self._animateSpeedOverlay,
			_mediaWidth = self._mediaWidth,
			_animationType = self._animationType,
			ease = self.ease,
			alpha = self.alpha;

		var navContainerHref = $buttonMenu.attr('href');

		if(navContainerHref !== '#' && $(navContainerHref).length){
			$navContainer = $(navContainerHref);
		} else {
			$navContainer = self.$navContainer;
		}

		var modifiers = self.modifiers;
		var classAfterOpen = modifiers.opened;
		var classBeforeOpen = modifiers.beforeOpen;

		$html.removeClass(classAfterOpen);
		$html.removeClass(classBeforeOpen);
		$buttonMenu.removeClass(modifiers.active);
		$buttonClose.removeClass(classAfterOpen);
		$buttonClose.removeClass(classBeforeOpen);

		if (self.overlayBoolean) {
			self.toggleOverlay(false);
		}

		var duration = _animationSpeed / 1000;

		// animation of stagger
		if($staggerElement) {
			TweenMax.staggerTo($staggerElement, 0.85, {
				autoAlpha: alpha,
				xPercent: -100
			}, 0.1);
		}

		if (_animationType === 'ltr') {
			TweenMax.to($navContainer, duration, {
				xPercent: -100,
				ease: ease,
				onComplete: function () {
					if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
						self.preparationAnimation();
					}

					TweenMax.set($navContainer, {
						autoAlpha: alpha
					});

					// unblocked scroll on page
					// if (DESKTOP) {
					// 	canScroll();
					// }

					if(self.cssScrollBlocked){
						self.cssScrollUnfixed();
					}
				}
			});

		} else if (_animationType === 'rtl') {
			TweenMax.to($navContainer, duration, {
				xPercent: 100,
				ease: ease,
				onComplete: function () {
					if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
						self.preparationAnimation();
					}

					TweenMax.set($navContainer, {
						autoAlpha: alpha
					});

					// unblocked scroll on page
					// if (DESKTOP) {
					// 	canScroll();
					// }

					if(self.cssScrollBlocked){
						self.cssScrollUnfixed();
					}
				}
			});

		} else if (_animationType === 'surface') {
			TweenMax.to($navContainer, duration, {
				scale: self._animationScale,
				autoAlpha: alpha,
				ease: ease,
				onComplete: function () {
					if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
						self.preparationAnimation();
					}

					// unblocked scroll on page
					// if (DESKTOP) {
					// 	canScroll();
					// }

					if(self.cssScrollBlocked){
						self.cssScrollUnfixed();
					}
				}
			});

		} else {
			console.error('Type animation "' + _animationType + '" is wrong!');
			return;
		}

		self.navIsOpened = false;
	};

	// preparation element before animation
	ExtraPopup.prototype.preparationAnimation = function() {
		var self = this;

		var $navContainer = self.$navContainer,
			$staggerElement = self.$staggerElement,
			_animationType = self._animationType,
			alpha = self.alpha;

		// console.log('preparationAnimation: ', $navContainer);

		// animation of stagger
		if($staggerElement) {
			TweenMax.set($staggerElement, {
				autoAlpha: alpha,
				xPercent: -100
			});
		}

		if (_animationType === 'ltr') {
			TweenMax.set($navContainer, {
				xPercent: -100,
				autoAlpha: alpha,
				onComplete: function () {
					$navContainer.show(0);
				}
			});

		} else if (_animationType === 'rtl') {
			TweenMax.set($navContainer, {
				xPercent: 100,
				autoAlpha: alpha,
				onComplete: function () {
					$navContainer.show(0);
				}
			});

		} else if (_animationType === 'surface') {
			TweenMax.set($navContainer, {
				scale: self._animationScale,
				autoAlpha: alpha,
				onComplete: function () {
					$navContainer.show(0);
				}
			});

		} else {
			console.error('Type animation "' + _animationType + '" is wrong!');
		}
	};

	ExtraPopup.prototype.cssScrollFixed = function() {
		$('html').addClass('css-scroll-fixed');
	};

	ExtraPopup.prototype.cssScrollUnfixed = function() {
		$('html').removeClass('css-scroll-fixed');
	};

	// clearing inline styles
	ExtraPopup.prototype.clearStyles = function() {
		var self = this,
			$btnMenu = self.$btnMenu,
			$navContainer = self.$navContainer,
			$staggerElement = self.$staggerElement;

		//clear on horizontal resize
		if (self.closeOnResize === true) {

			$(window).on('resizeByWidth', function () {
				if (self.navIsOpened) {
					if (!$btnMenu.is(':visible')) {
						$navContainer.attr('style', '');
						$staggerElement.attr('style', '');
						self.closeNav();
					} else {
						self.closeNav();
					}
				}
			});

		}
	};

	// add shadow to popup header after start scroll
	ExtraPopup.prototype.addShadowOnScroll = function () {
		var self = this;

		$('.default-popup__content').on('scroll', function () {
			$(this).closest(self.$navContainer).toggleClass(self.modifiers.showShadow, $(this).scrollTop() > 10);
		})
	};

	window.ExtraPopup = ExtraPopup;

}(jQuery));

/**
 * !extra popup initial
 * */
function popupsInit(){

	/* initialize main menu events for mobile version */
	var navPopupClass = '.menu-popup-js';
	var $navPopup = $(navPopupClass);

	if($navPopup.length){

		new ExtraPopup({
			navContainer: navPopupClass,
			navMenu: '.nav-list',
			btnMenu: '.menu-btn-js',
			btnMenuClose: '.btn-close-js',
			// staggerElement: '.nav-list > li',
			overlayClass: 'overlay-menu',
			overlayAppendTo: 'body',
			closeOnResize: false,
			// mediaWidth: 1280,
			animationSpeed: 200,
			overlayAlpha: 0.35,
			overlayIndex: 999,
			// alpha: 0,
			cssScrollBlocked: true,
			openedClass: 'menu--opened',
			beforeOpenClass: 'menu--before-open',
			ease: 'Power2.easeInOut'
			// ease: 'Power0.easeNone'
		});
	}

	// $searchPopup.on('extraPopupBeforeOpen', function () {
	// 	$navPopup.trigger('extraPopupClose');
	// });
	$navPopup.on('extraPopupBeforeOpen', function () {
		// close lang drop
		var $choiceContainer = $('.js-choice-wrap');
		if($choiceContainer.hasClass('choice-opened')) {
			$choiceContainer.trigger('closeChoiceDrop');
		}
	});

	/* default popup */
	var defaultPopupClass = '.default-popup-js';
	var $defaultPopup = $(defaultPopupClass);

	if($defaultPopup.length){

		new ExtraPopup({
			navContainer: defaultPopupClass,
			btnMenu: '.popup-opener-js',
			btnMenuClose: '.btn-close-js',
			overlayClass: 'default-popup-overlay',
			overlayAppendTo: 'body',
			closeOnResize: false,
			animationSpeed: 200,
			overlayAlpha: 0.35,
			overlayIndex: 9998,
			cssScrollBlocked: true,
			openedClass: 'default-popup--opened',
			beforeOpenClass: 'default-popup--before-open',
			ease: 'Power2.easeInOut'
		});
	}

	// $searchPopup.on('extraPopupBeforeOpen', function () {
	// 	$navPopup.trigger('extraPopupClose');
	// });
	$defaultPopup.on('extraPopupBeforeOpen', function () {
		// close lang drop
		var $choiceContainer = $('.js-choice-wrap');
		if($choiceContainer.hasClass('choice-opened')) {
			$choiceContainer.trigger('closeChoiceDrop');
		}
	});
}

/**
 * !extra popup initial
 * */
function initWow() {

	new WOW({
		// boxClass: 'wow', // default
		// animateClass: 'animated', // default
		offset: 50, // 0 default
		// mobile: true, // default
		// live: true // default
		callback: function(box) {
			$(box).css('will-change', 'auto');
		}
	}).init();

}

/**
 * light gallery initial
 * */
function lightGalleryInit() {
	var $lightGallery = $('.lg-js');
	var $lightGalleryVideo = $('.lg-video-js');

	if ($lightGallery.length) {
		$.each($lightGallery, function () {
			var $thisGallery = $(this);
			lightGalleryImages($thisGallery);
		})
	}

	if ($lightGalleryVideo.length) {
		$.each($lightGalleryVideo, function () {
			var $thisGallery = $(this);
			lightGalleryVideos($thisGallery);
		})
	}

	function lightGalleryImages($thisGallery) {
		$thisGallery.lightGallery({
			thumbnail: false,
			animateThumb: false,
			showThumbByDefault: false,
			download: false,
			counter: true,
			share: false,
			hash: false,
			fullScreen: false,
			zoom: true,
			autoplay: false,
			autoplayControls: false
		});
	}

	function lightGalleryVideos($thisGallery) {
		$thisGallery.lightGallery({
			thumbnail: true,
			animateThumb: true,
			showThumbByDefault: false,
			download: false,
			counter: true,
			share: false,
			hash: false,
			autoplayControls: false,
			zoom: false
		});
	}

	// var $imagesSlider = $('.images-slider');
	// if ($imagesSlider.length) {
	// 	$imagesSlider.lightGallery({
	// 		thumbnail: false,
	// 		animateThumb: false,
	// 		showThumbByDefault: false,
	// 		download: false,
	// 		counter: false,
	// 		share: false,
	// 		hash: false,
	// 		selector: '.images-slider__item'
	// 	});
	// }

	var $contentImg = $('.img-zoom');
	if ($contentImg.length) {
		$.each($contentImg, function () {
			var $currentImg = $(this);
			$currentImg.attr('data-src', $currentImg.attr('src'));
		});
		$contentImg.lightGallery({
			thumbnail: false,
			animateThumb: false,
			showThumbByDefault: false,
			download: false,
			counter: false,
			share: false,
			hash: false,
			selector: 'this',
			addClass: 'zoom-img-popup',
			enableDrag: false,
			enableSwipe: false,
			backdropDuration: 0.5
		});
	}

	$('.history-gallery-open-js').on('click', function(e) {

		e.preventDefault();

		$(this).parent().find('.lg-js').children().eq(1).trigger('click');

	});
}

/**
 * filter structure plugin
 * */
;(function($){
	var defaults = {
		key: 'value',
		tagsGroup: $('.tags-group-js'),
		tagsItem: $('.tags-item-js'),
		tagsElement: $('[data-tags]'),
		filters: $('.filters-js'),
		counterTags: $('.counter'),
		btnReset: $('.filters-reset-js'),
		containerClass: 'sfilters-container',
		classNoItem: 'filter-no-item',
		noItemText: 'No items',
		classCounter: 'filter-counter',
		counterText: 'Найдено: ',
		classHideElements: 'filters--hide',
		classPreloader: 'filter-preloader',
		classPreloaderShow: 'filter-preloader--show'

		// Callback-functions
		// created: function () {}
	};

	function Sfilters(element, options) {
		var self = this;

		self.config = $.extend(true, {}, defaults, options);

		self.element = element;
		self.filters = element.find(self.config.filters);

		self.callbacks();
		self.resetFilters();
		self.event();
		self.toggleButtons();
		self.init();
	}

	/** track events */
	Sfilters.prototype.callbacks = function () {
		var self = this;
		$.each(self.config, function (key, value) {
			if(typeof value === 'function') {
				self.element.on(key + '.sfilters', function (e, param) {
					return value(e, self.element, param);
				});
			}
		});
	};

	Sfilters.prototype.event = function () {
		var self = this;

		var noItemText = self.element.data('no-filters-test') || self.config.noItemText;
		var counterText = self.element.data('counter-text') || self.config.counterText;

		var tplNoItem = $('<div />', {
			class: self.config.classNoItem,
			text: noItemText
		});

		var tplCounter = $('<div />', {
			class: self.config.classCounter
		});

		var tplPreloader = $('<div />', {
			class: this.config.classPreloader
		});

		var timeout;
		var tagsGroup = self.element.find(self.config.tagsGroup);
		var tagsElement = self.element.find(self.config.tagsElement);

		self.filters.on('change', 'input[type="checkbox"]', function () {

			// add preloader
			tplPreloader.clone().appendTo(self.config.filters.parent());

			if(tagsElement) {

				var arrTags = self.checkedFilters(self.filters);

				var filterSelector = self.createSelectorTypeAnd(arrTags);

				// show all tag elements
				tagsGroup.removeClass(self.config.classHideElements);
				tagsElement.removeClass(self.config.classHideElements);

				// remove messages
				self.element.find('.'+ self.config.classNoItem).remove();
				self.element.find('.'+ self.config.classCounter).remove();

				// add counter message
				var tagsElementFiltered = tagsElement.filter(filterSelector);
				var filtersParent = self.filters.parent();

				if (tagsElementFiltered.length) {
					tplCounter.clone().appendTo(filtersParent).end().text(counterText + ' ' + tagsElementFiltered.length);
				}

				if (filterSelector) {
					// hide all tag elements
					tagsElement.addClass(self.config.classHideElements);
					// show filtering tag elements
					tagsElementFiltered.removeClass(self.config.classHideElements);

					// add not found tags message
					if (!tagsElementFiltered.length) {
						filtersParent.append(tplNoItem.clone());
					}
				}

				$.each(tagsGroup, function (index, el) {
					// numbers of child element in tags group
					var countFilteringTagsItems = $(el).find(self.config.tagsItem).filter(':not(.'+ self.config.classHideElements +')').length;
					// numbers of element have filters attribute
					var countFilteringTagsElements = $(el).find(self.config.tagsElement).filter(':not(.'+ self.config.classHideElements +')').length;

					$(el).find(self.config.counterTags).attr('data-text', countFilteringTagsItems);
					if(!countFilteringTagsElements){
						$(el).addClass(self.config.classHideElements);
					}
				});

				clearTimeout(timeout);
				timeout = setTimeout(function () {
					self.element.find('.'+ self.config.classPreloader).remove();
				}, 200);

				// self.element.find('.'+ self.config.classPreloader).remove();
			}

		});
	};

	// Toggle buttons state
	Sfilters.prototype.toggleButtons = function () {
		var self = this;

		self.filters.on('change', 'input[type="checkbox"]', function () {
			self.element.find(self.config.btnReset).prop('disabled', !self.checkedFilters(self.filters).length);
		})

	};

	// Reset filters
	Sfilters.prototype.resetFilters = function () {
		var self = this;

		self.element.find(self.config.btnReset).on('click', function () {
			self.filters.find('input[type="checkbox"]').prop('checked', false).trigger('change');
		})
	};

	// create an array of tag values for the selected filters
	Sfilters.prototype.checkedFilters = function ($container) {
		var $input = $container.find('input[type="checkbox"]');

		var hasCheckedInput = false;

		var arr = [];

		$.each($input, function () {

			var $currentInput = $(this);

			if ($currentInput.prop('checked')) {
				hasCheckedInput = true;

				arr.push($currentInput.data('tag'));
			}
		});

		return arr;
	};

	// Создаем селектор собирающий в себе все теги.
	// Нужно показать все элементы, которые имеют хотя бы один совпадающий тег.
	// Возвращает массив в виде набора селекторов: [data-tags*="значение-1"], [data-tags*="значение-2"], ... , [data-tags*="значение-n"]
	Sfilters.prototype.createSelectorTypeAnd = function (arr) {
		var newArr = [];

		arr.forEach(function(item, i, arr) {
			newArr.push('[data-tags*="' + item + '"]');
		});

		return newArr.join(', ');
	};

	Sfilters.prototype.init = function () {
		this.config.filters.find('input').each(function () {
			$(this).prop('disabled', false);
		});

		this.element.addClass(this.config.containerClass);

		this.element.trigger('created.sfilters');

	};

	$.fn.sfilters = function (options) {
		'use strict';

		return $.each(this, function () {
			new Sfilters($(this), options);
		});
	};
})(jQuery);

/**
 * filter structure init
 * */
function filterStructure() {
	var $filtersContainer = $('.filters-container-js');

	if($filtersContainer.length) {
		$filtersContainer.sfilters({
			tagsItem: $('.structure-item')
		});
	}
}

/**
 * !Scroll to the anchor on load page if has hash tag in url
 */
function scrollToHashTag() {
	var hashTag = window.location.hash;
	if (hashTag.length > 0) {
		var $doc = $('html, body');
		if (!$doc.is('animated')) {
			$doc.animate({scrollTop: $('[id=' + hashTag.substring(1) + ']').offset().top - $('.header').outerHeight()}, 200);
		}
	}
}

/**
 * wrap table to table-auto container
 * */
function wrapTable() {
	var $elem = $('.user-content').find('table');
	var classAuto = "table-auto";
	var classAutoWrap = "table-auto-wrap";
	var classThumb = "tbl-thumbs";
	var classFullView = "tbl-full-view";
	var tplTopScroll = $('<div class="topscroll"><div class="topscroll-hand"></div></div>');
	var tplThumbs = $('<div class="'+classThumb+'"><div class="'+classThumb+'-item tbl-toggle-view" data-short="Включить компактный вид" data-full="Включить полный вид"></div></div>');

	$.each($elem, function () {
		var $currentElem = $(this);
		var $parentCurrentElem = $currentElem.parent();

		if(!$parentCurrentElem.hasClass(classAuto)){
			$currentElem.wrap('<div class="' + classAuto + '"></div>');
		}

		var $currentElemContainer = $currentElem.closest('.' + classAuto);
		if(DESKTOP) {
			$currentElemContainer.wrap('<div class="' + classAutoWrap + '"></div>');
			$currentElemContainer.before(tplTopScroll.clone());

			$currentElem.closest('.' + classAutoWrap).find('.topscroll-hand').width($currentElem.outerWidth(true));
		}


		if($currentElemContainer.hasClass('add-compact')){
			$currentElem.find('td').wrapInner( "<div class='td-auto' />");
			$currentElem.closest('.table').before(tplThumbs.clone());
		}

		$(document).on('click', '.tbl-toggle-view', function () {
			var $currentBtn = $(this);
			$currentBtn.toggleClass(classFullView).closest('.' + classThumb).next().toggleClass(classFullView);
			$(document.body).trigger("sticky_kit:recalc");
		})
	});

	if(DESKTOP) {
		$('.topscroll').scroll(function(e){
			$(this).closest('.' + classAutoWrap).find('.' + classAuto).scrollLeft($(this).scrollLeft());
		});

		$('.' + classAuto).scroll(function(e){
			$(this).closest('.' + classAutoWrap).find('.topscroll').scrollLeft($(this).scrollLeft());
		});
	}

	$(window).on('debouncedresize', function () {
		$.each($elem, function () {
			var $currentElem = $(this);

			if(DESKTOP) {
				$currentElem.closest('.' + classAutoWrap).find('.topscroll-hand').width($currentElem.outerWidth(true));
			}
		});
	});

	/*aside sticky*/
	var $tableScroll = $(".topscroll");

	if ($tableScroll.length && window.innerWidth >= 960) {
		$tableScroll.stick_in_parent({
			parent: '.table-auto-wrap',
			offset_top: $('.header').outerHeight()
		});
	}
}

/**
 * !Always place the footer at the bottom of the page
 * */
function footerBottom() {
	var $footer = $('.footer__holder');

	if ($footer.length) {
		$('.main__holder').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page
		$('.wrapper').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page (for responsive)

		setTimeout(function () {
			layoutFooter();
		}, 200);

		$(window).on('resizeByWidth', function () {
			layoutFooter();
		});

		function layoutFooter() {
			// var footerHeight = $('.footer__holder', $footer).outerHeight();
			var footerHeight = $($footer).outerHeight();
			// $footer.css({
			// 	'margin-top': -footerHeight
			// });

			$('.spacer').css({
				'height': footerHeight,
				'pointer-events': 'none', 'float': 'left',
				'width': '100%'
			});
		}
	}
}

/**
 * !Testing form validation (for example). Do not use on release!
 * */
function formSuccessExample() {
	var $form = $('.user-form form, .subscription-form form, .callback-form form');

	if ( $form.length ) {

		$form.submit(function (event) {
			var $thisForm = $(this);

			if ($thisForm.parent().hasClass('success-form')) return;

			event.preventDefault();

			testValidateForm($thisForm);
		});

		// $(':text, input[type="email"], textarea', $form).on('keyup change', function () {
		// 	var $form = $(this).closest('form');
		// 	if ($form.parent().hasClass('error-form')) {
		// 		testValidateForm($form);
		// 	}
		// })

	}

	function testValidateForm(form) {
		var $thisFormWrap = form.parent();

		var $inputs = $(':text, input[type="email"], input[type="password"], textarea, select', form);

		var inputsLength = $inputs.length;
		var inputsHasValueLength = $inputs.filter(function () {
			return $(this).val().length;
		}).length;

		$thisFormWrap.toggleClass('error-form', inputsLength !== inputsHasValueLength);
		$thisFormWrap.toggleClass('success-form', inputsLength === inputsHasValueLength);

		$.each($inputs, function () {
			var $thisInput = $(this);
			var thisInputVal = $thisInput.val();
			var $thisInputWrap = $thisInput.closest('.input-wrap');

			$thisInput.toggleClass('error', !thisInputVal.length);
			$thisInput.toggleClass('success', !!thisInputVal.length);

			$thisInputWrap.toggleClass('error', !thisInputVal.length);
			$thisInputWrap.toggleClass('success', !!thisInputVal.length);
		});
	}
}

/**
 * =========== !ready document, load/resize window ===========
 */

$(window).on('load', function () {
	addClassesOnScrollPage();
	stickyLayout();
	scrollToHashTag();
	wrapTable();
});

$(window).on('debouncedresize', function () {
	$(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {
	switchCecutientVersion();
	checkCecutientVersionCookie();
	switchTheme();
	checkThemeCookie();
	placeholderInit();
	printShow();
	inputToggleFocusClass();
	inputHasValueClass();
	// inputFilledClass();
	// if (!Modernizr.touchevents) {
	// 	customSelect($('select.cselect'));
	// }
	if (!ie9) {
		customSelect($('select.cselect'));
	}
	hoverClassInit();
	toggleSiblingClasses();
	fileInput();
	toggleDrop();
	toggleSearchForm();
	slidersInit();
	simpleAccordion();
	initMultiAccordion();
	mainMenuSwitcher();
	equalHeight();
	popupsInit();
	objectFitImages(); // object-fit-images initial
	$('.fame img').addClass('visible');
	// initWow();
	lightGalleryInit();
	filterStructure();

	formSuccessExample();
	footerBottom();

	contactsMap();
});