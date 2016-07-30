function checkStatus(){
  $.post('php/controller.php', {action: 'checkStatus'}, function(response){
    if(response == 1){
      $('#options').html('<a href="new_post.html" data-toggle="tooltip" data-placement="bottom" title="New Blog Post" href="#"><i class="fa fa-plus-square fa-4x" aria-hidden="true"></i></a>');
      $('#footerNav li:last').remove();
      $('#footerNav').append('<li><a href="#" id="logout">Logout</a></li>')
      $('#login').modal("hide");
    } else {
      var pathname = window.location.href; // Returns path only
      if(pathname == "http://localhost/myprojects/blogLite/new_post.html"){
        window.location.replace('http://localhost/myprojects/blogLite/');
      } else {
        console.log("No user session.");
      }
    }
  });
}

function userValidation(email, pword){
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  if (email == "" || pword == ""){
        $('#ack').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Please enter both email address and password.</div>');
    } else if (!(testEmail.test(email))){
        $('#ack').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Please enter a valid email address.</div>');
    } else {
      return true;
    }
}

function login(email, pword){
  $.post('php/controller.php', {action: 'login', email: email, pword: pword}, function(response){
    if(response == 0){
      $('#ack').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Email address or password incorrect.</div>');
    } else if (response == 1){
      checkStatus();
    } else if (response == 2){
      $('#ack').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Email address or password incorrect.</div>');
    } else if (response == 3){
      $('#ack').html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>This account has been blocked due to too many login attempts. Please contact an administrator.</div>');
    }
  });
}

function logout(){
  $.post('php/controller.php', {action: 'logout'}, function(response){
      location.reload();
  });
}
