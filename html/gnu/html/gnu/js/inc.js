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

//goBtn top,down
function goTop() {
	$('body, html').animate({ scrollTop: 0 }, 400);
}
function goDown() {
	$('body, html').animate({ scrollTop: $("#footer").offset().top }, 400);
}
function goCon() {
	//var H = $("#header").outerHeight() + 20;
	var H = 0;
	$('body, html').animate({ scrollTop: $(".js_goCon").offset().top - H }, 400);
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
	$(".layer_wrap").addClass("on");
};

$(document).ready(function(){
	layerLoad();
});

function layerLoad(){	
	var obj = $('.pop .popIn');
	var objW = $('.pop .popWrap');
	var btnClose = "<a href='javascript:parent.layerClose()' class='popClose'><i class='xi xi-close'></i></a>"
	var bgClose = "<div class='layer_closeBg' onclick='parent.layerClose()'></div>"
	obj.append(btnClose);
	objW.append(bgClose);
};

function layerClose(){
	$(".layer_wrap").remove()
	$("html").css("overflow-y","scroll").removeClass("popOpen");
};

function layerPage(url){
	$(".layer_wrap").find(".layer_frame").attr('src',url);
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

//
function toggleClass(obj,wrap,Class){
	if(!wrap){
		var wrap = (".toggleWrap");
	};
	if(!Class){
		var Class = "on";
	};
	$(obj).parents(wrap).toggleClass(Class);
}

function hide(id){
	$('#'+id).css('display','none')
};
function show(id){
	$('#'+id).css('display','')
};
function showHide(id,Class){	
	if(!Class){
		var Class = "show_HTML";
	};
	$('.'+Class).hide();
	if(id){
		$('#'+id).show();
	};
};

function addDiv(wrap,html){
	var html = $('#'+html).val();
	$('#'+wrap).append(html);	

	$(".DATE_PICKER").removeClass('hasDatepicker').datepicker();
	//$(".DATE_PICKER").datepicker({});
};
function addDivIn(obj,wrap,html){
	var html = $('#'+html).val();
	$(obj).parents().nextAll(wrap).append(html);

	$(".DATE_PICKER").removeClass('hasDatepicker').datepicker();
};

function delDiv(obj,Class){
	if(!Class){
		var Class = "delWrap";
	};
	$(obj).parents('.'+Class).remove();

	$(".DATE_PICKER").removeClass('hasDatepicker').datepicker();
};

function printDiv(wrap){
	if(!wrap){
		var wrap = (".printDiv");
	};
	var ori = $('body').html();
    var pri = $(wrap).html();
	$('body').html(pri);
	window.print();
	$('body').html(ori);
}

function imgThumb(obj){
	$(obj).each(function () {
		var src = $(obj).find("img").attr("src");
		var target = $("#imgBig");
		target.attr("src",src).css("display","none").fadeIn(500);
		$(obj).addClass("on").siblings().removeClass("on");
	});
};

//input type file
var rvbtn = ' <button type="button" class="input_st c1 re removeF" onclick="fileDiv.delBtn(this)">파일제거</button>';
var fileDiv = {
	inputFile : function(target){
		var t = $(target);
		var p = t.parent();
		var n = t.val();
		if(n != ""){
			t.next().val(n);
			p.after(rvbtn);
		}else{
			t.next().val('');
		}
	},
	delBtn : function(target){
		var t = $(target);
		var p = t.parent();
		var n = t.val();
		t.prev().find("input").val('');
		t.remove();
	}
};

//toggle 클릭 스크립트
$.fn.clickToggle = function(a, b) {
	return this.each(function() {
		var clicked = false;
		$(this).click(function() {
			if (clicked) {
				clicked = false;
				return b.apply(this, arguments);
			}
			clicked = true;
			return a.apply(this, arguments);
		});
	});
};

//슬라이드 게시판
function boardFaq(BSbtn){
	var BStit = BSbtn.parents(".BStit");
	var BScon = BStit.next(".BScon");
	if(BScon.css("display")=="none"){
		BScon.slideDown(100).siblings(".BScon").hide();
		BStit.addClass("on").siblings(".BStit").removeClass("on");
	}else{
		BScon.hide();
		BStit.removeClass("on");
	}
};

//]]>
