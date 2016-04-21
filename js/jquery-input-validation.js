(function ($) {
    
    'use strict';
    
    // settings/defaults
    
    $.fn.inputValidation = function (options) {
        
        var defaults = $.extend({}, $.fn.inputValidation.defaults, options);
        
        $.fn.inputValidation.defaults = defaults;
        
    };
    
    $.fn.inputValidation.defaults = {
        
        inputSuccess: function (data, $alert, $input, $formGroup, $success, $danger) {
            
            var isValid = data.isValid,
                message = data.message;
            
            $alert.addClass($.fn.inputValidation.defaults.hiddenClass);
            
            if (isValid) {
                
                $formGroup.removeClass($.fn.inputValidation.defaults.hasError);
                
                $formGroup.addClass($.fn.inputValidation.defaults.hasSuccess);
                
                $success.removeClass($.fn.inputValidation.defaults.hiddenClass);
                
                $danger.addClass($.fn.inputValidation.defaults.hiddenClass);
                
            } else {
                
                $formGroup.addClass($.fn.inputValidation.defaults.hasError);
                
                $formGroup.removeClass($.fn.inputValidation.defaults.hasSuccess);
                
                $danger.removeClass($.fn.inputValidation.defaults.hiddenClass);
                
                $success.addClass($.fn.inputValidation.defaults.hiddenClass);
                
                $danger.attr('data-content', message);
                
                $danger.popover('show');
                
            }
        },
        
        inputError: function (textStatus, errorThrown, $alert, url, data, $formGroup) {
            
            $formGroup.addClass($.fn.inputValidation.defaults.hasError);
            
            $formGroup.removeClass($.fn.inputValidation.defaults.hasSuccess);
            
            $alert.html($.fn.inputValidation.defaults.errorMessage);
            
            $alert.removeClass($.fn.inputValidation.defaults.hiddenClass);
            
            /*
            
            // For debugging purposes
            
            console.log('URL : ' + url);
            console.log('Data : ' + data);
            console.log('textStatus : ' + JSON.stringify(textStatus));
            console.log('errorThrown : ' + JSON.stringify(errorThrown));
            
            */
        },
        
        inputAlways: function ($input, $spinner) {
            
            $spinner.addClass($.fn.inputValidation.defaults.hiddenClass);
            
        },
        
        inputEvent: 'change',
        
        hiddenClass: 'hidden',
        
        hasSuccess: 'has-success',
        
        hasError: 'has-error',
        
        inputParent: 'form-group',
        
        validationAlert: 'validationAlert',
        
        errorMessage: '<i class="fa fa-exclamation-triangle "></i> There was a problem validating user input.'
    };
    
    // private functions
    
    function validateInput($input) {
        
        var $spinner = $('#' + $input.attr('spinner')),
            $success = $('#' + $input.attr('success')),
            $danger = $('#' + $input.attr('danger')),
            $alert = $('#' + $.fn.inputValidation.defaults.validationAlert),
            $formGroup = $input.parentsUntil('.' + $.fn.inputValidation.defaults.inputParent),
            url = $input.attr('validate-ajax'),
            data = $input.attr('name') + '=' + $input.val();
        
        $danger.popover('hide');
        
        $danger.addClass($.fn.inputValidation.defaults.hiddenClass);
        
        $success.addClass($.fn.inputValidation.defaults.hiddenClass);
        
        $spinner.removeClass($.fn.inputValidation.defaults.hiddenClass);
        
        $.ajax({
            url: url,
            data: data
        })
        .error(function (textStatus, errorThrown) {
            $.fn.inputValidation.defaults.inputError(textStatus, errorThrown, $alert, url, data, $formGroup);
        })
        .success(function (data) {
            $.fn.inputValidation.defaults.inputSuccess(data, $alert, $input, $formGroup, $success, $danger);
        })
        .always(function () {
            $.fn.inputValidation.defaults.inputAlways($input, $spinner);
        });
    }
    
    // events
    
    $(document).on($.fn.inputValidation.defaults.inputEvent, 'input[validate-ajax]', function (event) {
        validateInput($(this));
    });
    
}(jQuery));
