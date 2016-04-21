
$(document).ready(function(){
    
    /*
    
        // data = json from validation endpoint
        // $alert = the element that we show when there is a problem
        // $input = the input that we are validating
        // $formGroup = the form group that this input belongs to
        // $success = the success element associated with this input
        // $danger = the danger element associated with this input
        inputSuccess : function (data, $alert, $input, $formGroup, $success, $danger)

        // textStatus = (from jquery)
        // errorThrown = (from jquery)
        // $alert = the element that we show when an error occurs
        // url = the url of the endpoint where we are validating
        // data = the data from the endpoint
        // $formGroup = the form group that this input belongs to
        inputError : function (textStatus, errorThrown, $alert, url, data, $formGroup)

        // $input = the input that we are validating
        // $spinner = the spinner element
        inputAlways : function ($input, $spinner)

        // The jquery event that will trigger the validation
        inputEvent : 'change'

        // Our hidden class
        hiddenClass : 'hidden'

        // The success class (Bootstrap)
        hasSuccess : 'has-success'

        // The error class (Bootstrap)
        hasError : 'has-error'

        // The input parent. This is where we decorate the input with success or error
        inputParent : 'form-group'

        // The id of the validation error dialogue
        validationAlert : 'validationAlert'


        // The message to show inside the validation error element
        errorMessage : '<i class="fa fa-exclamation-triangle "></i> There was a problem validating user input.'
    
    */
    
    // This is how we override the default values
    
    $.fn.inputValidation({
        errorMessage : 'Something bad happened...'
    });
    
});