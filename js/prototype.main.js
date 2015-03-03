// page init
$(document).observe("dom:loaded", function() {
	initSlideShow();
});

// slideshow function
function initSlideShow() {
	var _duration = 0.6;
	var _switchTime = 3000;
	var _autoRotation = true;
	var _activeClass = 'active';

	$$('ul.slideset').each(function(obj, ind){
		// gallery options
		var _holder = obj;
		var _slides = _holder.select('li');
		var _slidesCount = _slides.length;
		var _currentIndex = 0;
		var _oldIndex = 0;
		var _timer;

		// gallery control
		_slides.each(function(obj, ind){
			if(ind!=_currentIndex) {
				obj.setStyle({
					'display':'none',
					'opacity':0
				});
			} else {
				obj.setStyle({
					'display':'block',
					'opacity':1
				});
			}
		});

		// next slide
		function nextSlide() {
			_oldIndex = _currentIndex;
			if(_currentIndex<_slidesCount-1) _currentIndex++;
			else _currentIndex=0;
			switchSlide();
		}

		// gallery animation
		function switchSlide() {
			var _prevSlide = _slides[_oldIndex];
			var _nextSlide = _slides[_currentIndex];

			// fadeOut slide
			_prevSlide.removeClassName(_activeClass);
			new Effect.Morph(_prevSlide, {
				style: {'opacity': '0'},
				afterFinish: function() {
					_prevSlide.setStyle({'display':'none'});
				},
				duration: _duration
			});

			// fadeIn slide
			_nextSlide.setStyle({'display':'block'})
			_nextSlide.addClassName(_activeClass);
			new Effect.Morph(_nextSlide, {
				style: {'opacity': '1'},
				duration: _duration
			});
			autoSlide();
		}

		// autorotation
		function autoSlide() {
			if(!_autoRotation) return;
			if (_timer) clearTimeout(_timer);
			_timer = setTimeout(nextSlide,_switchTime);
		}
		autoSlide();
	});
}