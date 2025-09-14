// JavaScript Document
//<![CDATA[

//equalizeHeights
$.fn.equalizeHeights = function() {
var maxHeight = this.map(function( i, e ) {
return $( e ).outerHeight();
}).get();
return this.outerHeight( Math.max.apply( this, maxHeight ) );
};

function equalH(t){
	if(t==null){
	t=".equalH"
	}
	$(""+t+"").equalizeHeights();
}


//scroll Style
function scrollSt() {
	var scrollst = $(".scrollSt")
	scrollst.mCustomScrollbar({
		theme:"minimal-dark"
	});
}


//gotop
function goTop() {
	$('body, html').animate({ scrollTop: 0 }, 400);
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

//pop
function layerOpen(url){
	var bg = '<div class="layer_bg"></div>'
	var frame ='<iframe class="layer_frame" src="'+url+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
	var wrap = '<div class="layer_wrap">'+bg+frame+'</div>'
	$("body").append(wrap);
	$("html").css("overflow-y","hidden").addClass("popOpen");
	$(".layer_frame").load(function(){
		layerLoad()
	})
};
function layerPage(url){
	$(".layer_wrap").find(".layer_frame").attr('src',url);
};
function layerLoad(){
	$(".layer_wrap").addClass("on")
	var obj = $(".layer_frame").contents().find('.popIn');
	var objW = $(".layer_frame").contents().find('.popWrap');
	var btnClose = "<a href='javascript:parent.layerClose()' class='popClose'><i class='xi xi-close'></i></a>"
	var bgClose = "<div class='layer_closeBg' onclick='parent.layerClose()'></div>"
	obj.append(btnClose);
	objW.append(bgClose);
};

function layerClose(){
	$(".layer_wrap").remove()
	$("html").css("overflow-y","scroll").removeClass("popOpen");
};

function popOpenC(u,w,h){
	var winW = window.screen.width;
	var winH = window.screen.height;
	var L = (winW-w)/2
	var T = (winH-h)/2
	window.open(u,'','width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
};

function layerOpenImg(obj){
	var src = $(obj).find("img").attr("src");
	var bg = '<div class="layer_bg"></div>'
	var frame ='<div class="layer_img vm_wrap"><p class="layer_closeBg" onclick="layerClose()"></p><img src="'+src+'" alt="" /></div>'
	var wrap = '<div class="layer_wrap">'+bg+frame+'</div>'

	$("body").append(wrap);
	$("html").css("overflow-y","hidden");
	$(".layer_wrap").addClass("on");
};

function toggleClass(obj,wrap){
	if(!wrap){
		var wrap = (".toggleWrap");
	}
	$(obj).parents(wrap).toggleClass("on")
};

function addDiv(obj,wrap,id, idx){
	var html = $('#'+id).html();
	html = html.replace(/=idx=/gi, idx);
	$(obj).parents('.'+wrap).append(html);
};
function delDiv(obj,wrap){
	$(obj).parents('.'+wrap).remove();
};

function imgThumb(obj){
	var src = $(obj).find("img").attr("src");
	var target = $("#imgBig");
	target.attr("src",src);
	$(obj).siblings().removeClass("on");
	$(obj).addClass("on");
};

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

//폰트사이즈
$(function(){
	var zoomMax = 1.2;
	var zoomMin = .8;
	var zoom = 1;
	$(".pageZoom.in").on("click",function(){
		if(zoom < zoomMax){
			zoom = zoom + .02;
		}else alert("가장 큰 화면크기입니다.");
		$("html").css("transform","scale("+zoom+")").css("transform-origin","center top");
	});
	$(".pageZoom.out").on("click",function(){
		if(zoom > zoomMin){
			zoom = zoom - .02;
		}else alert("가장 작은 화면크기입니다.");
		$("html").css("transform","scale("+zoom+")").css("transform-origin","center top");
	});
	$(".pageZoom.default").on("click",function(){
		zoom = 1;
		$("html").css("transform","scale("+zoom+")").css("transform-origin","center top");
	});
});

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
};

//]]>
