$(document).ready(function () {
    var debug = $('body').data('debug');
    var prefix;
    if(debug){
        prefix = '/app_dev.php';
    }
    else{
        prefix = '';
    }



    $('.request_call').click(function () {
        var call_name = $('.call_name').val();
        var call_phone = $('.call_phone').val();
         check_name = false;
         check_phone = false;
        if(call_name == ''){
            check_name = false
            $('.call_name').css('border','1px solid red')
        }else{
            check_name = true
            $('.call_name').css('border','1px solid #ccc')
        }

        if(call_phone == ''){
            check_phone = false;
            $('.call_phone').css('border','1px solid red')
        }else{
            check_phone = true
            $('.call_phone').css('border','1px solid #ccc')
        }

        if(check_name == true && check_phone == true){
            $.ajax({
                type: 'POST',
                url: prefix+'/call-request',
                data: {call_name:call_name,call_phone:call_phone},
                success:function (data) {
                   if(data.status == '200'){
                       $('.call_name').val(' ');
                       $('.call_phone').val(' ');
                       $('.close').trigger('click');
                   }
                }
            })
        }

    })


})