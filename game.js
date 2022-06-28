  // This is where stuff in our game will happen:
  let scene = new THREE.Scene();

  // This is what sees the stuff:
  let aspect_ratio = window.innerWidth / window.innerHeight;
  let camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
  camera.position.z = 500;
  scene.add(camera);

  // This will draw what the camera sees onto the screen:
  let renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // ******** START CODING ON THE NEXT LINE ********

  let shape = new THREE.SphereGeometry(100);
  let cover = new THREE.MeshNormalMaterial();
  let body = new THREE.Mesh(shape, cover);

  let handFoot = new THREE.SphereGeometry(50);
  
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

  let isCartwheeling;

  let cartwheeling_checkbox = document.querySelector('#isCartwheeling_checkbox');
  cartwheeling_checkbox.addEventListener("change", () => {
    if(cartwheeling_checkbox.checked){
      isCartwheeling = true;
      console.log(isCartwheeling);
    }
    else{
      isCartwheeling = false;
      console.log(isCartwheeling);
    }
  })

  function animate(){
    requestAnimationFrame(animate);
    if(isCartwheeling){
      body.rotation.z = body.rotation.z + 0.05;
    }
    renderer.render(scene, camera);
  }

  animate();