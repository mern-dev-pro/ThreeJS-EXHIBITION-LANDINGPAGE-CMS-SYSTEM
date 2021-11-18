<!DOCTYPE html>
<html>

<head>
    <title>LOBBY|PSG</title>
    <meta charset="UTF-8">
    <meta name="description" content="Free Web tutorials">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta name="author" content="John Doe">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- load css -->
    <link rel="stylesheet" href="./assets/css/main.css" />
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />
</head>

<body>
    <div class="main-layout">
        <div class="docker-layout">
            <div class="docker">
                <div class="docker-item-list">
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-lobby">
                            <img src="./assets/img/home.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">LOBBY
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-exhibition">
                            <img src="./assets/img/exhibition.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">EXHIBITION HALL
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-business">
                            <img src="./assets/img/business.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">BUSINESS MATCHING
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-info">
                            <img src="./assets/img/info.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">INFO COUNTER
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-gallery">
                            <img src="./assets/img/gallary.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">PSG GALLERY
                        <p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <section id="loading-screen">
                <div id="loader">
                    <p class="loading-text">Loading...</p>
                    <div class="progress-bar cadetblue">
                        <span id="progress-bar" style="width: 0;"></span>
                    </div>
                </div>
            </section>
            <canvas id="c"></canvas>
        </div>
    </div>
    <script src="assets/js/libraries/three.min.js"></script>
    <script src="assets/js/libraries/OrbitControls.js"></script>
    <script src="assets/js/libraries/DRACOLoader.js"></script>
    <script src="assets/js/libraries/GLTFLoader.js"></script>
    <script src="assets/js/libraries/FontLoader.js"></script>
    <script src="assets/js/libraries/TextGeometry.js"></script>
    <script src="assets/js/custom/index.js"></script>
</body>

</html>