if ('serviceWorker' in navigator) {
  window. addEventListener('load', () => {
    navigator.serviceWorker.register('/snake/sw.js')
    .then(reg => {
      console.log('register', reg);
    }).catch(err => {
      console.log('failed', err);
    })
  })
}
