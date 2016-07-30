$(document).ready(function(){
  $.getScript('js/modules/userManagement.js', function(){
    console.log("userManagement module loaded.");
    checkStatus();
  });
  $.getScript('js/modules/userActions.js', function(){
    console.log("userActions module loaded.");
  });

  $.post('php/controller.php', {action: 'getPosts'}, function(response){
    if(response == 0){
      alert("Issue retrieving posts");
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
                $('.blogPostList').append('<div id="blogExcerpt"><h3><a href="#" id="'+ pid +'">'+ title +'</a></h3><p class="blogExcerpt">'+ content +'</p><button id="viewMore" class="btn btn-default '+ pid +'">Read More</button></div>');

              }
    }
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
