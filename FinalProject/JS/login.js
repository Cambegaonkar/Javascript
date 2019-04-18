var events=[{
      "id": 1,
      "title": "demo",
      "start": "2018-06-12"
  }];
function flag(){
    if(!window.sessionStorage.getItem("username")){
         window.location.replace("/Login.html");
        
    }
  }
function validate(){
     
    $.getJSON("/js/users.json", function (users){
        var flag1=false;
        $.each(users,function(i,value){
            if(value.username===$("#username").val()){
                if(value.password === $("#password").val()){
                    alert("Login Successfull");
                    $("#error").html("").hide();
                    flag1=true;
                    
                    window.localStorage.setItem("Events",JSON.stringify(events));
                    window.sessionStorage.setItem("username",value.username);
                    window.location.replace("/addEvent.html");
                }
            }
           
        });
        if(!flag1){
            $("#error").html("Wrong credentials").show();
            $("#password").val("");
            $("#username").val("").focus();
            
            
        }
    });
}
$(function() {
   if(window.sessionStorage.getItem("username")){
         $(".nav a:last-child").html("Logout").click(function(){
                          window.sessionStorage.removeItem("username");
                           $(".nav a:last-child").html("Login");
                       });
   }
  
$("#saveEvent").click(function(){
    var correct=true;
    if($("#date").val() ==""){
        alert("enter date please");
        correct=false;
    }
     if($("#name").val() ==""){
        alert("enter name of event please"); correct=false;
    }
    if($("#description").val() ==""){
        alert("enter description of event please"); correct=false;
    }
    if($("#status").val() ==""){
        alert("enter status of event please"); correct=false;
    }
    if($("#priority").val() ==""){
        alert("enter priority of event please"); correct=false;
    }
      if(correct){
          events=JSON.parse(window.localStorage.getItem("Events"));
    events[events.length]={};
    events[events.length-1].id=events.length;
    events[events.length-1].title=$("#name").val();
    events[events.length-1].start=$("#date").val();
    events[events.length-1].description=$("#description").val();
    events[events.length-1].status=$("#status").val();
    events[events.length-1].priority=$("#priority").val();
    events[events.length-1].stick=true;
    window.localStorage.setItem("Events",JSON.stringify(events));
    $('#calendar').fullCalendar('rerenderEvents',events);
          $("#date").val("");
          $("#name").val("");
          $("#description").val("");
          $("#status").val("");
          $("#priority").val("");
          
    }
    
});
 $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: new Date().toDateString(),
      navLinks: true, // can click day/week names to navigate views
     selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
            events.push(eventData);
            window.localStorage.setItem("Events",JSON.stringify(events));
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: JSON.parse(window.localStorage.getItem("Events"))
    });

  });