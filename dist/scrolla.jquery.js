// Сделано на основе пена http://codepen.io/SitePoint/pen/MwEaQM

(function($) {

	var _elements,
		_options;

	var methods = {
		init: function(elements, options) {

			_elements = elements;
			_options = options;

			methods.bind();
		},
		bind: function() {
			$(window).scroll(function() {
				methods.animate(_elements, _options);
			});
			$(window).trigger('scroll');
		},
		animate: function(elements, options) {

			var viewHeight = $(window).height(),
				viewTop = $(window).scrollTop(),
				viewBottom = (viewTop + viewHeight);

			$.each(elements, function() {
				var elementAnimation = $(this).data('animate'),
					elementOffset = $(this).data('offset'),
					elementDuration = $(this).data('duration'),
					elementDelay = $(this).data('delay'),
					elementIteration = $(this).data('iteration'),
					elementHeight = $(this).outerHeight(),
					elementTop = $(this).offset().top,
					elementBottom = (elementTop + elementHeight);

				if (elementOffset) {
					elementTop = elementTop + elementOffset;
					elementBottom = elementBottom - elementOffset;
				}

				$(this).css({'-webkit-animation-duration': elementDuration, 'animation-duration': elementDuration});
				$(this).css({'-webkit-animation-delay': elementDelay, 'animation-delay': elementDelay});
				$(this).css({'-webkit-animation-iteration-count': elementIteration, 'animation-iteration-count': elementIteration});

				if ((elementBottom >= viewTop) && (elementTop <= viewBottom)) {
					$(this).css('visibility', 'visible');
					$(this).addClass(elementAnimation);
					$(this).addClass('animated');
				}
				else {
					if (options.once === false) {
						$(this).css('visibility', 'hidden');
						$(this).removeClass(elementAnimation);
						$(this).removeClass('animated');
					}
				}
			});
		}
	};

	jQuery.fn.scrolla = function(options) {
		options = $.extend({
			mobile: false,
			once: false
		}, options);

		if (options.mobile === false) {
			if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				return false;
			}
		}

		methods.init(this, options);

	};
})(jQuery);
