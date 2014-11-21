(function ($) {
    
    'use strict';
    
    // settings/defaults
    
    $.fn.ajaxForms = function (options) {
        
        var settings = $.extend({}, defaults, options);
        
    };
    
    $.fn.ajaxForms.defaults = {
        formSuccess: function ($form, data) {
            console.log('success');
        },
        formError: function ($form, error) {
            console.log('form error');
        },
        formAlways: function ($form) {
            console.log('form always');
        },
        inputSuccess: function ($input, data) {
            console.log('input success');
        },
        inputError: function ($input, error) {
            console.log('input error');
        },
        inputAlways: function ($input, $spinner) {
            console.log('input always');
            $spinner.addClass($.fn.ajaxForms.defaults.hiddenClass);
        },
        inputEvent: 'change',
        hiddenClass: 'hidden'
    };
    
    // private functions
    
    function submitForm ($form) {
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize()
        })
        .error($.fn.ajaxForms.defaults.formError($form))
        .success($.fn.ajaxForms.defaults.formSuccess($form))
        .always($.fn.ajaxForms.defaults.formAlways($form));
    };
    
    function validateInput ($input) {
        var $spinner = $($input.attr('spinner'));
        $spinner.removeClass($.fn.ajaxForms.defaults.hiddenClass);
        $.ajax({
            url: $input.attr('validate-ajax'),
            data: $input.val()
        })
        .error($.fn.ajaxForms.defaults.inputError($input))
        .success($.fn.ajaxForms.defaults.inputSuccess($input))
        .always($.fn.ajaxForms.defaults.inputAlways($input, $spinner));
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