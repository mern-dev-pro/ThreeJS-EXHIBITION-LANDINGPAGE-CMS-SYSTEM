<?php
  require("login.php");
  $msg = '';
  ob_start();
  session_start();
  if(isset($_SESSION['valid']) && $_SESSION['valid']){
    header("Location: admin.php"); //server
    // header("Location: /admin/admin.php"); //local
    exit(); 
  }
  if (isset($_POST['login']) && !empty($_POST['username']) && !empty($_POST['password'])) {
    if (array_key_exists($_POST['username'], $CODE['login']) && $CODE['login'][$_POST['username']] == $_POST['password']) {
      $_SESSION['valid'] = true;
      $_SESSION['timeout'] = time();
      $_SESSION['username'] = $_POST['username'];
      header("Location: admin.php"); //server
      // header("Location: /admin/admin.php"); //local
      exit(); 
    } else {
      $_SESSION['valid'] = false;
      $msg = '<p>Wrong username or password</p>';
    }
  }
?>
<!DOCTYPE html>
<html>
<head>
  <title>LOGIN|ADMIN|PSG</title>
  <meta charset="UTF-8">
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="author" content="John Doe">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/css/admin.css" />
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
</head>
<body>
  <div class = "custome-container">
    <form class = "form-signin" role = "form" action = "" method = "post">
      <h2>Enter Username and Password</h2> 
      <?php if(isset($_SESSION["errorMessage"])){ ?>
        <p class="admin-error-message"><?php  echo $_SESSION["errorMessage"]; ?></p>
      <?php unset($_SESSION["errorMessage"]);} ?>
      <input type = "text" class = "admin-form-input" name = "username" placeholder = "username" required autofocus>
      <input type = "password" class = "admin-form-input" name = "password" placeholder = "password" required>
      <button class = "admin-login-button" type = "submit" name = "login">Login</button>
    </form> 
  </div> 
</body>
</html>