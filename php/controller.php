<?php

require 'modules/dbconnect.php';
require 'modules/userManagement.php';

$action = $connection->real_escape_string($_POST['action']);

if($action == "checkStatus"){
  checkStatus();
} else if($action == "login"){
  $email = $connection->real_escape_string($_POST['email']);
  $pword = $connection->real_escape_string($_POST['pword']);
  login($connection, $email, $pword);
} else if ($action == "logout"){
  logout();
} else {
 echo "no action";
}



 ?>
