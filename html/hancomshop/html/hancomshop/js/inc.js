// JavaScript Document

var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
$(function(){
	isPop = $("body").hasClass("pop");
});

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
function layerImg(obj){
	var src = $(obj).attr("src");
	var img ='<img src="'+src+'" class="va" />'
	var wrap = '<div class="layer_wrap_img va_wrap" onclick="layerImgClose(this)">'+img+'</div>'
	$("body").append(wrap);
};
function layerImgClose(obj){
	$(obj).remove();
};
function popOpenC(u,w,h){
	var winW = window.screen.width;
	var winH = window.screen.height;
	var L = (winW-w)/2
	var T = (winH-h)/2
	window.open(u,'','width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
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
function toggleClass(obj,wrap){
	if(!wrap){
		var wrap = (".toggleWrap");
	}
	$(obj).parents(wrap).toggleClass("on")
	
	if($(obj).parents("ul").hasClass("mall_nav")){
		$(obj).parents(wrap).siblings().removeClass("on");
	}
}
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
function telLink(no,obj){
	if(isMobile) {
		var tel = no.split('-');
		$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]);
	}
};
function listProdView(type,obj){
	var wrap = $(".listProdView");
	$(obj).parent().addClass("on");
	$(obj).parent().siblings().removeClass("on");
	$(wrap).removeClass("img").removeClass("list").addClass(type)
}
function linkScroll(no){
	var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
	var headerH = 0;
	$('body, html').animate({ scrollTop: Y-headerH-20 }, 500);
}
function scrollFix(obj,p){
	var offset = $(obj).offset().top;
	var objH = $(obj).outerHeight();
	var docH = $(document).height();
	if(!p){
		p = 0;
	}
	var footerH = $("#footer").outerHeight()+p;
	var headerH = 0;
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
}
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
function labelShow(obj,no,wrap){
	if(!wrap){
		var wrap = ".labelShow";
	}
	if($(obj).prop("checked")==true){
		$(wrap).hide();
		$(wrap+"[data-no='"+no+"']").show();
	}else{
		$(wrap).hide();
	}
}
function labelCheck(obj,no,wrap,st){
	var target = $(wrap+"[data-no='"+no+"']").find("input, textarea, select").not(obj);
	var typechk = $(wrap+"[data-no='"+no+"']").find("input").prop("type");
	if(!wrap){
		var wrap = ".labelCheck";
	}
	if($(obj).prop("checked")==st){
		target.attr("disabled","disabled");
		target.prop("checked",false);
		if(typechk!="checkbox" && typechk!="radio"){
			target.val("");
		}
	}else{
		target.removeAttr("disabled");
	}
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
function aniNum(obj){
	if(!obj){ var obj = '.aniNum';};
	$(obj).counterUp({
		delay: 50,
		time: 700
	});
}
function bgMove(wrap,target){
	var obj = $("."+wrap+"").find(".bgMove");
	$("."+wrap+"").find(target).mouseenter(function(){
		var L = $(this).position().left;
		var W = $(this).outerWidth();
		obj.css("width",W).css("left",L).addClass("on");
	})
	$("."+wrap+"").mouseleave(function(){
		obj.css("left","").removeClass("on");
	})
}
function subLnbSize(){
	var obj = $("#contents .subLnbSize");
	if(obj.length > 0){
	var objL = obj.position().left;
	var wrapS = obj.parents(".box1").outerWidth();
	obj.css("width",wrapS-objL)
	}
}
function addRow(obj,del,copy){
	var objC = ".addRow";
	var wrap = $(obj).parents(objC);
	var clone = wrap.clone();
	if(del){
		var i = wrap.siblings(objC).length;
		if(i > 0){
			wrap.remove();
		}else{
			alert("더이상 삭제할 수 없습니다.")
		}
	}else{
		wrap.after(clone);
	}
	if(copy){
		wrap.find("select").each(function(){
			var N =$(this).attr("name");
			var V = $(this).find(":selected").val();
			wrap.next(objC).find("select[name="+N+"]").val(V);
		});
	}else{
		wrap.next(objC).find("input,select,textarea").not("input[type=button],button").val('');
		wrap.next(objC).find("input").removeClass("hasDatepicker");
	}
}
$(function(){
	$(".ttAppend").each(function(){
		var tt = $(this).text();
		var ttArr = tt.split('/');
		$(this).text("")
		for(i=0; i<ttArr.length; i++){
			if(i>0){
				var ttAfter = "<em>/</em><em>"+ ttArr[i] + "</em>";
			}else{
				var ttAfter = "<em>"+ ttArr[i] + "</em>";
			}
			$(this).append(ttAfter);
		};
	})
	$(".cartNo").each(function(){
		var cartT = $(this).text();
		if(cartT.length > 2){
			$(this).text("99").addClass("plus");
		}
	});
	subGnbSize();
	function subGnbSize(){
		var obj = $("#contents .sub_gnb .gnb > li.on .dp2 > li");
		var objL = obj.length;
		obj.css("width",100/objL+"%");
		if(obj.hasClass("on")){
			obj.parents(".sub_top_wrap").addClass("size")
		}
	}
	allWrap();
	function allWrap(){
		var wrap = $("#header .menu_wrap .all_wrap")
		var obj = wrap.find(".gnb > li .dp2");
		var cN = "more";
		var more = '<a class="moreBtn"></a>'
		obj.each(function(){
			var i = $(this).children("li").length;
			if(i > 4){
				$(this).addClass(cN);
				$(this).after(more);
			}
		})
		var subBtn = wrap.find(".moreBtn");
		subBtn.click(function(){
			$(this).prev(".dp2").toggleClass(cN);
		})
		var moreST;
		var aBtn = wrap.find(".moreAll");
		aBtn.click(function(){
			if(moreST==false){
				obj.addClass(cN);
				$(this).removeClass(cN);
				moreST = true;
			}
			else{
				obj.removeClass(cN);
				$(this).addClass(cN);
				moreST = false;
			}
		});
	}
})

function Comwish(cid, md){
	$.post("../dev/regajax.php", {"rmode" : "comwish", "comid" : cid}, function(msg) {
		if(msg=="N"){
			alert("이미 관심업체에 등록된 업체입니다.");
		}else if(msg=="login"){
			alert("로그인 후 가능합니다.");
		}else{
			alert("등록되었습니다.");
			if (md=="C"){
				$("#comwishNo").html(msg);
				aniNum();
			}
		}
	});
}

function ComProwish(pid, cid){
	$.post("../dev/regajax.php", {"rmode" : "comprowish", "p_idx" : pid, "comid" : cid}, function(msg) {
		if(msg=="N"){
			alert("이미 관심제품에 등록된 제품입니다.");
		}else if(msg=="login"){
			alert("로그인 후 가능합니다.");
		}else{
			alert("등록되었습니다.");
		}
	});
}
