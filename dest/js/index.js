(function () {
  'use strict'; 

  var elements = document.getElementsByClassName('drag-and-drop'); 

  var x;
  var y; 

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('mousedown', mdown, false);
    elements[i].addEventListener('touchstart', mdown, false);
  } 


  function mdown(e) {
    this.classList.add('drag'); 

    if (e.type === 'mousedown') {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    } 


    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop; 

    document.body.addEventListener('mousemove', mmove, false);
    document.body.addEventListener('touchmove', mmove, false);
  } 


  function mmove(e) {
    var drag = document.getElementsByClassName('drag')[0]; 

    if (e.type === 'mousemove') {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    } 


    e.preventDefault(); 

    drag.style.top = event.pageY - y + 'px';
    drag.style.left = event.pageX - x + 'px'; 

    drag.addEventListener('mouseup', mup, false);
    document.body.addEventListener('mouseleave', mup, false);
    drag.addEventListener('touchend', mup, false);
    document.body.addEventListener('touchleave', mup, false);
  } 


  function mup(e) {
    var drag = document.getElementsByClassName('drag')[0]; 

    document.body.removeEventListener('mousemove', mmove, false); 

    document.body.removeEventListener('touchmove', mmove, false);
    drag.removeEventListener('touchend', mup, false); 

    drag.classList.remove('drag');
  }

  var DLbtn = document.getElementById('download-btn');
  DLbtn.addEventListener('click', function () {
    html2canvas(document.querySelector('#canvas-box')).then(function (canvas) {
      var downloadEle = document.createElement('a');
      downloadEle.href = canvas.toDataURL('image/png');
      downloadEle.download = 'canvas2.png';
      downloadEle.click();
    });
  }); 

  function disableScroll(event) {
    event.preventDefault();
  } 


  document.getElementById('on').onclick = function () {
    document.addEventListener('touchmove', disableScroll, {
      passive: false
    });
    document.addEventListener('mousewheel', disableScroll, {
      passive: false
    });
  };
})();