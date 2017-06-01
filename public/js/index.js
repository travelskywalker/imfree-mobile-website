// /**
//  * Created by jaysonojeda on 2/1/17.
//  */
//
// function Countdown() {
//
//     var self = this;
//
//     self.progressCircle = new ProgressCircle();
//
//     self.circles = {
//         days: {},
//         hours: {},
//         minutes: {},
//         seconds: {}
//     };
//
//     self.init = function () {
//
//         self.initProgressCircles();
//         self.initTimer();
//     };
//
//     self.initProgressCircles = function () {
//
//         self.circles.days = self.progressCircle.initProgressCircle("days");
//         self.circles.hours = self.progressCircle.initProgressCircle("hours");
//         self.circles.minutes = self.progressCircle.initProgressCircle("minutes");
//         self.circles.seconds = self.progressCircle.initProgressCircle("seconds");
//     };
//
//     self.initTimer = function () {
//
//         // now
//         window.setInterval(function () {
//
//             var startDate = moment();
//             var endDate = moment('2017-06-02 ', 'YYYY-MM-DD');
//
//             var daysDiff = endDate.diff(startDate, 'days');
//             var hoursDiff = endDate.diff(startDate, 'hours') % 24;
//             var minutesDiff = endDate.diff(startDate, 'minutes') % 60;
//             var secondsDiff = endDate.diff(startDate, 'seconds') % 60;
//
//             self.setCounter("daysCounter", daysDiff);
//             self.setCounter("hoursCounter", hoursDiff);
//             self.setCounter("minutesCounter", minutesDiff);
//             self.setCounter("secondsCounter", secondsDiff);
//
//             self.updateProgress('days', daysDiff, 60);
//             self.updateProgress('hours', hoursDiff, 24);
//             self.updateProgress('minutes', minutesDiff, 60);
//             self.updateProgress('seconds', secondsDiff, 60);
//
//         }, 1000);
//     }
//
//     self.setCounter = function (counterId, value) {
//
//         var counter = document.getElementById(counterId);
//
//         counter.innerHTML = value;
//     };
//
//     self.updateProgress = function (key, start, end) {
//
//         var percent = start / end;
//
//         this.progressCircle.initProgressCircle(key, percent);
//     }
// }
//
// var countdown = new Countdown();
//
// countdown.init();
/**
 * This demo was prepared for you by Petr Tichy - Ihatetomatoes.net
 * Want to see more similar demos and tutorials?
 * Help by spreading the word about Ihatetomatoes blog.
 * Facebook - https://www.facebook.com/ihatetomatoesblog
 * Twitter - https://twitter.com/ihatetomatoes
 * Google+ - https://plus.google.com/u/0/109859280204979591787/about
 * Article URL: http://ihatetomatoes.net/simple-parallax-scrolling-tutorial/
 */

(function($) {

    var o, Site = {

        settings: {
            win: 				$(window),
            doc: 				$(document),
            body: 				$('html, body'),
            Toplogo:               $('.logo-middle'),
            cookie:             $('.whole-cookie'),
            brokencookies:      $('.broken'),
            crumbs:             $('.crumbs'),
            topCircle:          $('.top-circles'),
            parallax:           $('.parallax'),
            // header: 			$('.header'),
            // card: 				$('.card'),
            //
            // // Navigation
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
            // this.construct();
            this.bindUI();
        },

        construct: function  () {

            // o.card.each(function(i) {
            //     $(this).delay(200*i).transition({'opacity': 1,'scale': 1, y: 0});
            // });

            o.card.each(function(i) {
                var d = Math.floor(i / 4);
                $(this).delay(200 * d).transition({'opacity': 1, y: 0});
            });

            //o.card.delay(200).transition({'opacity': 1,'scale': 1, y: 0});


        },

        headerAnim: function (win) {

            o.st = $(win).scrollTop();

            if(o.st > 400) {
               // o.scrollup.addClass('on');
            } else {
                //o.scrollup.removeClass('on');
            }

            if (o.st > 90){
               // o.header.addClass('header-scroll');

               // o.header.removeClass('header-top');

                // if (o.st > o.lst && o.st > 60){
                //o.header.addClass('off');
                // o.header.addClass('header-scroll');
                // }
                o.brokencookies.addClass('move');
                o.topCircle.addClass('move');
                o.crumbs.addClass('move');
                o.cookie.addClass('hide');
                o.Toplogo.removeClass('hide');
                o.parallax.css('position','absolute');

            } else {
               // o.header.addClass('header-top');
                //o.header.removeClass('off');
               // o.header.removeClass('header-scroll');
               //  o.brokencookies.addClass('move');
            }

            o.lst = o.st;

        },
        bindUI: function () {


            o.win.on('scroll', function() {
                Site.headerAnim(this);
            });




        }



    };




    $(function(){

        Site.init();


    });

}(jQuery));
