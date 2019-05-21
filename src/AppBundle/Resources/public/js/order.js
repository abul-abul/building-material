$(document).ready(function () {
    $('.order_product').click(function () {
       var count = $('.add_product_count').val();
       $('.product_count').val(count);
       $(this).attr('type','submit')

    })
})