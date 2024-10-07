

const isOnline = !(window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1" ||
window.location.protocol === "file:");

//let testMode = isOnline;
let testMode = false;

let avifSupport = false;
    var avifTest = new Image();
    avifTest.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    avifTest.onload = function () {
      avifSupport = true;
      //alert('avif supported')
    };

    


const lenis = new Lenis();
lenis.stop();

const threshold = .01
const options = {
  root: null,
  rootMargin: '0px',
  threshold
}

let revealIndex = 0;
let scrollDirection = 'down';
let lastScrollY = 0;
/*
window.addEventListener('scrollend', function () {
  setTimeout(function () {
    alert('scrollend')
    revealIndex = 0;  // Reset index on scroll
  }, 100);
});
*/
let isScrolling;

      window.addEventListener('scroll', function () {
        // Clear the timeout if it's already set
        clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
          //alert('scrollend')
          // Code to run after scrolling ends
          revealIndex = 0;  // Reset index on scroll
        }, 100); // Adjust timeout duration as needed
      });


// Function to detect scroll direction
function detectScrollDirection() {
  const currentScrollY = window.scrollY;
  scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = currentScrollY;
}


document.addEventListener("DOMContentLoaded", (event) => {

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

function spa() {
  
  console.log("spa " + performance.now())
  
  const greatDiv = document.querySelector('.great');
  const userAgent = navigator.userAgent.toLowerCase();
  // detect WebKit browsers
  const isWebKit = !userAgent.match("gecko") && userAgent.match("webkit");
  const isChrome = userAgent.indexOf("chrome") > -1 && userAgent.match("safari");
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

  const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;


  const body = document.querySelector('.page-home');

  
  let avifSupport = false;
  var avifTest = new Image();
  avifTest.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  avifTest.onload = function () {
    avifSupport = true;
    //alert('avif supported')
  };

  const imagesAllSlides = document.querySelectorAll("img.slide");

  if (avifSupport == false) {
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
        //console.log(`Setting src for img with data-src: ${dataSrc}`);
        
          
          img.src = img.src.split('.avif').join('.webp');
        
        //img.setAttribute('src',dataSrc)
      } 
    });
  }

  const wrapper = document.getElementById('home');

  const splashDiv = document.getElementById('splash');
  const linksHome = document.getElementsByClassName('linkHome');

  const linkProjects = document.getElementById('linkProjects');
  const linkAbout = document.getElementById('linkAbout');
  const linkContact = document.getElementById('linkContact');

  const linkLegal = document.getElementById('link-legal');
  const linkTrademark = document.getElementById('link-trademark');

  const chatWidgetCustom = document.getElementById('chat-widget-custom');

  const hoverableDelay = 3000;

  let acceptabeDelay = 10000;

  const firstThumbnailImages = document.querySelectorAll('img.shown');

  let loadedCount = 0;
  const totalFirstThumbnailImages = firstThumbnailImages.length;

  // Function to check if all images are loaded
  function checkIfAllImagesLoaded() {
    loadedCount++;
    if (loadedCount === totalFirstThumbnailImages) {
      console.log('All first thumbnails images have loaded ' + performance.now());
      if (document.fonts.check('1em Poppins')) {
        console.log("Font has been loaded " + performance.now());
        spaStart();
      } else { // font not ready yet
        document.fonts.ready.then(function () {
          console.log("Fonts have finished loading " + performance.now());
          spaStart();
        });
      }
      
      //lenis.scrollTo('#home', { lerp: 0.05, lock: true});

      
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



  // sticky header
  const headerElem = document.querySelector('.sticky');
  /* set the offset on which the hide effect has to wait */
  const scrollOffset = 100;

  /* get the current page position */
  let prevScrollpos = window.pageYOffset;

  /* monitor when the page is being scrolled */
  window.addEventListener('scroll', () => {
    /* check if the scroll offset is passed */
    if (window.pageYOffset > scrollOffset) {
      /* get the new page position after scrolling */
      let currentScrollPos = window.pageYOffset;
      /* check the new page position with the old position */
      if (prevScrollpos > currentScrollPos) {
        /* if scrolling UP, show the sticky element */
        headerElem.style.top = '0';
      } else {
        /* if scrolling DOWN, hide the sticky element */
        headerElem.style.top = '-100%';
      }
      /* set the page position, so it can be checked the next time */
      prevScrollpos = currentScrollPos;
    }

    detectScrollDirection();

    //adjustSunglasses();
  });
/*
  window.addEventListener('resize', function (event) {
    adjustSunglasses();
  }, true);
*/

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

  function lazyload() {
    
    console.log('go lazy')
    let avifSupport = false;
    var avifTest = new Image();
    avifTest.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    avifTest.onload = function () {
      avifSupport = true;
      //alert('avif supported')
    };
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
  }



  const navSections = document.querySelectorAll('.nav-section');
  const navSectionsStart = document.querySelectorAll('.nav-section-start');
  let currentSection = navSectionsStart[0];  // Start with the first section
  const menuItems = document.querySelectorAll('[data-nav-section-id-target]');

  const observerOptions = {
    root: null, // Viewport as root
    rootMargin: '0px', // Adjust if necessary (e.g., '-50px 0px' to trigger earlier)
    threshold: 0.5 // Ensure that 50% of the element is in view before triggering
  };

  let activeSectionId = null;

  // Callback for the intersection observer
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('data-nav-section-id');
        //console.log("nav intersect " + sectionId)
        setActiveMenuItem(sectionId);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each section
  navSections.forEach(section => {
    observer.observe(section);
  });

  function setActiveMenuItem(sectionId) {
    if (sectionId !== activeSectionId) {

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
      }

      // Update the active section id
      activeSectionId = sectionId;

      currentSection = document.querySelector(`.nav-section-start[data-nav-section-id="${sectionId}"]`);
      //alert(currentSection.id)
    }


  }


  // Function to scroll to a specific section using Lenis
  const scrollToSection = (section) => {
    const sectionId = section.id;  // Get the section ID
    lenis.scrollTo(`#${sectionId}`, { lerp: 0.025, lock: true });  // Smooth scroll using Lenis
    currentSection = section;  // Update the current section
    //setActiveMenuItem(sectionId);  // Update the active menu item
  };

  // Listen for keydown events to navigate sections
  document.addEventListener('keydown', (e) => {
    // Check if the document has focus, if not, return early
    // TODO : handle arrow left / right keys for modal-prev/next, 
    // and allow default scrolling in modal with arrow down/up
    if (!document.hasFocus() || e.repeat || lenis.isScrolling || modal.classList.contains('active')) {
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
        const prevSection = sectionsArrayUp[currentIndexUp - 1];
        if (prevSection) {
          scrollToSection(prevSection); // Scroll to the previous section if it exists
        }
        break;
      }
    }
  });


  // lazy load images with lazyload class once core stuff has been loaded
  // REM : let the splash screen transition finish before lazyloading to avoid cluttering the main thread
  // REM: last splash screen reveal element is .reveal-4 with 1s duration after 2s delay


  if ('loading' in HTMLImageElement.prototype) {


    // Create a MutationObserver instance
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Check if the js-hidden class is removed
          if (!body.classList.contains('js-hidden')) {
            //console.log('js-hidden class removed from body!');


            
            //setTimeout(function() {
            //    lazyload();
            //}, lazyloadDelay);
            setTimeout(function () {
              splashDiv.classList.add('finished'); // TODO ? : check if splash is in viewport
              sunglasses.classList.remove('hidden');

              // Find all elements with the class .logo in #header
              headerElem.querySelectorAll('.logo').forEach(logo => {
                // Find all elements with the class .gradtext inside the logo element
                logo.querySelectorAll('.gradtext-rainbow').forEach(gradtext => {
                  // Remove the class .animate from the gradtext element
                  gradtext.classList.remove('animate');
                });
              });
            }, hoverableDelay);

            observer.disconnect(); // Optionally disconnect after detecting
          }
        }
      });
    });

    // Observer configuration: Watch for attribute changes
    const config = { attributes: true };

    // Start observing the body element for class attribute changes
    observer.observe(body, config);



  }

  /*
  // Obfuscating the email parts
  var u = 'olleh'.split("").reverse().join("");  // Obfuscated 'email' by reversing it
  var d = 'redocevitaercym'.split("").reverse().join(""); // Obfuscated 'example' by reversing it
  var t = 'moc'.split("").reverse().join("");     // Obfuscated 'com' by reversing it
  */

  // handle the onclick event to open the tawk widget
  document.getElementById('mc_embed_signup').onclick = function (event) {
    /*
    //Handle the onclick event to generate the mailto link dynamically
      event.preventDefault(); // Prevent default anchor behavior
      var email = u + '@' + d + '.' + t;  // Combine the email parts
      window.location.href = 'mailto:' + email;  // Open the mailto link
      //alert(email)
      */
    Tawk_API.toggle();

  };


  //console.log(userAgent)

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
/*
    if (isSafari) {

      let isScrolling;

      window.addEventListener('scroll', function () {
        // Clear the timeout if it's already set
        clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
          //alert('scrollend')
          // Code to run after scrolling ends
          revealIndex = 0;  // Reset index on scroll
        }, 200); // Adjust timeout duration as needed
      });
    }*/

  }

  // Prevent dragging of all elements 
  document.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });
  /*
  function debounce(func){
    var timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func,100,event);
    };
  }

  window.addEventListener('resize', function(event) {
      if (!document.body.classList.contains('resizing')){
          document.body.classList.add('resizing')
      }
  }, true);

  window.addEventListener('resize' ,debounce(function(e) {
    if (document.body.classList.contains('resizing')){
          document.body.classList.remove('resizing')
      }
  }));*/

  

  // Array of sentences
  const sentences = [
    "The stars are beautiful tonight.",
    "This view is worth the float,<br/> isn’t it?",
    "Asteroid ahead!<br/>Nah, just testing your reflexes.",
    "By the way, has anyone <br/>seen my donut ?",
    "In space, noone can <br/>hear <i><strong>bugs</strong></i> scream",
    "We get the spacing just right!",
    "Send us an email, or a <br/>carrier pigeon in a spacesuit !"
  ];

  const MINIMUM_DISPLAY_TIME = 4000; // 4s

  const astrodudetip = tippy('#astrodude', {
    content: "Hey there !",
    theme: 'astro',
    allowHTML: true,
    //flipBehaviour: ['top', 'left'],
    placement: 'left',
    offset: [-100, -40],
    zIndex: 4,
    //flipOnUpdate: true
    trigger: "mouseenter focus manual click",
    onShow(instance) {
      // Record the time the tooltip is shown
      instance._startTime = Date.now();
      // Initialize first state to control the sentence flow
      if (instance._state == undefined) {
        instance._state = 'first';
      }
    },
    onHide(instance) {
      // Calculate how long the tooltip has been visible
      const elapsedTime = Date.now() - instance._startTime;

      if (elapsedTime < MINIMUM_DISPLAY_TIME) {
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

  tippy('#donut', {
    content: "You wouldn't download...<br/> a donut ?",
    allowHTML: true,
    theme: 'astro',
  });







  function spaStart(){

    console.log('spaStart ' + performance.now());

    
    
    // show document 
    body.classList.remove('js-hidden');
    body.classList.remove('scroll-lock');
    
    sunglasses.classList.remove('hidden');
    lenis.start();
    

    let hasLazyLoaded = false;

  // Get all elements with class 'animonItem'
  const animonItems = document.querySelectorAll('.animonItem');

  // Convert NodeList to an array and get the first 3 items
  const firstFourItems = Array.from(animonItems).slice(0, 4);
  const fifthItem = animonItems[4];

  const handleIntersect = function (entries, observer) {
    //entries.forEach(function (entry) {
    //if (entry.intersectionRatio > threshold) {


    //let visibleBatch = [];


    // Iterate over each entry (each observed element)
    entries.forEach(function (entry) {
      const targetDiv = entry.target;
      if (entry.intersectionRatio > threshold) {

        //console.log('interesect ' + entry.target.id)
        //console.log('Scroll direction: ' + scrollDirection);

        // Add the box to the array of visible elements for this batch
        //visibleBatch.push(entry.target);
        // Ensure entry.target is a valid DOM element
        

        if (targetDiv.id == 'we-make') {
          //console.log(document.getElementById('we-make'));
          setTimeout(function () { // TODO : check if splash is in viewport
            splashDiv.classList.add('finished');
            /*
            // Créer un nouvel élément <style>
            var style = document.createElement('style');

            // Ajouter la règle CSS à l'élément <style>
            style.innerHTML = `
              .paused, .paused > *, .paused > * > * {
                animation-play-state: paused !important;
              }
            `;

            // Ajouter l'élément <style> au <head> du document
            document.head.appendChild(style);
            */
            //alert("finished")
          }, hoverableDelay);
        }


        // Check if the entry does not have any class from reveal-1 to reveal-10
        const hasRevealClass = Array.from({ length: 10 }, (_, i) => `reveal-${i + 1}`).some(cls => targetDiv.classList.contains(cls));
        const revealClass = Array.from({ length: 10 }, (_, i) => `reveal-${i + 1}`).find(cls => targetDiv.classList.contains(cls))
        
        if (hasRevealClass){
          revealIndex = parseInt(revealClass.split('-')[1], 10) - 1;
          //alert(revealIndex)
        }

        if (!hasRevealClass || scrollDirection === 'up' && (firstFourItems.includes(targetDiv) || targetDiv.id == fifthItem.id)) {

          let delayClass = `reveal-${Math.min(revealIndex + 1, 10)}`; // Use reveal-1 to reveal-10

          

          //alert(delayClass + ' ' + targetDiv.id)
          if (scrollDirection === 'down') {
            // If scrolling down, apply regular transition-delay order

            if (!hasRevealClass) {
              targetDiv.classList.add(delayClass);
              
            }
            

          } else if (scrollDirection === 'up') {
            if (targetDiv.querySelector('#hand')) {
              //alert("hand")
              splashDiv.classList.remove('finished');
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
              });

              
              lenis.scrollTo('#home', { lerp: 0.05, lock: true });
            

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
                
                delayClass = `reveal-${Math.min(revealIndex + 1, 10)}`;
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

          let lightbulb = document.getElementById('lightbulb-shape');

          const revealClassRegex = /^reveal-(\d+)$/;

          // Find the 'reveal-N' class using the regex
          const targetClass = [...targetDiv.classList].find(cls => revealClassRegex.test(cls));
          
          if (targetClass) {
            // Extract the number (N) from the matched class 'reveal-N'
            const num = parseInt(targetClass.match(revealClassRegex)[1], 10);
            
            // Create the new class 'reveal-(N+1)'
            delayClass = `reveal-${Math.min(num + 1, 10)}`;
            
          } else {
            delayClass = `reveal-${Math.min(revealIndex + 1, 10)}`;
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


        /*if (targetDiv.id == 'about-us'){
            
            let fullBleed = targetDiv.querySelector('.full-bleed');
            if (fullBleed){

                fullBleed.classList.add('show')

            }
        }*/
        if (!targetDiv.classList.contains('reveal-delegated')) {
          targetDiv.classList.remove('reveal-prehide');
          targetDiv.classList.remove('paused');
          revealIndex++
        }

        // Stop observing once the element is animated
        //observer.unobserve(entry.target)

        
      } else {
        //alert('paused ' + targetDiv.id)
        if (firstFourItems.includes(targetDiv) || targetDiv.id == fifthItem.id){
          
        } else {
          targetDiv.classList.add('paused')
        }
       // ;
      }
    });





    //}
    //})
  }
    // Reveal on scroll stuff
    const observer = new IntersectionObserver(handleIntersect, options)
    const targets = document.querySelectorAll('.animonItem')
    targets.forEach(function (target) {
      observer.observe(target)
    })

    if (isOnline) {
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
      }
    
      // Call the function to inject the script
      injectTawkScript();
    }
  }



  window.addEventListener('load', function () {

    //setTimeout(function() { 
    //body.classList.remove('js-hidden');
    //}, 2000); 
    console.log('window on load ' + performance.now())

    if (!!isReduced) {
      // DON'T use an animation here!
    } else {
      // DO use an animation here!
      /*
      // Reveal on scroll stuff
      const observer = new IntersectionObserver(handleIntersect, options)
      const targets = document.querySelectorAll('.animonItem')
      targets.forEach(function (target) {
        observer.observe(target)
      })
      */
      // Accepts any class name
      var rellax = new Rellax('.rellax', {
        center: true,
        //wrapper:'#parallax_wrapper' 
      });
    }
    //body.classList.remove('js-hidden');
    //body.classList.remove('scroll-lock');
    //sunglasses.classList.remove('hidden');
    //lenis.start();

    spaStart()
  });
  //lenis.on('scroll', (e) => {
  //console.log(e)
  //})

  let ty = getTranslateY(targetDiv);
  let maxOffsetTop = targetDiv.offsetTop + ty;

  maxOffsetTop = 450;



  let maxScale = 2;

  // 1 to 16
  let scalingFactor = 5;
  // clamp sunglasses div size in px
  let maxW = 600;

  function adjustSunglasses() {
    const stickyRect = stickyDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(targetDiv);

    // Get the translateY value of targetDiv
    let translateY = getTranslateY(targetDiv);
    stickyDiv.style.position = "absolute";

    let tmpY = -(parseFloat(translateY) - parseFloat(computedStyle.marginTop))
    let stop = window.innerWidth > 480 ? 30 : 64;
    let adjust = window.innerWidth > 480 ? 8 : 0;

    stop = window.innerHeight < 420 ? 5 : stop;
    adjust = window.innerHeight < 420 ? 56 : adjust;

    let w = parseFloat(computedStyle.width);
    let ml = parseFloat(computedStyle.marginLeft);
    let mt = parseFloat(computedStyle.marginTop);

    mt = window.innerHeight < 420 ? mt + 48 : mt;

    if (tmpY > stop) {

      tmpY = stop - ((stop + adjust) - Math.abs(translateY));

      //if (tmpY < -8){
      if (translateY < 0) {
        tmpY = translateY - adjust;

      } else {

      }



    } else {
      tmpY = -(parseFloat(translateY) - parseFloat(computedStyle.marginTop));

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

        //if (window.innerWidth < 560){
          //ml = window.innerWidth - w;
        //}

        

        if (mt > parseFloat(computedStyle.marginTop)) {
          //mt = parseFloat(computedStyle.marginTop);
        }

        if (mt < - (window.innerHeight / 2)){
          //mt = -window.innerHeight/ 2;
        }

        //if (window.innerHeight > 420){
          mt = mt - (250 * (scale - 1));
          //mt = parseFloat(computedStyle.marginTop);
        //}

      }

    }
    stickyDiv.style.transform = `translate3d(0px, ${tmpY}px, 0px)`;
    //}
    stickyDiv.style.marginTop = mt + "px";
    stickyDiv.style.width = w + "px";
    stickyDiv.style.marginLeft = ml + "px";

  }

 



  function raf(time) {
    lenis.raf(time)
    adjustSunglasses();
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

  linkProjects.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    revealIndex = 0;
    //let target = document.getElementById('projects-reel');
    //scroll.scrollTo(target);

    slidesContainer.classList.add('locked');

    // preload custom eye cursor blink state to prevent cursor jump on first blink (loading blink cursor image)
    /*document.body.classList.add('blink');
    setTimeout(function () {
      document.body.classList.remove('blink');
    }, 500);*/

    lenis.scrollTo('#projects-reel', { lerp: 0.05, lock: true });
    setTimeout(() => { astrodudeInstance.show(); }, 3000);
    setTimeout(() => { astrodudeInstance.hide(); }, 13000);

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
    
  });
  linkAbout.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    lenis.scrollTo('#about-us', { lerp: 0.05, easing: 'ease-in', lock: true });

  });
  linkContact.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    Tawk_API.toggle();
    /*
    lenis.scrollTo('#contact-us', { lerp: 0.05, easing: 'ease-in', lock: true});
    //console.log('contact clicked')*/
  });
  splashDiv.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    //alert('reveal index ' + revealIndex)
    revealIndex = 0;
    //let target = document.getElementById('projects-reel');
    //scroll.scrollTo(target);
    slidesContainer.classList.add('locked');
    /*
    document.body.classList.add('blink');
    setTimeout(function () {
      document.body.classList.remove('blink');
    }, 500);
    */

    lenis.scrollTo('#projects-reel', { lerp: 0.05, lock: true });
    setTimeout(() => { astrodudeInstance.show(); }, 3000);
    setTimeout(() => { astrodudeInstance.hide(); }, 13000);
    
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

  });

  for (let i=0; i < linksHome.length; i++){
    
    linksHome[i].addEventListener('click', (event) => {
      event.preventDefault();
      lenis.scrollTo('#home', { lerp: 0.025, easing: 'ease-in', lock: true });
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
            let currentChildSlideType;
            let currentChildSlideDuration;

            

            // Loop through the child slides to find the one that is currently shown
            for (let j = 0; j < childSlides.length; j++) {
              let childSlide = childSlides[j];

              // Check if the current child slide has the 'shown' class
              if (childSlide.classList.contains('shown')) {
                // Get the tag type of the shown slide (e.g., IMG, VIDEO)
                currentChildSlideType = childSlide.tagName;


                
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
                  currentChildSlideDuration = timeBetweenFades; // Example: default 2 seconds
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
        }, timeBetweenFades);
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
    // Move to the next slide in the sequence
    parent.n = (parent.n - 1 + slides.length) % slides.length;

    // Fade in the new current slide
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

      modalDescription.innerHTML = `
                  <h2 class='modal-title'>${title}</h2>
                  ${client}<br/>
                  <div class='desc'>${desc}</div>
              `;

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

        parentSlidesCollection.classList.remove('hovered');
        wrapper.classList.add('blurred');
        document.body.classList.add('scroll-lock');
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


    let title = childSlide.alt ? childSlide.alt : childSlide.title;
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

    modalDescription.innerHTML = "<div class='modal-title'>" + title + "</div>" + client + "<br/><div class='desc'>" + desc + "</div>"; // Set description text


    setTimeout(function () {
      modal.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);


  }

}
