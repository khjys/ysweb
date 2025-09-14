//goBtn top,down
function goTop() {
	$('body, html').animate({ scrollTop: 0 }, 400);
}
function goDown() {
	$('body, html').animate({ scrollTop: $("#footer").offset().top }, 400);
}




//이전페이지로돌아가기
function goBack() {
  if (document.referrer) {
    location.href = document.referrer;
  } else if (history.length > 1) {
    history.back();
  } else {
    location.href = '/';
  }
}



//
function gsClass() {
	const gsClass = gsap.utils.toArray(".gsClass");
	gsClass.forEach((gsClass, i) => {
		gsap.to(gsClass, {
			scrollTrigger: {
				trigger: gsClass,
				toggleClass: { targets: gsClass, className: 'on' },
				start: "top 100%",
				end: "bottom top",
				scrub: 1,
			},
		});
	});
}



//
scrollLoad();
function scrollLoad(evt){
	window.addEventListener('load', function() {
		$("html").addClass("load");
		onScroll(evt);
	});
	let preScrollDir = 0;
	document.addEventListener('scroll', function() {
		onScroll(evt);
	});
	var latestKnownScrollY = 0,
	ticking = false;
	function onScroll(evt) {
		latestKnownScrollY = document.documentElement.scrollTop;
		requestTick();
		
	}
	function requestTick() {
		if(!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}
	function update() {
		ticking = false;
		if(latestKnownScrollY > 0){
			$("html").addClass("scroll");
		}else{
			$("html").removeClass("scroll");
		}
		if(evt){
			evtStart(evt);
		}
		let nextScrollDir = window.scrollY;
		if(preScrollDir < nextScrollDir) {
			$("html").removeClass("up");
		}
		else {
			$("html").addClass("up");
		}
		preScrollDir = nextScrollDir;
	}
	fcObj.headerGnb = function(){ 
		var obj = $("#header .gnb_wrap .gnb");			
		var header = $("#header");	
		if($("html").hasClass("scroll")){
			header.addClass("active");
		}else{
			header.removeClass("active");
			if(header.hasClass("gnbOpen")){
				header.addClass("active");
			};
		}
		obj.on("mouseenter focusin",function(){
			header.addClass("active").addClass('gnbOpen');			
		}).on("mouseleave",function(){
			header.removeClass('active').removeClass('gnbOpen');
			if($("html").hasClass("scroll")){
				header.addClass("active");
			}
		});
	}
}

