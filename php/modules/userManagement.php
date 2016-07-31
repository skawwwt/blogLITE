<?php

//checks for email session which can only be set if there has been successful login
function checkStatus(){
  session_start();
  if(!($_SESSION['email'])){
    echo 0;
  } else {
    echo 1;
  }
}

//checks email and password against database hash, login attempts etc, on success sets session variables
function login($connection, $email, $pword){
  $sql = "SELECT * FROM users WHERE email = '$email'";
  $result = mysqli_query($connection, $sql);
  $numrows = 0;
  if($result->num_rows == 1){
    while($row = $result->fetch_assoc()){
      $uid = $row['uid'];
      $firstname = $row['firstname'];
      $lastname = $row['lastname'];
      $email = $row['email'];
      $pHash = $row['pHash'];
      $logAttempts = $row['loginAttempts'];
      $status = $row['status'];
//account login responses -> 0 = no email match, 1 = success, 2 = wrong password, 3 = account blocked (too many login attempts)
      if(password_verify($pword, $pHash)){
        if($logAttempts > 3) {
          echo 3;
        } else {
          session_start();
          // set session variables for successful login
          $_SESSION['uid'] = $uid;
          $_SESSION['firstname'] = $firstname;
          $_SESSION['lastname'] = $lastname;
          $_SESSION['email'] = $email;
          echo 1;
        }
      } else {
        $logAttempts++;
        $sql = "UPDATE users SET loginAttempts = '$logAttempts' WHERE uid = '$uid'";
        mysqli_query($connection, $sql);
        if($logAttempts > 3) {
          echo 3;
        } else {
          echo 2;
        }
      }

    }

  } else {
    echo 0;
  }

}

//logout function to kill sessions
function logout(){
  session_start();
  session_unset();
  session_destroy();
}
 ?>
