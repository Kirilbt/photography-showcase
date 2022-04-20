import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const infos = [
  {
    'image': new URL('static/strawberry1.jpg', import.meta.url),
    'title': 'Strawberries',
    'detail': ['Model: Ajsa Njie', 'MU: Sabrina Wolf', 'Bern, Switzerland'],
  },
  {
    'image': new URL('static/strawberry2.jpg', import.meta.url),
    'title': 'Strawberries',
    'detail': ['Model: Ajsa Njie', 'MU: Sabrina Wolf', 'Bern, Switzerland'],
  },
  {
    'image': new URL('static/pineapple1.jpg', import.meta.url),
    'title': 'Pinneaple',
    'detail': ['Model: Ajsa Njie', 'MU: Sabrina Wolf', 'Bern, Switzerland'],
  },
  {
    'image': new URL('static/pineapple2.jpg', import.meta.url),
    'title': 'Pinneaple',
    'detail': ['Model: Ajsa Njie', 'MU: Sabrina Wolf', 'Bern, Switzerland'],
  }
]

const insertDiv = (array, container) => {
  array.forEach((e, index) => {
    let div = document.createElement('div')
    div.classList.add('box')
    container.appendChild(div)
    insertImage(array, div, index)
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

const fadeIn = (image) => {

}

let container = document.querySelector('.container')
insertDiv(infos, container)
