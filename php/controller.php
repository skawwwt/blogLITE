<?php

require 'modules/dbconnect.php';
require 'modules/userManagement.php';
require 'modules/postManagement.php';

$action = $connection->real_escape_string($_POST['action']);

if($action == "checkStatus"){
  checkStatus();
} else if($action == "login"){
  $email = $connection->real_escape_string($_POST['email']);
  $pword = $connection->real_escape_string($_POST['pword']);
  login($connection, $email, $pword);
} else if ($action == "logout"){
  logout();
} else if ($action == "newPost"){
  $title = $connection->real_escape_string($_POST['title']);
  $content = $connection->real_escape_string($_POST['content']);
  publish($connection, $title, $content);
} else if ($action == "getPosts"){
  $start = $connection->real_escape_string($_POST['start']);
  getPosts($connection, $start);
} else if ($action == "singlePost"){
  $postID = $connection->real_escape_string($_POST['postID']);
  singlePost($connection, $postID);
} else {
 echo "no action";
}



 ?>
