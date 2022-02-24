$(function () {

    'use strict';

    $('header, .slide').height('100vh');

    // $('#nav-links > ul > li:nth-child(2) > a').on('click', function (e) {

    //     var getAttr = $(this).attr('href');

    //     e.preventDefault();
    //     $('html').animate({
    //         scrollTop: $(getAttr).offset().top
    //     }, 1000);
    // });

    $('#home > div.content > div > a').on('click', function (e) {

        var getAttr = $(this).attr('href');

        e.preventDefault();
        $('html').animate({
            scrollTop: $(getAttr).offset().top
        }, 500);
    });


});


window.addEventListener('scroll', function () {
    let header = document.getElementById("navTag");
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling-active', windowPosition) 
});