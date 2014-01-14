//
// Early Access Form
//
var emailRules = {"email": {required: true, email: true}};
var emailMessages = {"email": "Please enter a valid email address"};

var highlight = function(element) {
    $(element).closest('.control-group').removeClass('success').addClass('error');
    $('#msgPlaceholder').removeClass('success').addClass('error');
    
}

var valid = function(element) {
    element
        .text('OK')
        .appendTo('#msgPlaceholder') 
	.addClass('valid')
	.closest('.control-group')
	.removeClass('error')
	.addClass('success');
    
}      

var errorPlacement = function(error, element) {
    $("#msgPlaceholder").html(message).addClass("text-error");

}

var success = function(data, textStatus, jqXHR) {
    // textStatus will always be parseError (ignore this, look at the status code)
    $('#email').val("");
    //$('#invite').hide();
    $('#inviteSuccess').removeClass('hide').addClass('in');

}

var error = function(jqXHR, textStatus, errorThrown) {
    $('#errorMsg').text(textStatus);
    $('#inviteError')
	.removeClass('hide')
	.addClass('in');
}

var postContactToGoogle = function() {
    var email = $('#email').val();
    $.ajax({
        url: "https://spreadsheets.google.com/formResponse",
        data: {"entry.0.single" : email,
	       formkey: "dGFCU2lzOTR4MFBkRjUwWDJZU1ZmMVE6MA"},
        type: "POST",
        dataType: "xml",
        statusCode: {
	    0: success,
	    200: success,
	    400: error,
	    401: error,
	    403: error,
	    404: error,
	    405: error,
	    409: error,
	    411: error,
	    412: error,
	    416: error,
	    500: error,
	    501: error,
	    503: error
        }
	//success: success,
	//error: submit returns html which generates a parseError so must use statusCode
    });
    
}

var setupFormValidation = function() {


    $("#formInvite").validate({
	debug: false,
	rules: emailRules,
	messages: emailMessages,
        highlight: highlight,
	success: valid,
	errorLabelContainer: "#msgPlaceholder",
	submitHandler: postContactToGoogle,
    });

    // don't use data-dismiss="alert" else you won't get feedback if submitted twice
    // https://github.com/twitter/bootstrap/issues/713
    $('.alert .close').on('click',function(){
    	$(this).parent().removeClass('in').addClass('hide');

    });

}



//
// Main
//


$(document).ready(function(){
    setupFormValidation();

});


    

