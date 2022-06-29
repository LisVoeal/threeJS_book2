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

  let marker = new THREE.Object3D();
  scene.add(marker);

  let clock = new THREE.Clock();

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
  marker.add(camera);
  marker.add(body);

  let isCartwheeling = false;
  let isWalkingRight = false;
  let isWalkingLeft = false;
  let isWalkingForward = false;
  let isWalkingBack = false;
  let direction = 0;
  let lastDirection;

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
    TWEEN.update();
    acrobatics();
    walk();
    turn();
    renderer.render(scene, camera);
  }

  function isWalking(){
    if(isWalkingBack || isWalkingForward || isWalkingLeft || isWalkingRight) return true;
  }

  function turn(){
    if(isWalkingRight) direction = Math.PI/2;
    if(isWalkingLeft) direction = -Math.PI/2;
    if(isWalkingForward) direction = Math.PI;
    if(isWalkingBack) direction = 0;

    if(direction === lastDirection) return;
    lastDirection = direction;

    let tween = new TWEEN.Tween(body.rotation);
    tween.to({y: direction}, 250);
    tween.start();
  }

  function acrobatics(){
    if(isCartwheeling){
      body.rotation.z = body.rotation.z + 0.05;
  }
}

  function walk(){
    if(isWalking()){
      let speed = 5;
      let size = 50;
      let time = clock.getElapsedTime();
      let position = Math.sin(speed * time) * size;
      rightHand.position.z = position;
      leftHand.position.z = -position;
      leftFoot.position.z = position;
      rightFoot.position.z = -position;
    }
  }

  document.addEventListener("keydown", moveController);
  document.addEventListener("keyup", stopController);

  function stopController(event){
    let code = event.code;
    console.log(code);
    if(code == 'KeyA')
    {
      body.position.x -= 5; 
      isWalkingLeft = false;
    } 
    else if(code == 'KeyD')
    {
      body.position.x += 5;
      isWalkingRight = false;
    } 
    else if(code == 'KeyW')
    {
      body.position.z -= 5;
      isWalkingForward = false;
    } 
    else if(code == 'KeyS')
    {
      body.position.z += 5;
      isWalkingBack = false;
    } 
  }

  function moveController(event){
    let code = event.code;
    console.log(code);
    if(code == 'KeyA')
    {
      marker.position.x -= 5; 
      isWalkingLeft = true;
    } 
    else if(code == 'KeyD')
    {
      marker.position.x += 5;
      isWalkingRight = true;
    } 
    else if(code == 'KeyW')
    {
      marker.position.z -= 5;
      isWalkingForward = true;
    } 
    else if(code == 'KeyS')
    {
      marker.position.z += 5;
      isWalkingBack = true;
    }
  }

  function makeTree(x, z){
    let trunk = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 300), new THREE.MeshBasicMaterial({color: 0xE97451}));

    let top = new THREE.Mesh(new THREE.SphereGeometry(200), new THREE.MeshBasicMaterial({color: 0x228B22}));

    top.position.y = 250;
    trunk.add(top);

    trunk.position.set(x, -40, z);
    scene.add(trunk);
  }

  makeTree(500, 0);
  makeTree(-500, 0);
  makeTree(750, -1000);
  makeTree(-750, -1000);

  animate();