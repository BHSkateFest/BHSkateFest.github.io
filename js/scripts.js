$(document).ready(function () {

  'use strict'

  // WOW
  var wow = new WOW(
  {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       false,       // true
    live:         false        // true
  });
  wow.init();

  // Loading heavy images with placeholder first
  var placeholder = document.querySelector('.js-header-background');
  // 1: load small image and show it
  var img = new Image();
  img.src = placeholder.dataset.small;
  img.onload = function () {
    placeholder.style.backgroundImage = "url('" + placeholder.dataset.small + "')";
  };
  // 2: load large image
  var imgLarge = new Image();
  var newBackground = document.createElement("div");
  imgLarge.src = placeholder.dataset.large;
  imgLarge.onload = function (event) {
    placeholder.classList.add('page-header__background--is-loaded');
    newBackground.style.backgroundImage = "url('" + placeholder.dataset.large + "')";
    placeholder.appendChild(newBackground);
  };

  // lightGallery inicialization
  // if (document.getElementById('lightgallery')) {
  //    $("#lightgallery").lightGallery();
  // }

  // Main nav menu actions
  var toggleMenu = function() {
    $('.js-page-header').toggleClass("page-header--is-shown");
    $('.js-mobile-menu-btn .icon-bar').toggleClass("icon-bar--is-toggled");
    $('.js-page-header__brand').toggleClass("page-header__brand--is-hidden");
  }

  $(".js-mobile-menu-btn").on('click', function () {
    toggleMenu();
  });

  // Countdown timer
  var currTime = new Date();
  var currDate = currTime.getDate();
  var currMonth = currTime.getMonth() - 10;
  var currYear = currTime.getFullYear() + 1;
  var eventTime = currYear + "/" + currMonth + "/" + currDate;

  $('#countdown').countdown('2017/06/03', function(event) {
    $(this).html(event.strftime(''
      + '<span class="timer__item">%D<span class="timer__item-caption">dias</span></span>'
      + '<span class="timer__item">%H<span class="timer__item-caption">horas</span></span>'
      + '<span class="timer__item">%M<span class="timer__item-caption">min</span></span>'
      + '<span class="timer__item">%S<span class="timer__item-caption">seg</span></span>'));
  });

  // Video
  var toggleVideo = function(){

    var video = document.querySelector('#video');
    $('.js-video__play').toggleClass('video-block__play--is-playing');
    $('.js-video-block-poster').toggleClass('video-block__poster--is-hidden');

    video.addEventListener('ended', function(e){
      video.load();
      $('.js-video__play').removeClass('video-block__play--is-playing');
      $('.js-video-block-poster').removeClass('video-block__poster--is-hidden');
    });

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  $('.js-video__play').on('click', function(){
    toggleVideo();
  });

  //smooth scrolling
  $('a[href*="#"]:not([href="#"])').on('click', function (e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      toggleMobileMenu();
      if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var toggleMobileMenu = function () {
      if ($(window).width() < 768) {
          $('.menu-collapsed').toggleClass("menu-expanded");
      }
  };

  // Ticket card mouseover effect
  var screenWidth = window.screen.width / 2,
    screenHeight = window.screen.height / 2,
    elem = $('.js-ticket'),
    perspective = 'perspective(700px)';

  elem.on('mousemove', function (e) {
    var centroX   = e.clientX - screenWidth,
      centroY   = screenHeight - e.clientY,
      degX   = centroX * 0.02,
      degY   = centroY * 0.02;
    $(e.currentTarget).css({
      '-webkit-transform' : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      '-moz-transform'    : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      '-ms-transform'     : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      '-o-transform'      : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)',
      'transform'         : perspective + 'rotateY(' + degX + 'deg) rotateX(' + degY + 'deg)'
    });
  });

  // Tabs in conference
  // Not proper event delegation, but this method from official Bootstrap docs
  $('.js-tabs-block a').on('click', function(e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // Ajax for register form
  $('#register-form').submit(function () {
      var name = $('input[name="username"]').val();
      var email = $('input[name="email"]').val();
      var message = $('input[name="phone"]').val();

      var formData = {
          name: name,
          email: email,
          message: message
      };

      $.ajax({
        type: "POST",
        url: '/comment.php',
        data: formData,
        success: function() {
          $('#form-submit-errors').text("Sucesso!");
        },
        error: function() {
          $('#form-submit-errors').text("Something went wrong...");
        }
      });

      return false;
  });
});
