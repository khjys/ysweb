;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	$(function(){
		Layout.bodyLoad();
		//Layout.bodyScroll();
		Layout.bodyClass();
		Layout.contentSize();
		Layout.gnbStyle();
		Layout.navGnb(); //�����nav �߰�
		Layout.footScroll();		
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
		//������ Ŭ���� �߰� ����
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
		//������ ��ȭ
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
				var contents = $("#contents");
				var headerH = $("#header").outerHeight();		
				var footerH = $("#footer").outerHeight();
				
				contents.css({"min-height":winH-headerH-footerH});
			});
		},
		gnbStyle : function(){
			function conGnb(){
				var obj = $(".gnb li > a");
				obj.each(function(){
					var leng = $(this).next("ul").children("li").length;
					if( leng > 0){
						$(this).addClass("plus");
					}					
				})
			};			
			function headGnb(){
				var dp2 = $("#header .gnb_wrap .gnb > li .dp2 > li > a");
				dp2.each(function(){
					if($(this).hasClass("plus")){					
						var aw = $(this).outerWidth();
						var uw = $(this).next("ul").outerWidth();
						$(this).parents(".dp2").outerWidth(aw+uw);
					}
				})
				
				var wrap = $("#header .gnb_wrap .gnb > li");
				wrap.each(function(){
					if($(this).find(".dp2 > li > ul").hasClass("dp3")){						
						$(this).children(".dp2").addClass("posL");
						$(this).offsetParent().each(function(i){
							var obj = $(this).children("li");
							var gnbW = $(this).width();
							obj.each(function(){			
								var pos = $(this).position().left;
								var dp2W = $(this).find(".dp2").width();
								var W = gnbW - pos;
								if($(this).find(".dp2 > li > ul").hasClass("dp3") && dp2W > W){
									$(this).find(".dp2").addClass("posR");
									$(this).find(".dp2").removeClass("posL");
								}else{
									$(this).find(".dp2").removeClass("posR");
								}						
							})
						});						
					}else{
						$(this).parents(".dp2").removeClass("posL");
						$(this).parents(".dp2").removeClass("posR");
					}
				})
			};
			conGnb();
			headGnb();
			$(window).resize(function(){					
			headGnb();
			}) 
		},
		navGnb : function(){
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				var obj = $("#m_nav .gnb .dp1");
				if(isMobile.any() || winW <= 1024){					
					obj.each(function(){
						var leng = $(this).next(".dp2").find("li").length;				
						if( leng > 0){
							$(this).attr("href","javascript:void(0)").addClass("arrow").click(function(){
								$(this).parent("li").toggleClass("active");
								$(this).parent("li").siblings("").removeClass("active");
							})
						}
					})
				}else{
					obj.parent("li").removeClass("active");
				}
			});				
		},
		footScroll : function(){
			$(window).scroll(function(){
				var scrollTop = $(window).scrollTop()
				scrollTop > 0 ? $("#footer .goTop").addClass("scroll") : $("#footer .goTop").removeClass("scroll");
			})	
		}
	}
	
	var Motion = UI.Motion = {
		//��ũ�� �ִϸ��̼�
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
			//ie fixed �϶� ȭ�� ���� ���� �ذ�
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
			
			//ȭ�� ���� ���� ��ũ��Ʈ �־����� ���������� ��ũ�� ���� �ذ�
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
			$('.js_mouse_wheel').mouse_wheel();
		}		
	}
	var Slider = UI.Slider = {
		//���� ����� ��ũ��Ʈ ����
		mainVisual : function(){
			
		},	
		//�йи� ����Ʈ �����̵� ����
		familySlide : function(){
			
		}
	}	
})(jQuery, window);