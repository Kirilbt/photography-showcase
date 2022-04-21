import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
    'detail': ['November 2019', 'Bern, Switzerland'],
    'color': '#d8fff6'
  },
  {
    'image': new URL('static/light.jpg', import.meta.url),
    'title': 'Light',
    'detail': ['September 2018', 'Milano, Italy'],
    'color': '#fff1d8'
  }
]

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


// Change color
gsap.registerPlugin(ScrollTrigger)

gsap.utils.toArray(".box").map((elem) => {

  var color = elem.getAttribute('data-color');

  let trigger = ScrollTrigger.create({
      trigger: elem,
      start: 'top 5%',
      end: 'bottom 5%',
      markers: false,
      onToggle() {
        gsap.to("body", {
          backgroundColor: color,
          duration: 1.4
        })
      }
  });

  return () => {
    color = elem.getAttribute('data-color');
    if (trigger.isActive) {
      gsap.killTweensOf("body");
      gsap.set("body", {
        backgroundColor: color
      })
    }
  }
});
