// JavaScript Document

//equalizeHeights
$.fn.equalizeHeights = function() { 
	var maxHeight = this.map(function( i, e ) {
	return $( e ).height();
	}).get();
	return this.height( Math.max.apply( this, maxHeight ) );
	};
	
	function equalH(t){
		if(t==null){
		t="equal"
		}
		$("."+t+"").equalizeHeights();		
	}
	
	
	//gotop
	function goTop() {
		$('body, html').animate({ scrollTop: 0 }, 500); 
	}
	
	function godoc(t) {
		$('body, html').animate({ scrollTop: $("#"+t+"").offset().top }, 500); 
	}
	
	//sub page
	function layoutDiv() {	
		var Header = $("#header");
		var conWrap = $("#contents");
		var subVisual = $("#contents .subVisual");
		var subTit = $("#contents .subTitle");	
		var siteWrap = $("#header .siteMap_wrap");
		var siteBg = $("#header .siteMap_bg");	
		var siteBtn = $("#header .siteMapbtn");
		var searchWrap = $("#header .searchSection");
		var searchBtn = $("#header .searchBtn");
		var searchClose = $("#header .searchSection .searchClose");
		var winW = $(window).width();
		var winH = $(window).height();
		
		//레이아웃 사이즈
		function conSize(){			
			var headerH = $("#header").outerHeight();
			var footerH = $("#footer").outerHeight();
			var topWrapH = $("#header .top_wrap").outerHeight();
			var VisH = $(".subVisual_wrap").outerHeight();	
			var NavH = $(".subNav_wrap").outerHeight();
			var TH = VisH-NavH;
			var SH = headerH-topWrapH-1;
			//conWrap.css("margin-top",headerH)
			subTit.css('height',TH)
			//siteWrap.css('top',headerH)
			searchWrap.css('height',SH)
		}
		
		//서브 비쥬얼 애니
		function VisualAni(){	
			subVisual.addClass("on")
			setTimeout(function(){
			subTit.addClass("on")
			},200)
		}
	
		//상단 전체메뉴 열기닫기
		function siteMapDiv() {		
			var opacityOut = 0
			var opacityOn = 0.7
			var siteSpeed = 400		
			
			function Open(){
				siteWrap.addClass("on");
				siteBtn.addClass("on");		
				siteBg.stop().animate({"opacity": opacityOn},siteSpeed).addClass("on");			
				siteWrap.find(".gnb > li").equalizeHeights();
			};
			function Close(){
				siteWrap.removeClass("on");
				siteBtn.removeClass("on");			
				siteBg.stop().animate({"opacity": opacityOut},siteSpeed).removeClass("on");	
			};		
			siteBtn.on("click", function(){			
				if (!siteWrap.hasClass("on")) {
					Open()
				} else {
					Close()
				}
			});
			siteBg.on("click", function(){
				Close()							 
			});		
		}
		
		//상단 통합검색 열기닫기
		function searchDiv() {			
			function Open(){
				searchWrap.addClass("on");			
			};
			function Close(){
				searchWrap.removeClass("on");
			};		
			searchBtn.on("click", function(){			
				if (!searchWrap.hasClass("on")) {
					Open()
				} else {
					Close()
				}
			});
			searchClose.on("click", function(){
				Close()							 
			});		
		}
		
		$(document).ready(function(){	
			conSize()
			siteMapDiv()
			searchDiv()
		})
		$(window).load(function(){	
			VisualAni()	
		})
		$(window).resize(function(){
			conSize()	
		})
		
	}
	
	//tab
	$(function(){
		$(".tab_idx.over > li").each(function () {
			}).mouseenter(function () {
			var n = $(this).index();
			$(this).parents(".wrap_idx").find(".con_idx .idx").removeClass("on");
			$(this).parents(".wrap_idx").find(".con_idx .idx:eq("+n+")").addClass("on");
			$(this).parents(".wrap_idx").find(".tab_idx > li").removeClass("on");
			$(this).addClass("on");
		});
		$(".tab_idx.click > li").each(function () {
			}).click(function () {
			var n = $(this).index();
			$(this).parents(".wrap_idx").find(".con_idx .idx").removeClass("on");
			$(this).parents(".wrap_idx").find(".con_idx .idx:eq("+n+")").addClass("on")
			$(this).parents(".wrap_idx").find(".tab_idx > li").removeClass("on");
			$(this).addClass("on");
		});
	});
	
	//
	function img_resize(){
		$(".img_resize").css("overflow","hidden");
		$(".img_resize img").css("width","100%")
		function resize(){
			$(".img_resize").each(function (i) {
				var imgW = $(this).width(); 
				$(this).height(imgW*.6)
				$(this).children("img").css("min-height",imgW*.6)
			});
		}
		function resize2(){
			$(".img_resize").each(function (i) {
				var imgW = $(this).width();
				var imgH = $(this).find("img").height();
				if(imgW > imgH || imgW == imgH){
					var gap = (imgH - $(".img_resize").height())/2
					$(this).find("img").css("margin-top","-"+gap+"px")
				}
			});
		}
		$(window).load(function(){
			resize()
			resize2()
		})
		$(window).resize(function(){
			resize()
			resize2()
		})
	}
	//pop
	function layerOpen(url){
		var bg = '<div class="layer_bg" onclick="layerClose()"></div>'
		var frame ='<iframe class="layer_frame" src="'+url+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
		var wrap = '<div class="layer_wrap">'+bg+frame+'</div>'
		$("body").append(wrap);
		$("html").css("overflow-y","hidden");
		$(".layer_frame").load(function(){
			layerLoad()
		})
	};
	function layerLoad(){
		$(".layer_wrap").addClass("on")
		var obj = $(".layer_frame").contents().find('.popIn');
		var btnClose = "<a href='javascript:parent.layerClose()' class='popClose'>&Cross;</a>"
		obj.append(btnClose)
	}
	
	function layerClose(){
		$(".layer_wrap").remove()
		$("html").css("overflow-y","scroll");
	};
	
	function popOpenC(u,w,h){
		var winW = window.screen.width;
		var winH = window.screen.height;
		var L = (winW-w)/2
		var T = (winH-h)/2
		window.open(u,'','width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
	}
	
	//
	function imgResize(r,t){
		function resize(){
			if(r==null){
			r=0.5625
			}
			if(t==null){
			t="img_resize"
			}
			$("."+t+"").each(function (i) {
				var imgW = $(this).width();
				$(this).height(imgW*r)
			});
			
		}
		$(document).ready(function(){
			resize()
		})
		$(window).resize(function(){
			resize()
		})
	}
	
	//gall_thumb
	function img_resize_gall(){
		$(".resize_gall").css("overflow","hidden");
		$(".resize_gall img").css("width","100%")
		function resize(){
			$(".resize_gall").each(function (i) {
				var imgW = $(this).width();
				$(this).height(imgW*0.999)
				$(this).find("img").css("min-height",imgW*0.999)
			});
		}
		function resize2(){
			$(".resize_gall").each(function (i) {
				var imgW = $(this).width();
				var imgH = $(this).find("img").height();
				if(imgW < imgH || imgW == imgH){
					var gap = (imgH - $(".resize_gall").height())/2
					$(this).find("img").css("margin-top","-"+gap+"px")
				}
			});
		}
		$(window).load(function(){
			resize()
			resize2()
		})
		$(window).resize(function(){ 
			resize()
			resize2()
		})
	}
	
	//
	function memFind(){
		$(".memFindWrap").slideToggle()
		$(".memFindWrapHide").slideToggle()
	}
	
	//agreecheck
	
	function agreeCheck(){
		var checkbox = "#contents input.agreeCheck"
		var checkboxAll = "#contents input.agreeAll"
		var wrapBtn = "#contents .agree_btn_wrap"
		var wrapAll = "#contents .agree_all_wrap"
		var wrap = "#contents .agree_wrap .agree"
		var onClass = "on"
		$(checkbox).click(function(){
			var length = $(checkbox).length
			var lengthCheck = $(checkbox+":checked").length
			var lengthEss = $(checkbox+".ess").length
			var lengthCheckEss = $(checkbox+":checked.ess").length
			if(lengthEss == lengthCheckEss){
				$(wrapBtn).addClass(onClass)
			}else{
				$(wrapBtn).removeClass(onClass)
			}
			if(length == lengthCheck){
				$(wrapAll).addClass(onClass)
				$(checkboxAll).prop("checked","checked")
			}else{
				$(wrapAll).removeClass(onClass)
				$(checkboxAll).removeProp("checked","checked")
			}
			if($(this).parents(wrap).hasClass(onClass)){
				$(this).parents(wrap).removeClass(onClass)
			}else{
				$(this).parents(wrap).addClass(onClass)
			}
		})
		$(checkboxAll).click(function(){
			if($(this).prop("checked")==true){
				$(wrapBtn+","+wrapAll+","+wrap).addClass(onClass)
				$(checkbox).prop("checked","checked")
			}else{
				$(wrapBtn+","+wrapAll+","+wrap).removeClass(onClass)
				$(checkbox).removeProp("checked","checked")
			}
		})
	}
	function findCheck(){
		var radio = "#contents input.radioCheck"
		var wrap = ".radioCheckWrap"
		var wrapForm = ".radioCheckForm"
		var onClass = "on"
		$("#contents input.radioCheck").click(function(){
			if($(this).hasClass(onClass)){}else{
				if($(this).prop("checked")==true){
					$(radio).removeClass(onClass)
					$(this).addClass(onClass)
					$(wrap).next(wrapForm).slideUp()
					$(this).parents(wrap).next(wrapForm).slideDown()
				}
			}
		})
	}
	
	
	
	
	//input type file
	var fileDiv = {
		inputFile : function(target){
			var t = $(target);
			var p = t.parent();
			var n = t.val();
			if(n != ""){
				t.next().val(n);
			}else{
				t.next().val('');
			}
		}
	};
	
	function boardFaq(BSbtn){
		var BStit = BSbtn.parents(".BStit");
		var BScon = BStit.next(".BScon");
		if(BScon.css("display")=="none"){
			BScon.slideDown();
			BScon.siblings(".BScon").hide();
			BStit.addClass("on");
			BStit.siblings(".BStit").removeClass("on");
		}else{
			BScon.hide();
			BStit.removeClass("on");
		}
	};
	
	
	
	
	function scrollCheck(obj,nav){
		$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var winH = $(window).height();
		var headerH = 0;
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
	}