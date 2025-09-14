$(document).ready(function() {
  $.validator.addMethod("com_sn", function(value, element) { // 사업자번호 정규식
		if(!value) return true;
		// var format = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/;
		var format = /^\d{3}-\d{2}-\d{5}$/;
		return format.test(value);
	});
  $('#joinFormA').validate({
    rules: {
      user_id: {
        required: true,
        rangelength: [4, 16],
        remote: {
          type: "post",
          url: "../dev/auth_user_info.php"
        }
      },
      user_pw: {
        required: true,
        rangelength: [6, 20]
      },
      user_pw2: {
        required: true,
        equalTo: "#user_pw"
      },
      user_name: {
        required: true
      },
      user_email: {
      },
      user_addr: {
        required: true
      },
      user_addr2: {
        required: true
      }
    },
    messages: {
      user_id: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디는 최소 : {0}자, 최대 : {1}자 입니다.]</span>",
				remote: " <span style='color: #FF0000'>[이미 등록된 아이디입니다.]</span>"
			},
      user_pw: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호는 최소 : {0}자, 최대 : {1}자 입니다.]</span>"
			},
			user_pw2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 다시 확인해주세요.]</span>",
				equalTo: " <span style='color: #FF0000; z-index: 100;position: relative;'>[위 비밀번호와 동일하지 않습니다.]</span>"
			},
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이름을 입력해주세요.]</span>"
			},
			user_email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>",
				email: " <span style='color: #FF0000; z-index: 100;position: relative;'>[올바른 이메일 형식이 아닙니다.]</span>"
			},
			user_addr: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[우편번호찾기를 통해 주소를 입력해주세요.]</span>"
			},
			user_addr2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[주소를 입력해주세요.]</span>"
			}
    },
    submitHandler: function(form) {
      if(!checkForm(form)){
				return false;
			}
      if(!$('#agree').is(':checked')) {
        alert('이용약관에 동의해주세요.');
        $('#agree').focus();
        return false;
      }
      if(!$('#privacy').is(':checked')) {
        alert('개인정보처리방침에 동의해주세요.');
        $('#privacy').focus();
        return false;
      }
      $('#submitBox').hide();
      return true;
    }
  })
  $('#joinFormeditA').validate({
    rules: {
	ori_passwd: {
		required: true,
	},
  user_pw: {
	rangelength: [6, 20]
  },
  user_pw2: {
	equalTo: "#user_pw"
  },
      user_name: {
        required: true
      },
      user_email: {
      },
      user_addr: {
        required: true
      },
      user_addr2: {
        required: true
      }
    },
    messages: {
		ori_passwd: {
			required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>"
		},
		user_pw: {
			required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
			rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호는 최소 : {0}자, 최대 : {1}자 입니다.]</span>"
		},
		user_pw2: {
			required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 다시 확인해주세요.]</span>",
			equalTo: " <span style='color: #FF0000; z-index: 100;position: relative;'>[위 비밀번호와 동일하지 않습니다.]</span>"
		},
		user_email: {
			required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>",
			email: " <span style='color: #FF0000; z-index: 100;position: relative;'>[올바른 이메일 형식이 아닙니다.]</span>"
		},
		user_addr: {
			required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[우편번호찾기를 통해 주소를 입력해주세요.]</span>"
		},
		user_addr2: {
			required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[주소를 입력해주세요.]</span>"
		}
    },
    submitHandler: function(form) {
      if(!checkForm(form)){
				return false;
		}
      $('#submitBox').hide();
      return true;
    }
  })
  $('#joinFormB').validate({
    rules: {
      user_id: {
        required: true,
        rangelength: [4, 16],
        remote: {
          type: "post",
          url: "../dev/auth_user_info.php"
        }
      },
      user_pw: {
        required: true,
        rangelength: [6, 20]
      },
      user_pw2: {
        required: true,
        equalTo: "#user_pw"
      },
      user_name: {
        required: true
      },
      user_ceo: {
        required: true
      },
      user_num: {
        required: true,
        com_sn: true
      },
      user_upj: {
        required: true
      },
      user_upt: {
        required: true
      },
      user_man: {
        required: true
      },
      user_email: {
      },
      user_addr: {
        required: true
      },
      user_addr2: {
        required: false
      }
    },
    messages: {
      user_id: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디는 최소 : {0}자, 최대 : {1}자 입니다.]</span>",
				remote: " <span style='color: #FF0000'>[이미 등록된 아이디입니다.]</span>"
			},
      user_pw: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호는 최소 : {0}자, 최대 : {1}자 입니다.]</span>"
			},
			user_pw2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 다시 확인해주세요.]</span>",
				equalTo: " <span style='color: #FF0000; z-index: 100;position: relative;'>[위 비밀번호와 동일하지 않습니다.]</span>"
			},
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[회사명을 입력해주세요.]</span>"
			},
      user_ceo: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[대표자명을 입력해주세요.]</span>"
			},
      user_num: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[사업자등록번호를 입력해주세요.]</span>",
				com_sn: " <span style='color: #FF0000; z-index: 100;position: relative;'>[사업자등록번호가 잘못되었습니다.]</span>"
			},
      user_upj: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[업종을 입력해주세요.]</span>"
			},
      user_upt: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[업태를 입력해주세요.]</span>"
			},
      user_man: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[담당자명을 입력해주세요.]</span>"
			},
			user_email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>",
				email: " <span style='color: #FF0000; z-index: 100;position: relative;'>[올바른 이메일 형식이 아닙니다.]</span>"
			},
      user_addr: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[주소를 입력해주세요.]</span>"
			},
      user_addr2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[상세주소를 입력해주세요.]</span>"
			}
    },
    submitHandler: function(form) {
      if(!checkForm(form)){
				return false;
			}
      if(!$('#agree').is(':checked')) {
        alert('이용약관에 동의해주세요.');
        $('#agree').focus();
        return false;
      }
      if(!$('#privacy').is(':checked')) {
        alert('개인정보처리방침에 동의해주세요.');
        $('#privacy').focus();
        return false;
      }
      $('#submitBox').hide();
      return true;
    }
  })
  $('#loginFormA').validate({
    rules: {
      user_id: {
        required: true
      },
      user_pw: {
        required: true
      }
    },
    messages: {
      user_id: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디를 입력해주세요.]</span>"
			},
      user_pw: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>"
			}
    }
  })
  $('#loginFormB').validate({
    rules: {
      user_id: {
        required: true
      },
      user_pw: {
        required: true
      }
    },
    messages: {
      user_id: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[아이디를 입력해주세요.]</span>"
			},
      user_pw: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>"
			}
    }
  })
  $('#findFormA').validate({
    rules: {
      user_name: {
        required: true
      },
      user_email: {
        required: true
      }
    },
    messages: {
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이름을 입력해주세요.]</span>"
			},
      user_email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>"
			}
    }
  })
  $('#findFormB').validate({
    rules: {
      user_name: {
        required: true
      },
      user_email: {
        required: true
      }
    },
    messages: {
      user_name: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[회사명을 입력해주세요.]</span>"
			},
      user_email: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[이메일을 입력해주세요.]</span>"
			}
    }
  })
  $('#cpForm').validate({
    rules: {
      passwd_ori: {
        required: true
      },
      passwd_new: {
        required: true,
        rangelength: [6, 20]
      },
      passwd_new2: {
        required: true,
        equalTo: "#passwd_new"
      }
    },
    messages: {
      passwd_new: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>",
				rangelength: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호는 최소 : {0}자, 최대 : {1}자 입니다.]</span>"
			},
			passwd_new2: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 다시 확인해주세요.]</span>",
				equalTo: " <span style='color: #FF0000; z-index: 100;position: relative;'>[위 비밀번호와 동일하지 않습니다.]</span>"
			},
      passwd_ori: {
				required: " <span style='color: #FF0000; z-index: 100;position: relative;'>[비밀번호를 입력해주세요.]</span>"
			},
    }
  })
});
