$(document).ready(function() {
    $.getScript('js/modules/userManagement.js', function() {
        console.log("userManagement module loaded.");
        var postID = getUrlParameter('id');
        checkPostStatus(postID);
    });

    $.getScript('js/modules/userActions.js', function() {
        console.log("userActions module loaded.");
    });

    var postID = getUrlParameter('id');
    $.post('php/controller.php', {
        action: 'singlePost',
        postID: postID
    }, function(response) {
        if (response == 0) {
            $('#output').html('No such post exists');
        } else {
            response = $.parseJSON(response);
            len = response.length;
            for (var i = 0; i < len; i++) {
                var pid = response[i].pid,
                    title = response[i].title,
                    contentmd = response[i].content,
                    uid = response[i].uid,
                    published = response[i].published;
                content = marked(contentmd);

                $.post('php/controller.php', {
                    action: 'getUser',
                    uid: uid
                }, function(response) {
                    if (!(response == 0)) {
                        response = $.parseJSON(response);
                        len = response.length;
                        for (var i = 0; i < len; i++) {
                            var firstname = response[i].firstname,
                                lastname = response[i].lastname;
                            var author = firstname + " " + lastname;
                            $('#output').html('<h1>' + title + '</h1>');
                            $('#output').append(content);
                            $('#output').append('<div class="postInfo">' + published + '<span class="pull-right">Author: ' + author + '</span></div>');
                            $('.titleEdit').val(title);
                            simplemde.value(contentmd);
                            //bug -> content only shows when you click on the simplemdo editor, otherwise looks blank, the content is being passed to it however - visual nuisance
                        }
                    } else {
                        var author = 'Unknown';
                        $('#output').html('<h1>' + title + '</h1>');
                        $('#output').append(content);
                        $('#output').append('<div class="postInfo">' + published + '<span class="pull-right">Author: ' + author + '</span></div>');
                        $('.titleEdit').val(title);
                        simplemde.value(contentmd);
                    }
                });

                $(document).on('click', '.edit', function() {
                    $('#output').hide('fold', '', 500, function() {
                        $('#editArea').fadeIn('slow');
                        $('#userOptions').html('<i style="color: green;" class="successUpdate pull-right fa fa-check fa-2x" aria-hidden="true"></i><button id="' + postID + '" class="pull-right btn btn-primary save">Publish</button><button id="' + postID + '" class="pull-right btn btn-default saveDraft">Save as Draft</button><button id="' + postID + '" class="pull-right btn btn-danger cancel">Cancel</button>');
                        $('.successUpdate').hide();
                        $(document).on('click', '.save', function() {
                            var title = $('.titleEdit').val(),
                                content = simplemde.value();
                            postUpdate(title, content, postID);
                        });

                        $(document).on('click', '.saveDraft', function() {
                          var title = $('.titleEdit').val(),
                              content = simplemde.value();
                          saveDraft(title, content, postID);
                        });

                    });

                });

                $(document).on('click', '.cancel', function() {
                    location.reload();
                });

                $(document).on('click', '.delete', function() {
                    postDelete(postID);
                });

                $(document).on('click', '#logout', function() {
                    logout();
                });

                $('#loginSubmit').click(function() {
                    var email = $('#email').val(),
                        pword = $('#pword').val();
                    if (userValidation(email, pword)) {
                        login(email, pword);
                    } else {
                        return false;
                    }

                });

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
