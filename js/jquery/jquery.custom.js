/*---------- Abdo Hamoud FrameWork ---------*/
// window load events - > show Wrapper after load and hide wrapperLoading
// chose theme color
$.fn.themeSetting = function () {
    $(this).show().each(function () {
        var urlParams;
        var theme;
        theme = $(this);
        (window.onpopstate = function () {
            var match,
                    pl = /\+/g, // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function (s) {
                        return decodeURIComponent(s.replace(pl, " "));
                    },
                    query = window.location.search.substring(1);

            urlParams = {};
            while (match = search.exec(query))
                urlParams[decode(match[1])] = decode(match[2]);
        })();
        if (urlParams) {
            $(this).find("a[data-color='" + urlParams['color'] + "']").parent().addClass('active');
        }
        $(this).find('button').on('click', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open').parent().animate({left: "-167px"}, 500);
            } else {
                $(this).addClass('open').parent().animate({left: "0px"}, 500);
            }
        });
        $(this).find('ul.colors li a').each(function () {
            var color = $(this);
            $(this).css({"background": '#' + color.attr('data-color')});
        }).on('click', function () {
            var color = $(this);
            if (color.attr('data-color-name') !== 'red') {
                $('.color-style').remove();
                $("link.blog-style").after('<link rel="stylesheet" class="color-style" media="screen" href="' + theme.attr('data-path') + 'colors-style/' + color.attr('data-color-name') + '.css" type="text/css">');
            } else {
                $('.color-style').remove();
            }
            $('.theme-setting .setting-content ul.colors li').removeClass('active');
            $(this).parent().addClass('active');
        });
        $(this).find('ul.types li a').on('click', function () {
            var type = $(this).attr('data-type');
            if (type == 'wide') {
                $('body').removeClass('boxed');
                $('#Wrapper').removeClass('boxed');
                $('.AH_Nav').removeClass('boxed');
            } else if (type == 'boxed') {
                $('body').addClass('boxed');
                $('#Wrapper').addClass('boxed');
                $('.AH_Nav').addClass('boxed');
            } else if (type == 'full-header') {
                var height = window.innerHeight;
                var marginTop = height / 2;
                $('#Header').addClass('full-height');
                $('#Header.full-height').css({"height": height + "px"});
                $('#Header.full-height .container').css({"margin-top": marginTop - $('#Header .container').height() / 2 + "px"});
            } else if (type == 'min-header') {
                $('#Header').removeClass('full-height');
                $('#Header').css({"height": "auto"});
                $('#Header .container').css({"margin-top": "0px"});
            } else {
                $('#Header').removeClass('full-height');
                $('body').removeClass('boxed');
                $('#Wrapper').removeClass('boxed');
                $('.AH_Nav').removeClass('boxed');
            }
            $('.theme-setting .setting-content ul.types li').removeClass('active');
            $(this).parent().addClass('active');
        });
    });
};
function animated(elm, aimateVal) {
    $(elm).addClass("hidden_scroll").viewportChecker({
        classToAdd: 'visible_scroll animated ' + aimateVal, // Class to add to the elements when they are visible
        offset: 100
    });
}
$(window).load(function () {
    $('div.wrapperLoading').delay().fadeOut(300);
    $('div.wrapperLoading').fadeOut(function () {
        $('#Wrapper').css({"visibility": "visible"}).animate({opacity: "1"}, 500);
        animated('#About .flickrSlider, .fellowUs .container', 'zoomIn');
        animated('#Header .container, #Skills, #Portfolio .container, #Activity h2, #Activity .row, #Clients .container, #ContactUS h2, #ContactUS .row', 'fadeInDown');
        animated('.AH_Nav #navbar-collapse, #About .profileBlock', 'fadeInLeft');
        animated('.AH_Nav .scrollTop, #About .aboutMe', 'fadeInRight');
    });
    $(this).scroll();
    // check if window has hash target
    if (this.location.hash) {
        var target = $(this.location.hash);
        $('html,body').animate({
            scrollTop: target.offset().top - 60
        }, 1000);
        this.location.hash = '';
        return false;
    }
});
// document ready events
$(document).ready(function () {
    var page_type = $('body').attr('data-page');
    var height = window.innerHeight;
    var width = $(this).width();
    var marginTop = height / 2;
    // Header : height 100%
    if (width >= 1170) {
        if (page_type === 'home') {
            $('#Header.full-height').css({"height": height + "px"});
            $('#Header.full-height .container').css({"margin-top": marginTop - $('#Header .container').height() / 2 + "px"});
        }
    }
    // heder_overlay : height 100%
    $('.section_overlay').each(function () {
        var height = $(this).parent().height();
        $(this).css({"height": height + "px"});
    });
    // .wrapperLoading alighn center
    $('.wrapperLoading').each(function () {
        var width = $(document).width();
        $(this).css({"left": width / 2 - 50 + "px"});
    });
    // chose colors
    $('.choseColors a.chose').on('click', function () {
        if ($(this).hasClass('closed')) {
            $(this).parent().animate({width: "400px"}, 250).find('li a').delay(200).animate({opacity: "1"}, 300);
            $(this).removeClass('closed');
        } else {
            $(this).parent().animate({width: "45px"}, 250).find('li a').css({"opacity": "0"});
            $(this).addClass('closed');
        }
    });
    $('.choseColors li a').on('click', function () {
        var color = $(this).attr('data-style');
        if (color !== 'red') {
            $('.color-style').remove();
            $("link[href='css/blog.css']").after('<link rel="stylesheet" class="color-style" media="screen" href="colors-style/' + color + '.css" type="text/css">');
        } else {
            $('.color-style').remove();
        }
        $('.choseColors li').removeClass('active');
        $(this).parent().addClass('active');
        return false;
    });
    // scroll top
    $.fn.scrollToTop = function () {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() !== "0") {
            $(this).fadeIn("slow");
        }
        var scrollDiv = $(this);
        $(window).scroll(function () {
            if ($(window).scrollTop() === "0") {
                $(scrollDiv).fadeOut("fast");
            } else {
                $(scrollDiv).fadeIn(800);
            }
        });
        $(this).on('click', function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        });
    };
    $(".scrollTop").scrollToTop();
    // flickr slider
    $(".flickrSlider .Slider").owlCarousel({
        autoPlay: true,
        stopOnHover: true,
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
    // portfolio slider
    $("#Portfolio .Slider").owlCarousel({
        items: 4, //10 items above 1000px browser width
        itemsDesktop: [1000, 4], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 3], // betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0
        itemsMobile: true // itemsMobile disabled - inherit from itemsTablet option
    });
    $("#Portfolio h2 .prev").on('click', function () {
        $("#Portfolio .Slider").trigger('owl.next');
        return false;
    });
    $("#Portfolio h2 .next").on('click', function () {
        $("#Portfolio .Slider").trigger('owl.prev');
        return false;
    });
    // portfolio colorbox
    $('#Portfolio .Slider .work a,.widgetSlider .owl-carousel a,.portfolioPage .portfolio-content .work a').colorbox({rel: 'colorbox', slideshow: false});
    // portfolio page
    if ($.isFunction($.fn.mixItUp)) {
        $('.portfolioPage .portfolio-content').mixItUp({
            animation: {
                enable: true,
                effects: 'fade scale'
            }
        });
    }
    // clients slider
    $("#Clients .Slider").owlCarousel({
        items: 5, //10 items above 1000px browser width
        itemsDesktop: [1000, 5], //5 items between 1000px and 901px
        itemsDesktopSmall: [900, 3], // betweem 900px and 601px
        itemsTablet: [600, 2], //2 items between 600 and 0
        itemsMobile: true // itemsMobile disabled - inherit from itemsTablet option
    });
    // slideshow post
    $("#Blog .ah_post .post_slideshow,#Blog .singleBlog .post_slideshow").owlCarousel({
        autoPlay: false,
        stopOnHover: true,
        lazyEffect: 'fade',
        transitionStyle: 'fadeUp',
        navigation: false, // Show next and prev buttons
        slideSpeed: 1000,
        paginationSpeed: 1000,
        singleItem: true,
        pagination: true,
        responsive: true
    });
    // widgetSlider portfolio
    $("#Blog .sidebar .widgetSlider .owl-carousel").owlCarousel({
        autoPlay: false,
        stopOnHover: true,
        lazyEffect: 'fade',
        transitionStyle: 'fadeUp',
        navigation: false, // Show next and prev buttons
        slideSpeed: 1000,
        paginationSpeed: 1000,
        singleItem: true,
        pagination: true,
        responsive: true
    });
    // skill range
    $("#Skills .skill input.skillRang").knob({'stopper': true});
    // fixed nav when scroll
    var top = $('.AH_Nav').offset().top;
    $(window).scroll(function () {
        var y = $(this).scrollTop();
        var leftVal = $(this).width() - $('.AH_Nav').width();
        if (y >= top) {
            $('.AH_Nav').addClass('fixed_scroll');
            $('.AH_Nav.boxed').css({"left": leftVal / 2 + "px"});
            $('#About,#Blog').css({"margin-top": "128px"});
        } else {
            $('.AH_Nav').removeClass('fixed_scroll');
            $('.AH_Nav.boxed').css({"left": "0px"});
            $('#About,#Blog').css({"margin-top": "60px"});
        }
    });
    // smooth scrolling
    $('.AH_Nav ul li a[href*=#]:not([href=#]),#Header a.moreData').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 60
                }, 1000);
                return false;
            }
        }
    });
    // show wrapperLoading
    $('div.wrapperLoading').show();
    // theme setting
    $('.theme-setting').themeSetting();
    // ajax contact form
    $('#ContactUS form').each(function () {
        var form = $(this);
        form.find('input').val('').removeAttr('required');
        form.find('textarea').val('').removeAttr('required');
        form.submit(function () {
            form.find('button.sendContact').after('<span class="contact_load"><span>');
            $.post('contact.php', $(this).serialize(), function (data) {
                form.find('div.error_message').remove();
                form.find('span.contact_load').remove();
                form.find('button.sendContact').after(data);
            });
            return false;
        });
    });
    // shop slider
    $(".shop-slider .owl-carousel").owlCarousel({
        autoPlay: true,
        stopOnHover: true,
        lazyEffect: 'fade',
        transitionStyle: 'fadeUp',
        navigation: false, // Show next and prev buttons
        slideSpeed: 1000,
        paginationSpeed: 1000,
        singleItem: true,
        pagination: true,
        responsive: true
    });
    $(".shop-slider .btn-prev").on('click', function () {
        $(".shop-slider .owl-carousel").trigger('owl.next');
        return false;
    });
    $(".shop-slider .btn-next").on('click', function () {
        $(".shop-slider .owl-carousel").trigger('owl.prev');
        return false;
    });
});
/*---------- Abdo Hamoud FrameWork ---------*/