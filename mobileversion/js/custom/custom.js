(function($) {

	var o, Site = {

		settings: {
			win: 				$(window),
			doc: 				$(document),
			body: 				$('html, body')
			// header: 			$('.header'),
			// card: 				$('.card')

			// Navigation
			// navicon: 			$('#navicon'),
      //
      //
			// overlay: 			$('.overlay'),
			// overBox: 			$('.overlay .box'),
			// x: 					$('.x'),
			// a_whatwedo:			$('.a_whatwedo'),
			// a_aboutus:			$('.a_aboutus'),
      //
      //
			// scrollup: 			$('#scrollup')
		},

		init: function() {
			// Set Variables
			o = this.settings;
			o.lst = 0;
			// o.toggleForm = false;
			// o.overlay.css('z-index', -100 );
			this.construct();
			this.bindUI();

      // var s = skrollr.init({
      //
      //   beforerender: function(data) {
      //     console.log(data);
      //     //   if(data.curTop > 3000){
      //     //       // $('.cookie.whole').addClass('open');
      //     //       // $('.cookie.broken').addClass('open');
      //     //       // $('.logo-middle').addClass('open');
      //     //   }
      //     //
      //     //   if(data.curTop > 2500) {
      //     //       //Do stuff when moving up
      //     //
      //     //       $('#welcome-note .sub-label').addClass("active");
      //     //
      //     //   }
      //     //
      //     //   if(data.curTop > 15150){
      //     //       // $('.count').each(function () {
      //     //       // 	$(this).prop('Counter',0).animate({
      //     //       // 			Counter: $(this).text()
      //     //       // 	}, {
      //     //       // 			duration: 3000,
      //     //       // 			easing: 'swing',
      //     //       // 			step: function (now) {
      //     //       // 					//$(this).text(Math.ceil(now));
      //     //       // 				 // $(this).text(Math.ceil(now));
      //     //       // 				 $(this).text(this.Counter.toFixed(2));
      //     //       // 			 // $this.text(this.Counter.toFixed(now));
      //     //       // 			}
      //     //       // 	});
      //     //       // });
      //     //
      //     //   }
			//
			//
      //   }
      // });
		},

		construct: function  () {



		},

		// headerAnim: function (win) {
    //
		//  o.st = $(win).scrollTop();
    //
		// 	if(o.st > 400) {
		// 		o.scrollup.addClass('on');
		// 	} else {
		// 		o.scrollup.removeClass('on');
		// 	}
    //
 	// 		if (o.st > 50){
		// 		o.header.addClass('header-scroll');
    //
		// 		o.header.removeClass('header-top');
    //
		// 		  // if (o.st > o.lst && o.st > 60){
		// 		       //o.header.addClass('off');
		// 			  // o.header.addClass('header-scroll');
		// 		  // }
    //
		// 	} else {
		// 		o.header.addClass('header-top');
		// 		//o.header.removeClass('off');
		// 		o.header.removeClass('header-scroll');
    //
		// 	}
    //
		//    o.lst = o.st;
    //
		// },

		// toggleOverlay: function (id) {
    //
		// 	$('#'+ id).addClass('on');
    //
		// 	o.toggleForm = !o.toggleForm;
    //
		// 	if(o.toggleForm) {o.overlay.css('z-index', 100 )}
    //
		// 	o.overlay.transition({
		// 		scale: o.toggleForm ? 1 : 1.2,
		// 		opacity: o.toggleForm ? 1 : 0
		// 	}, 400, 'easeOutQuint', function () {
		//    	   if(!o.toggleForm) {
		// 		o.overBox.removeClass('on');
		//    	   	$(this).css('z-index', -100 )}
		//    });
    //
		// },
		// ResettoggleOverlay: function(id)
		// {
		// 	o.toggleForm = false;
		// 	$('#'+ id).removeClass('on');
		// 	o.overBox.removeClass('on');
		// 	o.overlay.css('z-index', -100 );
		// 	o.overlay.transition({
		// 		scale: o.toggleForm ? 1 : 1.2,
		// 		opacity: o.toggleForm ? 1 : 0
		// 	}, 400, 'easeOutQuint');
    //
    //
		// },

		bindUI: function () {

			o.win.on('resize', function() {
				Site.construct();
				// Site.ResettoggleOverlay('sideNav');
			});

			// o.win.on('scroll', function() {
			// 	Site.headerAnim(this);
			// });
      //
			// o.x.on('click', function (e) {
			// 	e.preventDefault();
			// 	Site.toggleOverlay();
			// });
      //
			// o.a_whatwedo.on('click', function (e) {
      //
			// 	Site.toggleOverlay();
			// });
      //
			// o.a_aboutus.on('click', function (e) {
      //
			// 	Site.toggleOverlay();
			// });
      //
      //
      //
			// o.navicon.on('click', function (e) {
			// 	e.preventDefault();
			// 	Site.toggleOverlay('sideNav');
			// });
      //
			// o.scrollup.on('click', function (e) {
			// 	o.body.animate({
			// 		scrollTop: 0
			// 	}, 300);
			// });


		}

	};



	// Check Retina
	// $.fn.isRetinaScreen = function(){
  //
	// 	this.each(function () {
  //
	// 		var npath = $(this).attr('src').split('/'),
	// 			nsrc = $(this).attr('src').split('/').pop();
  //
	// 		npath.pop();
  //
	// 		nsrc = nsrc.split('.').shift();
	// 		nsrc += '2x.png';
	// 		fin = npath.join('/') + '/' + nsrc;
  //
	// 		$(this).attr('src', fin).addClass('retina');
  //
	// 	})
  //
	// 	return this;
  //
	// };



	$(function(){

		Site.init();


	});

}(jQuery));
