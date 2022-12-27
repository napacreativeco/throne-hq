
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