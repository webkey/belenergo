/**
 * !resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
	var currentWidth = $('body').outerWidth();
	resizeByWidth = prevWidth != currentWidth;
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
			if ($currentField.val() === '') {
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
			container: ('.nav'),
			drop: '.js-nav-drop'
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

	$container.on('mouseenter', elem, function () {
		var $currentElem = $(this);
		var $parentCurrentElem = $currentElem.parent();
		$currentElem.prev().addClass(prevClass);
		$currentElem.next().addClass(nextClass);
		$parentCurrentElem.prev().addClass(prevClass);
		$parentCurrentElem.next().addClass(nextClass);
	}).on('mouseleave', elem, function () {
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

			$currentSlider.slick({
				fade: false,
				speed: 300,
				slidesToShow: 1,
				slidesToScroll: 1,
				// initialSlide: 2,
				// lazyLoad: 'ondemand',
				// autoplay: true,
				// autoplaySpeed: 8000,
				infinite: true,
				dots: true,
				prevArrow: $arrPrev,
				nextArrow: $arrNext
				// arrows: true
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
						breakpoint: 1600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		});
	}

	/*gov slider*/
	var $govSlider = $('.slider-gov-js');

	if ($govSlider.length) {

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
					}
				]
			});

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
			$('.js-choice-wrap').trigger('closeChoiceDrop'); // close lang drop
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
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
	var $popular = $('.popular-list');

	if($popular) {
		$popular.children().matchHeight({
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

	if ($aside.length) {

		$aside.stick_in_parent({
			parent: '.layout',
			offset_top: $('.header').outerHeight()
		});
	}
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
 * !Always place the footer at the bottom of the page
 * */
function footerBottom() {
	var $footer = $('.footer__holder');

	if ($footer.length) {
		$('.main__holder').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page

		setTimeout(function () {
			layoutFooter();
		}, 50);

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

			if ($thisForm.closest('.input-wrap').hasClass('success-form')) return;

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
		var $thisFormWrap = form.closest('.input-wrap');

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
});

$(window).on('debouncedresize', function () {
	$(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {
	placeholderInit();
	printShow();
	switchCecutientVersion();
	checkCecutientVersionCookie();
	inputToggleFocusClass();
	inputHasValueClass();
	// inputFilledClass();
	// if (!Modernizr.touchevents) {
	// 	customSelect($('select.cselect'));
	// }
	customSelect($('select.cselect'));
	hoverClassInit();
	toggleSiblingClasses();
	fileInput();
	toggleDrop();
	toggleSearchForm();
	slidersInit();
	simpleAccordion();
	equalHeight();

	footerBottom();
	formSuccessExample();

	contactsMap();
});