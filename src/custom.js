

const isOnline = !(window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1" ||
window.location.protocol === "file:");

location.hash = '';

const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

const userAgent = navigator.userAgent.toLowerCase();
  // detect WebKit browsers
  const isWebKit = !userAgent.match("gecko") && userAgent.match("webkit");
  const isChrome = userAgent.indexOf("chrome") > -1 && userAgent.match("safari");
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

//let testMode = isOnline;
let testMode = false;

let avifSupport = false;
    var avifTest = new Image();
    avifTest.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    avifTest.onload = function () {
      avifSupport = true;
      //alert('avif supported')
    };

let isTouchDevice = false;
window.addEventListener('touchstart', function() {
  isTouchDevice = true;
})


//const lenis = new Lenis();
//lenis.stop();

const threshold = .01
const options = {
  root: null,
  rootMargin: '0px',
  threshold
}

let forceShowHeader = false;

let revealIndex = 0;
let scrollDirection = 'down';
let lastScrollY = 0;
let scrollLock = false;

let doCustomScroll = false;
let cancelSmoothScrollTo = false;


let defaultScrollDuration = 4000;
let isSmoothScrolling = false;
let forceSmoothScrolling = true;


/*
window.addEventListener('scrollend', function () {
  setTimeout(function () {
    alert('scrollend')
    revealIndex = 0;  // Reset index on scroll
  }, 100);
});
*/

// Element to move, time in ms to animate
function scrollToCustom(element, duration) {
  //if (isSafari){
  //  return
  //}
  
  var e = document.documentElement;
  if (!doCustomScroll){
    if (isSafari) {

      location.hash = element.id;
      requestAnimationFrame(() => {
        adjustSunglasses();
      });
      //element.scrollIntoView({ behavior: "smooth"});
    } else if (!isSafari && isChrome){
      location.hash = element.id;
      requestAnimationFrame(() => {
        adjustSunglasses();
      });
    }
    
    return
  }
  cancelSmoothScrollTo = false;
  //alert(element.id)
  /*
  if (e.scrollTop === 0) {
    var t = e.scrollTop;
    ++e.scrollTop;
    e = t + 1 === e.scrollTop-- ? e : document.body;
  }*/
  const rect = element.getBoundingClientRect();
  
  const elementTop = rect.top + e.scrollTop; // Adjust for current scroll position
  
  requestAnimationFrame(() => {

    scrollToC(e, e.scrollTop, elementTop, duration);
  });
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
  if (duration <= 0) return;
  if (typeof from === "object") from = from.offsetTop;
  if (typeof to === "object") to = to.offsetTop;

  // Initialize the smooth scrolling with a starting timestamp
  requestAnimationFrame((timestamp) => {
    scrollToX(element, from, to, 0, (1 / duration), duration, easeOutCuaic, timestamp, true);
  });
}

let startTime = 0;

function scrollToX(element, xFrom, xTo, t01, speed, duration, motion, lastTimestamp, kickstart) {
  
  const now = performance.now();
  let deltaTime = (now - lastTimestamp); 
  if (kickstart){
    startTime = lastTimestamp;
  }
  let totalDeltaTime = now - startTime;
  
  // Handle initial frame to avoid large delta on kickstart
  let ratio = kickstart ? 1 : deltaTime / 16.666; // Normalize deltaTime for 60fps
  
  // Stop condition when t01 is out of bounds or animation is canceled
  if (t01 >= 1 || cancelSmoothScrollTo) {
    element.scrollTop = xTo;
    isSmoothScrolling = false;
    return;
  }

  isSmoothScrolling = true;

  // Update the element's scrollTop based on the easing motion function
  let tmpDest = xFrom - (xFrom - xTo) * motion(t01);
  element.scrollTop = tmpDest;

  // Update t01 based on frame delta and speed
  //t01 += speed * ratio * 100;

  t01 = Math.min(totalDeltaTime / duration, 1);

  //console.log('scrollToX now ' + xFrom + ' ' + xTo + ' ' + tmpDest + ' ' + t01)

  //console.log(`DeltaTime: ${deltaTime.toFixed(3)}, Ratio: ${ratio}, t01: ${t01}`);

  // Request the next animation frame
  requestAnimationFrame((newTimestamp) => {
  //setTimeout(() => {
    scrollToX(element, xFrom, xTo, t01, speed, duration, motion, newTimestamp, false);
  //}, 16);
  });
}

// Easing function
function easeOutCuaic(t) {
  t--;
  return t * t * t + 1;
}

// Function to detect scroll direction
function detectScrollDirection() {
  const currentScrollY = window.scrollY;
  scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;
}


document.addEventListener("DOMContentLoaded", (event) => {
  //location.hash = 'home';
  setTimeout(() => {
    forceShowHeader = true;
    window.scroll({ top: -1, left: 0, behavior: "smooth" });
    /*
    setTimeout(() => {
      forceShowHeader = true;
      window.scroll({ top: 100, left: 0, behavior: "smooth" });
  
    }, 500);*/
  }, 100);
  
  console.log('dom content loaded ' + performance.now())

  if (testMode) {
    // Prompt for test mode password
    let input = prompt("Enter the password to enable test mode:");

    // Define your test mode password
    const correctPassword = "testmode123"; // Change this to your desired password

    // If the input is correct, remove the "private" class
    if (input === correctPassword) {
      const privateContent = document.getElementById('privateContent');
      //privateContent.classList.remove('private');
      //alert("Test mode enabled.");
      spa();
    } else {
      alert("Incorrect password. No changes made.");
    }
  } else {
    spa();
  }

});

// Function to check AVIF support using a Promise
function checkAvifSupport() {
  
  return new Promise((resolve) => {
    let avifTest = new Image();
    avifTest.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";

    // If the image loads, AVIF is supported
    avifTest.onload = function () {
      //alert('true')
      resolve(true);
    };

    // If the image fails to load, AVIF is not supported
    avifTest.onerror = function () {
      //alert('false')
      resolve(false);
    };
  });
}

// Function to modify images based on AVIF support
function updateImagesForFormat(avifSupport) {
  if (!avifSupport){
    const imagesAllSlides = document.querySelectorAll("img.slide");
    imagesAllSlides.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      const dataSrcSet = img.getAttribute('data-srcset');
      if (dataSrcSet) {
        img.setAttribute('data-srcset', dataSrcSet.split('.avif').join('.webp'));
      }

      if (img.srcset){
        img.srcset = img.srcset.split('.avif').join('.webp');
      }
      
      if (img.src) {  // Ensure data-src is available
        img.src = img.src.split('.avif').join('.webp');
      } 
    });
  }
  
}

function lazyload() {
    
  console.log('go lazy ' + performance.now())
  /*
  let avifSupport = false;
  var avifTest = new Image();
  avifTest.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  avifTest.onload = function () {
    avifSupport = true;
    //alert('avif supported')
  };*/
  checkAvifSupport().then((avifSupport) => {
    const imagesLazy = document.querySelectorAll("img.lazyload");
    imagesLazy.forEach(img => {
      const dataSrc = img.getAttribute('data-src');
      const dataSrcSet = img.getAttribute('data-srcset');
      if (dataSrcSet) {
        if (avifSupport){
          img.srcset = dataSrcSet;
        } else {
          img.srcset = dataSrcSet.split('.avif').join('.webp');
        }
        
      } else if (dataSrc) {  // Ensure data-src is available
        //console.log(`Setting src for img with data-src: ${dataSrc}`);
        if (avifSupport){
          img.src = dataSrc;
        } else {
          img.src = dataSrc.split('.avif').join('.webp');  // Set the src
        }
        //img.setAttribute('src',dataSrc)
      } else {
        console.warn('No data-src found for this image:', img);
      }
    });
  });
  
}

function spaStart(){

  

  console.log('spa start ' + performance.now())
  const body = document.querySelector('.page-home');
  const greatDiv = document.querySelector('.great');
  const splashDiv = document.getElementById('splash');
  

  defaultScrollDuration = isSafari ? 2000 : 4000;

  // REM : chrome needs CSS : html {scroll-behavior: auto !important;} else it has a bug
  // where it delays element.scrollTo until almost end of duration then warp speed to destination scroll position
  //doCustomScroll = isChrome ? false : true;
  doCustomScroll = true;

  const hoverableDelay = 3000;

  body.classList.remove('js-hidden');
  body.classList.remove('scroll-lock');

  
  //lenis.start();

  /*
  // Get all elements with class 'animonItem'
  const placeholders = document.querySelectorAll('.placeholder');

  placeholders.forEach(function (item) {
    item.classList.add('hidden');
  });*/

  let hasLazyLoaded = false;

  // Get all elements with class 'animonItem'
  const animonItems = document.querySelectorAll('.animonItem');

  animonItems.forEach(function (item) {
    item.classList.add('paused');
  });
  // Convert NodeList to an array and get the first 3 items
  const firstFourItems = Array.from(animonItems).slice(0, 8);
  const fifthItem = animonItems[4];

  const maxRevealClassModulo = 6;

  requestAnimationFrame(() => {
    const handleIntersect = function (entries, observer) {

      // Iterate over each entry (each observed element)
      entries.forEach(function (entry) {
        const targetDiv = entry.target;
        if (entry.intersectionRatio > threshold) {

          
        
          if (targetDiv.id == 'we-make') {
            
            //console.log(document.getElementById('we-make'));
            setTimeout(function () { // TODO : check if splash is in viewport
              splashDiv.classList.add('finished');
              //alert("finished")
            }, hoverableDelay);
          }

          // Check if the entry does not have any class from reveal-1 to reveal-10
          const hasRevealClass = Array.from({ length: maxRevealClassModulo}, (_, i) => `reveal-${i + 1}`).some(cls => targetDiv.classList.contains(cls));
          const revealClass = Array.from({ length: maxRevealClassModulo }, (_, i) => `reveal-${i + 1}`).find(cls => targetDiv.classList.contains(cls))
          
          if (hasRevealClass){
            revealIndex = parseInt(revealClass.split('-')[1], 10) - 1;
            //alert(revealIndex)
          }

          if (!hasRevealClass || scrollDirection === 'up' && (firstFourItems.includes(targetDiv) || targetDiv.id == fifthItem.id)) {

            let delayClass; // Use reveal-1 to reveal-10
            if (revealIndex + 1 >= maxRevealClassModulo){
              //delayClass = `reveal-${5}`;
              revealIndex = 3;
              delayClass = `reveal-${Math.min(revealIndex)}`;
            } else {
              delayClass = `reveal-${Math.min(revealIndex + 1, maxRevealClassModulo)}`
            }
            

            //alert(delayClass + ' ' + targetDiv.id)
            if (scrollDirection === 'down') {
              // If scrolling down, apply regular transition-delay order

              if (!hasRevealClass) {
                targetDiv.classList.add(delayClass);
                
              }
              

            } else if (scrollDirection === 'up') {
              if (targetDiv.querySelector('#hand')) {
                
                //alert("hand")
                /*
                if (splashDiv.classList.contains('finished')){
                  splashDiv.classList.remove('finished');
                } else {

                }
                if (!splashDiv.classList.contains('finished')){

                }
                // If scrolling up, invert the delay order
                const invertedIndex = 10 - revealIndex; // Calculate the reverse index
                delayClass = `reveal-${Math.min(invertedIndex, 10)}`; // Use inverted index for delay class


                // Loop through the first three items and add the 'reveal-prehide' class
                firstFourItems.forEach(item => {
                  item.classList.add('reveal-prehide');


                });

                requestAnimationFrame(() => {
                  firstFourItems.forEach(item => {
                    // Remove 'reveal-prehide' class in the next animation frame
                    item.classList.remove('reveal-prehide');
                  });
                });*/


                if (!isTouchDevice && !isSafari && !isChrome){
                  // poor man's scroll snap, works ok only on firefox
                  let targetScrollSnap = document.getElementById('home');
                  targetScrollSnap.scrollIntoView({ behavior: "smooth"});
                  
                  //lenis.scrollTo('#home', { lerp: 0.05, lock: true });
                  //splashDiv.scrollIntoView({ behavior: "smooth" });
                  //cancelSmoothScrollTo = true;
                  //requestAnimationFrame(() => {
                  //  let target = document.getElementById('home')
                  //  scrollTo(target, defaultScrollDuration)
                  //});
                  
                } else {
                  //location.hash = 'home';
                }
                
              

              } else if (firstFourItems.includes(targetDiv)) {
                if (targetDiv.id == 'we-make') {
                  //console.log(document.getElementById('we-make'));
                  setTimeout(function () { // TODO : check if splash is in viewport
                    splashDiv.classList.add('finished');
                    
                    //alert("finished")
                  }, hoverableDelay);
                } else {

                }
              } else {
                if (!hasRevealClass) {
                  if (revealIndex + 1 >= maxRevealClassModulo){
                    delayClass = `reveal-${8}`;
                    
                  } else {
                    delayClass = `reveal-${Math.min(revealIndex + 1, maxRevealClassModulo)}`;
                  }
                  
                  targetDiv.classList.add(delayClass);
                  
                }

              }

            }


            //targetDiv.classList.remove('reveal-prehide');

          }

          if (hasLazyLoaded == false) {

            // Check if the target contains a div with the ID 'crossfaded-1'
            const hasCrossfadedDiv = targetDiv.querySelector('#crossfaded-1') !== null;

            if (hasCrossfadedDiv) {
              //console.log('go lazy')
              setTimeout(function () {
                lazyload();
              }, 3000);
              hasLazyLoaded = true;
            }
          }


          if (targetDiv.id == 'inevitable') {
            
            let lightbulb = document.getElementById('lightbulb-container');

            const revealClassRegex = /^reveal-(\d+)$/;

            // Find the 'reveal-N' class using the regex
            const targetClass = [...targetDiv.classList].find(cls => revealClassRegex.test(cls));
            
            if (targetClass) {
              // Extract the number (N) from the matched class 'reveal-N'
              const num = parseInt(targetClass.match(revealClassRegex)[1], 10);
              
              // Create the new class 'reveal-(N+1)'
              delayClass = `reveal-${Math.min(num + 1, maxRevealClassModulo)}`;
              
            } else {
              delayClass = `reveal-${Math.min(revealIndex + 1, maxRevealClassModulo)}`;
            }

            //const revealNClass = Array.from(element.classList).find(cls => cls.startsWith('reveal-'));
            const classListArray = Array.from(lightbulb.classList);
            const revealRegex = /^reveal-\d+$/;

            // Loop through and remove each class that matches the regex
            classListArray.forEach(cls => {
              if (revealRegex.test(cls)) {
                lightbulb.classList.remove(cls);
              }
            });
            
            // set class to targetDiv reveal-n + 1
            //revealIndex++
            
            lightbulb.classList.add(delayClass);
            lightbulb.classList.remove('reveal-prehide');
            lightbulb.classList.remove('paused');

          }

          if (!targetDiv.classList.contains('reveal-delegated')) {
            targetDiv.classList.remove('reveal-prehide');
            targetDiv.classList.remove('paused');
            if (revealIndex + 1 >= maxRevealClassModulo){
              revealIndex = 0;
            } else {
              revealIndex++
            }
              

          }

          // Stop observing once the element is animated
          //observer.unobserve(entry.target)

          
        } else {
          if (targetDiv.id == "creative" || targetDiv.id == "dot" || targetDiv.id == "coder"){
            targetDiv.classList.remove('reveal-prehide');
          } else if (firstFourItems.includes(targetDiv)){
            
          } else {
            //alert('paused ' + targetDiv.id + ' ' + fifthItem.id + ' ' + firstFourItems.includes(targetDiv))
            targetDiv.classList.add('paused');
          }
        // ;
        }
      });

    }
    // Reveal on scroll stuff
    const observerIntersectReveal = new IntersectionObserver(handleIntersect, options);
    const targets = document.querySelectorAll('.animonItem');
    targets.forEach(function (target) {
      observerIntersectReveal.observe(target)
    });
  });

  

}

function spa() {

  console.log("spa " + performance.now())

  const body = document.querySelector('.page-home');
  const greatDiv = document.querySelector('.great');
  const userAgent = navigator.userAgent.toLowerCase();
  // detect WebKit browsers
  const isWebKit = !userAgent.match("gecko") && userAgent.match("webkit");
  const isChrome = userAgent.indexOf("chrome") > -1 && userAgent.match("safari");
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
 
  const hoverableDelay = 3000;

  let isResizing = false;
  // sticky header
  const headerElem = document.querySelector('.sticky');

  // Check AVIF support, then update images
  checkAvifSupport().then((avifSupport) => {
    updateImagesForFormat(avifSupport);
  });


  // Create a MutationObserver instance
  const observerIsSplashVisible = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        // Check if the js-hidden class is removed
        if (!body.classList.contains('js-hidden')) {
          
          setTimeout(function () {
            //splashDiv.classList.add('finished'); // TODO ? : check if splash is in viewport
            //sunglasses.classList.remove('hidden');

            // Find all elements with the class .logo in #header
            headerElem.querySelectorAll('.logo').forEach(logo => {
              // Find all elements with the class .gradtext inside the logo element
              logo.querySelectorAll('.gradtext-rainbow').forEach(gradtext => {
                // Remove the class .animate from the gradtext element
                gradtext.classList.remove('animate');
              });
            });

            if (isOnline){
              //alert('go')
              setTimeout(function () {
                injectTawkScript();
              }, 1000)
            }
          }, hoverableDelay);

          observerIsSplashVisible.disconnect(); // Optionally disconnect after detecting
        }
      }
    });
  });

  // Observer configuration: Watch for attribute changes
  const config = { attributes: true };

  // Start observing the body element for class attribute changes
  observerIsSplashVisible.observe(body, config);

  const wrapper = document.getElementById('home');

  const splashDiv = document.getElementById('splash');
  const linksHome = document.getElementsByClassName('linkHome');

  const linksProjects = document.getElementsByClassName('linkProjects');
  const linksAbout = document.getElementsByClassName('linkAbout');
  const linksContact = document.getElementsByClassName('linkContact');

  const linkLegal = document.getElementById('link-legal');
  const linkTrademark = document.getElementById('link-trademark');

  //const chatWidgetCustom = document.getElementById('chat-widget-custom');

  const reelwrap = document.getElementById('reel-wrap');

  let acceptabeDelay = 10000;

  const firstThumbnailImages = document.querySelectorAll('img.shown');


  let loadedCount = 0;
  const totalFirstThumbnailImages = firstThumbnailImages.length;


  function injectTawkScript() {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

    // Create the script element
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66f6c86ae5982d6c7bb5abe3/1i8pvtogp';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    // Find the first script tag on the page and insert the new script before it
    var s0 = document.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s1, s0);
    /*
    Tawk_API.onChatMinimized = function(){
      document.body.click();
      // Give the document focus
      window.focus();

      // Remove focus from any focused element
      if (document.activeElement) {
          document.activeElement.blur();
      }
    };
    Tawk_API.onChatHidden = function(){
      document.body.click();
      // Give the document focus
      window.focus();

      // Remove focus from any focused element
      if (document.activeElement) {
          document.activeElement.blur();
      }
    };
    */
  }

  // Function to check if all images are loaded
  function checkIfAllImagesLoaded() {
    loadedCount++;
    if (loadedCount === totalFirstThumbnailImages) {
      console.log('All first thumbnails images have loaded ' + performance.now());
      if (document.fonts.check('1em Poppins')) {
        console.log("Font has been loaded " + performance.now());
        // show document 
        spaStart(); 
        
      } else { // font not ready yet
        document.fonts.ready.then(function () {
          console.log("Fonts have finished loading " + performance.now());
          // show document 
          spaStart();
          /*
          if (!!isReduced) {
            // DON'T use an animation here!
          } else {
            // DO use an animation here!
            
            var rellax = new Rellax('.rellax', {
              center: true,
              //wrapper:'#parallax_wrapper' 
            });
          }*/
        });
      }
      
      ////lenis.scrollTo('#home', { lerp: 0.05, lock: true});

      
    }
  }

  // Add 'load' event listeners to each image
  firstThumbnailImages.forEach((img) => {
    if (img.complete) {
      // If the image is already loaded from cache, directly call the function
      checkIfAllImagesLoaded();
    } else {
      // Otherwise, attach the 'load' event listener
      img.addEventListener('load', checkIfAllImagesLoaded);

      // Optional error handling
      img.addEventListener('error', function () {
        console.error(`Image failed to load: ${img.src}`);
      });
    }
  });



  setTimeout(function () { // give us a bit more time to load images
    console.log('last acceptable delay ' + performance.now())
    //body.classList.remove('js-hidden');
  }, acceptabeDelay);



  /* set the offset on which the hide effect has to wait */
  const scrollOffset = 100;

  /* get the current page position */
  let prevScrollpos = window.pageYOffset;

  

  


  // Get the sticky and target elements
  const stickyDiv = document.getElementById("sunglasses");
  const targetDiv = document.getElementsByClassName("astrodude")[0];  // Access the first element with class 'astrodude'


  // Function to extract the translateY value from the transform property
  function getTranslateY(element) {
    const transform = window.getComputedStyle(element).transform;

    if (transform !== 'none') {
      const matrix = transform.match(/^matrix3d\((.+)\)$/);
      if (matrix) {
        return parseFloat(matrix[1].split(', ')[13]); // Extract Y translation in 3D matrix
      } else {
        const matrix2d = transform.match(/^matrix\((.+)\)$/);
        return matrix2d ? parseFloat(matrix2d[1].split(', ')[5]) : 0; // Extract Y translation in 2D matrix
      }
    }
    return 0;
  }





  const navSections = document.querySelectorAll('.nav-section');
  const navSectionsStart = document.querySelectorAll('.nav-section-start');
  let currentSection = navSectionsStart[0];  // Start with the first section
  
  const menuItems = document.querySelectorAll('[data-nav-section-id-target]');

  const observerOptions = {
    root: null, // Viewport as root
    rootMargin: '0px', // Adjust if necessary (e.g., '-50px 0px' to trigger earlier)
    threshold: 0.2 // Ensure that 20% of the element is in view before triggering
  };

  let activeSectionId = null;

  // Callback for the intersection observer
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('data-nav-section-id');
        //console.log("nav intersect " + sectionId + ' ' + entry.target.id + ' ' + entry.target.classList)
        //if (!lenis.isScrolling){
        //if (!isSmoothScrolling){
          //if (sectionId){
            setActiveMenuItem(sectionId);
          //} else {
            
          //}
          
        //}
         
        //}
        //entry.target.classList.add('active')
        
          
        //} else {
          
              entry.target.classList.add('active')
            
          if (entry.target.id == 'reel'){
            
            // poor man's scroll snap
            //let targetScrollSnap = document.getElementById('reel');
            /*
            const targetScrollSnap = document.querySelector(`.nav-section-start[data-nav-section-id="${2}"]`)
            cancelSmoothScrollTo = false;
            isSmoothScrolling = false;
            scrollToCustom(targetScrollSnap, defaultScrollDuration);
            */
            /*
            let y = targetScrollSnap.getBoundingClientRect().top;
            console.log('reel ' + targetScrollSnap + ' ' + y )
            window.scrollBy({
                top: y,
                behavior: 'smooth'
            }); */

            //targetScrollSnap.setAttribute('tabindex', '-1')

            //targetScrollSnap.focus()

            //targetScrollSnap.removeAttribute('tabindex')
            //targetScrollSnap.scrollIntoView({ behavior: "smooth"});
            
            //window.scrollTo({ top: targetScrollSnap, behavior: 'smooth'});
          }
          
          
        //}
        
      } else {
        if (entry.target.getAttribute('data-nav-section-id') !== currentSection.getAttribute('data-nav-section-id')){
          entry.target.classList.remove('active');
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each section
  navSections.forEach(section => {
    observer.observe(section);
  });

  function setActiveMenuItem(sectionId) {
    //alert(sectionId)
    if (sectionId !== activeSectionId) {
      
      if (!isSmoothScrolling || !doCustomScroll){
        // Remove active class from all menu items
        menuItems.forEach(item => {
          const parentLi = item.closest('li'); // Find the closest parent <li>
          if (parentLi) {
            parentLi.classList.remove('active'); // Remove the 'active' class from the <li>
          }
        });

        // Find the menu item that matches the section and set it as active
        const targetMenuItems = document.querySelectorAll(`[data-nav-section-id-target="${sectionId}"]`);
        if (targetMenuItems.length) {
          targetMenuItems.forEach(item => {
            const parentLi = item.closest('li'); // Find the closest parent <li> of the <a> element
            if (parentLi) {
              parentLi.classList.add('active'); // Add the 'active' class to the <li> element
            }
          });
        } else {
          //alert('no menu item')
        }
      } else {
        console.log('is smooth scrolling or !doCustomScroll')
      }

      // Update the active section id
      activeSectionId = sectionId;

      currentSection = document.querySelector(`.nav-section-start[data-nav-section-id="${sectionId}"]`);
      //alert(currentSection.id)
    } else {
      //alert('active')
      //cancelSmoothScrollTo = true;
      //isSmoothScrolling = false;
    }
    

  }


  // Function to scroll to a specific section using Lenis
  const scrollToSection = (section) => {
    const sectionId = section.getAttribute('data-nav-section-id');  // Get the section ID
    //console.log('scrollToSection ' + sectionId)
    //lenis.scrollTo(`#${sectionId}`, { lerp: 0.025, lock: true });  // Smooth scroll using Lenis
    let dataId = section.getAttribute('data-nav-section-id');
    
    // Find the element with .nav-start class and the matching nav-section-id
    const navstart = document.querySelector(`.nav-section-start[data-nav-section-id="${dataId}"]`);
    
    //alert(navstart.id)
    if (navstart) {
      
        // Scroll the found navstart element into view smoothly
        //navstart.scrollIntoView({ behavior: "smooth" });
        //alert(navstart.id)
        
        scrollToCustom(navstart, defaultScrollDuration);
    } else {
        console.error(`Element with data-nav-section-id="${sectionId}" not found.`);
        navstart = document.querySelector(`.nav-section[data-nav-section-id="${dataId}"]`);
        
        scrollToCustom(navstart, defaultScrollDuration);
    }
    
    currentSection = section;  // Update the current section
    isSmoothScrolling = false;
    setActiveMenuItem(sectionId);  // Update the active menu item
  };

  // Listen for keydown events to navigate sections
  document.addEventListener('keydown', (e) => {
    // Check if the document has focus, if not, return early
    // TODO : handle arrow left / right keys for modal-prev/next, 
    // and allow default scrolling in modal with arrow down/up
    //if (!document.hasFocus() || e.repeat || lenis.isScrolling || modal.classList.contains('active')) {
    

    if (!document.hasFocus() || e.repeat || modal.classList.contains('active') || isScrollingCurrently) {

      if (!document.hasFocus()){ // trying to get focus back after tawk chat widget is minimized, doesnt work
        let widget = document.querySelector('.widget-visible iframe:nth-of-type(2)');

        let widgetFrameIsVisibile = widget.classList.contains('open');
        if (!widget || !widgetFrameIsVisibile){
          // Remove focus from any focused element
          if (document.activeElement) {
              document.activeElement.blur();
          }
          document.body.click();
          // Give the document focus
          window.focus();

         
        }
        
      }
      //if (isScrollingCurrently){
      //  console.log('isScrollingCurrently')
      //}
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
      case 'Enter': {
        e.stopPropagation();
        e.preventDefault();
        // Get all sections again to ensure we have the latest references
        const sectionsArrayDown = Array.from(navSectionsStart);
        const currentIndexDown = sectionsArrayDown.indexOf(currentSection);

        // Calculate the next section
        const nextSection = sectionsArrayDown[currentIndexDown + 1];
        if (nextSection) {
          //let data = nextSection.getAttribute('data-nav-section-id');
          scrollToSection(nextSection); // Scroll to the next section if it exists
          
        }
        break;
      }
      case 'ArrowUp': {
        e.stopPropagation();
        e.preventDefault();
        // Get all sections again to ensure we have the latest references
        const sectionsArrayUp = Array.from(navSectionsStart);
        const currentIndexUp = sectionsArrayUp.indexOf(currentSection);

        // Calculate the previous section
        const prevSection = sectionsArrayUp[Math.max(currentIndexUp - 1,0)];
        if (prevSection) {
          //let data = prevSection.getAttribute('data-nav-section-id');
          scrollToSection(prevSection); // Scroll to the previous section if it exists
          
        }
        break;
      }
    }
  });


  /*
  // Obfuscating the email parts
  var u = 'olleh'.split("").reverse().join("");  // Obfuscated 'email' by reversing it
  var d = 'redocevitaercym'.split("").reverse().join(""); // Obfuscated 'example' by reversing it
  var t = 'moc'.split("").reverse().join("");     // Obfuscated 'com' by reversing it
  */

  // handle the onclick event to open the tawk widget
  document.getElementById('ct_btn').onclick = function (event) {
    /*
    //Handle the onclick event to generate the mailto link dynamically
      event.preventDefault(); // Prevent default anchor behavior
      var email = u + '@' + d + '.' + t;  // Combine the email parts
      window.location.href = 'mailto:' + email;  // Open the mailto link
      //alert(email)
      */
    Tawk_API.toggle();

  };

  // Add class "webkit" to the div with class "great"
  if (isWebKit || isChrome || isSafari) {

    if (greatDiv) {
      greatDiv.classList.add('webkit');
      // Select all divs inside .great
      const innerDivs = greatDiv.querySelectorAll('div');

      // Loop through each inner div and add the classes
      innerDivs.forEach(div => {
        div.classList.add('gradtext-rainbow', 'animate');
      });
    }

  }

  // Prevent dragging of all elements 
  document.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
 
  // Array of sentences
  const sentences = [
    "The stars are beautiful tonight.",
    "This view is worth the float,<br/> isn’t it?",
    "Asteroid ahead!<br/>Nah, just testing your reflexes.",
    "By the way, has anyone <br/>seen my donut ?",
    "In space, noone can <br/>hear <i><strong>bugs</strong></i> scream",
    "We get the spacing just right!",
    "What's your favorite color space ?",
    "Send us an email, or a <br/>carrier pigeon in a spacesuit !"
  ];

  const MINIMUM_DISPLAY_TIME = 4000; // 4s
  const BARE_MINIMUM_DISPLAY_TIME = 1000; // 4s

  const astrodudetip = tippy('#astrodude-container', {
    content: "Hey there !",
    theme: 'astro',
    allowHTML: true,
    //flipBehaviour: ['top', 'left'],
    placement: 'left',
    offset: [-100, -40],
    zIndex: 2,
    //flipOnUpdate: true
    trigger: "mouseenter focus manual click",
    onShow(instance) {
      // Record the time the tooltip is shown
      //if (!lenis.isScrolling){
      if (!isSmoothScrolling && !isScrollingCurrently){
        // Record the time the tooltip is shown
        instance._startTime = Date.now();
        // Initialize first state to control the sentence flow
        if (instance._state == undefined) {
          instance._state = 'first';
        }
      } else {
        // Cancel the current show request
        return false;
      }
      
    },
    onHide(instance) {
      // Calculate how long the tooltip has been visible
      const elapsedTime = Date.now() - instance._startTime;

      if (isScrollingCurrently && elapsedTime > BARE_MINIMUM_DISPLAY_TIME || isResizing){
        
        
      } else if (elapsedTime < MINIMUM_DISPLAY_TIME) {
        // Prevent the tooltip from hiding immediately if the minimum display time is not met
        setTimeout(() => {
          instance.hide();
        }, MINIMUM_DISPLAY_TIME - elapsedTime);

        // Cancel the current hide request
        return false;
      }
    },
    onHidden(instance) {
      //alert(instance._state)
      // Switch to second sentence after first sentence hides
      if (instance._state === 'first' || instance._state == undefined) {
        instance.setContent("Long time no see!"); // Second sentence
        instance._state = 'second';

      }
      // After second sentence, show random sentence
      else if (instance._state === 'second' || instance._state === 'random') {
        let randomSentence;
        let usedSentences = instance._usedSentences || []; // Retrieve used sentences or initialize

        // Loop to find a new random sentence that hasn't been used
        do {
          randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        } while (usedSentences.includes(randomSentence));

        // Update content with the new random sentence
        instance.setContent(randomSentence);
        instance._state = 'random';

        // Keep track of used sentences
        usedSentences.push(randomSentence);
        instance._usedSentences = usedSentences;

        // If all sentences have been used, reset the used sentences to allow reuse
        if (usedSentences.length === sentences.length) {
          instance._usedSentences = [];
        }

      }
    }
  });



  // Access the individual Tippy instance (since it's a collection)
  const astrodudeInstance = astrodudetip[0]; // First (and only) instance

  const donuttip = tippy('#donut', {
    content: "You wouldn't download...<br/> a donut ?",
    allowHTML: true,
    theme: 'astro',
    placement: 'left',
    offset: [10, 0],
    zIndex: 4,
    onShow(instance) {
      //if (!lenis.isScrolling){
      if (!isSmoothScrolling && !isScrollingCurrently){  
        // Record the time the tooltip is shown
        instance._startTime = Date.now();
      } else {
        // Cancel the current show request
        return false;
      }
      
    },
    onHide(instance) {
      // Calculate how long the tooltip has been visible
      const elapsedTime = Date.now() - instance._startTime;

      if (isScrollingCurrently && elapsedTime > BARE_MINIMUM_DISPLAY_TIME || isResizing){
        
        
      } else if (elapsedTime < MINIMUM_DISPLAY_TIME) {
        // Prevent the tooltip from hiding immediately if the minimum display time is not met
        setTimeout(() => {
          instance.hide();
        }, MINIMUM_DISPLAY_TIME - elapsedTime);

        // Cancel the current hide request
        return false;
      }
    },
  });

  const donutInstance = donuttip[0]; // First (and only) instance


  window.addEventListener('load', function () {

    //setTimeout(function() { 
    //body.classList.remove('js-hidden');
    //}, 2000); 
    console.log('window on load ' + performance.now())

    
    adjustSunglasses();
    
    if (!!isReduced) {
      // DON'T use an animation here!
    } else {
      // DO use an animation here!
      
      var rellax = new Rellax('.rellax', {
        center: true,
        //wrapper:'#parallax_wrapper' 
      });
    }
    //body.classList.remove('js-hidden');
    //body.classList.remove('scroll-lock');
    
    adjustSunglasses();
    sunglasses.classList.remove('hidden');
    //lenis.start();

    //spaStart()
  });

  

  const debounce = (fn) => {

    // This holds the requestAnimationFrame reference, so we can cancel it if we wish
    let frame;
  
    // The debounce function returns a new function that can receive a variable number of arguments
    return (...params) => {
      
      // If the frame variable has been defined, clear it now, and queue for next frame
      if (frame) { 
        cancelAnimationFrame(frame);
      }
  
      // Queue our function call for the next frame
      frame = requestAnimationFrame(() => {
        
        // Call our function and pass any params we received
        fn(...params);
      });
  
    } 
  };

  window.addEventListener('resize' ,debounce(function() {
    //if (document.body.classList.contains('resizing')){
          //document.body.classList.remove('resizing')
          isResizing = false;
          
      //}
  }));

  window.addEventListener('resize', function (event) {
    isResizing = true;
    requestAnimationFrame(() => {
      astrodudeInstance.hide();
      donutInstance.hide();
      adjustSunglasses();
    });
  }, true);


  let ty = getTranslateY(targetDiv);
  let maxOffsetTop = targetDiv.offsetTop + ty;

  maxOffsetTop = 450;



  let maxScale = 2;

  // 1 to 16
  let scalingFactor = 5;
  // clamp sunglasses div size in px
  let maxW = 600;

  let lastScrollY = window.scrollY;

  let sticked = false;

  

  function adjustSunglasses() {
    
    const currentScrollY = window.scrollY; 
    const isScrollingDown = currentScrollY > lastScrollY; // Check if the user is scrolling down
    lastScrollY = currentScrollY; // Update the last scroll position
  

    const stickyRect = stickyDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(targetDiv);

    const astrodude = document.getElementById('astrodude-container');
    const vh = window.innerHeight;
    let mtAstro 
    let ratio = window.innerHeight / window.innerWidth;

    mtAstro = Math.max((70000 / vh) * (1 - ratio), 180);
    /*
    if (window.innerWidth < 600 && window.innerHeight < 900){

      mtAstro = Math.max(70000 / vh, 200);
    } else if (window.innerWidth < 1200 && window.innerHeight > 900){
      mtAstro = Math.max(70000 / vh, 200);
    } else if (window.innerHeight < 900){
      mtAstro = Math.max(70000 / vh, 0)
    }*/
    astrodude.style.marginTop = mtAstro + 'px';  

    // Get the translateY value of targetDiv
    let translateY = getTranslateY(targetDiv);
    //stickyDiv.style.position = "absolute";

    let tmpY = -(parseFloat(translateY) - parseFloat(computedStyle.marginTop))
    let stop = mtAstro;
    let adjust = window.innerWidth > 480 ? 8 : 0;

    //stop = window.innerHeight < 420 ? 5 : stop;
    //adjust = window.innerHeight < 420 ? 56 : adjust;

    let w = parseFloat(computedStyle.width);
    let ml = parseFloat(computedStyle.marginLeft);
    //let mt = parseFloat(computedStyle.marginTop);

    let mt = mtAstro;

    //mt = window.innerHeight < 420 ? mt + 48 : mt;
    let tolerance = vh / 100;

    if (!sticked && stickyRect.top + tolerance >= targetRect.top){
      tmpY = stop - ((stop) - Math.abs(translateY));
      if (translateY < 0) {
        tmpY = translateY ;
        sticked = true;
      }
      //alert('ye')
    } else if (!sticked && stickyRect.top + tolerance < targetRect.top) {
      tmpY = -(parseFloat(translateY) - parseFloat(computedStyle.marginTop));
      //console.log(tmpY)
      /*
      if (tmpY < 0) {
        //const scale = Math.min(1 + (Math.abs((targetDiv.offsetTop) * scalingFactor) / maxOffsetTop), maxScale);  // Ensure the scale doesn't exceed 1
        //console.log(scale)
        const scale = Math.min(1 + ((Math.abs(tmpY) / maxOffsetTop) * scalingFactor), maxScale);
        //console.log(mg)
        // Apply the calculated scale to stickyDiv
        //stickyDiv.style.transform = `scale(${scale})`;
        //stickyDiv.style.width = 270 * scale + "px";
        //stickyDiv.style.marginLeft = parseFloat(computedStyle.marginLeft) - (100 * (scale - 1)) + "px";
        w = Math.min(w + (w * (scale - 1)), maxW);
        ml = ml - ((w * (scale - 1))/2);

        //if (window.innerHeight > 420){
          mt = Math.max(mt - ((w * 2) * (scale - 1)), -(vh/4)) ;
          
          
      } */

      //tmpY = translateY * (-1) * (Math.abs(tmpY) / maxOffsetTop) * 40;
      tmpY = Math.max(-400 + (tmpY * 2), -(vh/2));

      //w = Math.min(1 + (1 - (Math.abs(tmpY)/200)) * w , 300);

      if (tmpY > 0){
        tmpY = 0;
      }
      
    } else {
      

      // Set the position and size of the second div to match the first
      stickyDiv.style.position = computedStyle.position;
      stickyDiv.style.top = computedStyle.top;
      stickyDiv.style.left = computedStyle.left;
      stickyDiv.style.width = computedStyle.width;
      stickyDiv.style.height = computedStyle.height;
      tmpY = translateY ;
    }


    
    stickyDiv.style.transform = `translate3d(0px, ${tmpY}px, 0px)`;
    //}
    stickyDiv.style.marginTop = mt + "px";
    stickyDiv.style.width = w + "px";
    stickyDiv.style.marginLeft = ml + "px";

  }

  /*
  requestAnimationFrame(() => {
    adjustSunglasses();
    sunglasses.classList.remove('hidden');
  });
  */


  function raf(time) {
    //lenis.raf(time)
    //if (lenis.isScrolling){
     if (isScrollingCurrently){
      adjustSunglasses();
     } 

     /*
     let computedStyle = window.getComputedStyle(reelwrap, "::before");

     // Get current background position values from CSS variables
     
     let val = scrollDirection == 'down' ? - 0.1 : 0.1;
     let classToAdd = scrollDirection == 'down' ? 'BgScrollDown' : 'BgScrollUp';
     let classToRemove = scrollDirection == 'down' ? 'BgScrollUp' : 'BgScrollDown';
     reelwrap.classList.remove(classToRemove)
     reelwrap.classList.add(classToAdd)
     */
     /*
     let xPosition = parseFloat(computedStyle.getPropertyValue("--x-pos")) || 50; // Default to 50% if not set
     let yPosition = parseFloat(computedStyle.getPropertyValue("--y-pos")) + val || 50;
      

      // Apply the new background position by setting the CSS variables
      reelwrap.style.setProperty('--x-pos', `${xPosition}%`);
      reelwrap.style.setProperty('--y-pos', `${yPosition}%`);
      */
    
      
    //}
    
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf);


  const slides = document.getElementsByClassName("crossfaded");
  const slidesContainer = document.getElementById("projects-sliders-container");

  // Modal elements
  const modal = document.getElementById('modal');
  const btnModalPrev = document.getElementById('btn-modal-prev');
  const btnModalNext = document.getElementById('btn-modal-next');
  let mainElement = modal.querySelector('.modal-main-content');
  let modalImg = mainElement.querySelector('.modal-img');
  let modalVideo = mainElement.querySelector('.modal-video');
  const closeBtn = document.querySelector('.close');
  const modalDescription = document.getElementById('modal-description');

  for (let i=0; i < linksProjects.length; i++){
    
    linksProjects[i].addEventListener('click', (event) => {
      if (doCustomScroll){
        event.preventDefault(); // Prevent default link behavior
        forceSmoothScrolling = true;
      } else {
        location.hash = '';
      }
      
      if (isSmoothScrolling){
        return
      }
      revealIndex = 0;
      
        
       // return
      //} else {
        
      //}
      requestAnimationFrame(() => {
        //let target = document.getElementById('projects-reel');
        //scroll.scrollTo(target, defaultScrollDuration);
        const sectionId = event.target.getAttribute('data-nav-section-id-target');
        isSmoothScrolling = false;
        setActiveMenuItem(sectionId);
        slidesContainer.classList.add('locked');
        
        // preload custom eye cursor blink state to prevent cursor jump on first blink (loading blink cursor image)
        /*document.body.classList.add('blink');
        setTimeout(function () {
          document.body.classList.remove('blink');
        }, 500);*/

        if (window.getComputedStyle(document.getElementById('toggle-menu-main-mobile')).display != 'none'){
          document.getElementById('close-overlay').click();
        }

        //lenis.scrollTo('#projects-reel', { lerp: 0.05, lock: true });
        let target = document.getElementById('reel')
        scrollToCustom(target, defaultScrollDuration)
        setTimeout(() => { astrodudeInstance.show(); }, 3000);
        setTimeout(() => { astrodudeInstance.hide(); }, 13000);
      });

      // if mouse is already/still hovering a slide at this point, start crossfading
      /*
      setTimeout(() => { 
        slidesContainer.classList.remove('locked');
        for (let i = 0; i < slides.length; i++) {
          let thisSlide = slides.item(i);
          if (thisSlide.classList.contains('hovered')){
            sliderActive(thisSlide);
            break
          }
        }
      }, 3000);
    */
    });
  }
  
  
  for (let i=0; i < linksAbout.length; i++){
    
    linksAbout[i].addEventListener('click', (event) => {

      

      if (doCustomScroll){
        event.preventDefault(); // Prevent default link behavior
        if (!isSmoothScrolling){
          forceSmoothScrolling = true;
        }
      }

      if (isSmoothScrolling){
        return
      }
      
      const sectionId = event.target.getAttribute('data-nav-section-id-target');
      if (!doCustomScroll){
        location.hash = '';
      }
       
      
       // return
      //} else {
        
      //}
      requestAnimationFrame(() => {
        console.log(sectionId)
        setActiveMenuItem(sectionId);
        //lenis.scrollTo('#about-us', { lerp: 0.05, easing: 'ease-in', lock: true });
        let target = document.getElementById('about-us')
        
        scrollToCustom(target, defaultScrollDuration)
        if (window.getComputedStyle(document.getElementById('toggle-menu-main-mobile')).display != 'none'){
          document.getElementById('close-overlay').click();
        }
      });
    });
  }
  for (let i=0; i < linksContact.length; i++){
    
    linksContact[i].addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      Tawk_API.toggle();
      
      if (window.getComputedStyle(document.getElementById('toggle-menu-main-mobile')).display != 'none'){
        document.getElementById('close-overlay').click();
      }
      //let target = document.getElementById('contact-us')
      
      //scrollToCustom(target, defaultScrollDuration)
      
      /*
      //lenis.scrollTo('#contact-us', { lerp: 0.05, easing: 'ease-in', lock: true});
      //console.log('contact clicked')*/
    });
  }
  splashDiv.addEventListener('click', (event) => {
    if (doCustomScroll){
      event.preventDefault(); // Prevent default link behavior
      if (!isSmoothScrolling){
        forceSmoothScrolling = true;
      }
      if (isSmoothScrolling){
        return
      }
    } else {
      
        location.hash = '';
      
    }
    
    //alert('reveal index ' + revealIndex)
    revealIndex = 0;
    //let target = document.getElementById('projects-reel');
    //scroll.scrollTo(target, defaultScrollDuration);
    slidesContainer.classList.add('locked');
    requestAnimationFrame(() => {
    let target = document.getElementById('reel')
      scrollToCustom(target, defaultScrollDuration)
      

      const sectionId = 2;
      setActiveMenuItem(sectionId);
    });
    /*
    document.body.classList.add('blink');
    setTimeout(function () {
      document.body.classList.remove('blink');
    }, 500);
    */

    //lenis.scrollTo('#projects-reel', { lerp: 0.02, lock: true });
    if (astrodudeInstance){
      setTimeout(() => { astrodudeInstance.show(); }, 6500);
      setTimeout(() => { astrodudeInstance.hide(); }, 16000);
    }
    
    
    /*
    // if mouse is already/still hovering a slide at this point, start crossfading 
    setTimeout(() => { 
      slidesContainer.classList.remove('locked');
      for (let i = 0; i < slides.length; i++) {
        let thisSlide = slides.item(i);
        if (thisSlide.classList.contains('hovered')){
          sliderActive(thisSlide);
          break
        }
      }
    }, 3000);
    */

  });

  for (let i=0; i < linksHome.length; i++){
    
    linksHome[i].addEventListener('click', (event) => {

      
      
      if (doCustomScroll){
        event.preventDefault(); // Prevent default link behavior
      }

      if (isSmoothScrolling){
        return
      }
     
      //lenis.scrollTo('#home', { lerp: 0.025, easing: 'ease-in', lock: true });
      //if (currentSection.id == 'splash'){

      if (!doCustomScroll){
        location.hash = '';
      }
        
       // return
      //} else {
        
      //}
      
      
      
      requestAnimationFrame(() => {
        let target = document.getElementById('home')
        scrollToCustom(target, defaultScrollDuration)
        const sectionId = event.target.getAttribute('data-nav-section-id-target');
        if (currentSection.id == 'home'){
          //alert(currentSection.id)
          cancelSmoothScrollTo = true;
        }
        setActiveMenuItem(sectionId);
        if (window.getComputedStyle(document.getElementById('toggle-menu-main-mobile')).display != 'none'){
          document.getElementById('close-overlay').click();
        }
      });
      
    });
    
  }






  linkLegal.addEventListener('click', (event) => {
    event.preventDefault();
    showSlideInModal(event.target, '', '')
  });

  linkTrademark.addEventListener('click', (event) => {
    event.preventDefault();
    showSlideInModal(event.target, '', '')
  });


  btnModalPrev.addEventListener('click', (event) => {
    // Get the ID stored in the 'data-slide-collection' attribute of the modal
    const slideCollectionId = modal.getAttribute('data-slide-collection');

    // Use the ID to get the corresponding element
    const slideCollectionElement = document.getElementById(slideCollectionId);

    if (slideCollectionElement) {
      // Get all the child slides
      let childSlides = slideCollectionElement.querySelectorAll('.slide');

      // Loop through the child slides to find the one that is currently shown
      for (let j = 0; j < childSlides.length; j++) {
        let childSlide = childSlides[j];

        // Check if the current child slide has the 'shown' class
        if (childSlide.classList.contains('shown')) {
          childSlide.style.opacity = "0";
          childSlide.classList.remove('shown');
          childSlide.setAttribute('started', '');
          // Calculate the previous index (inverted)
          let prevIndex = (j + 1) % childSlides.length;

          // Show the previous slide
          showSlideInModal(childSlides[prevIndex], slideCollectionElement, 'prev');

          // Exit the loop once the previous slide is found and shown
          break;
        }
      }
    } else {
      console.error('No element found with the ID:', slideCollectionId);
    }
  });

  btnModalNext.addEventListener('click', (event) => {
    //console.log("next clicked")
    // Get the ID stored in the 'data-slide-collection' attribute of the modal
    const slideCollectionId = modal.getAttribute('data-slide-collection');

    // Use the ID to get the corresponding element
    const slideCollectionElement = document.getElementById(slideCollectionId);

    if (slideCollectionElement) {
      // Get all the child slides
      let childSlides = slideCollectionElement.querySelectorAll('.slide');

      // Loop through the child slides to find the one that is currently shown
      for (let j = 0; j < childSlides.length; j++) {
        let childSlide = childSlides[j];

        // Check if the current child slide has the 'shown' class
        if (childSlide.classList.contains('shown')) {
          childSlide.style.opacity = "0";
          childSlide.classList.remove('shown');
          childSlide.setAttribute('started', '');
          // Calculate the next index (inverted)
          let nextIndex = (j - 1 + childSlides.length) % childSlides.length;

          // Show the next slide
          showSlideInModal(childSlides[nextIndex], slideCollectionElement, 'next');

          // Exit the loop once the next slide is found and shown
          break;
        }
      }
    } else {
      console.error('No element found with the ID:', slideCollectionId);
    }
  });



  // Close modal when the user clicks on <span> (x)
  closeBtn.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    modal.classList.remove('active');
    wrapper.classList.remove('blurred');
    body.classList.remove('scroll-lock');
    //setTimeout(function() { 
    modal.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    //}, 4); 
    //lenis.start();
  });

  // Close modal when the user clicks anywhere outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.visibility = 'hidden';
      modal.classList.remove('active');
      wrapper.classList.remove('blurred');
      body.classList.remove('scroll-lock');
      //lenis.start();
    }
  });

  let fadeLoopTimeout;
  let timeBetweenFades = 3000;
  let timeBetweenChecksShouldFade = 1000;
  // .crossfaded .slide:not(.placeholder) transition opacity 1s
  let transitionDuration = 1000;

  for (let i = 0; i < slides.length; i++) {
    let thisSlide = slides.item(i);

    // Get all child elements with the class 'slide'
    let childSlides = thisSlide.querySelectorAll('.slide');

    let slideLinks = thisSlide.parentElement.querySelectorAll('.slide-link');

    // Add click event listener to each slide link
    slideLinks.forEach(linkSlide => {
      linkSlide.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior

        modalDescription.textContent = '';
        // Loop through the child slides to find the one that is currently shown
        for (let j = 0; j < childSlides.length; j++) {
          let childSlide = childSlides[j];


          // Check if the current child slide has the 'shown' class
          if (childSlide.classList.contains('shown')) {


            showSlideInModal(childSlide, thisSlide, '')

          }
        }

        // Display the modal
        modal.style.visibility = 'visible';
      });
    });
    

    thisSlide.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior

      modalDescription.textContent = '';
      // Loop through the child slides to find the one that is currently shown
      for (let j = 0; j < childSlides.length; j++) {
        let childSlide = childSlides[j];


        // Check if the current child slide has the 'shown' class
        if (childSlide.classList.contains('shown')) {


          showSlideInModal(childSlide, thisSlide, '')

        }
      }

      // Display the modal
      modal.style.visibility = 'visible';
    });
    // Add mouseenter and mouseleave event listeners
    thisSlide.addEventListener('mouseenter', function (e) {

      sliderActive(e.target);
    });

    thisSlide.addEventListener('mouseleave', function () {

      this.classList.remove('hovered');
      if (!!isReduced) {
        // DON'T use an amination here!
        return
      }

      // Get all video elements on the page
      const allVideos = thisSlide.querySelectorAll("video");

      // Pause all videos
      allVideos.forEach((video) => {
        if (!video.paused) {
          video.pause();
        }
      });
      clearTimeout(fadeLoopTimeout);  // Stop the loop when mouse leaves
    });
  }

  function sliderActive(thisSlide){
      thisSlide.classList.add('hovered');
      if (!!isReduced || slidesContainer.classList.contains('locked')) {
        // DON'T use an amination here!
        return
      }
      


      clearTimeout(fadeLoopTimeout);  // Stop the loop

      // Get all child elements with the class 'slide'
      let childSlides = thisSlide.querySelectorAll('.slide');
      let currentChildSlideType;
      let currentChildSlideDuration;

      let shown
      // Loop through the child slides to find the one that is currently shown
      for (let j = 0; j < childSlides.length; j++) {
        let childSlide = childSlides[j];

        // Check if the current child slide has the 'shown' class
        if (childSlide.classList.contains('shown')) {
          // Get the tag type of the shown slide (e.g., IMG, VIDEO)
          currentChildSlideType = childSlide.tagName;

          //console.log(currentChildSlideType)

          // Crossfade on hover directly if image (≠ not video or audio)
          if (!childSlide.classList.contains('video-slide')) {
            // Calculate the elapsed time since the slide started
            let started = parseFloat(childSlide.getAttribute('started')) || 0; // Ensure it's a number
            let elapsed = performance.now() - started;



            // Check if the elapsed time exceeds current slide duration
            if (elapsed > timeBetweenFades && childSlides.length > 1) {
              crossFade(thisSlide.id)
            }

          } else {
            let vid = childSlide.getElementsByTagName('video')[0];
      
            if (vid.paused) { // play video on hover
              playVideo(vid);
            }
          }
          shown = true;
        }
      }

      if (!shown) {
        crossFade(thisSlide.id)
      }
      // Start the loop for the hovered element
      function startFadeLoop() {

        fadeLoopTimeout = setTimeout(() => {
          // Check if this slide has the 'hovered' class
          if (thisSlide.classList.contains('hovered')) {
            // Get all child elements with the class 'slide'
            let childSlides = thisSlide.querySelectorAll('.slide');
            //let currentChildSlideType;
            let currentChildSlideDuration;

            

            // Loop through the child slides to find the one that is currently shown
            for (let j = 0; j < childSlides.length; j++) {
              let childSlide = childSlides[j];

              // Check if the current child slide has the 'shown' class
              if (childSlide.classList.contains('shown')) {
                // Get the tag type of the shown slide (e.g., IMG, VIDEO)
                //currentChildSlideType = childSlide.tagName;

                // Get the duration based on the element type
                if (childSlide.classList.contains('video-slide')) {
                  let vid = childSlide.getElementsByTagName('video')[0];
                  // If the slide is a video or audio element
                  currentChildSlideDuration = vid.duration * 1000; // Convert seconds to milliseconds

                  if (childSlide.currentTime >= vid.duration) {
                    currentChildSlideDuration = 0; // force crossFade because video has finished playing
                  }

                } else {
                  // For other types of elements, set a default duration or handle as needed
                  currentChildSlideDuration = timeBetweenFades; // default 3 seconds
                }

                // Calculate the elapsed time since the slide started
                let started = parseFloat(childSlide.getAttribute('started')); // Ensure it's a number
                let elapsed = performance.now() - started;



                // Check if the current child is an image or if the elapsed time exceeds current slide duration
                if (elapsed > currentChildSlideDuration && childSlides.length > 1) {
                  
                  slidesContainer.classList.add('blink');
                  setTimeout(function () {
                    slidesContainer.classList.remove('blink');
                  }, 500);

                  crossFade(thisSlide.id);  // Trigger crossfade for the hovered slide
                } else {
                  //console.log('elapsed ' + elapsed);
                }

                break; // Stop looping after finding the first child with 'shown' class
              } else {
                childSlide.removeAttribute('started');
              }
            }
          }

          // Continue looping while the slide is hovered
          startFadeLoop();
        }, timeBetweenChecksShouldFade);
      }

      startFadeLoop();  // Start loop when mouse enters
  }


  function crossFade(parentId) {
    let parent = document.getElementById(parentId);
    //let images = parent.getElementsByTagName('img');
    let slides = parent.getElementsByClassName('slide');

    // If there are no slides, return early
    if (slides.length === 0) return;

    // Initialize n as a property of the parent element if it doesn't exist
    if (parent.n === undefined) {
      parent.n = slides.length - 1;  // Start from the last slide
    }

    // Log the current parent ID and n for debugging
    //console.log(parent.id + ' ' + parent.n);

    // Fade out the current slide
    slides[parent.n].style.opacity = "0";
    slides[parent.n].classList.remove('shown');
    slides[parent.n].setAttribute('started', '');
    let s = slides[parent.n];
    /*setTimeout(function () {
      alert(transitionDuration)
      //s.classList.add('hidden');
    }, transitionDuration);*/
    // Move to the next slide in the sequence
    parent.n = (parent.n - 1 + slides.length) % slides.length;

    // Fade in the new current slide
    //slides[parent.n].classList.remove('hidden');
    slides[parent.n].style.opacity = "1";
    //console.log('new shown ' + slides[parent.n])
    slides[parent.n].setAttribute('started', performance.now());
    slides[parent.n].classList.add('shown');

    // Play media
    if (slides[parent.n].classList.contains('video-slide') || slides[parent.n].tagName === 'AUDIO') {
      
      let vid = slides[parent.n].getElementsByTagName('video')[0];
      
      if (vid.paused) {
        
        playVideo(vid);
      } else {
        slides[parent.n];
        //playButton.classList.remove("playing");
      }
    }

  }
  async function playVideo(videoElem) {
    try {

      // Get all video elements on the page
      const allVideos = document.querySelectorAll("video");

      // Pause all videos except for videoElem
      allVideos.forEach((video) => {
        if (video !== videoElem && !video.paused) {
          video.pause();
        }
      });

      // Reset the video to 0
      //videoElem.currentTime = 0;
      videoElem.parentElement.setAttribute('started', performance.now() + videoElem.currentTime);
      await videoElem.play();

      //playButton.classList.add("playing");
    } catch (err) {
      //playButton.classList.remove("playing");
    }
  }
  // Function to preload slides and append them to the specified container
  function preloadAndAppendSlide(slide, containerClass) {
    //let mediaElement = slide.querySelector('img, video');
    //if (mediaElement) {
    const container = modal.querySelector(`.${containerClass}`);

    // Clone the slide and append it to the container
    let clonedSlide;


    if (slide.tagName === 'IMG') {

      clonedSlide = slide.cloneNode(true);

      clonedSlide.classList.remove('slide');
      clonedSlide.classList.remove('shown');
      clonedSlide.classList.add('modal-slide');
      clonedSlide.classList.add('modal-img');

      
      if (clonedSlide.srcset){
          clonedSlide.src = '';
      }



    } else if (slide.classList.contains('video-slide')) {

      // Create a new video element
      clonedSlide = document.createElement('video');
      clonedSlide.classList.add('modal-slide');
      clonedSlide.classList.add('modal-video');
      clonedSlide.controls = true; // Add controls to the video
      clonedSlide.autoplay = true; // Optional: Start playing video automatically

      // Create source elements
      const source = slide.querySelector('source');
      if (source) {
        const sourceClone = document.createElement('source');
        sourceClone.src = source.src;
        sourceClone.type = source.type;
        clonedSlide.appendChild(sourceClone);
      } else {
        console.error('No source element found in the video slide.');
      }
      
      clonedSlide.controls = true; // Add controls to the video
      clonedSlide.autoplay = true; // Optional: Start playing video automatically

      let newDiv = document.createElement('div');
      newDiv.classList.add('modal-video');
      newDiv.classList.add('modal-slide');

      newDiv.append(clonedSlide);

      clonedSlide = newDiv;
    }
    //console.log(slide)
    clonedSlide.removeAttribute("style");
    container.appendChild(clonedSlide);
    //}
  }
  function showSlideInModal(childSlide, parentSlidesCollection, modalSlideDirection) {
    

    if (!parentSlidesCollection) {

      // Handle text case
      if (modalImg) {
        modalImg.style.display = 'none';
      }
      if (modalVideo) {
        modalVideo.style.display = 'none';
      }

      // Show only text content
      let title = childSlide.querySelector('.summary-title').innerHTML;

      let client = childSlide.querySelector('.summary-subtitle').innerHTML;
      let desc = childSlide.querySelector('.summary-description').innerHTML;

      desc = desc.replaceAll('<span class="creator"></span>', 'Amutio Sacha');
      

      // Create a temporary container to handle the innerHTML without <p> issues
      const template = document.createElement('template');
      template.innerHTML = `
          <h2 class='modal-title'>${title}</h2>
          ${client}<br/>
          <div class='desc'>${desc}</div>
      `;

      modalDescription.innerHTML = template.innerHTML;

      modal.classList.remove('show-controls');
      modal.style.visibility = "visible";
      modal.classList.add('active');
      modal.classList.add('text-page');
      wrapper.classList.add('blurred');
      document.body.classList.add('scroll-lock');

      setTimeout(function () {
        modal.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }, 100);

      return
    }


    //console.log('show slide in modal ' + childSlide.getAttribute('src'));

    modal.classList.remove('text-page');

    // Remove 'shown' class from all slides
    let childSlides = parentSlidesCollection.querySelectorAll('.slide');
    childSlides.forEach((childSlide) => childSlide.classList.remove('shown'));

    let totalSlides = childSlides.length;

    //console.log('parent ' + parentSlidesCollection.id)
    //console.log('childs ' + childSlides.length)

    if (childSlides.length > 1) {

      modal.classList.add('show-controls');
    } else {
      modal.classList.remove('show-controls');
    }
    // Preload previous and next slides
    let currentIndex = Array.from(childSlides).indexOf(childSlide);
    //console.log("index " + currentIndex)
    // Find previous and next slide indices
    let nextIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1; // Loop to last slide if on first
    let prevIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0; // Loop to first slide if on last

    // Get previous and next slides
    let prevSlide = childSlides[prevIndex];
    let nextSlide = childSlides[nextIndex];

    let prevElement = modal.querySelector('.modal-prev-content');
    let nextElement = modal.querySelector('.modal-next-content');
    mainElement = modal.querySelector('.modal-main-content');

    modalImg = mainElement.querySelector('.modal-img');
    modalVideo = mainElement.querySelector('.modal-video');

    if (modalSlideDirection == 'next') {


      //document.getElementByClassName('modal-prev-content').innerHTML = '';

      prevElement.remove();
      // set current main as new prev
      mainElement.classList.add('modal-prev-content');

      // set current next as new main
      nextElement.classList.add('modal-main-content')
      // remove modal-next-content class from new main
      nextElement.classList.remove('modal-next-content');
      // remove modal-main from old main
      mainElement.classList.remove('modal-main-content');

      // create new modal-next-content div
      const newDiv = document.createElement('div');
      newDiv.className = 'modal-next-content';
      modal.querySelector('.modal-media-content-container').appendChild(newDiv);
      // Preload and append next slide
      preloadAndAppendSlide(nextSlide, 'modal-next-content');



    } else if (modalSlideDirection == 'prev') {

      nextElement.remove();

      // set current main as new next
      mainElement.classList.add('modal-next-content');

      // set current prev as new main
      prevElement.classList.add('modal-main-content')
      // remove modal-prev-content class from new main
      prevElement.classList.remove('modal-prev-content');
      // remove modal-main from old main
      mainElement.classList.remove('modal-main-content');

      // create new modal-prev-content div
      const newDiv = document.createElement('div');
      newDiv.className = 'modal-prev-content';
      modal.querySelector('.modal-media-content-container').appendChild(newDiv);
      // Preload and append prev slide
      preloadAndAppendSlide(prevSlide, 'modal-prev-content');

    } else { // coming from thumbnail
      // Clear previous content
      prevElement.innerHTML = '';
      nextElement.innerHTML = '';

      //console.log("prev : " + prevSlide.src)
      //console.log("next : " + nextSlide.src)
      // Preload and append previous and next slides
      preloadAndAppendSlide(prevSlide, 'modal-prev-content');
      preloadAndAppendSlide(nextSlide, 'modal-next-content');


      // Check if the clicked element is an image or video
      if (childSlide.tagName === 'IMG') {
        if (!modalImg) {
          modalImg = document.createElement('img');
          modalImg.classList.add('modal-img');
          modalImg.classList.add('modal-slide');
          mainElement.append(modalImg)
        }
        if (childSlide.srcset){
          modalImg.srcset = childSlide.srcset;
        } else {
          modalImg.src = childSlide.src;
        }
        
        modalImg.style.display = 'block';
        if (modalVideo) {
          modalVideo.style.display = 'none';
        }


        modalImg.classList.add('modal-img');

        modal.classList.add('active');

        //parentSlidesCollection.classList.remove('hovered');
        //wrapper.classList.add('blurred');
        //document.body.classList.add('scroll-lock');
        //lenis.stop();

      } else if (childSlide.classList.contains('video-slide')) {
        /*
        let existingVideoElement = childSlide.getElementsByTagName('video');
        if (existingVideoElement !== null) {
            modalVideo.innerHTML = '';
        //childSlide.pause();
        }*/
        if (!modalVideo) {
          modalVideo = document.createElement('div');
          modalVideo.classList.add('modal-video');
          modalVideo.classList.add('modal-slide');
          mainElement.append(modalVideo)
        } else {
          modalVideo.innerHTML = '';
        }


        // Create a new video element
        const videoClone = document.createElement('video');
        videoClone.classList.add('modal-slide');
        videoClone.classList.add('modal-video');
        videoClone.controls = true; // Add controls to the video
        videoClone.autoplay = true; // Optional: Start playing video automatically

        // Create source elements
        const source = childSlide.querySelector('source');
        if (source) {
          const sourceClone = document.createElement('source');
          sourceClone.src = source.src;
          sourceClone.type = source.type;
          videoClone.appendChild(sourceClone);
        } else {
          console.error('No source element found in the video slide.');
        }

        // Add the new video element to modal content
        modalVideo.appendChild(videoClone);
        if (modalImg) {
          modalImg.style.display = 'none';
        }
        modalVideo.style.display = 'block';

        // Play the video automatically
        videoClone.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }


    }
    // Add 'shown' class to the new slide

    childSlide.classList.add('shown');
    childSlide.setAttribute('started', performance.now());
    childSlide.style.opacity = "1";


    //console.log(parentSlidesCollection)
    modal.setAttribute('data-slide-collection', parentSlidesCollection.id);


    modal.classList.add('active');

    parentSlidesCollection.classList.remove('hovered');
    wrapper.classList.add('blurred');
    document.body.classList.add('scroll-lock');
    //lenis.stop();

    
    let title = childSlide.alt ? childSlide.alt : childSlide.title || parentSlidesCollection.parentElement.querySelector('.slide-link').textContent;
    let client = parentSlidesCollection.parentElement.querySelector('.summary-client');
    
    if (!client) {    
      client = '';
    } else {
      client = client.innerHTML;
    }
    let desc = parentSlidesCollection.parentElement.querySelector('.summary-description');
    
    if (!desc) {
      desc = '';
    } else {
      desc = desc.innerHTML;
    }

    modalDescription.innerHTML = "<div class='modal-title'>" + title + "</div>" + client + "<br/><br/><div class='desc'>" + desc + "</div>"; // Set description text


    setTimeout(function () {
      modal.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);


  }


  let isScrolling;
  let isScrollingCurrently = false;;
  // Initialize current rotation
  let currentRotation = 0;

  function customScroll(event, astrodudeInstance, donutInstance){
    //alert('sc')
    // Clear the timeout if it's already set
    clearTimeout(isScrolling);
    //scrollFunction();
    slidesContainer.classList.add('locked');
    if (!isScrollingCurrently){
      revealIndex = 0;  // Reset index on scroll start
      //cancelSmoothScrollTo = true;
      scrollLock = false;
    }

    isScrollingCurrently = true;
    
    // hide tooltips on scroll
    if (astrodudeInstance){
      astrodudeInstance.hide();
    }
    if (donutInstance){
      donutInstance.hide();
    }
    
    
    detectScrollDirection();

    if (scrollDirection === 'down'){
      /* if scrolling DOWN, hide the sticky element */
      headerElem.style.top = '-100%';
      
    } else {
      
      headerElem.style.top = '0';
    }
    
    if ((forceShowHeader || window.pageYOffset == 0) && headerElem.style.top !== '0'){
      headerElem.style.top = '0';
    }

    /*
    // Get computed styles of reelwrap's ::before pseudo-element
    let computedStyle = window.getComputedStyle(reelwrap, "::before");

    // Get current background position values from CSS variables
    let xPosition = parseFloat(computedStyle.getPropertyValue("--x-pos")) || 50; // Default to 50% if not set
    let yPosition = parseFloat(computedStyle.getPropertyValue("--y-pos")) || 50;
    */

    // Decrease background position by 1%
    //xPosition -= 0.1;
    requestAnimationFrame(() => {
      if (scrollDirection == "down"){
        //yPosition -= 0.06 * (window.innerWidth / window.innerHeight);
        let scrollTarget = document.getElementById('scroll-target')
        scrollTarget.style.marginTop = '-1000px';
        //scrollTarget.style.position = 'absolute';

        //currentRotation -= 5;
      } else {
        //yPosition += 0.06 * (window.innerWidth / window.innerHeight);
        let scrollTarget = document.getElementById('scroll-target')
        scrollTarget.style.marginTop = '20vh';
        //scrollTarget.style.position = 'absolute';
        //currentRotation += 5;
      }
      
      /*
      // Apply the new background position by setting the CSS variables
      reelwrap.style.setProperty('--x-pos', `${xPosition}%`);
      reelwrap.style.setProperty('--y-pos', `${yPosition}%`);*/
    });

    //const cube = document.getElementById('cube');

    // Get current transform value
    //const currentTransform = window.getComputedStyle(cube).transform;

    
    /*
    if (currentTransform && currentTransform !== 'none') {
        // Extract rotation from the matrix
        const matrixValues = currentTransform.match(/matrix.*\((.+)\)/);
        if (matrixValues) {
            const values = matrixValues[1].split(', ');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            // Calculate rotation in degrees
            //currentRotation = Math.round(Math.atan2(b, a) * (180 / Math.PI));
        }
    }*/

    // Increment rotation by 1 degree
    //const newRotation = currentRotation + 1;

    // Set new transform value
    //cube.style.transform = `translateY(${currentRotation}px)`;
    
    

    // Set a timeout to run after scrolling ends
   
      isScrolling = setTimeout(function () {
        //alert('scrollend')
        // Code to run after scrolling ends
        isScrollingCurrently = false;
        revealIndex = 0;  // Reset index on scroll end
        cancelSmoothScrollTo = false;

        forceShowHeader = false;
        forceSmoothScrolling = false;
        
        //alert('end')
        setTimeout(function () {
          //if (!lenis.isScrolling){
          if (!isSmoothScrolling){
            slidesContainer.classList.remove('locked');
            scrollLock = false;
            for (let i = 0; i < slides.length; i++) {
              let thisSlide = slides.item(i);
              if (thisSlide.classList.contains('hovered')){
                sliderActive(thisSlide);
                break
              }
            }
          }
            
          //}
        }, 1000)

      }, 100); // Adjust timeout duration as needed

      if (scrollLock){
        //event.preventDefault();
        //return false
      }

      if (forceSmoothScrolling){
        ///console.log('force')
        event.preventDefault();
        event.stopPropagation();
        return false
      }
    
    
    
  }

  window.addEventListener('scroll', () => debounce(customScroll)(event, astrodudeInstance, donutInstance), { passive: true });


  // Doesnt work as intended, would need to hijack browser default scroll behavior
  // Not sure if better or worst than nothing :
  // Event listener to stop default scroll behavior when necessary
  let scrollStartTime = null; // Track the start time of the wheel event
  let scrollTimeout;

  window.addEventListener('wheel', (event) => {
    
    //if (scrollLock || isSmoothScrolling) {
      //event.preventDefault(); // Prevent default scroll behavior while locked
    //}
    
    // If smooth scrolling is active, track the start of user scrolling
    if (isSmoothScrolling) {
      event.preventDefault(); // Prevent default scroll behavior while locked
      event.stopPropagation();
      /*
      if (!scrollStartTime) {
        scrollStartTime = performance.now(); // Mark the start time of user scroll
        forceSmoothScrolling = true;
      }

      // Clear previous timeout if user scrolls again before the 500ms delay
      clearTimeout(scrollTimeout);

      // Set a timeout to check if the user has been scrolling for more than 500ms
      //scrollTimeout = setTimeout(() => {
        const scrollDuration = performance.now() - scrollStartTime;

        if (scrollDuration >= 10000) { // id rather use 1000ms but it doesnt work well, so use 10000 (actually pretty much disables user scrolling while forceSmoothScrolling = true)
          cancelSmoothScrollTo = true;  // Cancel smooth scrolling
          isSmoothScrolling = false;
          scrollStartTime = null;  // Reset scroll start time
          forceSmoothScrolling = false;
          
        } else {
          forceSmoothScrolling = true;
          event.stopPropagation();
          event.preventDefault();
        }
        */
      //}, 500);
    } else {
      //console.log('NOT')
      //event.stopPropagation();
      // If not smooth scrolling, cancel immediately
      //cancelSmoothScrollTo = true;
      //isSmoothScrolling = false;
    }
  }, { passive: false });

  window.addEventListener('wheelend', () => {
    scrollStartTime = null; // Reset when wheel event ends (if detectable)
  });
  window.addEventListener('touchmove', (event) => {
    if (scrollLock){
      event.preventDefault(); // Prevent default scroll behavior on touch devices
    }
    cancelSmoothScrollTo = true;
    isSmoothScrolling = false;
  }, { passive: false });

}


