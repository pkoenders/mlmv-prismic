import React, { useRef, useEffect } from 'react'

// Helpers
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Tags from '../../common/filter/tags'
import linkResolver from '../../../utils/linkResolver'
import { gsap, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resizeAllGridItems } from '/src/utils/helpers'

// Icons
import IconMaterial from '/src/components/common/icons/material'

import styled from 'styled-components'

const Item = styled.li`
  display: none;

  a.card {
    overflow: hidden;
    color: ${({ theme }) => theme.colors.textColor};
    text-decoration: none;
    display: block;
    background-color: ${({ theme }) => theme.colors.card[100]};
    border: 1px solid ${({ theme }) => theme.colors.card[300]};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 10;

    height: max-content !important;
    transform: translateY(0px);
    transition: ${({ theme }) => theme.transition.easeOut.default};

    .imageWrapper {
      position: relative;
      img {
        transition: ${({ theme }) => theme.transition.easeOut.default};
        aspect-ratio: 16/9;
        transform: scale(1);
        object-position: center top !important;
      }
    }

    span {
      display: flex;
      flex-direction: column;
      grid-gap: ${({ theme }) => theme.padding['1/4']};
      border-top: 1px solid ${({ theme }) => theme.colors.card[300]};
      color: inherit;
      padding: ${({ theme }) => theme.padding['1/2']};

      p:first-of-type {
        font-size: 103%;
        font-weight: 600;
        align-content: space-between;
        /* margin-bottom: ${({ theme }) => theme.margin['1/4']}; */

        i {
          color: inherit;
          margin: 0 0 0 auto;
        }
      }
      p {
        display: flex;
        align-items: center;
        margin: 0;
        i {
          color: inherit;
          margin-right: ${({ theme }) => theme.margin['1/4']};
        }
      }

      p:last-of-type {
        margin-bottom: ${({ theme }) => theme.margin['1/4']};
      }
    }
  }

  &:hover {
    a.card {
      box-shadow: ${({ theme }) => theme.boxShadow.lg};
      text-decoration: none;
      border-color: ${({ theme }) => theme.colors.primary[400]};
      .imageWrapper {
        img {
          transform: scale(1.033);
          object-position: center top;
        }
      }

      span {
        text-decoration: none;
        p {
          i {
            color: ${({ theme }) => theme.colors.primary.default};
          }
        }
      }
    }
  }

  &.show,
  &.isActive {
    display: flex;
    height: fit-content;
  }
`

const PeerSupportersItem = ({ thisItem, animateScroll }) => {
  // const _ = require('lodash')

  // Reference grid items
  const gridItems = useRef([])
  gridItems.current = []

  const revealTxt = useRef([])
  revealTxt.current = []

  const gridItem = (item) => {
    if (item && !gridItems.current.includes(item)) {
      gridItems.current.push(item)
    }
  }

  const innerTxt = (item) => {
    if (item && !revealTxt.current.includes(item)) {
      revealTxt.current.push(item)
    }
  }

  gsap.registerPlugin(ScrollTrigger)

  // Use 'Resize all grid items' for grid filtering
  useEffect(() => {
    resizeAllGridItems(gridItems)
    'pointerover, resize, keydown, orientationchange'.split(', ').forEach(function (e) {
      window.addEventListener(e, () => {
        // Helpers - resizeAllGridItems
        resizeAllGridItems(gridItems)
      })
    })
  }, [])

  useEffect((animateScroll) => {
    if (animateScroll === true) {
      gridItems.current.forEach((item, index) => {
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
          gridItems.current.kill()
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

  const item = thisItem.item.document
  const content = thisItem.item.document.data
  const firstName = content.first_name.text
  const fullName = content.first_name.text + ' ' + content.last_name.text
  const intro = content.intro.text
  const location = content.location
  var tagData = thisItem.item.document.tags

  //Filter duplicates if any
  tagData = uniq(tagData)
  function uniq(a) {
    var seen = {}
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
  }

  //Sort
  tagData.sort()

  return (
    <>
      {item.uid && (
        <Item className={'item show'} ref={gridItem}>
          <Link to={linkResolver(item)} className="card">
            {content.image && (
              <div className="imageWrapper">
                <GatsbyImage
                  image={content.image.localFile.childImageSharp.gatsbyImageData}
                  alt={content.image.alt ? content.image.alt : content.title.text}
                />
              </div>
            )}

            <span ref={innerTxt}>
              {firstName && (
                <p>
                  {fullName}
                  <IconMaterial icon={'arrow_forward'} />
                </p>
              )}
              {intro && <p>{intro}</p>}
              {location && (
                <p>
                  <IconMaterial icon={'person_pin_circle'} />
                  {location}
                </p>
              )}
              {tagData && <Tags tagData={tagData} />}
            </span>
          </Link>
        </Item>
      )}
    </>
  )
}

export default PeerSupportersItem
