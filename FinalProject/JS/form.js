$(document).ready(function() {
	var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
    $("#submit").click(function(evt){
        var arrivalDate = $("#arrival_date").val().trim();
        var nights = $("#months").val().trim();
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var phone = $("#phone").val().trim();
        var valid = true;
        if(!arrivalDate)
            {
                $("#arrival_date").next().text("You forgot this!");
                $("#arrival_date").focus();
                valid = false;
            }
        else
            {
                $("#arrival_date").next().text("");
            }
        if(!months || isNaN(nights))
            {
                $("#months").next().text("You forgot this!");
                $("#months").focus();
                valid = false;
            }
        else
            {
                $("#months").next().text("");
            }
        if(!name)
            {
                $("#name").next().text("You forgot this!");
                $("#name").focus();
                valid = false;
            }
        else
            {
                $("#name").next().text("");
            }
         if(!email || !emailPattern.test(email))
            {
                $("#email").next().text("Must be a valid email address!");
                $("#email").focus();
                valid = false;
            }
        else
            {
                $("#email").next().text("");
            }
        if(!phone || isNaN(phone))
            {
                $("#phone").next().text("This field is required!");
                $("#phone").focus();
                valid = false;
            }
        else
            {
                $("#phone").next().text("");
            }
        console.log(valid);
        if(!valid)
            {
                evt.preventDefault();
            }
        });
		
}); // end ready