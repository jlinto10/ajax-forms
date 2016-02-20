(function ($) {
    
    'use strict';
    
    // settings/defaults
    
    $.fn.ajaxForms = function (options) {
        var settings = $.extend({}, defaults, options);
    };
    
    $.fn.ajaxForms.defaults = {
        inputSuccess: function (data, $alert, $input, $formGroup, $success, $danger) {
            
            var isValid = data['isValid'],
                message = data['message'];
            
            $alert.addClass($.fn.ajaxForms.defaults.hiddenClass);
            
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
                $danger.attr('data-content', message);
                $danger.popover('show');
                
            }
        },
        inputError: function (textStatus, errorThrown, $alert, url, data, $formGroup) {
            
            $formGroup.addClass($.fn.ajaxForms.defaults.hasError);
            $formGroup.removeClass($.fn.ajaxForms.defaults.hasSuccess);
            
            var message = '<i class="fa fa-exclamation-triangle "></i> There was a problem validating user input. (&#x2323;_&#x2323;&#x201D;)';
            
            $alert.html(message);
            $alert.removeClass($.fn.ajaxForms.defaults.hiddenClass);
            
            console.log('URL : ' + url);
            console.log('Data : ' + data);
            console.log('textStatus : ' + JSON.stringify(textStatus));
            console.log('errorThrown : ' + JSON.stringify(errorThrown));
            
        },
        inputAlways: function ($input, $spinner) {
            
            $spinner.addClass($.fn.ajaxForms.defaults.hiddenClass);
            
        },
        inputEvent: 'change',
        hiddenClass: 'hidden',
        hasSuccess: 'has-success',
        hasError: 'has-error',
        inputParent: 'form-group',
        validationAlert: 'validationAlert'
    };
    
    // private functions
    
    function validateInput ($input) {
        var $spinner = $('#' + $input.attr('spinner')),
            $success = $('#' + $input.attr('success')),
            $danger = $('#' + $input.attr('danger')),
            $alert = $('#' + $.fn.ajaxForms.defaults.validationAlert),
            $formGroup = $input.parentsUntil('.' + $.fn.ajaxForms.defaults.inputParent),
            url = $input.attr('validate-ajax'),
            data = $input.attr('name') + '=' + $input.val();
        
        $danger.popover('hide');
        $danger.addClass($.fn.ajaxForms.defaults.hiddenClass);
        $success.addClass($.fn.ajaxForms.defaults.hiddenClass);
        $spinner.removeClass($.fn.ajaxForms.defaults.hiddenClass);
        
        $.ajax({
            url: url,
            data: data
        })
        .error(function (textStatus, errorThrown) {
            $.fn.ajaxForms.defaults.inputError(textStatus, errorThrown, $alert, url, data, $formGroup)
        })
        .success(function (data) {
            $.fn.ajaxForms.defaults.inputSuccess(data, $alert, $input, $formGroup, $success, $danger);
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