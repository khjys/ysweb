;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	
	$(document).ready(function(){
		Layout.contentSize();
		Layout.headerGnb();		
		Motion.scrollAni();
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
		telLink : function(no,obj){
			if(isMobile.any()){
				var tel = no.split('-');
				if(tel[3]){					
					$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]+tel[3]);
				}else{
					$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]);
				}
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
		headerGnb : function(){
			var gnb = $("#header .gnb_wrap");
			var gnbDP1 = $("#header .gnb_wrap .menu .gnb > li");
			var gnbDP2 = $("#header .gnb_wrap .menu .gnb .dp2_wrap");
			gnb.mouseenter(function(){				
				$("#header").addClass("white");				
			}).mouseleave(function(){				
				if($("body").hasClass("scroll") == false){
					$("#header").removeClass("white");
				}
			});
			$(window).scroll(function(){
				$("body").hasClass("scroll") ? $("#header").addClass("white") : $("#header").removeClass("white");					
			});			
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
				}, { offset: '80%' });
			});
		},
		linkScroll : function(no){
			var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
			var headerH = $("#header").outerHeight();
			$('body, html').animate({ scrollTop: Y-headerH }, 500);
		},
		scrollFix : function(obj,p){
			var offset = $(obj).offset().top;
			var objH = $(obj).outerHeight();			
			var docH = $(document).height();
			if(!p){
				p = 0;
			}			
			var footerH = $("#footer").outerHeight()+p;
			var headerH = $("#header").outerHeight();
			$(window).scroll(function(){
				var scrollT = $(window).scrollTop()				
				if(scrollT > docH - footerH - objH){
					$(obj).addClass("bottom");
					$(obj).css("top","auto");
				}else if(scrollT > offset-headerH){
					$(obj).removeClass("bottom").addClass("scroll");					
					$(obj).css("top",headerH+20);
				}else{
					$(obj).removeClass("bottom").removeClass("scroll");
					$(obj).css("top",0);
				}
			})			
		},
		scrollCheck : function(obj,nav){
			$(window).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var winH = $(window).height();
			var headerH = $("#header").outerHeight();
			$(obj).each(function(){
				var idx = $(this).data("no");
				var Offset = $(this).offset().top;
				var VA = scrollTop+((winH-headerH)*.2);
				var H = $(this).outerHeight();
				if(VA > Offset){
					$(nav).removeClass("on")
					$(nav+"[data-no='"+idx+"']").addClass("on")
				}
			})
			})	
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
			if(isMobile.any()){
				return false;
			}else{
				fix();
			}
		}
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".mainVisual_wrap");
			var slideWrap = $(".mainVisual_wrap .mainVisual");
			var html = $("#slogan_wrap").html();
			Wrap.find(".slogan_wrap").append(html);
			slideWrap.slick({
				arrows: false,
				dots: true,
				autoplay: true,
				pauseOnHover: false,
				pauseOnFocus: false,
				autoplaySpeed: 6000,	
				speed: 800,			
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});				
			slideWrap.find('.item').eq(1).addClass('activeAni');
			slideWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){				
				slideWrap.find('.item').removeClass('activeAni');
				slideWrap.find('.item').eq(nextSlide+1).addClass('activeAni');	
			});	
		}
	}
	
})(jQuery, window);