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