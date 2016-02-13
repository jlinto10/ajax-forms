# Ajax Form Validation (WIP)

I created this because I was working on a web appliaction where some custom field validation existed on both the frontend and backend. The purpose of this tool is to consolidate validation to the backend.

Also, there are some scenarios where you need the validation to occur in the backend. For example, if your validation requires a hit to the database, or some kind of server side action.

## How To

First, include `js/ajax-forms.js` like any other Jquery extension using the `script` tag.

#### The Input To Validate

**name** is the name of the URL encoded parameter

**validate-ajax** is the endpoint for the validation

**spinner** is the id of the spinner/loading element

    <input type="text" name="username" validate-ajax="http://localhost:2300/api/validate/username" spinner="usernameSpinner">
    
#### The Spinner

It's nice to provide some kind of feedback while the input is being validated. The spinner can be any kind of element. My example is using the spinner in Font Awesome.

    <span class="form-control-feedback">
        <i id="usernameSpinner" class="fa fa-spinner fa-spin hidden"></i>
    </span>

Note: the default hidden class happens to be `hidden`. This can be set to something else.

#### The Validation Endpoint 

##### The Request

The `name` attribute is used to name the URL encoded parameters. Therefore the example input above would generate the following GET request : 

`http://localhost:2300/api/validate/username?username={valueEntered}`

##### The Response

If you wish to use the default input validation functions, the validation endpoints must return json in the following format :

    {
        "isValid" : true, // a boolean for the validity of the field
        "message" : "The resulting message" // a helpful message if the field is not valid
    }
