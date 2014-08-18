$('.js-get-product').on('submit', function (e) {
    var $form = $(this);

    $('.js-proto').html('Loading...');

    $.ajax({
        dataType: "json",
        url: $form.attr('action'),
        data: $form.serialize()
    })
    .done(function (data) {
        $('.js-proto').html(JSON.stringify(data));
    })
    .fail(function (err) {
        console.log(err);
    });

    e.preventDefault();
});