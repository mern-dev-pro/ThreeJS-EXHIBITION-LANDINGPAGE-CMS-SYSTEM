'use strict';
const BASE_URL = window.location.origin + "/PSG"; //server
// const BASE_URL = window.location.origin //local

let booths = [];
let max_booth_num = 1;

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

const urlParams = new URLSearchParams(window.location.search);
var hall_number = urlParams.get('hall');
if (!hall_number) {
  hall_number = 1;
}
function loadBooths() {
  var url = BASE_URL + "/data/PSG_booths.xlsx";
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";
  oReq.onload = function (e) {
    var arraybuffer = oReq.response;
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, { type: "binary" });
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    booths = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    console.log(booths)
    //Disable the Prev Next button by Excel data
    let booths_num_array = booths.map(booth => booth.hall);
    max_booth_num = Math.max(...booths_num_array);
    if (hall_number >= max_booth_num) {
      document.getElementById('next').disabled = true;
    }
    else if (hall_number <= 1) {
      document.getElementById('prev').disabled = true;
    }
  }
  oReq.send();
}

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  let mixer = null;
  let clock = new THREE.Clock();
  const fov = 30;
  const aspect = 1;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.minAzimuthAngle = Math.PI * 0.15;
  controls.maxAzimuthAngle = Math.PI * 0.2;
  controls.minPolarAngle = Math.PI * 0.3;
  controls.maxPolarAngle = Math.PI * 0.4;
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
    const skyColor = 0xffffff;
    const groundColor = 0xffffff;
    const intensity = 0.7;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 0.4;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }
  function addTextObject(txt, position, size, name) {
    const loader = new THREE.FontLoader();
    loader.load('../assets/fonts/helvetiker_regular.typeface.json', function (font) {
      const txt_geo = new THREE.TextGeometry(txt, {
        font: font,
        size: 350,
        height: 10,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 6,
        bevelOffset: 1,
        bevelSegments: 8
      });
      txt_geo.center();
      var txt_mat = new THREE.MeshPhongMaterial({ color: 0xFFFF00 });
      const textMesh = new THREE.Mesh(txt_geo, txt_mat);
      textMesh.name = name;
      textMesh.position.x = position.x;
      textMesh.position.y = position.y;
      textMesh.position.z = position.z;
      textMesh.scale.set(0.003 * size, 0.003 * size, 0.003 * size);
      scene.add(textMesh);
    });
  }
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
    const gltfLoader = new THREE.GLTFLoader(loadingManager);
    gltfLoader.load('../assets/models/exhibition.glb', (gltf) => {
      const root = gltf.scene;
      gltf.scene.traverse(function (object) {
        object.frustumCulled = false;
        object.castShadow = true;
        object.receiveShadow = true;
      });
      scene.add(root);

      let animations = gltf.animations;
      if (animations && animations.length) {
        mixer = new THREE.AnimationMixer(root);
        for (let i = 0; i < animations.length; i++) {
          let animation = animations[i];
          mixer.clipAction(animation).play();
        }
      }
      camera.position.set(35, 45, 75);
      controls.update();

      booths.map((booth) => {
        var obj = scene.getObjectByName("booth_" + booth.booth_num);
        const position = obj?.position;
        if (booth.hall == hall_number) {
          addTextObject(booth?.ex_name, { x: position.x, y: position.y + 7, z: position.z }, 1.5, booth?.ex_id);
          addTextObject(booth?.booth_no?.toString(), { x: position.x, y: position.y + 5, z: position.z }, 1.5, booth?.ex_id);
        }
      })

      var boothNum = scene.getObjectByName("HallNum");
      const boothNum_position = boothNum.position;
      addTextObject(hall_number?.toString(), { x: boothNum_position.x + 1, y: boothNum_position.y - 2.5, z: boothNum_position.z }, 5, "Hall Number");
    });
  }
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
      if (booths.filter((booth) => (booth.ex_id == object.name)).length > 0) {
        window.open(info?.company_url + '?id=' + object.name, '_blank');
      }
    }
  }
  window.addEventListener('click', e => raycast(e));
  window.addEventListener('touchend', e => raycast(e, true));

  requestAnimationFrame(render);
}
function changeHall() {
  document.getElementById('prev').onclick = function () {
    const prev_hall_num = parseInt(hall_number) - 1;
    if (prev_hall_num > 0) {
      window.location.href = BASE_URL + "/exhibition?hall=" + prev_hall_num;
    }
  }
  document.getElementById('next').onclick = function () {
    const next_hall_num = parseInt(hall_number) + 1;
    if (!next_hall_num) {
      window.location.href = BASE_URL + "/exhibition?hall=2";
    } else {
      window.location.href = BASE_URL + "/exhibition?hall=" + next_hall_num;
    }
  }
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
loadBooths();
main();
changeHall();
routing();