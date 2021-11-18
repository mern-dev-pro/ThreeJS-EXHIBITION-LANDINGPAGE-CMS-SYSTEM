<!DOCTYPE html>
<html>

<head>

    <head>
        <title>EXHIBITIONHALL|PAG</title>
        <meta charset="UTF-8">
        <meta name="description" content="Free Web tutorials">
        <meta name="keywords" content="HTML, CSS, JavaScript">
        <meta name="author" content="John Doe">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- load css -->
        <link rel="stylesheet" href="../assets/css/main.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/jszip.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.8.0/xlsx.js"></script>

        <script src="../assets/js/libraries/three.min.js"></script>
        <script src="../assets/js/libraries/OrbitControls.js"></script>
        <script src="../assets/js/libraries/GLTFLoader.js"></script>
        <script src="../assets/js/libraries/dat.gui.min.js"></script>
        <script src="../assets/js/libraries/FontLoader.js"></script>
        <script src="../assets/js/libraries/TextGeometry.js"></script>
    </head>
</head>

<body>
    <div class="main-layout">
        <div class="docker-layout">
            <div class="docker">
                <div class="docker-item-list">
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-lobby">
                            <img src="../assets/img/home.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">LOBBY
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-exhibition">
                            <img src="../assets/img/exhibition.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">EXHIBITION HALL
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-business">
                            <img src="../assets/img/business.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">BUSINESS MATCHING
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-info">
                            <img src="../assets/img/info.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">INFO COUNTER
                        <p>
                    </div>
                    <div class="docker-item">
                        <div class="docker-item-circle" id="btn-gallery">
                            <img src="../assets/img/gallary.svg" width="60" height="50" class="docker-button-icon" />
                        </div>
                        <p class="docker-item-text">PSG GALLERY
                        <p>
                    </div>
                </div>
            </div>
        </div>
        <div class="prev-next-layout">
            <button class="prev-next-button" id="prev">
                <h2 class="button-text">PREV</h2>
            </button>
            <button class="prev-next-button" id="next">
                <h2 class="button-text">NEXT</h2>
            </button>
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
    <script src="../assets/js/custom/exhibition.js"></script>
</body>

</html>