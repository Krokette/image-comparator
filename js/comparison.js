function initComparisons() {
  cleaningHTML();
  var overlayImg, i;
  /*find all elements with an "overlay" class:*/
  overlayImg = document.getElementsByClassName("img-comp-overlay");
  for (i = 0; i < overlayImg.length; i++) {
    /*once for each "overlay" element:
    pass the "overlay" element as a parameter when executing the compareImages function:*/
    compareImages(overlayImg[i]);
  }

  function compareImages(img) {
    var slider,
      img,
      clicked = 0,
      timesclicked = 0,
      w,
      h;

    /*get the width and height of the img element*/
    w = img.scrollWidth;
    h = img.scrollHeight;
    console.log("w: " + w + " h: " + h);
    // console.dir(img);

    /*set the width of the img element to 50%:*/
    img.style.width = w / 2 + "px";
    console.log("img.style.width = " + img.style.width);

    /*create slider:*/
    slider = document.createElement("DIV");
    slider.setAttribute("id", "img-comp-slider");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    console.dir(img.parentElement);
    /*position the slider in the middle:*/
    slider.style.top = h / 2 - slider.offsetHeight / 2 + "px";
    slider.style.left = w / 2 - slider.offsetWidth / 2 + "px";
    console.log("slider top: " + slider.style.top + "=> " + h + " / 2" + " - " + slider.offsetHeight + " / 2");
    console.log("slider left: " + slider.style.left + "=> " + w + " / 2" + " - " + slider.offsetWidth + " / 2");
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("click", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("click", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      if (timesclicked >= 1) {
        /*the slider is no longer clicked:*/
        clicked = 0;
        timesclicked = 0;
      } else {
        timesclicked++;
      }
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e);
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a,
        x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      console.log("e.pagex: " + e.pageX + " - " + "a.left: " + a.left + " = " + x);
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      console.log(x + " - " + window.pageXOffset + " = " + x + " final pos");
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + "px";
    }
  }
}

function cleaningHTML() {
  try {
    console.log("cleaning...");

    var x = document.querySelector("#img-comp-slider");
    x.remove();
  } catch (err) {}
}
