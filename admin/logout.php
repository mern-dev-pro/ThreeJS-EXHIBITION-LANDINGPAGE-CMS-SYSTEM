<?php
  session_start();
  session_destroy();
  header("Location: /admin/");
  // header("Location: index.php");
?>