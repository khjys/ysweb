$(document).on("keyup blur focus keydown", "input:text[typeID]", function(){
 $(this).val( $(this).val().replace(/[^a-zA-Z0-9:\_]/gi,"") ); //영어숫자_만
});
$(document).on("keyup blur focus keydown", "input:text[email]", function(){
 $(this).val( $(this).val().replace(/[^a-zA-Z0-9:\.@_]/gi,"") ); //영어숫자_.만
});
$(document).on("keyup blur focus keydown", "input:text[typeNum]", function(){
 $(this).val( $(this).val().replace(/[^0-9]/gi,"") ); //숫자만
});
$(document).on("keyup blur focus keydown", "input:text[typeNum1]", function(){
 $(this).val( $(this).val().replace(/[^0-9\-\+]/gi,"") ); //숫자만
});
$(document).on("keyup blur focus keydown", "input:text[typeMoney]", function(){
 $(this).val( $(this).val().replace(/[^0-9:\,]/gi,"") ); //금액형식(숫자+,)
});
$(document).on("keyup blur focus keydown", "input:text[typeDate]", function(){
 $(this).val( $(this).val().replace(/[^0-9:\-]/gi,"") ); //날짜형식(숫자+-)
});
$(document).on("keyup blur focus keydown", "input:text[typeNKor]", function(){
 $(this).val( $(this).val().replace(/[^\!-z]/gi,"") ); //한글제한
});
$(document).on("keyup blur focus keydown", "input:text[typeEng]", function(){
 $(this).val( $(this).val().replace(/[^a-z]/gi,"") ); //영어만
});
$(document).on("keyup blur focus keydown", "input:text[typeKor]", function(){
 $(this).val( $(this).val().replace(/[^가-힣ㄱ-ㅎㅏ-ㅣ\)\(]/gi,"") ); //한글만
});
$(document).on("keyup blur focus keydown", "input:text[typeNSpec]", function(){
 $(this).val( $(this).val().replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi,"") ); //특수문자제한
});
$(document).on("keyup blur focus keydown", "input:text[Nnum]", function(){
 $(this).val( $(this).val().replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi,"") ); //한영
});
