$(document).ready(function(){
  $.getScript('js/modules/userManagement.js', function(){
    console.log("userManagement module loaded.");
    checkStatus();
  });
  $.getScript('js/modules/userActions.js', function(){
    console.log("userActions module loaded.");
  });

  $('#loginSubmit').click(function(){
    var email = $('#email').val(),
        pword = $('#pword').val();
    if(userValidation(email, pword)){
      login(email, pword);
    } else {
      return false;
    }

  });

  $(document).on('click', '#logout', function(event){
    event.preventDefault();
    logout();
  });

});
