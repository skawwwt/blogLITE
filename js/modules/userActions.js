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

function draft(title, content){
  $.post('php/controller.php', {action: 'newDraft', title: title, content: content}, function(response){
    if(response == 1){
      $('#ack').html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>New post saved to drafts - redirecting to drafts page!</div>');
      setTimeout(function(){
        window.location.replace('http://localhost/myprojects/blogLite/drafts.html');
      }, 2000);
    } else {
      $('#ack').html('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Issue saving draft, please try again.</div>');
    }
  });
}

function saveDraft(title, content, postID){
  $.post('php/controller.php', {action: 'saveDraft', title: title, content: content, postID: postID}, function(response){
    if(response == 1){
      $('.save').hide('fadeOut');
      $('.saveDraft').hide('fadeOut');
      $('.cancel').hide('fadeOut');
      $('.successUpdate').show('fadeIn','', 'slow');
      setTimeout(location.reload.bind(location), 1000);
    } else {
      $('.editArea').append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Issue updating post, please try again.</div>');
    }
  });
}

function postUpdate(title, content, postID){
  $.post('php/controller.php', {action: 'postUpdate', title: title, content: content, postID: postID}, function(response){
    if(response == 1){
      $('.save').hide('fadeOut');
      $('.saveDraft').hide('fadeOut');
      $('.cancel').hide('fadeOut');
      $('.successUpdate').show('fadeIn','', 'slow');
      setTimeout(location.reload.bind(location), 1000);
    } else {
      $('.editArea').append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Issue updating post, please try again.</div>');
    }
  });
}

function postDelete(postID){
  $.post('php/controller.php', {action: 'postDelete', postID: postID}, function(response){
    if(response == 1){
      window.location.replace('http://localhost/myprojects/blogLite/');
    } else {
      $('#output').append('<div class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria label="Close"><span aria-hidden="true">&times;</span></button>Issue deleting post, please try again.</div>');
    }
  });
}
