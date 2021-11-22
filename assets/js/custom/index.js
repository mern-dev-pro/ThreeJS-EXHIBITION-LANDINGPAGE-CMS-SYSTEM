'use strict';
// const BASE_URL = window.location.origin + "/PSG"; //server
const BASE_URL = window.location.origin //local
var info = null;

function loadJSON() {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', BASE_URL + '/data/info.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      info = JSON.parse(xobj.responseText)
      console.log(info);
    }
  };
  xobj.send(null);
}
loadJSON();

function main() {
  //Initialize
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  renderer.gammaFactor = 2.2;
  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 50;
  const aspect = 1;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-6, 17, 64);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  let mixer = null;
  let clock = new THREE.Clock();

  {
    const skyColor = 0xffffff;
    const groundColor = 0xffffff;
    const intensity = 0.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFCF3CF;
    const intensity = 0.4;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  function addTextObject(txt, position, size) {
    const loader = new THREE.FontLoader();
    loader.load('./assets/fonts/helvetiker_regular.typeface.json', function (font) {
      const txt_geo = new THREE.TextGeometry(txt, {
        font: font,
        size: 100,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1,
        bevelOffset: 1,
        bevelSegments: 8
      });
      txt_geo.center();
      var txt_mat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
      const textMesh = new THREE.Mesh(txt_geo, txt_mat);
      textMesh.position.x = position.x;
      textMesh.position.y = position.y;
      textMesh.position.z = position.z;
      textMesh.scale.set(0.003 * size, 0.003 * size, 0.003 * size);
      scene.add(textMesh);
    });
  }

  //Loading...
  {
    function onTransitionEnd(event) {
      event.target.remove();
    }
    const loadingManager = new THREE.LoadingManager(() => {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.classList.add('fade-out');
      loadingScreen.addEventListener('transitionend', onTransitionEnd);
    });
    loadingManager.onProgress = function (item, loaded, total) {
      const progressElement = document.getElementById('progress-bar')
      progressElement.style.width = Math.round(loaded / total * 100, 2) + '%';
    };
    const dracoLoader = new THREE.DRACOLoader;
    dracoLoader.setDecoderPath(BASE_URL + '/assets/js/libraries/draco/');
    const gltfLoader = new THREE.GLTFLoader(loadingManager);
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.load('./assets/models/lobby.glb', (gltf) => {

      gltf.scene.traverse(function (object) {
        object.frustumCulled = false;
        object.castShadow = true;
        object.receiveShadow = true;
      });

      const root = gltf.scene;

      //animation
      let animations = gltf.animations;
      if (animations && animations.length) {
        mixer = new THREE.AnimationMixer(root);
        for (let i = 0; i < animations.length; i++) {
          let animation = animations[i];
          mixer.clipAction(animation).play();
        }
      }
      scene.add(root);

      const box = new THREE.Box3().setFromObject(root);

      const boxSize = box.getSize(new THREE.Vector3()).length();
      const boxCenter = box.getCenter(new THREE.Vector3());

      // update the Trackball controls to handle the new size
      controls.maxDistance = boxSize * 10;
      controls.target.copy(boxCenter);
      controls.minAzimuthAngle = -Math.PI * 0.1;
      controls.maxAzimuthAngle = Math.PI * 0.1;
      controls.minPolarAngle = Math.PI * 0.48;
      controls.maxPolarAngle = Math.PI * 0.5;
      controls.update();

      //Add the Show name
      var exhibtion_hall = scene.getObjectByName("exhibtion_hall");
      const exhibtion_hall_position = exhibtion_hall.position;
      addTextObject(info?.show?.center?.name, { x: exhibtion_hall_position.x, y: exhibtion_hall_position.y + 9.5, z: exhibtion_hall_position.z + 5 }, 5);
      addTextObject(info?.show?.left?.name, { x: exhibtion_hall_position.x - 26.2, y: exhibtion_hall_position.y + 8.5, z: exhibtion_hall_position.z + 2 }, 3.5);
      addTextObject(info?.show?.right?.name, { x: exhibtion_hall_position.x + 26.2, y: exhibtion_hall_position.y + 8.5, z: exhibtion_hall_position.z + 2 }, 3.5);

      var textureLoader = new THREE.TextureLoader();
      var texture_1 = textureLoader.load(BASE_URL + "/data/screen/center_led.jpg");
      texture_1.encoding = THREE.sRGBEncoding;
      texture_1.flipY = false;
      var center_led = scene.getObjectByName("center_led");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_1;
        }
      })
      var texture_2 = textureLoader.load(BASE_URL + "/data/screen/left_led.jpg");
      texture_2.encoding = THREE.sRGBEncoding;
      texture_2.flipY = false;
      var center_led = scene.getObjectByName("left_led");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_2;
        }
      })
      var texture_3 = textureLoader.load(BASE_URL + "/data/screen/right_led.jpg");
      texture_3.encoding = THREE.sRGBEncoding;
      texture_3.flipY = false;
      var center_led = scene.getObjectByName("right_led");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_3;
        }
      })
      var texture_4 = textureLoader.load(BASE_URL + "/data/screen/left_banner.jpg");
      texture_4.encoding = THREE.sRGBEncoding;
      texture_4.flipY = false;
      var center_led = scene.getObjectByName("left_banner_001");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_4;
        }
      })
      var texture_5 = textureLoader.load(BASE_URL + "/data/screen/right_banner.jpg");
      texture_5.encoding = THREE.sRGBEncoding;
      texture_5.flipY = false;
      var center_led = scene.getObjectByName("right_banner_001");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_5;
        }
      })
      var texture_5 = textureLoader.load(BASE_URL + "/data/screen/left_banner_1.jpg");
      texture_5.encoding = THREE.sRGBEncoding;
      texture_5.flipY = false;
      var center_led = scene.getObjectByName("left_banner_002");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_5;
        }
      })
      var texture_6 = textureLoader.load(BASE_URL + "/data/screen/right_banner_1.jpg");
      texture_6.encoding = THREE.sRGBEncoding;
      texture_6.flipY = false;
      var center_led = scene.getObjectByName("right_banner_002");
      center_led.traverse((object) => {
        if (object.isMesh) {
          object.material.map = texture_6;
        }
      })
    });
  }

  //Resize
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (mixer) mixer.update(clock.getDelta());

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  var raycaster = new THREE.Raycaster();
  function raycast(e, touch = false, hover = false) {
    var mouse = {};
    if (touch) {
      mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
      mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
    } else {
      mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
      mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
    }
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects[0]) {
      var object = intersects[0].object;
      console.log(object.name);
      if (hover) {
        switch (object.name) {
          case "InfoCounter_5":
            document.getElementById("c").style.cursor = "pointer";
            break;
          case "business_matching_1":
            document.getElementById("c").style.cursor = "pointer";
            break;
          case "exhibtion_hall_2":
            document.getElementById("c").style.cursor = "pointer";
            break;
          case "gallery_1":
            document.getElementById("c").style.cursor = "pointer";
            break;
          case "center_led":
            document.getElementById("c").style.cursor = "pointer";
            break;
          default:
            document.getElementById("c").style.cursor = "default";
            break;
        }
      } else {
        switch (object.name) {
          case "InfoCounter_5"://info counter url
            window.open(info?.info_counter_link, '_blank');
            break;
          case "business_matching_1":
            window.open(info?.show?.left?.link, '_blank');
            break;
          case "exhibtion_hall_2": //exhibition hall url
            window.open(info?.show?.center?.link, '_blank');
            break;
          case "gallery_1":
            window.open(info?.show?.right?.link, '_blank');
            break;
          case "center_led":
            window.open("/", '_blank');
            break;
          default:
            break;
        }
      }
    }
  }
  window.addEventListener('click', e => raycast(e));
  window.addEventListener('touchend', e => raycast(e, true));
  window.addEventListener('mousemove', e => raycast(e, false, true));
  requestAnimationFrame(render);
}

function routing() {
  document.getElementById('btn-lobby').onclick = function () {
    window.location.href = BASE_URL;
  }
  document.getElementById('btn-exhibition').onclick = function () {
    window.open(info?.show?.center?.link, '_blank');
  }
  document.getElementById('btn-business').onclick = function () {
    window.open(info?.show?.left?.link, '_blank');
  }
  document.getElementById('btn-info').onclick = function () {
    window.open(info?.info_counter_link, '_blank');
  }
  document.getElementById('btn-gallery').onclick = function () {
    window.open(info?.show?.right?.link, '_blank');
  }
}

main();
routing();