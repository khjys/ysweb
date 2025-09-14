
	function fnc_pay() {
		var f = document.frm;

		if (	f.str_paytype[0].checked) {
			document.getElementById("bank1").style.display = "";
			document.getElementById("bank2").style.display = "";
		} else {
			document.getElementById("bank1").style.display = "none";
			document.getElementById("bank2").style.display = "none";
		}
	}

	function Save_Click() {
		var free_check=$('#pay_free').val();
		if (ValidChk()==false) return;

		var a1 = $("input[name=str_agree]:checked").val();
		if (a1!="Y"){
			alert("개인정보취급방침에 동의하셔야 다음단계로 진행이됩니다.");
			return;
		}
	if(free_check!='Y') {
		if (document.frm.str_paytype[1].checked==true) {

//			if (document.frm.price.value=="0") {
//				alert("금액 0원은 카드결제가 불가능합니다.");
//				return;
//			}

//			document.frm.price.value = document.frm.int_price.value.replace(/\,/g,'');
//			document.frm.buyername.value = document.frm.str_name.value;
//			document.frm.buyeremail.value = document.frm.str_email1.value+"@"+document.frm.str_email2.value;
//			document.frm.buyertel.value = document.frm.str_telep1.value+"-"+document.frm.str_telep2.value+"-"+document.frm.str_telep3.value;

//			if (pay(document.frm)==false) {
//				return;
//			}

			if(!confirm("신청 하시겠습니까?")) return;

			document.frm.action = "apply_proc.php";
			document.frm.submit();

		}  else {

			if(!confirm("신청 하시겠습니까?")) return;

			document.frm.action = "apply_proc.php";
			document.frm.submit();

		}
	} else {
		if(!confirm("신청 하시겠습니까?")) return;

		document.frm.action = "apply_proc.php";
		document.frm.submit();

	}
	}

	function ValidChk()	{
		var free_check=$('#pay_free').val();
		var f = document.frm;
		if(chkSpace(f.str_name.value)){
	       	alert("\n이름을 입력해 주세요.")
	   		f.str_name.focus();
	        return false;
	   	}
		if(chkSpace(f.str_birth.value)){
	       	alert("\n생년월일을 입력해 주세요.")
	   		f.str_birth.focus();
	        return false;
	   	}
		if(chkSpace(f.str_comname.value)){
	       	alert("\n회사기관명을 입력해 주세요.")
	   		f.str_comname.focus();
	        return false;
	   	}
		if(chkSpace(f.str_buso.value)){
	       	alert("\n부서를 입력해 주세요.")
	       	f.str_buso.focus();
	        return false;
	   	}
		if(chkSpace(f.str_jikwi.value)){
	       	alert("\n직위를 입력해 주세요.")
	       	f.str_jikwi.focus();
	        return false;
	   	}
		if(chkSpace(f.str_email1.value)){
	   		alert("\n이메일를 입력해 주세요.");
	        f.str_email1.focus();
	        return false;
	    }
		if(chkSpace(f.str_email2.value)){
	   		alert("\n이메일를 입력해 주세요.");
	        f.str_email2.focus();
	        return false;
	    }
	    if(str_email_check()==false) {
	        f.str_email1.focus();
	        return false;
		}
		if(f.str_hp1.selectedIndex==0){
	   		alert("\n휴대전화를 선택해 주세요.");
	        f.str_hp1.focus();
	        return false;
	    }
		if(chkSpace(f.str_hp2.value)){
	   		alert("\n휴대전화를 입력해 주세요.");
	        f.str_hp2.focus();
	        return false;
	    }
		if(chkSpace(f.str_hp3.value)){
	   		alert("\n휴대전화를 입력해 주세요.");
	        f.str_hp3.focus();
	        return false;
	    }
		if(f.str_telep1.selectedIndex==0){
	   		alert("\n회사전화를 선택해 주세요.");
	        f.str_telep1.focus();
	        return false;
	    }
		if(chkSpace(f.str_telep2.value)){
	   		alert("\n회사전화를 입력해 주세요.");
	        f.str_telep2.focus();
	        return false;
	    }
		if(chkSpace(f.str_telep3.value)){
	   		alert("\n회사전화를 입력해 주세요.");
	        f.str_telep3.focus();
	        return false;
	    }
	    /*
		if(f.str_fax1.selectedIndex==0){
	   		alert("\n팩스를 선택해 주세요.");
	        f.str_fax1.focus();
	        return false;
	    }
		if(chkSpace(f.str_fax2.value)){
	   		alert("\n팩스를 입력해 주세요.");
	        f.str_fax2.focus();
	        return false;
	    }
		if(chkSpace(f.str_fax3.value)){
	   		alert("\n팩스를 입력해 주세요.");
	        f.str_fax3.focus();
	        return false;
	    }
		*/
		if(chkSpace(f.str_addr.value)){
	   		alert("\n회사주소를 입력해 주세요.");
	        f.str_addr.focus();
	        return false;
	    }
		if(chkSpace(f.str_address.value)){
	   		alert("\n회사주소를 입력해 주세요.");
	        f.str_address.focus();
	        return false;
	    }
			if(free_check!='Y'){
	    if (	f.str_paytype[0].checked) {
			if(chkSpace(f.str_aname.value)){
		   		alert("\n입금자명을 입력해 주세요1.");
		        f.str_aname.focus();
		        return false;
		    }
	    }
			}

		return true;
	}

	function fnc_semail1(str_value) {
		if (str_value == "") {
			document.frm.str_email2.value = "";
		} else {
			document.frm.str_email2.value = str_value;
		}
	}
	function str_email_check() {
	   	if(!isValidEmail(document.frm.str_email1.value+"@"+document.frm.str_email2.value)){
	   		alert("\n정확한 이메일 주소를 입력하세요.");
			document.frm.str_email1.value="";
			return false;
		}
		return true;
	}

	// 입력값이 이메일 형식인지 체크
	function isValidEmail(input) {
	//    var format = /^(\S+)@(\S+)\.([A-Za-z]+)$/;
	    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
	    return isValidFormat(input,format);
	}

	// 입력값이 사용자가 정의한 포맷 형식인지 체크
	function isValidFormat(input,format) {
		  if (input.search(format) != -1) {
	        return true; //올바른 포맷 형식
	    }
	    return false;
	}

	var openwin;
	function pay(frm) {
		if(document.frm.clickcontrol.value == "enable") {

			if(document.INIpay == null || document.INIpay.object == null)  {
				alert("\n이니페이 플러그인 128이 설치되지 않았습니다. \n\n안전한 결제를 위하여 이니페이 플러그인 128의 설치가 필요합니다. \n\n다시 설치하시려면 Ctrl + F5키를 누르시거나 메뉴의 [보기/새로고침]을 선택하여 주십시오.");
				return false;
			} else {

				if (MakePayMessage(frm)) {
					disable_click();
					openwin = window.open("childwin.html","childwin","width=299,height=149");
					return true;
				} else {
					alert("결제를 취소하셨습니다.");
					return false;
				}
			}
		} else {
			return false;
		}
	}

	function enable_click() {
		document.frm.clickcontrol.value = "enable"
	}

	function disable_click() {
		document.frm.clickcontrol.value = "disable"
	}

	function focus_control() {
		if(document.frm.clickcontrol.value == "disable")
			openwin.focus();
	}

	function fnc_dis() {
		var f = document.frm;

		if (f.int_comcode.value!="") {
			document.getElementById("str_comname").readOnly = true;
			document.getElementById("str_comname").style.background = "#eeeeee";
			document.getElementById("f_price").innerHTML = comma(document.frm.int_price2.value);
			document.getElementById("pr").innerHTML = "(할인대상)";
			document.frm.int_price.value = document.frm.int_price2.value;
			document.frm.price.value = document.frm.int_price2.value;
		}
	}
