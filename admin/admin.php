<?php 
session_start();
if(!isset($_SESSION['valid']) || !$_SESSION['valid']){
  header("Location: index.php");
  // header("Location: admin");
  unset($_SESSION["valid"]);
  unset($_SESSION["username"]);
}
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (isset($_POST['submit']) && $_POST['submit'] == 'image_button') {  
    if(!empty($_FILES['file'])){
      $files = $_FILES['file'];
      $path = realpath($_SERVER["DOCUMENT_ROOT"]) . DIRECTORY_SEPARATOR . "PSG/data/screen/";
      // $path = "../data/screen/";
      $path = $path . $_POST['filename'];
      move_uploaded_file($files['tmp_name'], $path);
      header("Location: admin.php");
      // header("Location: /admin/admin.php");
    }
  } else if(isset($_POST['submit']) && $_POST['submit'] == 'xlsx_button'){
    if(!empty($_FILES['file'])){
      $files = $_FILES['file'];
      $path = realpath($_SERVER["DOCUMENT_ROOT"]) . DIRECTORY_SEPARATOR . "PSG/data/";
      // $path = "../data/";
      $path = $path . $_POST['filename'];
      move_uploaded_file($files['tmp_name'], $path);
      header("Location: admin.php");
      // header("Location: /admin/admin.php");
    }
  } else if(isset($_POST['submit']) && $_POST['submit'] == 'json_button'){
    if(!empty($_FILES['file'])){
      $files = $_FILES['file'];
      $path = realpath($_SERVER["DOCUMENT_ROOT"]) . DIRECTORY_SEPARATOR . "PSG/data/";
      // $path = "../data/";
      $path = $path . $_POST['filename'];
      move_uploaded_file($files['tmp_name'], $path);
      header("Location: admin.php");
      // header("Location: /admin/admin.php");
    }
  }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
?>
<!DOCTYPE html>
<html>
<head>
  <title>Admin|PSG</title>
  <meta charset="UTF-8">
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="author" content="John Doe">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/css/admin.css" />
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body class=" py-5 px-2 bg-dark">
  <div class="container">
    <a href="logout.php"><button type="button" class="btn btn-primary">Log out</button></a>
    <h2 class="text-white">PSG ADMIN PAGE</h2>
    <p class="text-white">Edit you landing page</p>
    <div>
      <h3 class="text-white py-2">LOBBY</h3>
      <div>
        <div class="row col-md-12">
          <div class="col-md-4 border border-secondary text-center">
            <h3 class="text-white">LEFT</h3>
            <div>
              <div class="py-2">
                <label for="left_show_name" class="form-label text-white text-left">SHOW NAME</label>
                <input type="text" class="form-control" id="show_name_left">
              </div>
              <div class="py-3">
                <label for="left_show_link" class="form-label text-white text-left">LINK</label>
                <input type="text" class="form-control" id="show_link_left">
              </div>
              <div class="py-2 border-top">
                <p class="text-white">Upload left Led screen</p>
                <form enctype="multipart/form-data" method="POST">
                  <input type="file" name="file" class="bg-white w-100 my-2" required />
                  <input type="hidden" name="filename" value="left_led.jpg" class="bg-white w-100 my-2"/>
                  <button type="submit" name="submit"  value="image_button" class="btn btn-light w-100">UPLOAD IMAGE</button>
                </form>
                <div class="my-2" id="left_screen_preview">
                  <img src="../data/screen/left_led.jpg" class="w-100 h-auto"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 border border-secondary text-center">
            <h3 class="text-white">CENTER</h3>
            <div>
              <div class="py-2">
                <label for="left_show_name" class="form-label text-white text-left">SHOW NAME</label>
                <input type="text" class="form-control" id="show_name_center">
              </div>
              <div class="py-3">
                <label for="left_show_link" class="form-label text-white text-left">LINK</label>
                <input type="text" class="form-control" id="show_link_center">
              </div>
              <div class="py-2 border-top">
                <p class="text-white">Upload center Led screen</p>
                <form enctype="multipart/form-data" method="POST">
                  <input type="file" name="file" class="bg-white w-100 my-2" required />
                  <input type="hidden" name="filename" value="center_led.jpg" class="bg-white w-100 my-2"/>
                  <button type="submit" name="submit"  value="image_button" class="btn btn-light w-100">UPLOAD IMAGE</button>
                </form>
                <div class="my-2" id="left_screen_preview">
                  <img src="../data/screen/center_led.jpg" class="w-100 h-auto"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 border border-secondary text-center">
            <h3 class="text-white">RIGHT</h3>
            <div>
              <div class="py-2">
                <label for="left_show_name" class="form-label text-white text-left">SHOW NAME</label>
                <input type="text" class="form-control" id="show_name_right">
              </div>
              <div class="py-3">
                <label for="left_show_link" class="form-label text-white text-left">LINK</label>
                <input type="text" class="form-control" id="show_link_right">
              </div>
              <div class="py-2 border-top">
                <p class="text-white">Upload right Led screen</p>
                <form enctype="multipart/form-data" method="POST">
                  <input type="file" name="file" class="bg-white w-100 my-2" required />
                  <input type="hidden" name="filename" value="right_led.jpg" class="bg-white w-100 my-2"/>
                  <button type="submit" name="submit"  value="image_button" class="btn btn-light w-100">UPLOAD IMAGE</button>
                </form>
                <div class="my-2" id="left_screen_preview">
                  <img src="../data/screen/right_led.jpg" class="w-100 h-auto"></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div class="py-2 mx-0">
              <label for="left_show_link" class="form-label text-white text-left">INFO COUNTER LINK</label>
              <input type="text" class="form-control w-md-50" id="info_counter_link">
            </div>
          </div>
          <div class="row col-md-12">
            <div class="col-md-3 border py-3">
              <p class="text-white">Upload left banner screen</p>
              <form enctype="multipart/form-data" method="POST">
                <input type="file" name="file" class="bg-white w-100 my-2" required />
                <input type="hidden" name="filename" value="left_banner.jpg" class="bg-white w-100 my-2"/>
                <button type="submit" name="submit"  value="image_button" class="btn btn-light w-100">UPLOAD IMAGE</button>
              </form>
              <div class="my-2" id="left_screen_preview">
                  <img src="../data/screen/left_banner.jpg" class="w-100 h-auto"></img>
                </div>
            </div>
            <div class="col-md-3 border py-3">
              <p class="text-white">Upload right banner screen</p>
              <form enctype="multipart/form-data" method="POST">
                <input type="file" name="file" class="bg-white w-100 my-2" required />
                <input type="hidden" name="filename" value="right_banner.jpg" class="bg-white w-100 my-2"/>
                <button type="submit" name="submit"  value="image_button" class="btn btn-light w-100">UPLOAD IMAGE</button>
              </form>
              <div class="my-2" id="left_screen_preview">
                  <img src="../data/screen/right_banner.jpg" class="w-100 h-auto"></img>
                </div>
            </div>
          </div>
        </div>
      </div>
      <h3 class="text-white pt-5">EXHIBITION HALL</h3>
      <div>
        <p>Upload an Excel file for Booth Info</p>
        <form enctype="multipart/form-data" method="POST">
          <input type="file" name="file" class="bg-white w-100 my-2" required />
          <input type="hidden" name="filename" value="PSG_booths.xlsx" class="bg-white w-100 my-2"/>
          <button type="submit" name="submit"  value="xlsx_button" class="btn btn-light w-100">UPLOAD IMAGE</button>
        </form>
        <div class="py-2 mx-0">
          <label for="left_show_link" class="form-label text-white text-left">COMPANY LINK</label>
          <input type="text" class="form-control w-md-50" id="company_url">
        </div>
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-primary w-50" id="save">SAVE</button>
      </div>
    </div>
  </div>
  <script src="../assets/js/custom/admin.js"></script>
</body>
</html>
<?php
}
?>