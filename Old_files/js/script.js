"use strict";

var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.861103, lng: 151.2021972},
    zoom: 13,
    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
    });
}

"use strict";

var $ = jQuery.noConflict();

$(document).on("ready", function(){

    //Main menu: button for show/hide
    $("#crowdfund-menu-toggle").on("click", function(){
        $(this).toggleClass("crowdfund-active");

        if($(this).hasClass("crowdfund-active")){
            $(".crowdfund-menu-container").removeClass("crowdfund-active").addClass("crowdfund-active");
        } else {
            $(".crowdfund-menu-container").removeClass("crowdfund-active");
        }

        return false;
    });


    //Main menu: find all submenus
    var scMenuItems = $(".crowdfund-menu-item", "#crowdfund-menu-container");
    for (var i = 0; i < scMenuItems.length; ++i){
        var scMenuItem = $(scMenuItems[i]);

        if (scMenuItem.find(".crowdfund-menu-sub").length){
            scMenuItem.addClass("menu-item-has-children");
        }
    }


    //Main menu: logic for show/hide submenus
    var scSubmenuItemLink = $(".menu-item-has-children > a");
    scSubmenuItemLink.on("click", function(){
        var currentItem = $(this).parent();
        var currentItemActive = false;

        if (currentItem.hasClass("crowdfund-active")) currentItemActive = true;

        if (!currentItem.parents(".crowdfund-menu-sub").length) $(".crowdfund-menu-list > .crowdfund-active").removeClass("crowdfund-active");

        if (currentItemActive) currentItem.removeClass("crowdfund-active");
        else currentItem.addClass("crowdfund-active");

        return false;
    });


    //Logic of mail form
    $("#contactform").submit(function() {
        var form = $(this);

        var data = form.serialize();
        $.ajax({
            type: "POST",
            url: "php/mailer.php",
            data: data,
            beforeSend: function(data) {
                form.find('[type="submit"]').attr('disabled', 'disabled');
            },
            success: function() {
                if (data['error']) {
                    form.append("<div class='crowdfund-msg crowdfund-msg-warning'><p>Error: email was not sent.</p><div class='crowdfund-msg-close'><i class='fa fa-close'></i></div></div>");
                } else {
                    form.append("<div class='crowdfund-msg crowdfund-msg-info'><p>Your email was sent successfully.</p><div class='crowdfund-msg-close'><i class='fa fa-close'></i></div></div>");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                form.append("<div class='crowdfund-msg crowdfund-msg-warning'><p>" + xhr.status + " " + xhr.statusText + " " + xhr.responseText + "</p><div class='crowdfund-msg-close'><i class='fa fa-close'></i></div></div>");
            },
            complete: function(data) {
                form.find('[type="submit"]').prop('disabled', false);
            }
        });
        return false;
    });
	
	    //Logic of order form
    $("#orderform").submit(function() {
        var form = $(this);

        var data = form.serialize();
        $.ajax({
            type: "POST",
            url: "php/order.php",
            data: data,
            beforeSend: function(data) {
                form.find('[type="submit"]').attr('disabled', 'disabled');
            },
            success: function() {
                if (data['error']) {
                    form.append("<div class='crowdfund-msg crowdfund-msg-warning'><p>Error: order was not sent.</p><div class='crowdfund-msg-close'><i class='fa fa-close'></i></div></div>");
                } else {
                    form.append("<div class='crowdfund-msg crowdfund-msg-info'><p>Your order was sent successfully.</p><div class='crowdfund-msg-close'><i class='fa fa-close'></i></div></div>");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                form.append("<div class='crowdfund-msg crowdfund-msg-warning'><p>" + xhr.status + " " + xhr.statusText + " " + xhr.responseText + "</p><div class='crowdfund-msg-close'><i class='fa fa-close'></i></div></div>");
            },
            complete: function(data) {
                form.find('[type="submit"]').prop('disabled', false);
            }
        });
        return false;
    });
	
});


$(window).on("load", function(){

    //Video: set correct sizes
    $("#crowdfund-section-video").fitVids();

    //Initialize default slider
    var scCarouselFlyer = $('#crowdfund-carousel-flyer');
    scCarouselFlyer.owlCarousel({
        //Just comment the animateOut and animateIn
        //for using default left-right animations
        //animateOut: 'rotateOutUpRight',
        //animateIn: 'rotateInUpRight',
        items: 1,
        margin: 54,
        lazyLoad: true,
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        touchDrag: true,
        nav: false,
        smartSpeed: 450,
        responsiveClass:true,
        responsive:{
            0:{
                autoplay: false,
                stagePadding: 0,
                animateOut: false,
                margin: 9,
                dots: false,
            },
            600:{
                animateOut: 'fadeOut',
                stagePadding: 0,
                margin: 18,
                dots: false
            },
            1025:{
                stagePadding: 0
            }
        }
    });

    scCarouselFlyer.on('translate.owl.carousel', function(event) {
      $(this).addClass("crowdfund-slider-translate");
    })

    scCarouselFlyer.on('translated.owl.carousel', function(event) {
      $(this).removeClass("crowdfund-slider-translate");
    })


    //Background carousel
    $('#crowdfund-carousel-bg').owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        dots: false,
        autoplay: true,
        autoplayTimeout: 10000,
        loop: true,
        responsive:{
            0:{
                autoplay: false,
                loop: false,
                lazyLoad: true,
                animateOut: false
            },
            420:{
                autoplay: true
            }
        }
    });


    //Team carousel
    $('#crowdfund-carousel-team').owlCarousel({
        items: 3,
        margin: 9,
        dots: false,
        smartSpeed: 450,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                stagePadding: 0
            },
            600:{
                items:2,
                stagePadding: 30
            },
            1025:{
                items:3
            }
        }
    });


    //Price carousel
    $('#crowdfund-carousel-price').owlCarousel({
        items: 3,
        margin: 9,
        dots: false,
        smartSpeed: 450,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                stagePadding: 0
            },
            600:{
                items:2,
                stagePadding: 30
            },
            1025:{
                items:3
            }
        }
    });


    //Features carousel
    $('#crowdfund-carousel-features').owlCarousel({
        items: 3,
        margin: 9,
        dots: false,
        smartSpeed: 450,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            920:{
                items:3
            }
        }
    });


    //Partners carousel
    $('#crowdfund-carousel-partners').owlCarousel({
        items: 5,
        dots: false,
        smartSpeed: 450,
        responsive:{
            0:{
                items:2,
                stagePadding: 0
            },
            600:{
                items:3,
                stagePadding: 30
            },
            1024:{
                items:5,
                stagePadding: 30
            }
        }
    });


    //Testimonials carousel
    $('#crowdfund-carousel-testimonials').owlCarousel({
        items: 1,
        dots: true,
        margin: 20,
        smartSpeed: 450
    });


    //Slider: show info by click on mobile
    $(".crowdfund-slide", "#crowdfund-carousel-flyer").on("click", function(){
        $(this).toggleClass("crowdfund-active-mobile");
    });


    //Portfolio: show all items by default
    var scPortfolioShowallItem = $('.crowdfund-portfolio-showall').find('.crowdfund-portfolio-item');
    for (var i = 0; i < scPortfolioShowallItem.length; ++i){
        $(scPortfolioShowallItem[i]).addClass('crowdfund-active');
    }


    //Initialize Portfolio
    $('.crowdfund-portfolio-items').masonry({
        itemSelector: '.crowdfund-portfolio-item',
        columnWidth: 1,
        transitionDuration: 0,
        percentPosition: true,
        isResizable: true
    });


    //Portfolio filter
    var scPortfolioFilterLinkItem = $(".crowdfund-portfolio-filter-link");
    scPortfolioFilterLinkItem.on("click", function(){
        if ($(this).hasClass('crowdfund-portfolio-filter-reset')){
            var scPortfolioItem = $(this).closest('.crowdfund-portfolio').find('.crowdfund-portfolio-item')

            for (var i = 0; i < scPortfolioItem.length; ++i){
                $(scPortfolioItem[i]).removeClass('crowdfund-active').addClass('crowdfund-active');
            }
        } else {
            var filterValue = $(this).text().toLowerCase().replace(' ','-');
            var scPortfolioItem = $(this).closest('.crowdfund-portfolio').find('.crowdfund-portfolio-item');

            for (var i = 0; i < scPortfolioItem.length; ++i){
                $(scPortfolioItem[i]).removeClass('crowdfund-active');
                if ($(scPortfolioItem[i]).hasClass(filterValue)) {
                    $(scPortfolioItem[i]).addClass('crowdfund-active');
                }
            }
        }

        var scPortfolioFilterLink = $(this).closest('.crowdfund-portfolio').find('.crowdfund-portfolio-filter-link');
        for (var i = 0; i < scPortfolioFilterLink.length; ++i){
            $(scPortfolioFilterLink[i]).removeClass('crowdfund-active');
        }

        $(this).addClass('crowdfund-active');
        $(this).closest('.crowdfund-portfolio').find('.crowdfund-portfolio-items').masonry();

        return false;
    });


    // Connect WOW.js animations
    var wow = new WOW({
        boxClass:     'wow',
        animateClass: 'animated',
        offset:       0,
        mobile:       false,
        live:         true,
        callback:     function(box) {},
        scrollContainer: null
    });
    wow.init();


    //Initialize countimator animation
    $(".crowdfund-animated-counter").countimator();


    //ScrollTo animation
    $('a.scrollto').on('click', function (event) {
        event.preventDefault();
        scScrollTo(this.hash);
    });

    if (window.location.hash) {
        scScrollTo(window.location.hash);
    }


    //Closing messages
    $(document).on("click", ".crowdfund-msg-close", function(){
        $(this).closest('.crowdfund-msg').fadeOut(500);
    });


    //Tab logic
    var scTab = $(".crowdfund-tab");
    scTab.find(".crowdfund-tab-link, .crowdfund-tab-content").removeClass("crowdfund-active");
    scTab.find(".crowdfund-tab-link:first, .crowdfund-tab-content:first").addClass("crowdfund-active");

    scTab.find(".crowdfund-tab-link").on("click", function(){
        $(this).closest(".crowdfund-tab").find(".crowdfund-tab-link, .crowdfund-tab-content").removeClass("crowdfund-active");
        $(this).addClass("crowdfund-active");

        var index = $(this).index();
        $(this).closest(".crowdfund-tab").find(".crowdfund-tab-content:eq("+index+")").addClass("crowdfund-active");
        return false;
    });


    //Accordion logic
    var scAccordion = $(".crowdfund-accordion");
    //scAccordion.find(".crowdfund-accordion-link, .crowdfund-accordion-container").removeClass("crowdfund-active");

    scAccordion.find(".crowdfund-accordion-link").on("click", function(){
        $(this).closest(".crowdfund-accordion").find(".crowdfund-accordion-link, .crowdfund-accordion-container").removeClass("crowdfund-active");
        $(this).addClass("crowdfund-active").next().addClass("crowdfund-active");
        return false;
    });


    //Animation after scroll
    var animationElements = $('.crowdfund-animated');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        for (var i = 0; i < animationElements.length; ++i){
            var $element = $(animationElements[i]);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('crowdfund-scroll-active');
            } else {
                $element.removeClass('crowdfund-scroll-active');
            }
        }
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    //alert(typeof countdown);
    if ($.fn.countdown) {
      var endDate;
      //Automatically set countdown to current day + 3 days
      //Comment this on your production site:
      endDate = new Date();
      endDate.setDate(endDate.getDate() + 3);

      //Just comment code above and set necessary date to endDate variable like here:
      //endDate = '2017/12/20';

      $('#crowdfund-countdown').countdown(endDate).on('update.countdown', function(event) {
        var $this = $(this).html(event.strftime(''
          //+ '<span>%-m</span> week%!w  '
          + '<span>%-n</span> day%!d  '
          + '<span>%H</span> hr  '
          + '<span>%M</span> min  '
          + '<span>%S</span> sec'));
      });
    };
});


function scScrollTo(href){
    href = String(href);
    var target = $("*[id='" + href.replace("#", "") + "']");

    if (target.length){
        $('body, html').stop().animate({
            scrollTop: target.offset().top
        }, 800, "swing");
    }
}
