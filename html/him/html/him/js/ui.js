;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	$(function(){
		
	});
	
	$(document).ready(function(){		
		
	});
	
	var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };	
			
	var Layout = UI.Layout = {
		bodyLoad : function(){
			$(window).load(function(){
				$("body").addClass("load");
			})
		},
		bodyScroll : function(){
			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop()
				scrollTop > 0 ? $("body").addClass("scroll") : $("body").removeClass("scroll");
			})	
		},
		bodyClass : function(){
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				if(isMobile.any() || winW <= 1024){				
					$("body").addClass("bodyMobile").removeClass("bodyPC");			
				}else{
					$("body").removeClass("bodyMobile").addClass("bodyPC");	
				}
			});
		},
		telLink : function(no,obj){
			if(isMobile.any()){
				var tel = no.split('-');
				$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]);
			}else{
				return false;
			}
		},
		contentSize : function(){			
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				var winH = $(window).height();
				var headerH = $("#header").outerHeight();		
				var footerH = $("#footer").outerHeight();
				
				$("#contents").css({"min-height":winH});
			});
		},
		headerFix : function(){
			var wrap = $("body");
			var head = $("#header");
			var offset = $("#header .logo_wrap").offset().top;
			$(window).on({
				scroll : inEvent,
				resize : inEvent
			});
			function inEvent(){
				var scrollT = $(window).scrollTop();				
				if(scrollT >= offset){					
					wrap.addClass("wrapFix");
					var headH = head.outerHeight();
					$("#contents").css("padding-top",headH);
				}else{
					wrap.removeClass("wrapFix");
					$("#contents").css("padding-top","0");
				}
			}
		}
	}
	
	var Motion = UI.Motion = {
		scrollAni : function(){
			var $obj = $( '*[data-animation]' );			
			var winH = $(window).height()
			$obj.each( function( i, el ) {
				var $el = $( el ),
					aniClass = $el.data('animation'),
					$delay = $el.data('delay'),
					$duration = $el.data('duration'),
					check = true;
				
				if($delay>0){
					$el.css({
						'-webkit-animation-delay':$delay+'s',
						'animation-delay':$delay+'s'
					})
				}
				if($duration>0){
					$el.css({
						'-webkit-animation-duration':$duration+'s',
						'animation-duration':$duration+'s'
					})
				}	
				
				var objT = $el.offset().top;
				if(objT > winH){
					$el.addClass('wait-animation');
				}
				$el.addClass('animated '+aniClass);
	
				$el.waypoint(function(){
					if(check){
						check = false;
						$el.removeClass('wait-animation');
					}else{
						//$el.toggleClass("on");						
					};
				}, { offset: '100%' });
			});
		},
		ieFixed : function(){
			var fix = function(){
				if(navigator.userAgent.match(/Trident\/7\./)) {
					$('body').on("mousewheel", function () {
						event.preventDefault();			
						var wheelDelta = event.wheelDelta;			
						var currentScrollPosition = window.pageYOffset;
						window.scrollTo(0, currentScrollPosition - wheelDelta);						
					});
				}
			};
			if(isMobile.any() || $('body').hasClass('pop')){				
				return false;
			}else{
				fix();
			}
			
			$.fn.extend({
				mouse_wheel: function() {
					$(this).on('mousewheel', function(e) {						
						if (e.originalEvent.wheelDelta >= 120) {
							this.scrollTop -= 50;
						} else if (e.originalEvent.wheelDelta <= -120) {
							this.scrollTop += 50;
						}
						return false;
					});
				}
			});			 
			$('#nav .nav_gnb').mouse_wheel();			
		}		
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".main_visual");
			var SlideWrap = $(".main_visual .visual");			
			SlideWrap.slick({
				fade: false,
				arrows: true,
				dots: false,
				autoplay: true,			
				autoplaySpeed: 4000,				
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});	
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				var winH = $(window).height();
				var headerH = $("#header").outerHeight();						
				SlideWrap.find(".slick-track, .item").css({"height":winH-headerH});
			});			
			SlideWrap.find('.item').eq(1).addClass('activeAni');			
			SlideWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$(this).find('.item').eq(nextSlide+1).addClass('activeAni').siblings().removeClass('activeAni');
			});
			SlideWrap.find('.slogan .btn > a').mouseenter(function(){
				SlideWrap.slick('slickPause');
			}).mouseleave(function(){
				SlideWrap.slick('slickPlay');
			});
		},		
		familySlide : function(){
			var Wrap = $(".family_wrap");
			var SlideWrap = $(".family_wrap .family");	
			slideWrap.slick({
				slidesToShow: 5,
		  		slidesToScroll: 1,
				autoplay: true,	
				pauseOnHover: true,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next'),
				responsive: [
				{
				breakpoint: 1025,
				settings: {
					slidesToShow: 4,
				}
				},
				{
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
				}
				}
				]
			});			
			Wrap.find('.btnControl').clickToggle(function(){
				slideWrap.slick('slickPause');
				$(this).removeClass("pause").addClass("play");
			},function(){				
				slideWrap.slick('slickPlay');
				$(this).removeClass("play").addClass("pause");
			});
		}
	}	
})(jQuery, window);