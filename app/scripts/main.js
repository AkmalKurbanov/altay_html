$( document ).ready(function() {

  // clickEffect
  var clickEffect = {
    init: function init() {
      $(document).on('click', function (e) {
        $('<div class="flabCursor">').css({
          top: e.clientY,
          left: e.clientX
        }).appendTo($(document.body)).on('animationend webkitAnimationEnd', function () {
          $(this).remove();
        });
      });
    }
  };
  clickEffect.init();
	// clickEffect end

  // loader
  $(window).on("load", function () {
    $('.flabLoader').fadeOut('slow', function () {
      $(this).remove();
    });
    $(".flabLazy").lazyload({
      effect : "fadeIn"
    });
  });
  // loader end
  // mmenu
  $(".flabMmnu").mmenu({
    "navbar": {
      "title": '<span>"АЛТАЙ"</span> Гостевой дом'
    },
    "extensions": [
      "pagedim-black",
      "position-right",
      "theme-dark"
    ],
    "counters": true,
    "iconbar": {
      "add": true,
      "top": [
        "<a href='/'><i class='flabIcon flabio-home'></i></a>"
      ],
      "bottom": [
        "<a href='#'><i class='flabIcon flabio-facebook'></i></a>",
        "<a href='#'><i class='flabIcon flabio-instagram'></i></a>",
        "<a href='#'><i class='flabIcon  flabio-vkontakte'></i></a>",
        "<a href='#'><i class='flabIcon  flabio-youtube'></i></a>"
      ]
    },
    "navbars": [
      {
        "position": "bottom",
        "content": [
          "<a class='flabIcon flabio-envelope-open' href='#'></a>",
          "<a class='flabIcon flabio-tripadvisor' href='#'></a>",
          "<a class='flabIcon flabio-booking' href='#'></a>",
          "<a class='flabIcon flabio-airbnb' href='#'></a>"
        ]
      }
    ]
  });
  var API = $('.flabMmnu').data( "mmenu" ),
  $icon = $(".flabHamburger");
  $icon.click(function() {
    API.open();
  });
  API.bind( "open:finish", function() {
    $icon.addClass( "flabHamburger--open" );
  });
  API.bind( "close:finish", function() {
    setTimeout(function() {
      $icon.removeClass( "flabHamburger--open" );
    }, 100);
  });
	// mmenu end

  // Navigation
  $('.flabNavigation__item--submenu').children('a').append('<i class="flabIcon flabio-angle-down"></i>');
  $('.flabNavigation__item--submenu').children('a').on( "click", function(event) {
    event.preventDefault();
    $('.flabNavigation__link').not(this).removeClass('flabNavigation__link--open').next().removeClass('flabSubmenu--show').slideUp();
    $(this).next().toggleClass('flabSubmenu--show').slideToggle();
    $(this).toggleClass('flabNavigation__link--open');
  });
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 80) {
      if($('.flabSubmenu').hasClass('flabSubmenu--show')){
        $('.flabSubmenu').removeClass('flabSubmenu--show').slideUp();
        $('.flabNavigation__link').removeClass('flabNavigation__link--open');
      }
    }
  });
  $('._dropdown').click(function () {
    $(this).siblings().removeClass('-active').find('._dropdown_menu').slideUp();
    $(this).toggleClass('-active').find('._dropdown_menu').slideToggle();
  });

  if (Modernizr.mq('(min-width: 1199.98px)')) {
    $(window).scroll(function() {
      console.log();
      var scroll = $(window).scrollTop(),
      vh = $(window).height();
      if (scroll >= vh/2) {
        if(!$('.flabHeader__form').hasClass('flabHeader__form--move')){
          $('.flabHeader__form').addClass('flabHeader__form--move');
        }
      } else if (scroll < vh/2 ) {
        if ($('.flabHeader__form').hasClass('flabHeader__form--move')) {
          $('.flabHeader__form').removeClass('flabHeader__form--move');
        }
      }
    });
  }
	// Navigation end

  // datepicker
  $('.flabHeader__form .input-daterange,.flabRooms__form .input-daterange').datepicker({
    format: "dd-M-yy",
    startDate: "today",
    language: "ru",
    autoclose: true,
    todayBtn: "linked",
    minDate: '0',
    orientation: 'bottom',
    maxDate: '+1Y+6M'
  }).on('changeDate', function (e) {
		$('#end').prop("disabled", false);
		$('.flabForm__button').addClass('flabForm__button--change');
    // $('.flabSelect').enable();
    var stI = $('#start').datepicker('getDate'),
    start = moment(stI),
    enI = $('#end').datepicker('getDate'),
    end = moment(enI),
    diff = start.diff(end, 'days')*-1;
    if(diff==1||diff==21){
      $('.flabDays').html('<p class="flabDays"><span>'+diff+'</span> ночь</p>');
    }else if (diff<=4&&diff>=1||diff==22||diff==23||diff==24) {
      $('.flabDays').html('<p class="flabDays"><span>'+diff+'</span> ночи</p>');
    }else if (diff==0||diff<0) {
      $('.flabDays').html('<p class="flabDays"><span>1</span> ночь</p>');
    }else {
      $('.flabDays').html('<p class="flabDays"><span>'+diff+'</span> ночей</p>');
    }
  });
  // datepicker end
  // selectize
  $('.flabSelect').selectize({
    render: {
      item: function (data, escape) {
        return "<div id='room' data-price='" + data.openPrice + "'>" + data.text + "</div>"
      }
    }
  });
  // selectize end

  $('.flabFooter').show();

  // sevicesHiddenItem
  $( '.buttonHiddenItem-js' ).click(function() {
    // $('.buttonHiddenItem-js').not(this).next().slideUp();
    $(this).next().slideToggle();
  });

  // sevicesHiddenItem end

  // $('button').on('click',function(){
  //   $(this).siblings('.item').toggle();
  // });

  // gallery
  $('.flabGallery-js').each(function() {
    $(this).magnificPopup({
      delegate: 'a',
      type: 'image',
      tClose: 'Закрыть (Esc)',
      tLoading: 'Загрузка изображения #%curr%...',
      cursor: 'mfp-zoom-out-cur',
      gallery: {
        enabled:true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>',
        tPrev: 'предыдущий',
        tNext: 'следующий ',
      }
    });
  });
  // gallery end

  // owl slider
  $('.owlReviews-js').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    dots: false,
    autoplay:true,
    autoplayTimeout:5000,
    items:1,
    responsive : {
      992 : {
        items:2,
      }
    }
  });

  $('.owlRoom-js').owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    autoplay:true,
    autoplayTimeout:5000,
    animateOut: 'fadeOut',
    mouseDrag: false,
  });

  $(".flabRooms__dots").each(function(i) {
    $(this).attr('id', 'dotssl-'+i);
    i++;
  });
  $(".flabRoomSlider-js").each(function(i) {
    $(this).attr('id', 'roomsl-'+i);

    var owlRoom = $('#roomsl-'+i).owlCarousel({
      items: 1,
      nav: true,
      dots: true,
      animateOut: 'fadeOut',
      autoHeight: true,
      dotsContainer: '#dotssl-'+i,
      navText: ['','']
    });

    $('.flabRooms__dot').click(function () {
      owlRoom.trigger('to.owl.carousel', [$(this).index(), 300]);
    });
    i++;
  });




  var videoOwl = $('.owlVideos-js');
  videoOwl.owlCarousel({
    center:true,
    loop: true,
    nav:false,
    dots: true,
    items:1,
    autoplay:true,
    autoplayTimeout:5000,
    responsive:{
      767:{
        items:2
      },
      991:{
        items:2
      },
      1199:{
        items:4
      }
    }
  });

  $(".flabRooms__scrollWrap").mCustomScrollbar({
    axis:"x",
    theme:"dark-3"
  });

  $('.flabVideoSlider__link').magnificPopup({
    type:'iframe',
    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
      '<div class="mfp-close"></div>'+
      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
      '</div>',
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?rel=0&amp;autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
      },
      srcAction: 'iframe_src',
    }
  });
  // owl slider end

	$('.flabRooms__comfortLink').click(function (event) {
    event.preventDefault();
    var $this = $(this).parent().parent().parent().parent()
    $this.slideUp();
    setTimeout(function(){
      $this.next().slideDown();
    }, 200);

  });

  $('.flabReviewsPage__sourceItems .flabReviewsPage__itemsReviewsLinks').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.flabReviewsPage__sourceItems .flabReviewsPage__itemsReviewsLinks').removeClass('flabReviewsPage__itemsReviewsLinks--current');
    $('.flabChat').removeClass('flabChat--current');

    $(this).addClass('flabReviewsPage__itemsReviewsLinks--current');
    $("#"+tab_id).addClass('flabChat--current');
  })

  $('.hider').click(function() {
    return $(this).parent('.message').removeClass('blur');
  });

	$('.flabModal__close').click(function (event) {
		event.preventDefault();
    $.magnificPopup.close();
	});

	$('.flabForm__button').click(function (event) {
		event.preventDefault();
		var s_start = $('#start').val(),
		s_end = $('#end').val(),
		s_people = $('#people').val(),
		s_count = $('.flabDays span').text(),
		s_room = $('#room').data('price');
		$('.flabModal__dateStart').text(s_start);
		$('.flabModal__dateEnd').text(s_end);
		$('.flabModal__count--days span').text(s_count);
		$('.flabModal__count--people span').text(s_people);
		$('.flabModal__count--price span').text(s_people * s_room * s_count);

    $('.flabModal__dateStart-value').val(s_start);
		$('.flabModal__dateEnd-value').val(s_end);
		$('.flabModal__count--days-value').val(s_count);
		$('.flabModal__count--people-value').val(s_people);
		$('.flabModal__count--price-value').val(s_people * s_room * s_count);

  });

  $('.flabOpenModal').magnificPopup({
    type:'inline',
    mainClass: 'flabMfp',
    removalDelay: 500,
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

});
