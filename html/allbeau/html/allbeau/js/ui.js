;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	
	$(document).ready(function(){
		Layout.conSize();
		Layout.topSiteMap();
		Layout.topSearch();
		Motion.scrollAni();
	});	
			
	var Layout = UI.Layout = {
		bodyLoad : function(){
			$(window).load(function(){
				$("body").addClass("load");
			})
		},
		bodyScroll : function(){
			$(window).scroll(function(){
				var ST = $(window).scrollTop()
				if(ST > 0){
					$("body").addClass("scroll");
				}else{
					$("body").removeClass("scroll");
				}
			})	
		},
		conSize : function(){			
			$(window).bind('ready resize', function(){
				var winW = $(window).width();
				var winH = $(window).height();
				var headerH = $("#header").outerHeight();		
				var footerH = $("#footer").outerHeight();
				
				$("#contents").css({"min-height":winH-footerH});
				$(".store_contents_view").css({"padding-top":headerH,"min-height":winH-headerH});
			});
		},	
		storeReviewSize : function(){			
			$(window).bind('ready load resize', function(){
				var Fix = $(".review_fix");					
				var FixConwrap = $(".reviewCon_size");								
				var detailW = $(".page_storeView .detail_wrap .right .detail").width();	
				var detailH = $(".page_storeView .detail_wrap").outerHeight();
				var locationH = $(".page_storeView .detail_loacation").outerHeight();	
				FixConwrap.css("min-height",detailH-locationH)
				Fix.css("width",detailW);				
			});
		},
		topSiteMap : function(){
			var Btn = $("#header .top_wrap .etc_wrap .allBtn");	
			Btn.click(function(){
				toggleClass(this,"html")			
			});
			
		},
		topSearch : function(){
			var Btn = $("#header .top_wrap .etc_wrap .searchBtn");	
			var BtnClose = $("#header .search_wrap .close");
			Btn.click(function(){
				toggleClass(this,"#header")
			});
			BtnClose.click(function(){
				$("#header").removeClass("on")
			});
			
		},
		mainSearch : function(){
			var wrap = $(".mainSearch");
			var obj = $(".mainSearch .search .sel_wrap .sel");			
			obj.click(function(){
				toggleClass(this,'.mainSearch')
			});			    
			$(".mainSearch .close").click(function(){
				wrap.removeClass("on")
			}); 			
		},
		storeSearch : function(){		
			var obj = $(".page_storeTop .store_search .sel_wrap .sel");			
			obj.click(function(){
				toggleClass(this)
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
						$el.toggleClass("on");
					};
				}, { offset: '100%' });
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
			if(navigator.userAgent.match(/Trident\/7\./)) {
				$('body').on("mousewheel", function () {
					event.preventDefault();			
					var wheelDelta = event.wheelDelta;			
					var currentScrollPosition = window.pageYOffset;
					window.scrollTo(0, currentScrollPosition - wheelDelta);
				});			
//				$('body').keydown(function (e) {
//					e.preventDefault();
//					var currentScrollPosition = window.pageYOffset;			
//					switch (e.which) {			
//						case 38:
//							window.scrollTo(0, currentScrollPosition - 120);
//							break;			
//						case 40:
//							window.scrollTo(0, currentScrollPosition + 120);
//							break;			
//						default: return;
//					} 
//				});
			}
		}
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var Wrap = $(".mainVisual_wrap");
			var slideWrap = $(".mainVisual_wrap .mainVisual");
			slideWrap.slick({
				fade: true,
				arrows: false,
				dots: false,
				autoplay: true,			
				autoplaySpeed: 4000,	
				speed: 500,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});	
			
			slideWrap.find('.img').eq(0).addClass('activeAni');			
			slideWrap.on('beforeChange', function(event, slick, currentSlide, nextSlide){				
				slideWrap.find('.img').removeClass('activeAni');
				slideWrap.find('.img').eq(nextSlide).addClass('activeAni');
			});		
		},
		mainStoreImg1 : function(){
			var Wrap = $(".storeSlide_wrap.type1");
			var slideWrap = $(".storeSlide_wrap.type1 .storeSlide");			
			slideWrap.slick({			
				variableWidth: true,
				autoplay: true,				
				centerMode: true,
				pauseOnHover: true,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});	
		},
		mainStoreImg2 : function(){
			var Wrap = $(".storeSlide_wrap.type2");
			var slideWrap = $(".storeSlide_wrap.type2 .storeSlide");			
			slideWrap.slick({			
				variableWidth: true,
				autoplay: true,				
				centerMode: true,
				pauseOnHover: true,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});	
		},
		storeViewImg : function(){
			var Wrap = $(".storeSlide_wrap");
			var slideWrap = $(".storeSlide_wrap .storeSlide");			
			slideWrap.slick({			
				variableWidth: true,
				autoplay: true,				
				centerMode: true,
				pauseOnHover: true,
				prevArrow: Wrap.find('.arrow_wrap .prev .xi'),
				nextArrow: Wrap.find('.arrow_wrap .next .xi'),
					responsive: [
					{
						breakpoint: 768,
						settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
					}
				]
			});	
		},
		profileImg : function(){
			var Wrap = $(".healerSlide_wrap");
			var slideFor = $(".healerSlide_wrap .slider_for");
			var slideNav = $(".healerSlide_wrap .slider_nav");
			var html = slideFor.html();
			slideNav.append(html);
			slideFor.slick({
				infinite: false,							
				autoplay: true,	
				asNavFor: slideNav,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});
			slideNav.slick({
				infinite: false,			
				arrows: false,				
				slidesToShow: 5,
  				slidesToScroll: 1,				
				focusOnSelect: true,
				asNavFor: slideFor
			});	
			slideNav.on('mouseenter', function(){
				slideFor.slick('slickPause');
			});
			slideNav.on('mouseleave', function(){
				slideFor.slick('slickPlay');
			});
		},
		mainTherapy : function(){
			var Wrap = $(".main_therapy_slider");
			var slideFor = $(".main_therapy_slider .slider_for");
			var slideNav = $(".main_therapy_slider .slider_nav");			
			slideFor.slick({
				infinite: false,					
				autoplay: true,	
				arrows: false,
				asNavFor: slideNav,
				prevArrow: Wrap.find('.arrow_wrap .prev'),
				nextArrow: Wrap.find('.arrow_wrap .next')
			});
			slideNav.slick({
				infinite: false,			
				arrows: false,				
				slidesToShow: 6,
  				slidesToScroll: 1,				
				focusOnSelect: true,
				asNavFor: slideFor
			});	
			slideNav.on('mouseenter', function(){
				slideFor.slick('slickPause');
			});
			slideNav.on('mouseleave', function(){
				slideFor.slick('slickPlay');
			});
		}
	}
	
})(jQuery, window);