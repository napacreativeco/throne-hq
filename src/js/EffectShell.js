class EffectShell {
  constructor(container = document.body, itemsWrapper = null) {
    this.container = container
    this.itemsWrapper = itemsWrapper
    if (!this.container || !this.itemsWrapper) return
    this.setup()
    this.initEffectShell().then(() => {
      console.log('load finished')
      this.isLoaded = true
      if (this.isMouseOver) this.onMouseOver(this.tempItemIndex)
      this.tempItemIndex = null
    })
    this.createEventsListeners()
  }

  setup() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false)

    // renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(this.document.width, this.document.height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.container.appendChild(this.renderer.domElement)

    // scene
    this.scene = new THREE.Scene()

    // camera
    this.camera = new THREE.PerspectiveCamera(
      40,
      this.document.aspectRatio,
      0.1,
      100
    )
    this.camera.position.set(0, 0, 3)

    //mouse
    this.mouse = new THREE.Vector2()

    // time
    this.timeSpeed = 1
    this.time = 0
    this.clock = new THREE.Clock()

    // animation loop
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  render() {
    // called every frame
    this.time += this.clock.getDelta() * this.timeSpeed
    this.renderer.render(this.scene, this.camera)
  }

  initEffectShell() {
    let promises = []

    this.items = this.itemsElements

    const THREEtextureLoader = new THREE.TextureLoader()
    this.items.forEach((item, index) => {
      // create textures
      promises.push(
        this.loadTexture(
          THREEtextureLoader,
          item.img ? item.img.src : null,
          index
        )
      )
    })

    return new Promise((resolve, reject) => {
      // resolve textures promises
      Promise.all(promises).then(promises => {
        // all textures are loaded
        promises.forEach((promise, index) => {
          // assign texture to item
          this.items[index].texture = promise.texture
        })
        resolve()
      })
    })
  }

  createEventsListeners() {
    this.items.forEach((item, index) => {
      item.element.addEventListener(
        'mouseover',
        this._onMouseOver.bind(this, index),
        false
      )
    })

    this.container.addEventListener(
      'mousemove',
      this._onMouseMove.bind(this),
      false
    )
    this.itemsWrapper.addEventListener(
      'mouseleave',
      this._onMouseLeave.bind(this),
      false
    )
  }

  _onMouseLeave(event) {
    this.isMouseOver = false
    this.onMouseLeave(event)
  }

  _onMouseMove(event) {
    // get normalized mouse position on document
    this.mouse.x = (event.clientX / this.document.width) * 2 - 1
    this.mouse.y = -(event.clientY / this.document.height) * 2 + 1

    this.onMouseMove(event)
  }

  _onMouseOver(index, event) {
    this.tempItemIndex = index
    this.onMouseOver(index, event)
  }

  onWindowResize() {
    this.camera.aspect = this.document.aspectRatio
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.document.width, this.document.height)
  }

  onUpdate() {}

  onMouseEnter(event) {}

  onMouseLeave(event) {}

  onMouseMove(event) {}

  onMouseOver(index, event) {}

  get document() {
    let width = this.container.clientWidth
    let height = this.container.clientHeight
    let aspectRatio = width / height
    return {
      width,
      height,
      aspectRatio
    }
  }

  get viewSize() {
    // fit plane to screen
    // https://gist.github.com/ayamflow/96a1f554c3f88eef2f9d0024fc42940f

    let distance = this.camera.position.z
    let vFov = (this.camera.fov * Math.PI) / 180
    let height = 2 * Math.tan(vFov / 2) * distance
    let width = height * this.document.aspectRatio
    return { width, height, vFov }
  }

  get itemsElements() {
    // convert NodeList to Array
    const items = [...this.itemsWrapper.querySelectorAll('.link')]

    //create Array of items including element, image and index
    return items.map((item, index) => ({
      element: item,
      img: item.querySelector('img') || null,
      index: index
    }))
  }

  loadTexture(loader, url, index) {
    // https://threejs.org/docs/#api/en/loaders/TextureLoader
    return new Promise((resolve, reject) => {
      if (!url) {
        resolve({ texture: null, index })
        return
      }
      // load a resource
      loader.load(
        // resource URL
        url,

        // onLoad callback
        texture => {
          resolve({ texture, index })
        },

        // onProgress callback currently not supported
        undefined,

        // onError callback
        error => {
          console.error('An error happened.', error)
          reject(error)
        }
      )
    })
  }
}
