import React, { useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { gsap, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import './item.scss'

const GalleryPageItem = ({ galleryItem, animateScroll }) => {
  const revealRefs = useRef([])
  revealRefs.current = []

  const revealTxt = useRef([])
  revealTxt.current = []

  const itemRef = (item) => {
    if (item && !revealRefs.current.includes(item)) {
      revealRefs.current.push(item)
    }
  }

  const innerTxt = (item) => {
    if (item && !revealTxt.current.includes(item)) {
      revealTxt.current.push(item)
    }
  }

  gsap.registerPlugin(ScrollTrigger)

  // const grid = document.querySelector('.masonry-grid')

  useEffect(() => {
    resizeAllGridItems()
    // 'pointerover, resize, keydown, orientationchange'.split(', ').forEach(function (e) {
    'pointerover, resize, keydown, orientationchange'.split(', ').forEach(function (e) {
      window.addEventListener(e, () => {
        resizeAllGridItems()
      })
    })

    function resizeAllGridItems() {
      revealRefs.current.forEach((item, index) => {
        if (item.parentNode === null) return
        // Resize grid
        const grid = item.parentNode
        grid.style.height = 100 + '%'
        grid.style.minHeight = 100 + '%'

        const rowHeight = 0
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
        const rowSpan = Math.ceil(
          (item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
        )
        item.style.gridRowEnd = `span ${rowSpan}`
        // console.log('useEffect')
      })
    }
  }, [])

  useEffect((animateScroll) => {
    if (animateScroll === true) {
      revealRefs.current.forEach((item, index) => {
        if (item == null) return
        // var tl = gsap.timeline({
        gsap.fromTo(
          item,
          {
            y: 96,
          },
          {
            y: 0,
            ease: Power3.easeOut,

            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=0px',
              end: 'bottom bottom+=0px',
              //scrub: 0,
              toggleActions: 'play none none reverse',
              //markers: true
            },
          }
        )
        return () => {
          revealRefs.current.kill()
        }
      })

      revealTxt.current.forEach((item, index) => {
        if (item == null) return
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 8,
          },
          {
            opacity: 1,
            y: 0,
            ease: Power3.easeOut,
            duration: 2,
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=32px',
              end: 'bottom bottom+=32px',
              //scrub: 0,
              toggleActions: 'play none none reverse',
              //markers: true
            },
          }
        )
        return () => {
          revealTxt.current.kill()
        }
      })
    }
  }, [])

  const item = galleryItem.add_item.document
  const content = galleryItem.add_item.document.data
  var itemTags = galleryItem.add_item.document.tags

  //Filter duplicates if any
  itemTags = uniq(itemTags)
  function uniq(a) {
    var seen = {}
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
  }

  //Sort
  itemTags.sort()

  //Strip comma and add to classNames
  var tagClass = itemTags.join(' ')

  return (
    <li className={'galleryItem show ' + tagClass} ref={itemRef}>
      <Link to={`${item.uid}`} className="card">
        {content.main_image && (
          <div className="imageWrapper">
            <GatsbyImage
              image={content.main_image.localFile.childImageSharp.gatsbyImageData}
              alt={content.main_image.alt ? content.add_a_image.alt : content.title.text}
              srl_gallery_image="true"
            />

            <span className="view">
              <span className="openLightBox">
                <i className="material-icons-round" aria-hidden="true">
                  zoom_out_map
                </i>
              </span>
              <span className="openItem">
                <i className="material-icons-round" aria-hidden="true">
                  arrow_forward
                </i>
              </span>
            </span>
          </div>
        )}

        <span ref={innerTxt}>
          <p>
            {content.title.text}
            <i className="material-icons-round" aria-hidden="true">
              arrow_forward
            </i>
          </p>
          <p>{content.intro}</p>

          <ul className={'tagNames'}>
            {itemTags.map((tag, index) => (
              <li className={'tagName ' + tag} key={index}>
                {tag}
              </li>
            ))}
          </ul>
        </span>
      </Link>
    </li>
  )
}

export default GalleryPageItem
