  // This is where stuff in our game will happen:
  let scene = new THREE.Scene();

  // This is what sees the stuff:
  let aspect_ratio = window.innerWidth / window.innerHeight;
  let camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  const x = 0;
  const y = 100;
  const z = 500;

  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;

  let cameraXpos = document.querySelector('#cameraXpos');
  let cameraYpos = document.querySelector("#cameraYpos");
  let cameraZpos = document.querySelector("#cameraZpos");

  cameraXpos.addEventListener("change", () => {
    camera.position.x = cameraXpos.value;
  })

  cameraYpos.addEventListener("change", () => {
    camera.position.y = cameraYpos.value;
  })

  cameraZpos.addEventListener("change", () => {
    camera.position.z = cameraZpos.value;
  })

  let cameraResetPosBtn = document.querySelector("#camera_reset_pos");
  cameraResetPosBtn.addEventListener("click", () =>{
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    cameraXpos.value = x;
    cameraYpos.value = y;
    cameraZpos.value = z;
  })

  let cameraXrot = document.querySelector('#cameraXrot');
  let cameraYrot = document.querySelector("#cameraYrot");
  let cameraZrot = document.querySelector("#cameraZrot");

  cameraXrot.addEventListener("change", () => {
    camera.rotation.x = cameraXrot.value;
  })

  cameraYrot.addEventListener("change", () => {
    camera.rotation.y = cameraYrot.value;
  })

  cameraZrot.addEventListener("change", () => {
    camera.rotation.z = cameraZrot.value;
  })

  let cameraResetRotBtn = document.querySelector("#camera_reset_rot");
  cameraResetPosBtn.addEventListener("click", () =>{
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    cameraXrot.value = 0;
    cameraYrot.value = 0;
    cameraZrot.value = 0;
  })

  // This will draw what the camera sees onto the screen:
  let renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ******** START CODING ON THE NEXT LINE ********

  let shape = new THREE.SphereGeometry(100);
  let cover = new THREE.MeshNormalMaterial();
  let body = new THREE.Mesh(shape, cover);

  let handFoot = new THREE.SphereGeometry(50);
  let headGeometry = new THREE.SphereGeometry(70);
  let head = new THREE.Mesh(headGeometry, cover);
  head.position.set(0, 120, 0);
  
  let rightHand = new THREE.Mesh(handFoot, cover);
  rightHand.position.set(140, 0, 0);

  let leftHand = new THREE.Mesh(handFoot, cover);
  leftHand.position.set(-140, 0, 0);

  let leftFoot = new THREE.Mesh(handFoot, cover);
  leftFoot.position.set(-50, -140, 0);

  let rightFoot = new THREE.Mesh(handFoot, cover);
  rightFoot.position.set(50, -140, 0);

  scene.add(body);
  body.add(rightHand);
  body.add(leftHand);
  body.add(leftFoot);
  body.add(rightFoot);
  body.add(head);
  body.add(camera);

  let isCartwheeling;

  let cartwheeling_checkbox = document.querySelector('#isCartwheeling_checkbox');
  cartwheeling_checkbox.addEventListener("change", () => {
    if(cartwheeling_checkbox.checked){
      isCartwheeling = true;
    }
    else{
      isCartwheeling = false;
    }
  })

  let cartwheelingResetBtn = document.querySelector("#cartwheeling_reset");
  cartwheelingResetBtn.addEventListener("click", () => {
    body.rotation.z = 0;
  })

  function animate(){
    requestAnimationFrame(animate);
    if(isCartwheeling){
      body.rotation.z = body.rotation.z + 0.05;
    }

    renderer.render(scene, camera);
  }

  document.addEventListener("keydown", moveController);

  function moveController(event){
    let code = event.code;
    console.log(code);
    if(code == 'KeyA') body.position.x -= 5; 
    else if(code == 'KeyD') body.position.x += 5;
    else if(code == 'KeyW') body.position.z -= 5;
    else if(code == 'KeyS') body.position.z += 5;
  }

  function makeTree(x, z){
    let trunk = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 200), new THREE.MeshBasicMaterial({color: 'sienna'}));

    let top = new THREE.Mesh(new THREE.SphereGeometry(150), new THREE.MeshBasicMaterial({color: 'forestgreen'}));

    top.position.y = 175;
    trunk.add(top);

    trunk.position.set(x, -75, z);
    scene.add(trunk);
  }

  makeTree(500, 0);
  makeTree(-500, 0);
  makeTree(750, -1000);
  makeTree(-750, -1000);

  animate();