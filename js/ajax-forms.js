(function ($) {
    
    'use strict';
    
    // settings/defaults
    
    $.fn.ajaxForms = function (options) {
        
        var settings = $.extend({}, defaults, options);
    };
    
    $.fn.ajaxForms.defaults = {
        formSuccess: function (data) {
            console.log('success');
        },
        formError: function (error) {
            console.log('form error');
        },
        formAlways: function () {
            console.log('form always');
        },
        inputSuccess: function (data) {
            console.log('input success');
        },
        inputError: function (error) {
            console.log('input error');
        },
        inputAlways: function () {
            console.log('input always');
        },
        inputEvent: 'change'
    };
    
    // private functions
    
    function submitForm ($form) {
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize()
        })
        .error($.fn.ajaxForms.defaults.formError)
        .success($.fn.ajaxForms.defaults.formSuccess)
        .always($.fn.ajaxForms.defaults.formAlways);
    };
    
    function validateInput ($input) {
        $.ajax({
            url: $input.attr('validate-ajax'),
            data: $input.val()
        })
        .error($.fn.ajaxForms.defaults.inputError)
        .success($.fn.ajaxForms.defaults.inputSuccess)
        .always($.fn.ajaxForms.defaults.inputAlways);
    };
    
    // events
    
    $(document).on('submit', 'form.submit-ajax', function (event) {
        event.preventDefault();
        submitForm($(this));
    });
    
    $(document).on($.fn.ajaxForms.defaults.inputEvent, 'input[validate-ajax]', function (event) {
        validateInput($(this));
    });
    
}(jQuery));