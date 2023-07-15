$('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
});

document.addEventListener('mousemove', function(event) {
    var cursor = document.querySelector('.cursor');
    cursor.style.top = event.clientY + 'px';
    cursor.style.left = event.clientX + 'px';
  });

   // Get all the square elements
const squares = document.querySelectorAll('.square');
    
   // Add event listener to track cursor movement
document.addEventListener('mousemove', handleMouseMove);
 
   function handleMouseMove(event) {
     // Get the cursor's X and Y coordinates
     const cursorX = event.clientX;
     const cursorY = event.clientY;
   
     // Loop through each square and update its rotation
     squares.forEach(square => {
       // Calculate the rotation angle based on cursor position
       const squareX = square.offsetLeft + square.offsetWidth / 2;
       const squareY = square.offsetTop + square.offsetHeight / 2;
       const angle = Math.atan2(cursorY - squareY, cursorX - squareX) * (180 / Math.PI);
       
       // Add random animation effects
       const random = Math.random();
       if (random < 0.1) {
         square.style.transform = `rotate(${angle}deg) scale(1.5)`;
       } else if (random < 0.2) {
         square.style.transform = `rotate(${angle}deg) scale(.5)`;
       } else {
         square.style.transform = `rotate(${angle}deg) scale(1)`;
       }
     });
   }

// Get the eye-follow-container and eye-follow-box elements
var container1 = document.querySelectorAll('.eye-follow-container')[0];
var eyeBox1 = document.getElementById('eye1');
var container2 = document.querySelectorAll('.eye-follow-container')[1];
var eyeBox2 = document.getElementById('eye2');

// Calculate the container's boundaries for eye 1
var containerRect1 = container1.getBoundingClientRect();
var containerLeft1 = containerRect1.left;
var containerTop1 = containerRect1.top;
var containerWidth1 = containerRect1.width;
var containerHeight1 = containerRect1.height;

// Calculate the container's boundaries for eye 2
var containerRect2 = container2.getBoundingClientRect();
var containerLeft2 = containerRect2.left;
var containerTop2 = containerRect2.top;
var containerWidth2 = containerRect2.width;
var containerHeight2 = containerRect2.height;

// Define padding value
var padding = 3;

// Listen for mousemove event on the document
document.addEventListener('mousemove', function(e) {
  // Get the current mouse position
  var mouseX = e.pageX;
  var mouseY = e.pageY;

  // Calculate the adjusted position for eye 1 within its container
  var offsetX1 = containerLeft1 + containerWidth1 / 2;
  var offsetY1 = containerTop1 + containerHeight1 / 2;
  var translateX1 = mouseX - offsetX1;
  var translateY1 = mouseY - offsetY1;

  // Calculate the adjusted position for eye 2 within its container
  var offsetX2 = containerLeft2 + containerWidth2 / 2;
  var offsetY2 = containerTop2 + containerHeight2 / 2;
  var translateX2 = mouseX - offsetX2;
  var translateY2 = mouseY - offsetY2;

  // Limit the eye-follow-box positions within their respective containers' boundaries with padding
  var maxTranslateX1 = containerWidth1 / 2 - eyeBox1.offsetWidth / 2 - padding;
  var maxTranslateY1 = containerHeight1 / 2 - eyeBox1.offsetHeight / 2 - padding;
  translateX1 = Math.max(-maxTranslateX1, Math.min(translateX1, maxTranslateX1));
  translateY1 = Math.max(-maxTranslateY1, Math.min(translateY1, maxTranslateY1));

  var maxTranslateX2 = containerWidth2 / 2 - eyeBox2.offsetWidth / 2 - padding;
  var maxTranslateY2 = containerHeight2 / 2 - eyeBox2.offsetHeight / 2 - padding;
  translateX2 = Math.max(-maxTranslateX2, Math.min(translateX2, maxTranslateX2));
  translateY2 = Math.max(-maxTranslateY2, Math.min(translateY2, maxTranslateY2));

  // Calculate rotation angles based on the movement direction for eye 1
  var rotationX1 = -translateY1 / maxTranslateY1 * 10;
  var rotationY1 = translateX1 / maxTranslateX1 * 10;

  // Calculate rotation angles based on the movement direction for eye 2
  var rotationX2 = -translateY2 / maxTranslateY2 * 10;
  var rotationY2 = translateX2 / maxTranslateX2 * 10;

  // Apply transitions and rotations to the eye-follow-boxes
  eyeBox1.style.transition = 'transform 0.3s';
  eyeBox1.style.transform = `translate(${translateX1}px, ${translateY1}px) rotateX(${rotationX1}deg) rotateY(${rotationY1}deg)`;

  eyeBox2.style.transition = 'transform 0.3s';
  eyeBox2.style.transform = `translate(${translateX2}px, ${translateY2}px) rotateX(${rotationX2}deg) rotateY(${rotationY2}deg)`;
});

// Reset the eye-follow-box positions and transitions when the mouse leaves the containers
container1.addEventListener('mouseleave', function() {
  eyeBox1.style.transition = 'transform 0.1s';
  eyeBox1.style.transform = 'translate(0, 0)';
});

container2.addEventListener('mouseleave', function() {
  eyeBox2.style.transition = 'transform 0.1s';
  eyeBox2.style.transform = 'translate(0, 0)';
});

let btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo-text');

window.onload = () => {
  let animationPlayed = sessionStorage.getItem('animationPlayed');

  if (!animationPlayed) {
    playAnimation();
  } else {
    intro.style.display = 'none';
  }
};

function playAnimation() {
  setTimeout(() => {
    logoSpan.forEach((span, idx) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpan.forEach((span, idx) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (idx + 1) * 50);
      });
    }, 2000);

    setTimeout(() => {
      intro.classList.add('move-up');
    }, 2300);

    setTimeout(() => {
      intro.style.display = 'none';
      sessionStorage.setItem('animationPlayed', true);
    }, 3300);
  });
}

