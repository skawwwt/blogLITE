function publish(title, content){
  $.post('php/controller.php', {action: 'newPost', title: title, content: content}, function(response){
    if(response == 1){
      $('#ack').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>New post published successfully!</div>');
      setTimeout(function(){
        window.location.replace('http://localhost/myprojects/blogLite/');
      }, 2000);
    } else {
      $('#ack').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Issue publishing post, please try again.</div>');
    }
  });
}
