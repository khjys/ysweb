;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	$(function(){
		//Motion.scrollAni();
		//Layout.bodyMobile();
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
		bodyMobile : function(){
			if(isMobile.any()){				
				$("body").addClass("mobile");
			}else{
				$("body").removeClass("mobile");
			}
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
				
				// $("#contents").css({"min-height":winH-headerH-footerH,"padding-top":headerH}); //서브페이지에서 패딩값이 자동으로 먹혀서 주석
			});
		},
		introSize : function(){			
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				var winH = $(window).height();
				var topH = $(".intro_wrap .intro_top").outerHeight();
				var H = winH-topH;
				if(winW > 1024){
					var PD = 40;
				}else{
					var PD = 10;	
				}
				$(".intro_wrap .intro_con").css({"height":H-PD});
			});
		},
		headerFix : function(){		
			var Wrap = $("body");
			var Gnb = $("#header .gnb_wrap");
			var Offset = Gnb.offset().top;	
			$(window).scroll(function(){
				var scrollT = $(window).scrollTop();
				scrollT >= Offset ? Wrap.addClass("wrapFix") : Wrap.removeClass("wrapFix");
			})
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
			$('#nav .nav_wrap, #quick .quick_wrap .inner').mouse_wheel();
			
		},
		introAni : function(){				
			function inEvent(){				
				var obj = $(".intro_wrap .introObj");
				var wrap = $(".intro_wrap");
				var check = true;
				if(check){					
					obj.mouseenter(function(){						
						$(this).addClass("on");
						$(this).siblings().removeClass("on");
						wrap.addClass("hover");						
					});
					obj.mouseleave(function(){
						$(this).removeClass("on");				
						wrap.removeClass("hover");
						obj.removeClass("off");
					});
					
					setInterval(function(){ani() }, 5000);						
					function ani(){							
						var objL = obj.length;
						if(!wrap.hasClass("hover")){
							var i = $(".introObj.on").data("no");
							var ii = i+1;
							$(".introObj").removeClass("on");
							$(".introObj").addClass("off");
							if(ii > objL){
								$(".introObj[data-no='1']").addClass("on");
							}else{
								$(".introObj[data-no='"+ii+"']").addClass("on");
							}								
						}else{
							$(".introObj").removeClass("off");								
						}							
					}
					inEventRe();
				}				
			}
			function inEventRe(){
				var winW = $(window).width();
				if(winW > 1460){
					$(".intro_wrap").removeClass("introM");
				}else{
					$(".intro_wrap").addClass("introM");
					clearInterval(function(){ani() });
				}
			}
					
			if(isMobile.any()){						
				//var check = false;
				//inEvent();
			}
			inEvent();
			$(window).resize(function() {
			inEventRe();
			});
		}
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".mainVisual_wrap");
			var slideWrap = $(".mainVisual_wrap .mainVisual");
			var html = $("#slogan_wrap").html();
			Wrap.find(".slogan_wrap").append(html);
			slideWrap.slick({
				fade: true,
				arrows: false,
				dots: true,
				autoplay: true,			
				autoplaySpeed: 4000,				
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});				
			slideWrap.find('.item').eq(0).addClass('activeAni');			
			slideWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$(this).find('.item').eq(nextSlide).addClass('activeAni').siblings().removeClass('activeAni');
			});
		},		
		familySlide : function(){
			var Wrap = $(".family_wrap");
			var slideWrap = $(".family_wrap .family");	
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