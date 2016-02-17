(function ($) {
    
    'use strict';
    
    // settings/defaults
    
    $.fn.ajaxForms = function (options) {
        var settings = $.extend({}, defaults, options);
    };
    
    $.fn.ajaxForms.defaults = {
        inputSuccess: function (data, $input, $success, $danger) {
            var $formGroup = $input.parentsUntil('.form-group'),
                isValid = data['isValid'],
                message = data['message'];
            
            if(isValid){
                $formGroup.removeClass($.fn.ajaxForms.defaults.hasError);
                $formGroup.addClass($.fn.ajaxForms.defaults.hasSuccess);
                $success.removeClass($.fn.ajaxForms.defaults.hiddenClass);
                $danger.addClass($.fn.ajaxForms.defaults.hiddenClass);
            } else {
                $formGroup.addClass($.fn.ajaxForms.defaults.hasError);
                $formGroup.removeClass($.fn.ajaxForms.defaults.hasSuccess);
                $danger.removeClass($.fn.ajaxForms.defaults.hiddenClass);
                $success.addClass($.fn.ajaxForms.defaults.hiddenClass);
            }
        },
        inputError: function (error, $input) {
            console.log('input error');
        },
        inputAlways: function ($input, $spinner) {
            $spinner.addClass($.fn.ajaxForms.defaults.hiddenClass);
        },
        inputEvent: 'change',
        hiddenClass: 'hidden',
        hasSuccess: 'has-success',
        hasError: 'has-error'
    };
    
    // private functions
    
    function validateInput ($input) {
        var $spinner = $('#' + $input.attr('spinner')),
            $success = $('#' + $input.attr('success')),
            $danger = $('#' + $input.attr('danger'));
        
        $danger.addClass($.fn.ajaxForms.defaults.hiddenClass);
        $success.addClass($.fn.ajaxForms.defaults.hiddenClass);
        $spinner.removeClass($.fn.ajaxForms.defaults.hiddenClass);
        
        $.ajax({
            url: $input.attr('validate-ajax'),
            data: $input.attr('name') + '=' + $input.val()
        })
        .error(function (error) {
            $.fn.ajaxForms.defaults.inputError(error, $input)
        })
        .success(function (data) {
            $.fn.ajaxForms.defaults.inputSuccess(data, $input, $success, $danger);
        })
        .always(function () {
            $.fn.ajaxForms.defaults.inputAlways($input, $spinner);
        });
    };
    
    // events
    
    $(document).on($.fn.ajaxForms.defaults.inputEvent, 'input[validate-ajax]', function (event) {
        validateInput($(this));
    });
    
}(jQuery));