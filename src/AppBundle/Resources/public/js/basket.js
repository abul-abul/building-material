$(document).ready(function () {



    var debug = $('body').data('debug');
    var prefix;
    if(debug){
        prefix = '/app_dev.php';
    }
    else{
        prefix = '';
    }

    $('.add_basket').click(function () {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'POST',
            url: prefix+'/add-basket',
            data: {id:id},
            success:function (data) {

            }
        })
    })



})