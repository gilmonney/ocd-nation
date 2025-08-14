function loadSection(section) {
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (section === 'home') {
    const container = document.createElement('div');
    container.id = 'three-container';
    app.appendChild(container);
    init3D(container);
  }

  if (section === 'shop') {
    fetch('products.json')
      .then(res => res.json())
      .then(data => {
        const grid = document.createElement('div');
        grid.className = "grid grid-cols-2 gap-4";
        data.forEach(product => {
          const card = document.createElement('div');
          card.className = "bg-white text-black p-4 rounded shadow";
          card.innerHTML = `
            <img src="${product.image}" class="w-full mb-2" />
            <h2 class="font-bold">${product.name}</h2>
            <p>$${product.price}</p>
          `;
          grid.appendChild(card);
        });
        app.appendChild(grid);
      });
  }

  if (section === 'contact') {
    app.innerHTML = `
      <form class="max-w-md space-y-4">
        <input type="text" placeholder="Your name" class="w-full p-2 text-black rounded" />
        <input type="email" placeholder="Your email" class="w-full p-2 text-black rounded" />
        <textarea placeholder="Your message" class="w-full p-2 text-black rounded"></textarea>
        <button class="bg-blue-500 px-4 py-2 rounded">Send</button>
      </form>
    `;
  }
}

function init3D(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();
  loader.load('https://pub-e2f4a27a52b7464299f6be42df19c790.r2.dev/Ocd-Final.png', texture => {
    const geometry = new THREE.PlaneGeometry(3, 3);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });
}

loadSection('home'); // Default
