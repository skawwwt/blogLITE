$(document).ready(function(){
  $.getScript('js/modules/userManagement.js', function(){
    console.log("userManagement module loaded.");
    checkStatus();
  });
  $.getScript('js/simplemde.min.js', function(){
    console.log("simplemde module loaded.");
    var simplemde = new SimpleMDE();
    $('#submitPost').click(function(event){
      event.preventDefault();

      var title = $('#post_title').val(),
          content = simplemde.value();
      if(title == "" || content == ""){
        $('#ack').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Please enter title and content.</div>');        
      } else {
          publish(title, content);
      }
    });
  });
  $.getScript('js/modules/userActions.js', function(){
    console.log("userActions module loaded.");
  });

  $(document).on('click', '#logout', function(event){
    event.preventDefault();
    logout();
  });

});
