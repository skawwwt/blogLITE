$(document).ready(function(){
  var postID = getUrlParameter('id');
  $.post('php/controller.php', {action: 'singlePost', postID: postID}, function(response){
    if(response == 0){
      $('#output').html('No such post exists');
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

              $('#output').html('<h1>'+ title +'</h1>');
              $('#output').append(content);
              $('#output').append('<div class="postInfo">'+ published +'<span class="pull-right">Author:</span></div>');

            }
    }
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
