$(document).ready(function(){
  $.getScript('js/modules/userManagement.js', function(){
    console.log("userManagement module loaded.");
    checkStatus();
  });
  $.getScript('js/modules/userActions.js', function(){
    console.log("userActions module loaded.");
  });

  $.post('php/controller.php', {action: 'getDrafts'}, function(response){
    if(response == 0){
      $('.draftList').html('<h3>No drafts found here my friend.</h3>');
    } else {
        response = $.parseJSON(response);
        len = response.length;
        for (var i = 0; i < len; i++) {
            var pid = response[i].pid,
                title = response[i].title,
                content = response[i].content,
                uid = response[i].uid,
                published = response[i].published;
                content = marked(content);
                content = content.substr(0, 500) + '...';
                $('.draftList').append('<div id="blogExcerpt"><h3><a href="post.html?id='+ pid +'" id="'+ pid +'">'+ title +'</a></h3><p class="blogExcerpt">'+ content +'</p><a href="post.html?id='+ pid +'" id="viewMore" class="btn btn-default '+ pid +'">Edit Draft</button></div>');

              }
    }
  });

});
