// JavaScript Document
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
$(function(){
	isPop = $("body").hasClass("pop");
});
//gotop
function goTop() {
	if(isPop){
		$("#mCSB_1_container").animate({ top: 0 }, 500);
	}else{
		$('body, html').animate({ scrollTop: 0 }, 500);
	}
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
	var bg = '<div class="layerBg"></div>'
	var frame ='<iframe class="layerFrame" src="'+url+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
	var wrap = '<div class="layerWrap">'+bg+frame+'</div>'
	$("body").append(wrap);
	$("html").css("overflow-y","hidden");
	$(".layerFrame").load(function(){
		$(".layerWrap").addClass("on")
	})
};
function layerClose(){
	$(".layerWrap").remove()
	$("html").css("overflow-y","scroll");
};
function popOpenC(u,w,h){
	var winW = window.screen.width;
	var winH = window.screen.height;
	var L = (winW-w)/2
	var T = (winH-h)/2
	window.open(u,'','width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
}
function layerImg(src,no){
	var img = $(".layerImg[data-no='"+no+"']").attr("src");
	var tit = $(".layerImgTit[data-no='"+no+"']").text();
	var src = src+"?img="+img+"&tit="+tit+"";
	layerOpen(src);
}







//
function checkWrap(i, obj, t){
	var wrap = $(".checkWrap");
	var check= $(obj).prop("checked");
	if(t==null){
		var target = ".check";
	}
	if(check==true){
		if(i=="all"){
			wrap.find(target).show();
		}else{
			wrap.find(target).hide();
			wrap.find(target+"[data-no='"+i+"']").show()
		}
	}
}
function addMsg(msg){
	$(".msgWrap").addClass("on");
	$(".msgWrap .msg").html(msg);
}
function toggleClass(obj,wrap,Class,other){
	if(!wrap){
		var wrap = (".toggleWrap");
	};
	if(!Class){
		var Class = "on";
	};
	if(other){
		$(obj).parents(wrap).siblings("").removeClass(Class);
	};
	$(obj).parents(wrap).toggleClass(Class);
}
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
}
