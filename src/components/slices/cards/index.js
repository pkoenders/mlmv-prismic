import React, { useEffect, useState } from 'react'

//Helpers
import { gsap, Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import CardItem from './item.js'
import Masonry from 'react-masonry-css'
import { useKeenSlider } from 'keen-slider/react'

// Buttons
import NavArrow from './navArrow'

import 'keen-slider/keen-slider.min.css'

import {
  getPresentationType,
  getPostionAlign,
  getContentWidth,
  // getDefaultMargin,
  getAutoSpacing,
  getManualSpacing,
  getBgColor,
  getColorTint,
  rgb2hex,
  getContrast,
} from '/src/utils/helpers'

import { screenSize } from '/src/themes/globalStyles'

import styled from 'styled-components'

const CardsWrapper = styled.section`
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.padding.default};
  }
  .title.left {
    text-align: left;
  }
  .title.center {
    text-align: center;
  }
  .title.right {
    text-align: right;
  }

  .masonry-grid {
    padding: 0 ${({ theme }) => theme.padding['1/2']};
    display: flex;
    grid-gap: ${({ theme }) => theme.padding.default};
    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      grid-gap: ${({ theme }) => theme.padding['1/2']};
    }
    @media (max-width: ${({ theme }) => theme.screens.xs}) {
      grid-gap: ${({ theme }) => theme.padding.default};
    }
    width: auto;
    position: relative;
  }

  .masonry-grid_column {
    height: min-content;
    background-clip: padding-box;
  }

  /* Style your items */
  .masonry-grid_column {
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding.default};
    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      grid-gap: ${({ theme }) => theme.padding['1/2']};
    }
    @media (max-width: ${({ theme }) => theme.screens.xs}) {
      grid-gap: ${({ theme }) => theme.padding.default};
    }
    .cardItem {
      flex: 0 1 48%;
      width: 100%;
    }
  }

  // Masonry layout
  .masonry-grid {
    .cardItem {
      overflow: visible;
      a {
        text-decoration: none;
        > div {
          background-color: #fff;
        }
      }
    }
  }

  // Carousel layout
  .carousel {
    position: relative;
    .nav {
      display: flex;
      margin: ${({ theme }) => theme.margin['1/2']} auto 0;
      width: fit-content;
      grid-gap: ${({ theme }) => theme.padding['1/2']};

      .item {
        width: ${({ theme }) => theme.padding['1/2']};
        height: ${({ theme }) => theme.padding['1/2']};
        background-color: ${({ theme }) => theme.colors.page.default};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
      }

      .item:hover,
      .item.active {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.primary.default};
      }
    }

    .cardItem {
      cursor: col-resize;

      a {
        text-decoration: none;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        grid-gap: ${({ theme }) => theme.padding['1/2']};
        > div {
          background-color: transparent;
          border: none;
          box-shadow: none;
          overflow: visible;
        }
        .imageWrapper {
          border-radius: ${({ theme }) => theme.borderRadius.default};
          border: none;
        }

        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          grid-gap: ${({ theme }) => theme.padding['1/4']};
          .title,
          p {
            justify-content: inherit;
          }
          .link {
            text-transform: uppercase;
            position: relative;
            display: flex;
            grid-gap: ${({ theme }) => theme.padding['1/4']};
            margin: 0 auto;
            align-items: center;
            white-space: nowrap;
            width: fit-content;
            padding: ${({ theme }) => theme.padding['1/4']} ${({ theme }) => theme.padding['1/2']};
            color: ${({ theme }) => theme.colors.page.default};
            background-color: #ffffffa8;
            /* border: 1px solid ${({ theme }) => theme.colors.page[400]}; */
            border-radius: ${({ theme }) => theme.borderRadius.default};
            box-shadow: ${({ theme }) => theme.boxShadow.default};
            i {
              position: inherit;
              transition: ${({ theme }) => theme.transition.easeIn.default};
              right: 0px;
            }
          }
        }
      }
      a:hover {
        /* overflow: visible; */
        > div {
          /* box-shadow: none; */
        }
        .imageWrapper {
          box-shadow: ${({ theme }) => theme.boxShadow.lg};
        }
        .content {
          .link {
            box-shadow: ${({ theme }) => theme.boxShadow.lg};
            i {
              color: inherit;
              transition: ${({ theme }) => theme.transition.easeOut.default};
              right: -${({ theme }) => theme.padding['1/8']};
            }
          }
        }
      }
    }
  }

  &.dark {
    .carousel {
      .prev,
      .next {
        i {
          color: ${({ theme }) => theme.colors.page.default};
        }
      }

      .nav {
        .item {
          background-color: ${({ theme }) => theme.colors.page[100]};
        }

        .item:hover,
        .item.active {
          background-color: ${({ theme }) => theme.colors.primary.default};
        }
      }

      .content {
        color: ${({ theme }) => theme.colors.page[100]};
      }
    }
  }
`

const Cards = ({ slice }) => {
  // Set up the section with an id and some classes and styles
  // Add a page ID to reference
  const sectionID = slice.id
  // Set the content width class
  const sectionWidth = getContentWidth(slice.primary.width)
  // Set default contrast color class
  const setContrast = 'light'
  // Set the bgColor class
  var bgColor = getBgColor(slice.primary.background_color)
  const bGroundTint = getColorTint(slice.primary.background_tint)
  bgColor = 'background-' + bgColor + '-' + bGroundTint
  // Set the vertical padding - inline style
  const defaultPadding = getAutoSpacing(slice.primary.default_padding)
  var vPaddingTop = getManualSpacing(slice.primary.v_padding_top)
  var vPaddingBottom = getManualSpacing(slice.primary.v_padding_bottom)
  if (vPaddingTop === null) {
    vPaddingTop = defaultPadding + 'px'
  }
  if (vPaddingBottom === null) {
    vPaddingBottom = defaultPadding + 'px'
  }

  // Set the state of the forGroundColor
  const [forGroundColor, setForgroundColor] = useState(setContrast)
  // Find the current bground color of the section and update the forground color class
  useEffect(() => {
    var objBground = document.getElementById(`${sectionID}`)
    let bgColor = window.getComputedStyle(objBground).backgroundColor
    // Convert it a hex value
    bgColor = rgb2hex(bgColor)
    // Return the contrast mode  - 'dark' or 'light'
    var updateContrast = getContrast(bgColor)
    // Update contrast color and set it as a class in the section
    setForgroundColor(updateContrast)
    // Disable warinings of missing dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Validate title text
  const title = slice.primary.card_title
  const align = getPostionAlign(slice.primary.align)

  // How do we present this? Carousel or Gallery
  const columnCount = 3
  const presentationType = getPresentationType(slice.primary.presentation_type)

  // Carousel
  // const carouselMargin = getDefaultMargin()
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [sliderRef, slider] = useKeenSlider({
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
    slidesPerView: 1,
    mode: 'snap',
    spacing: 32,
    centered: true,
    loop: true,
    breakpoints: {
      // [screenSize.xs]: {
      '(min-width: 576px)': {
        slidesPerView: 2,
        centered: true,
        mode: 'free-snap',
      },
      '(min-width: 1200px)': {
        slidesPerView: columnCount,
        centered: true,
        mode: 'free-snap',
      },
    },
  })

  const breakpointColumnsObj = {
    // default: 2,
    //default: columnCount,
    [screenSize.xs]: 1,
    [screenSize.sm]: 2,
    // [screenSize.md]: columnCount,
    // [screenSize.lg]: columnCount,
    // [screenSize.xl]: columnCount,
    // [screenSize.xxl]: 3,
    10000: columnCount,
  }

  if (typeof window !== `undefined`) {
    gsap.registerPlugin(ScrollTrigger, Power3)
  }

  useEffect(() => {
    if (slice.primary.animate_scroll !== true) return
    const aninItems = gsap.utils.toArray('.cardItem')
    aninItems.forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
          // markers: true
        },
      })

      tl.fromTo(item.querySelector('.cardItem .image'), { y: +96 }, { y: 0, ease: Power3.easeOut })
      tl.fromTo(
        item.querySelector('.cardItem span'),
        { y: +96, opacity: 0 },
        { y: 0, opacity: 1, ease: Power3.easeOut }
      )

      return () => {
        aninItems.item.kill()
      }
    })
  }, [slice])

  return (
    <CardsWrapper
      id={sectionID}
      className={'section-layout ' + sectionWidth + ' ' + forGroundColor + ' ' + bgColor}
      style={{
        paddingTop: vPaddingTop,
        paddingBottom: vPaddingBottom,
      }}
    >
      <div>
        {title.text && (
          <span className={'title ' + align}>
            <RichText render={title.raw} linkResolver={linkResolver} />
          </span>
        )}

        {presentationType === 'gallery' ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {slice.items.map((cardItem, index) => {
              return (
                <CardItem
                  cardItem={cardItem}
                  key={slice.id + index}
                  presentationType={presentationType}
                />
              )
            })}
          </Masonry>
        ) : (
          <div className="carousel">
            <div ref={sliderRef} className="keen-slider">
              {slice.items.map((cardItem, index) => {
                return (
                  <CardItem
                    cardItem={cardItem}
                    key={slice.id + index}
                    presentationType={presentationType}
                  />
                )
              })}

              {slider && (
                <>
                  <NavArrow
                    onClick={(e) => e.stopPropagation() || slider.prev()}
                    disabled={currentSlide === 0}
                    direction={'prev'}
                  />
                  <NavArrow
                    onClick={(e) => e.stopPropagation() || slider.next()}
                    disabled={currentSlide === slider.details().size - 1}
                    direction={'next'}
                  />
                </>
              )}
            </div>
            {slider && (
              <div className="nav">
                {[...Array(slider.details().size).keys()].map((idx) => {
                  return (
                    <button
                      key={`carousel-nav-${idx}`}
                      onClick={() => {
                        slider.moveToSlideRelative(idx)
                      }}
                      aria-label={'Move this slide to central view'}
                      className={'item' + (currentSlide === idx ? ' active' : '')}
                    />
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </CardsWrapper>
  )
}

export default Cards
