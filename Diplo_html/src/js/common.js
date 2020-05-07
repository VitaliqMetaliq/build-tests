import $ from 'jquery';
require('slick-carousel');
require('slick-carousel/slick/slick.css');
require('slick-carousel/slick/slick-theme.css');
$(function() {


    $('.slider').slick({
        infinite: false, 
        appendArrows: $('.custom-arrows'), 
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        slidesToShow: 3,
        slidesToScroll: 1, 
        responsive: [{
            breakpoint: 1025, 
            settings: {
                dots: true, 
                arrows: false, 
                slidesToShow: 2, 
                slidesToScroll: 1, 
                infinite: false
            }
        }, {
            breakpoint: 640, 
            settings: {
                dots: true, 
                arrows: false, 
                slidesToShow: 1, 
                slidesToScroll: 1, 
                infinite: false
            }
        }]
    });

    $('.header__nav_link').on('click', (e) => {
        var $some = $(e.target).parents().find('.active');
        $some.removeClass('active');
        $(e.target).addClass('active');
        if($('.slide-menu').is(':visible')) {
            $('.slide-menu').slideUp();
            $('.mobile-menu').removeClass('mobile-menu-close');
        }
        $('html,body').stop().animate({
            scrollTop: $(e.target.getAttribute('href')).offset().top }, 1000);
        e.preventDefault();
    });

    $('.mobile-menu').on('click', (e) => {
        if($('.slide-menu').is(':visible')) {
            $('.slide-menu').slideUp();
            $(e.target).removeClass('mobile-menu-close');
        } else {
            $('.slide-menu').slideDown();
            $(e.target).addClass('mobile-menu-close');
        }
    });

});