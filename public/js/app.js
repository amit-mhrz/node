jQuery(function($){
    var slider = document.getElementById('rangeSlider');

    noUiSlider.create(slider, {
        start: [2002, 2017],
        connect: true,
        step: 1,
        range: {
            'min': 2000,
            'max': 2035
        }
    });
    slider.noUiSlider.on('update', function(values, handle) {
        // console.log("value:" + values[0]);
        // console.log("handle:" + values);
        var valMin = values[0];
        var valMax = values[1];

        // if(Math.round(valMin) > 2000) {
        //     console.log('here');
        //     for(var i=0; i<36; i++) {
        //         console.log("#line" + i);
        //         $('#line' + i).css({
        //             'fill': 'red',
        //             'stroke': 'red'
        //         });
        //     }
        // }  else {
        //     for(var i=0; i<36; i++) {
        //         console.log("#line" + i);
        //         $('#line' + i).css({
        //             'fill': '#fff',
        //             'stroke': '#fff'
        //         });
        //     }
        // }
    });
    $(window).scroll(function(){
        var wScroll = $(this).scrollTop();

        if(wScroll > 10) {
            $('.section__filter').addClass('sticky');
            $('.content__bottom').addClass('sticky');
            $('header').addClass('sticky');
            $(".filter__fade").fadeOut();
            // $(".filter__sticky").fadeIn();
        } else {
            $('.section__filter').removeClass('sticky');
            $('.content__bottom').removeClass('sticky');
            $('header').removeClass('sticky');
            $(".filter__fade").fadeIn();
            // $(".filter__sticky").fadeOut();
        }

        
        if(wScroll > $('.section__products').offset().top - ($(window).height() / 1.2)) {
            $('.section__products .row .col-md-6').each(function(i){
                setTimeout(() => {
                    $('.section__products .row .col-md-6').eq(i).addClass('in-view');
                }, 150 * (i+1));
            });
        }
    });
    $(window).on('load', function(){
        $('.section__products .row .col-md-6').each(function(i){
            setTimeout(() => {
                $('.section__products .row .col-md-6').eq(i).addClass('in-view');
            }, 150 * (i+1));
        });
    });
    $('.icon__holder').click(function(){
        $(this).toggleClass('active');
    });
    $('.navbar-toggler').click(function(e){
        e.preventDefault();
        $('#collapsibleNavbar').animate({
            'right' : '0%'
        },500);
    });
    $('.close-nav').click(function(e){
        e.preventDefault();
        $('#collapsibleNavbar').animate({
            'right' : '-100%'
        },500).removeClass('show');
    });
});