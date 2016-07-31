$(document).ready(function(){
  $.getScript('js/modules/userManagement.js', function(){
    console.log("userManagement module loaded.");
    checkStatus();
  });
  $.getScript('js/modules/userActions.js', function(){
    console.log("userActions module loaded.");
  });

  var pathname = window.location.href;
  if(pathname == "http://localhost/myprojects/blogLite/" || pathname == "http://localhost/myprojects/blogLite/index.html" || pathname == "http://localhost/myprojects/blogLite/index.html?page=1"){
    var start = 0;
    $('#pagination').html('<a href="index.html?page=2">Next Page --></a>');
  } else {
    var start = getUrlParameter('page');
        var page = parseInt(start) + 1,
            pageNext = '<a class="pNext" href="index.html?page='+ page +'">Next Page --></a>';
            page = page - 2,
            pagePrev = '<a href="index.html?page='+ page +'"><-- Previous Page</a>';
        $('#pagination').append(pagePrev + " | " + pageNext);
        start = start * 3;
        start = start - 3;

  }

  $.post('php/controller.php', {action: 'getPosts', start: start}, function(response){
    if(response == 0){
      $('.blogPostList').append('<h2>404 Oooops</h4><h3>No blog posts found here my friend.</h3>');
      $('#pagination').html('');
    } else {
      response = $.parseJSON(response);
        len = response.length;
        if (len < 3){
          $('.pNext').remove();
        }
        for (var i = 0; i < len; i++) {
            var pid = response[i].pid,
                title = response[i].title,
                content = response[i].content,
                uid = response[i].uid,
                published = response[i].published;
                content = marked(content);
                content = content.substr(0, 500) + '...';
                $('.blogPostList').append('<div id="blogExcerpt"><h3><a href="post.html?id='+ pid +'" id="'+ pid +'">'+ title +'</a></h3><p class="blogExcerpt">'+ content +'</p><a href="post.html?id='+ pid +'" id="viewMore" class="btn btn-default '+ pid +'">Read More</button></div>');

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

  function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };


});
