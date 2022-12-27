/*
 * Burger
 */
var burger = document.querySelector('.hamburger');
var menu = document.getElementById('overlay-menu');

burger.addEventListener('click', function() {
  if ( burger.classList.contains('is-active') ) {
    burger.classList.remove('is-active');
    menu.style.display = 'none';
  } else {
    burger.classList.add('is-active');
    menu.style.display = 'block';
  }
});

/* 
* Open Case Studies
*/
$('.link').on('click', function() {
    var resu = $(this).attr('data-project');
    var elm = document.getElementById(resu);
  
    $(elm).css('display', 'block');
    elm.style.height = '98vh';
    $('.animator').addClass('animato');
  
  });
  
  /*
  * Close Case Studies
  */
  $('.close-cs').on('click', function() {
    $('.case-study').css('height', '0vh');
    $('.case-study-right').scrollTop(0);
    setTimeout(() => {
      $('.case-study').css('display', 'none')
    }, 1000);
  });
/* 
* Cursor
*/
var cursor = {
    delay: 10,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),
    $inverted: document.getElementsByClassName('invert'),
  
    init: function() {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;
        
        this.setupEventListeners();
        this.animateDotOutline();
    },
  
    setupEventListeners: function() {
        var self = this;
    
        // Anchor hovering
        document.querySelectorAll('a').forEach(function(el) {
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });
  
        // Button hovering
        document.querySelectorAll('button').forEach(function(el) {
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });
  
        // Text Hovering
        document.querySelectorAll('.mouse-big').forEach(function(el) {
          el.addEventListener('mouseover', function() {
              self.cursorEnlarged = true;
              self.toggleCursorSize();
          });
          el.addEventListener('mouseout', function() {
              self.cursorEnlarged = false;
              self.toggleCursorSize();
          });
      });
    
        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });
  
  
        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();
  
            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            // self.$dot.style.top = self.endY + 'px';
            // self.$dot.style.left = self.endX + 'px';
  
            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$dot.style.top = self._y + 'px';
            self.$dot.style.left = self._x + 'px';
        });
        
        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            // self.$outline.style.opacity = 1;
        });
    
        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            // self.$outline.style.opacity = 0;
        });
    },
  
    animateDotOutline: function() {
        var self = this;
        
        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';
        
        requestAnimationFrame(this.animateDotOutline.bind(self));
    },
  
    toggleCursorSize: function() {
        var self = this;
        
        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(5)';
            self.$dot.style.background = 'rgba(255, 255, 255, 0)';
            self.$dot.style.border = '1px solid rgba(255, 255, 2555, 1)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$dot.style.background = 'rgba(255, 255, 255, 1)';
            self.$dot.style.border = '0px solid rgba(255, 255, 2555, 1)';
        }
    },
  
    toggleCursorVisibility: function() {
        var self = this;
        
        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
  }
  cursor.init();
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

Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }


const container = document.body;
const itemsWrapper = document.querySelector('.grid');
const loader = document.querySelector('.loading');

const preloadImages = () => {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll('img'), resolve);
        imagesLoaded(document.querySelectorAll('svg'), resolve);
    });
};

preloadImages().then(() => {

    // Init Hover FX
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    if (mediaQuery.matches) {
      const effect = new RGBShiftEffect(container, itemsWrapper, { strength: 0.55 })
    }

    setTimeout(function() {

      // Remove the loader
      loader.style.display = "none";

    }, 3000);


});


anime({
    targets: '.progress',
    keyframes: [
      { width: '0%', background: '#585858' },
      { width: '20%' },
      { width: '50%' },
      { width: '70%' },
      { width: '85%' },
      { width: '95%' },
      { width: '100%', background: '#fff', }
    ],
    easing: 'easeOutElastic(1, .8)',
    duration: 2600,
    })
class RGBShiftEffect extends EffectShell {
  constructor(container = document.body, itemsWrapper = null, options = {}) {
    super(container, itemsWrapper)
    if (!this.container || !this.itemsWrapper) return

    options.strength = options.strength || 0.95
    this.options = options

    this.init()
  }

  init() {
    this.position = new THREE.Vector3(0, 0, 0)
    this.scale = new THREE.Vector3(1, 1, 1)
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
    this.uniforms = {
      uTime: {
        value: 0
      },
      uTexture: {
        value: null
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uAlpha: {
        value: 0
      }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform vec2 uOffset;

        varying vec2 vUv;

        vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
          float M_PI = 3.1415926535897932384626433832795;
          position.x = position.x + (sin(uv.y * M_PI) * offset.x);
          position.y = position.y + (sin(uv.x * M_PI) * offset.y);
          return position;
        }

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          newPosition = deformationCurve(position,uv,uOffset);
          gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uAlpha;
        uniform vec2 uOffset;

        varying vec2 vUv;

        vec3 rgbShift(sampler2D texture, vec2 uv, vec2 offset) {
          float r = texture2D(uTexture,vUv + uOffset).r;
          vec2 gb = texture2D(uTexture,vUv).gb;
          return vec3(r,gb);
        }

        void main() {
          vec3 color = rgbShift(uTexture,vUv,uOffset);
          gl_FragColor = vec4(color,uAlpha);
        }
      `,
      transparent: true
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  onMouseEnter() {
    if (!this.currentItem || !this.isMouseOver) {
      this.isMouseOver = true
      // show plane
      TweenLite.to(this.uniforms.uAlpha, 0.5, {
        value: 1,
        delay: 0.3,
        ease: Power4.easeOut
      })
    }
  }

  onMouseLeave(event) {
    TweenLite.to(this.uniforms.uAlpha, 0.5, {
      value: 0,
      ease: Power4.easeOut
    })
  }

  onMouseMove(event) {
    // project mouse position to world coodinates
    let x = this.mouse.x.map(
      -1,
      1,
      -this.viewSize.width / 2,
      this.viewSize.width / 2
    )
    let y = this.mouse.y.map(
      -1,
      1,
      -this.viewSize.height / 2,
      this.viewSize.height / 2
    )

    this.position = new THREE.Vector3(x, y, 0)
    TweenLite.to(this.plane.position, 1, {
      x: x,
      y: y,
      ease: Power4.easeOut,
      onUpdate: this.onPositionUpdate.bind(this)
    })
  }

  onPositionUpdate() {
    // compute offset
    let offset = this.plane.position
      .clone()
      .sub(this.position)
      .multiplyScalar(-this.options.strength)
    this.uniforms.uOffset.value = offset
  }

  onMouseOver(index, e) {
    if (!this.isLoaded) return
    this.onMouseEnter()
    if (this.currentItem && this.currentItem.index === index) return
    this.onTargetChange(index)
  }

  onTargetChange(index) {
    // item target changed
    this.currentItem = this.items[index]
    if (!this.currentItem.texture) return

    // compute image ratio
    let imageRatio =
      this.currentItem.img.naturalWidth / this.currentItem.img.naturalHeight
    this.scale = new THREE.Vector3(imageRatio, 1, 1)
    this.uniforms.uTexture.value = this.currentItem.texture
    this.plane.scale.copy(this.scale)
  }
}

// passing options
var controller = new ScrollMagic.Controller();

// Blocks
new ScrollMagic.Scene({ 
  duration: '100%',
  triggerHook: 'onEnter',
  triggerElement: '#blocks'
}).setClassToggle('.anime__line-vertical', 'entered').addTo(controller);

// Projects
var projectLength = $('#projects').height();
var projectScene = new ScrollMagic.Scene({ 
  duration: projectLength + '100vh',
  offset: 100,
  triggerHook: 'onCenter',
  triggerElement: '.grid'
}).setClassToggle('.anime__line-horizontal-from-left', 'entered').addTo(controller);

// Marquee
var marqueeScene = new ScrollMagic.Scene({
  duration: window.innerHeight,
  triggerHook: 'onEnter',
  triggerElement: '#marquee',
}).setClassToggle('.anime__line-horizontal', 'entered').addTo(controller);


// passing options
var csLength = $('.cs-section').height();
var csController = new ScrollMagic.Controller({
  container: '.case-study',
});

// Case Studies
new ScrollMagic.Scene({ 
  duration: '100%',
  triggerHook: 'onEnter',
  triggerElement: '.cs-lower',
}).setClassToggle('.cs-horizontal-line.one', 'grow-liner').addTo(csController);
new ScrollMagic.Scene({ 
  duration: '100%',
  triggerHook: 'onEnter',
  triggerElement: '.brief',
}).setClassToggle('.cs-horizontal-line.two', 'grow-liner').addTo(csController);
new ScrollMagic.Scene({ 
  duration: '100%',
  triggerHook: 'onEnter',
  triggerElement: '.functionality',
}).setClassToggle('.cs-horizontal-line.three', 'grow-liner').addTo(csController);
new ScrollMagic.Scene({ 
  duration: '100%',
  triggerHook: 'onEnter',
  triggerElement: '.technology',
}).setClassToggle('.cs-horizontal-line.four', 'grow-liner').addTo(csController);
new ScrollMagic.Scene({ 
  duration: '100%',
  triggerHook: 'onEnter',
  triggerElement: '.cs-section.links',
}).setClassToggle('.cs-horizontal-line.five', 'grow-liner').addTo(csController);
class StretchEffect extends EffectShell {
  constructor(container = document.body, itemsWrapper = null, options = {}) {
    super(container, itemsWrapper)
    if (!this.container || !this.itemsWrapper) return

    options.strength = options.strength || 0.25
    this.options = options

    this.init()
  }

  init() {
    this.position = new THREE.Vector3(0, 0, 0)
    this.scale = new THREE.Vector3(1, 1, 1)
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
    this.uniforms = {
      uTexture: {
        value: null
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uAlpha: {
        value: 0
      }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform vec2 uOffset;

        varying vec2 vUv;

        vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
          float M_PI = 3.1415926535897932384626433832795;
          position.x = position.x + (sin(uv.y * M_PI) * offset.x);
          position.y = position.y + (sin(uv.x * M_PI) * offset.y);
          return position;
        }

        void main() {
          vUv =  uv + (uOffset * 2.);
          vec3 newPosition = position;
          newPosition = deformationCurve(position,uv,uOffset);
          gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uAlpha;

        varying vec2 vUv;

        vec2 scaleUV(vec2 uv,float scale) {
          float center = 0.5;
          return ((uv - center) * scale) + center;
        }

        void main() {
          vec3 color = texture2D(uTexture,scaleUV(vUv,0.8)).rgb;
          gl_FragColor = vec4(color,uAlpha);
        }
      `,
      transparent: true
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  onMouseEnter() {
    if (!this.currentItem || !this.isMouseOver) {
      this.isMouseOver = true
      // show plane
      TweenLite.to(this.uniforms.uAlpha, 0.5, {
        value: 1,
        ease: Power4.easeOut
      })
    }
  }

  onMouseLeave(event) {
    TweenLite.to(this.uniforms.uAlpha, 0.5, {
      value: 0,
      ease: Power4.easeOut
    })
  }

  onMouseMove(event) {
    // project mouse position to world coodinates
    let x = this.mouse.x.map(
      -1,
      1,
      -this.viewSize.width / 2,
      this.viewSize.width / 2
    )
    let y = this.mouse.y.map(
      -1,
      1,
      -this.viewSize.height / 2,
      this.viewSize.height / 2
    )

    // update position
    this.position = new THREE.Vector3(x, y, 0)
    TweenLite.to(this.plane.position, 1, {
      x: x,
      y: y,
      ease: Power4.easeOut,
      onUpdate: this.onPositionUpdate.bind(this)
    })
  }

  onPositionUpdate() {
    // compute offset
    let offset = this.plane.position
      .clone()
      .sub(this.position)
      .multiplyScalar(-this.options.strength)
    this.uniforms.uOffset.value = offset
  }

  onMouseOver(index, e) {
    if (!this.isLoaded) return
    this.onMouseEnter()
    if (this.currentItem && this.currentItem.index === index) return
    this.onTargetChange(index)
  }

  onTargetChange(index) {
    // item target changed
    this.currentItem = this.items[index]
    if (!this.currentItem.texture) return

    // compute image ratio
    let imageRatio =
      this.currentItem.img.naturalWidth / this.currentItem.img.naturalHeight
    this.scale = new THREE.Vector3(imageRatio, 1, 1)
    this.uniforms.uTexture.value = this.currentItem.texture
    this.plane.scale.copy(this.scale)
  }
}

// Work Outline
anime({
    targets: '.work ellipse',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: false
  });
  
class TrailsEffect extends EffectShell {
  constructor(container = document.body, itemsWrapper = null, options = {}) {
    super(container, itemsWrapper)
    if (!this.container || !this.itemsWrapper) return

    options.strength = options.strength || 0.25
    options.amount = options.amount || 5
    options.duration = options.duration || 0.5
    this.options = options

    this.init()
  }

  init() {
    this.position = new THREE.Vector3(0, 0, 0)
    this.scale = new THREE.Vector3(1, 1, 1)
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 16, 16)
    //shared uniforms
    this.uniforms = {
      uTime: {
        value: 0
      },
      uTexture: {
        value: null
      },
      uOffset: {
        value: new THREE.Vector2(0.0, 0.0)
      },
      uAlpha: {
        value: 0
      }
    }
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        uniform vec2 uOffset;

        varying vec2 vUv;

        vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
          float M_PI = 3.1415926535897932384626433832795;
          position.x = position.x + (sin(uv.y * M_PI) * offset.x);
          position.y = position.y + (sin(uv.x * M_PI) * offset.y);
          return position;
        }

        void main() {
          vUv = uv;
          vec3 newPosition = position;
          newPosition = deformationCurve(position,uv,uOffset);
          gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uAlpha;
        uniform vec2 uOffset;

        varying vec2 vUv;

        void main() {
          vec3 color = texture2D(uTexture,vUv).rgb;
          gl_FragColor = vec4(color,uAlpha);
        }
      `,
      transparent: true
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)

    this.trails = []
    for (let i = 0; i < this.options.amount; i++) {
      let plane = this.plane.clone()
      this.trails.push(plane)
      this.scene.add(plane)
    }
  }

  onMouseEnter() {
    if (!this.currentItem || !this.isMouseOver) {
      this.isMouseOver = true
      // show plane
      TweenLite.to(this.uniforms.uAlpha, 0.5, {
        value: 1,
        ease: Power4.easeOut
      })
    }
  }

  onMouseLeave(event) {
    TweenLite.to(this.uniforms.uAlpha, 0.5, {
      value: 0,
      ease: Power4.easeOut
    })
  }

  onMouseMove(event) {
    // project mouse position to world coodinates
    let x = this.mouse.x.map(
      -1,
      1,
      -this.viewSize.width / 2,
      this.viewSize.width / 2
    )
    let y = this.mouse.y.map(
      -1,
      1,
      -this.viewSize.height / 2,
      this.viewSize.height / 2
    )

    TweenLite.to(this.position, 1, {
      x: x,
      y: y,
      ease: Power4.easeOut,
      onUpdate: () => {
        // compute offset
        let offset = this.position
          .clone()
          .sub(new THREE.Vector3(x, y, 0))
          .multiplyScalar(-this.options.strength)
        this.uniforms.uOffset.value = offset
      }
    })

    this.trails.forEach((trail, index) => {
      let duration =
        this.options.duration * this.options.amount -
        this.options.duration * index
      TweenLite.to(trail.position, duration, {
        x: x,
        y: y,
        ease: Power4.easeOut
      })
    })
  }

  onMouseOver(index, e) {
    if (!this.isLoaded) return
    this.onMouseEnter()
    if (this.currentItem && this.currentItem.index === index) return
    this.onTargetChange(index)
  }

  onTargetChange(index) {
    // item target changed
    this.currentItem = this.items[index]
    if (!this.currentItem.texture) return

    // compute image ratio
    let imageRatio =
      this.currentItem.img.naturalWidth / this.currentItem.img.naturalHeight
    this.scale = new THREE.Vector3(imageRatio, 1, 1)
    this.uniforms.uTexture.value = this.currentItem.texture
    //this.plane.scale.copy(this.scale)
    this.trails.forEach(trail => {
      trail.scale.copy(this.scale)
    })
  }
}
