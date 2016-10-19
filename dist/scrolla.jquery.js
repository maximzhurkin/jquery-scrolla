// Сделано на основе пена http://codepen.io/SitePoint/pen/MwEaQM

(function($){
	jQuery.fn.scrolla = function(options){
		options = $.extend({
			// Options
		}, options);
		
		var elements = this;

		function animate() {
			var viewHeight = $(window).height();
			var viewTop = $(window).scrollTop();
			var viewBottom = (viewTop + viewHeight);

			$.each(elements, function() {
				var elementAnimation = $(this).data('animate');
				var elementDuration = $(this).data('duration');
				var elementDelay = $(this).data('delay');
				var elementHeight = $(this).outerHeight();
				var elementTop = $(this).offset().top;
				var elementBottom = (elementTop + elementHeight);

				$(this).css({'-webkit-animation-duration': elementDuration, 'animation-duration': elementDuration});
				$(this).css({'-webkit-animation-delay': elementDelay, 'animation-delay': elementDelay});
		 
				if ((elementBottom >= viewTop) && (elementTop <= viewBottom)) {
					$(this).css('visibility', 'visible');
					$(this).addClass(elementAnimation);
					$(this).addClass('animated');
				}
				else {
					$(this).css('visibility', 'hidden');
					$(this).removeClass(elementAnimation);
					$(this).removeClass('animated');
				}
			});
		}

		$(window).on('scroll', animate);
		$(window).trigger('scroll');

	};
})(jQuery);