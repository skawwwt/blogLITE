<?php

function publish($connection, $title, $content){
  session_start();
  $uid = $_SESSION['uid'];
  $sql = "INSERT INTO posts (title, content, uid, published, status) VALUES ('$title', '$content', '$uid', now(), '2')";
  if(!(mysqli_query($connection, $sql))){
    echo 0;
  } else {
    echo 1;
  }
}

function getPosts($connection){
  $sql = "SELECT * FROM posts ORDER BY published DESC";
  $result = mysqli_query($connection, $sql);
   if($result->num_rows > 0){
     $responseArray = array();
     while($array = mysqli_fetch_assoc($result)){
         $responseArray[] = $array;
     }

     echo json_encode($responseArray);
    } else {
     echo 0;
   }
}

 ?>
