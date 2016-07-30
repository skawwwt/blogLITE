function publish(title, content){
  $.post('php/controller.php', {action: 'newPost', title: title, content: content}, function(response){
    if(response == 1){
      
    } else {
      $('#ack').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Issue publishing post, please try again.</div>');
    }
  });
}
