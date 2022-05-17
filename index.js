import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

let sections = gsap.utils.toArray(".section");
let images = gsap.utils.toArray('.image')
let links = gsap.utils.toArray('a')

/**
 * Counter
 */

let totalNum = sections.length
document.querySelector('.totalNum').innerHTML = totalNum

/**
 * GSAP
 */

// Change background color on scroll

gsap.utils.toArray(".section").map((elem) => {

  var bgColor = elem.getAttribute('data-color');

  let trigger = ScrollTrigger.create({
    trigger: elem,
    start: 'top 5%',
    end: 'bottom 5%',
    markers: false,
    onToggle() {
      gsap.to('body', {
        backgroundColor: bgColor,
        duration: '1.2'
      })

      // gsap.to('.title', {
      //   color: bgColor,
      //   duration: '1.2'
      // })
    }
  });

  return () => {
    bgColor = elem.getAttribute('data-color')
    if (trigger.isActive) {
      gsap.killTweensOf('body');
      gsap.set('body', {
        backgroundColor: bgColor
      })
    }
  }
});

// Immediate snap

function goToSection(i) {
  gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false, ease: "Power3.easeInOut" },
    duration: 0.8
  })
  document.querySelector('.currentNum').innerHTML = i + 1
}

ScrollTrigger.defaults({
  markers: false
})

sections.forEach((section, i) => {
  const mainAnim = gsap.timeline({ paused: true })

  ScrollTrigger.create({
    trigger: section,
    onEnter: () => goToSection(i),
  })

  ScrollTrigger.create({
    trigger: section,
    start: "bottom bottom",
    onEnterBack: () => goToSection(i)
  })
})


//  Cards Mouse hover
// const animateDetails = (opacity, delay) => {
//   gsap.to('.details', {
//     opacity: opacity,
//     duration: 0.3,
//     delay: delay
//   })
// }
const animateTitle = (opacity) => {
  gsap.to('.title', {
    opacity: opacity,
    duration: 0.3,
  })
}

images.forEach((image, i) => {
  image.addEventListener("mouseenter", () => {
    gsap.to(image, {
      scale: 1.1,
      duration: 0.5,
      overwrite: true,
      onToggle: () => {
        // animateDetails(0, 0),
        animateTitle(0)
      }
    })
  })

  image.addEventListener("mouseleave", () => {
    gsap.to(images, {
      scale: 1,
      duration: 0.5,
      overwrite: true,
      onToggle: () => {
        // animateDetails(1, 0.2),
        animateTitle(1)
      }
    })
  })
})

/**
 * Custom Cursor
 */

const cursorInner = document.querySelector('.cursor-inner')
const cursorOuter = document.querySelector('.cursor-outer')

let posX = 0
let posY = 0
let clientX = 0
let clientY = 0

gsap.to({}, {
  duration: 0.016,
  repeat: -1,
  onRepeat: () => {
    posX += (clientX - posX) / 9
    posY += (clientY - posY) / 9

    gsap.set(cursorOuter, {
      css: {
        left: posX - 20,
        top: posY - 20
      }
    })

    gsap.set(cursorInner, {
      css: {
        left: clientX,
        top: clientY
      }
    })
  }
})

document.addEventListener('mousemove', e => {
  clientX = e.clientX
  clientY = e.clientY
})

images.forEach((image) => {
  image.addEventListener('mouseenter', () => {
    cursorInner.classList.add('active')
    cursorOuter.classList.add('active')
  })

  image.addEventListener('mouseleave', () => {
    cursorInner.classList.remove('active')
    cursorOuter.classList.remove('active')
  })
})

links.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    cursorOuter.classList.add('active')
  })

  link.addEventListener('mouseleave', () => {
    cursorOuter.classList.remove('active')
  })
})
