var parallaxItems = [];
var fadeItems = [];

function scrollHandler(e) {
  var windowHeight = window.innerHeight;
  parallaxItems.forEach(function(item) {
    var ratio = parseFloat(item.getAttribute('data-parallax'));
    var rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      var normalized = (rect.top - windowHeight) / (rect.top - rect.bottom - windowHeight);
      normalized = Math.max(0, Math.min(1, normalized));

      var y = normalized * ratio * rect.height;
      item.style.transform = 'translate(0, ' + y + 'px)';
      item.style.webkitTransform = 'translate(0, ' + y + 'px)';
    }
  });

  fadeItems.forEach(function(item) {
    var rect = item.getBoundingClientRect();
    var offset = parseFloat(item.getAttribute('data-fade') || 0);
    if (rect.top < (window.innerHeight - offset) && rect.bottom > offset) {
      item.style.opacity = 1;
    }
  });
}

function init() {
  var itemsParallax = document.querySelectorAll('[data-parallax]');
  var itemsFade = document.querySelectorAll('[data-fade]');

  for(var i = 0; i < itemsParallax.length; i++) {
    parallaxItems.push(itemsParallax[i]);
  }

  for(var i = 0; i < itemsFade.length; i++) {
    fadeItems.push(itemsFade[i]);
  }

  scrollHandler();
  window.addEventListener('scroll', scrollHandler);
}

window.onload = init;
