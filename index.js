import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin);

const infos = [
  {
    'image': new URL('static/fruits.jpg', import.meta.url),
    'title': 'Fruits',
    'detail': ['May 2019','Bern, Switzerland'],
    'color': '#fff1d8'
  },
  {
    'image': new URL('static/power.jpg', import.meta.url),
    'title': 'Power',
    'detail': ['November 2019', 'Lausanne, Switzerland'],
    'color': '#d1ebd3'
  },
  {
    'image': new URL('static/minimal.jpg', import.meta.url),
    'title': 'Minimal',
    'detail': ['March 2019', 'Bern, Switzerland'],
    'color': '#f0f0f0'
  },
  {
    'image': new URL('static/neon.jpg', import.meta.url),
    'title': 'Neon',
    'detail': ['November 2019', 'Zurich, Switzerland'],
    'color': '#d8fff6'
  },
  {
    'image': new URL('static/light.jpg', import.meta.url),
    'title': 'Light',
    'detail': ['September 2018', 'Milano, Italy'],
    'color': '#fff1d8'
  }
]

/**
 * Generate content
 */

const insertSection = (array, container) => {
  array.forEach((e, index) => {
    let section = document.createElement('section')
    section.classList.add('box')
    section.setAttribute('data-color', array[index]['color']);
    container.appendChild(section)
    insertImage(array, section, index)
  })
}

const insertImage = (array, container, index) => {
  let img = new Image()
  img.src = array[index]['image']
  img.classList.add('image')
  container.appendChild(img)

  insertTitle(array, container, index)
}

const insertTitle = (array, container, index) => {
  let titleContainer = document.createElement('p')
  titleContainer.classList.add('title')
  let title = document.createTextNode(array[index]['title'])
  titleContainer.appendChild(title)
  container.appendChild(titleContainer)

  insertDetail(array, container, index)
}

const insertDetail = (array, container, index) => {
  let detailContainer = document.createElement('div')
  detailContainer.classList.add('detail')

  array[index]['detail'].forEach((e, i) => {
    let detail = document.createElement('p')
    let innerDetail = document.createTextNode(array[index]['detail'][i])
    detail.appendChild(innerDetail)
    detailContainer.appendChild(detail)
  })
  container.appendChild(detailContainer)
}

let container = document.querySelector('.container')
insertSection(infos, container)


/**
 * GSAP
 */

// Change background color on scroll

gsap.utils.toArray(".box").map((elem) => {

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
    }
  });

  return () => {
    bgColor = elem.getAttribute('data-color');
    if (trigger.isActive) {
      gsap.killTweensOf("body");
      gsap.set("body", {
        backgroundColor: bgColor
      })
    }
  }
});

let sections = gsap.utils.toArray(".box");
let images = gsap.utils.toArray('.image')

// Immediate snap

function goToSection(i) {
  gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false, ease: "Power3.easeInOut" },
    duration: 0.8
  })
}

ScrollTrigger.defaults({
  markers: false
})

sections.forEach((box, i) => {
  const mainAnim = gsap.timeline({ paused: true });

  ScrollTrigger.create({
    trigger: box,
    onEnter: () => goToSection(i),
  })

  ScrollTrigger.create({
    trigger: box,
    start: "bottom bottom",
    onEnterBack: () => goToSection(i)
  })
})


// Mouse hover
const animateDetail = (opacity, delay) => {
  gsap.to('.detail', {
    opacity: opacity,
    duration: 0.3,
    delay: delay
  })
}
const animateTitle = (opacity) => {
  gsap.to('.title', {
    opacity: opacity,
    duration: 0.3,
    from: 'center'
  })
}

images.forEach((image, i) => {
  image.addEventListener("mouseenter", () => {
    gsap.to(image, {
      scale: 1.1,
      duration: 0.5,
      overwrite: true,
      onToggle: () => {
        animateDetail(0, 0),
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
        animateDetail(1, 0.2),
        animateTitle(1)
      }
    })
  })
});

/**
 * Custom Cursor
 */

const customCursorInner = document.querySelector('.custom__cursor__inner')
const customCursorOuter = document.querySelector('.custom__cursor__outer')

document.addEventListener('mousemove', e => {
  customCursorInner.setAttribute('style', 'top: '+(e.clientY - 4)+'px; left: '+(e.clientX - 4)+'px;')
  customCursorOuter.setAttribute('style', 'top: '+(e.clientY - 24)+'px; left: '+(e.clientX - 24)+'px;')
})
