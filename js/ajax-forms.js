(function ($) {
    
    'use strict';
    
    $.fn.ajaxForms = function (options) {
        
    };
    
    // private functions
    function submitForm ($form) {
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize()
        })
        .error(function (error) {
            console.log(error);
        })
        .success(function (data) {
            console.log(data);
        })
        .always(function () {
            console.log('always');
        });
    };
    
    $(document).on('submit', 'form.submit-ajax', function (event) {
        event.preventDefault();
        console.log('form submitted');
        submitForm($(this));
    });
    
}(jQuery));