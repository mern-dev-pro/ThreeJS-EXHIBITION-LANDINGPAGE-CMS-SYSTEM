<?php
  session_start();
  session_destroy();
  // header("Location: index.php"); //server
  header("Location: /admin/"); //local
?>