(function ($) {
    
    'use strict';
    
    // settings/defaults
    
    $.fn.ajaxForms = function (options) {
        
        var settings = $.extend({}, defaults, options);
        
    };
    
    $.fn.ajaxForms.defaults = {
        formSuccess: function (data, $form) {
            console.log('success');
        },
        formError: function (error, $form) {
            console.log('form error');
            alert(error);
        },
        formAlways: function ($form, $spinner) {
            console.log('form always');
            $spinner.addClass($.fn.ajaxForms.defaults.hiddenClass);
        },
        inputSuccess: function (data, $input) {
            console.log('input success');
        },
        inputError: function (error, $input) {
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
        var $spinner = $($form.attr('spinner'));
        $spinner.removeClass($.fn.ajaxForms.defaults.hiddenClass);
        $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize()
        })
        .error(function (error) {
            $.fn.ajaxForms.defaults.formError(error, $form);
        })
        .success(function(data) {
            $.fn.ajaxForms.defaults.formSuccess(data, $form);
        })
        .always($.fn.ajaxForms.defaults.formAlways($form, $spinner));
    };
    
    function validateInput ($input) {
        var $spinner = $($input.attr('spinner'));
        $spinner.removeClass($.fn.ajaxForms.defaults.hiddenClass);
        $.ajax({
            url: $input.attr('validate-ajax'),
            data: $input.val()
        })
        .error(function (error) {
            $.fn.ajaxForms.defaults.inputError(error, $input)
        })
        .success(function (data) {
            $.fn.ajaxForms.defaults.inputSuccess(data, $input);
        })
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