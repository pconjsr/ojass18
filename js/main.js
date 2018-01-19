/* jshint browser: true, devel: true, jquery: true */
/* globals skrollr, mobile */

;(function($, window, document, undefined) {
  'use strict';


  // smooth scrolling
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top -40
      }, 4000);
      return false;
    }
    }
  });



  // meetup API
  $.get('http://api.meetup.com/ew/rsvps.json?key=702f3b7e646565101177301d6e1b21&sign=true&event_id=901042&page=112',
        function(data){
          var html='',
            dataLength = data.results.length;
          for (var i=0;i<dataLength;i++) {
            if(data.results[i].member_photo){
              html += '<div class="littleperson"><div class="imgcontainer"><img data-src="'+data.results[i].member_photo.thumb_link+'" alt="Meetup Member" /></div></div>';
            }
          }
          $('.meetup').append(html);
          $('.imgcontainer img').waypoint(function() {
            $(this).attr('src', $(this).attr('data-src'));
          }, {offset:'100%', triggerOnce:true});
          $.waypoints('refresh');
        },
        'jsonp'
       );

       if ( !mobile ) {
         skrollr.init({smoothScrolling: true, forceHeight: false });
       }

       // screen hovers
       $('.satellitecontainer').hover(
         function(){
           $(this).children('.screen1').css({opacity:0});
           $(this).children('.screen2').css({opacity:1});
         }, function(){
           $(this).children('.screen1').css({opacity:1});
           $(this).children('.screen2').css({opacity:0});
         });

         // back to top link
         var scrollTimer = null;
         $(window).scroll(function(){
           if (scrollTimer) {
             clearTimeout(scrollTimer);   // clear any previous pending timer
           }
           scrollTimer = setTimeout(handleScroll, 500); // set new timer
         });

         function handleScroll(){
           var limit = 1000,
             scrollTop = $(window).scrollTop(),
             $backBtn = $('.backtotop');

           if(scrollTop > limit) {
             $backBtn.fadeIn();
           } else {
             $backBtn.fadeOut();
           }
         }

})(jQuery, window, document);

