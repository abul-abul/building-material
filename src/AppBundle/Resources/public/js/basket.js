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
               if(data != ' '){
                   location.reload()
               }
           //
            }
        })
    });

    $('.delete_baslet').click(function () {
        var id = $(this).attr('data-id')
        var row = $(this).parent();
        $.ajax({
            type: 'POST',
            url: prefix+'/delete-basket',
            data: {id:id},
            success:function (data) {
                row.hide();
            }
        })

    })

});