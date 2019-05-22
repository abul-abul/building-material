$(document).ready(function () {
    var debug = $('body').data('debug');
    var prefix;
    if(debug){
        prefix = '/app_dev.php';
    }
    else{
        prefix = '';
    }

    $('.product_modal_view').click(function () {
        var id = $(this).attr('data-id');
        var image = $(this).attr('data-image')
        // $('.large_silder_product').html(' ');

        // $('.small_silder_product').html(' ')
        $.ajax({
            type: 'POST',
            url: prefix+'/one-product',
            data: {id:id},
            success:function (data) {

                imgHtml = '<img src='+image+'>'
                $('.pro-large-img').html(imgHtml)
                console.log(data)
                html=''
                html1=''
                $('.product_modal_title').text(data.name)
                if(data.rebate == null){
                    $('.product_modal_price').text(data.price)
                }else{
                    $('.product_modal_price').text(data.rebate)
                }

                $('.product_modal_desc').text(data.description)

                $.each( data.image, function( i, val ){
                    html+='<div class="pro-large-img"><img src='+val+'></div>'
                    html1+=' <div class="pro-nav-thumb"><img src='+val+'></div>'
                });
                // console.log(html)
                // console.log(html1)
                // $('.large_silder_product').html(html)
                // $('.small_silder_product').html(html1)

            }
        })
    })


})