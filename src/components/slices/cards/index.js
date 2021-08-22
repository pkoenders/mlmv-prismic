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
    // margin-bottom: ${({ theme }) => theme.margin.default};
    .cardItem {
      box-shadow: ${({ theme }) => theme.boxShadow.default};
      background-color: transparent;
      transition: ${({ theme }) => theme.transition.easeOut.default};

      a {
        /* overflow: visible; */
        border: 1px solid ${({ theme }) => theme.colors.grey[100]};
        background-color: #fff;
        overflow: hidden;

        border-radius: ${({ theme }) => theme.borderRadius.default};
        .description {
          padding: ${({ theme }) => theme.padding['1/2']};
          text-align: left;

          .link {
            margin: ${({ theme }) => theme.margin['1/2']} auto 0 0;
          }
        }
      }
      a:hover {
        /* border: 1px solid ${({ theme }) => theme.colors.primary.default}; */
        border-color: ${({ theme }) => theme.colors.primary[400]};
      }
    }
    .cardItem:hover {
      box-shadow: ${({ theme }) => theme.boxShadow.lg};
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
        background-color: ${({ theme }) => theme.colors.tertiary.default};
        border-radius: ${({ theme }) => theme.borderRadius.sm};
        border: 1px solid transparent;
      }

      .item:hover,
      .item.active {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.primary.default};
        border: 1px solid ${({ theme }) => theme.colors.primary[1200]};
      }
    }

    .cardItem {
      cursor: col-resize;

      a {
        overflow: hidden;
        border: none;
        .image {
          border-radius: ${({ theme }) => theme.borderRadius.default};
        }

        .description {
          .link {
            padding: 0 ${({ theme }) => theme.padding['1/4']};
          }
        }
      }
      a:hover {
        .image {
          transform: none !important;
          transform: scale(1) !important;
        }

        .description {
          .link {
            border-bottom: 1px solid ${({ theme }) => theme.colors.primary.default};
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
      .image {
        border: 1px solid ${({ theme }) => theme.colors.grey[800]};
      }
      .nav {
        .item:hover,
        .item.active {
          background-color: ${({ theme }) => theme.colors.page[100]};
          border-color: ${({ theme }) => theme.colors.page[200]};
        }
      }

      .description {
        color: ${({ theme }) => theme.colors.page[100]};
      }

      a.link {
        p.link {
          color: ${({ theme }) => theme.colors.page[100]};
          i {
            color: inherit;
          }
        }
      }
      a.link:hover {
        p.link {
          border-color: ${({ theme }) => theme.colors.page[100]};
        }
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
              return <CardItem cardItem={cardItem} key={slice.id + index} />
            })}
          </Masonry>
        ) : (
          <div className="carousel">
            <div ref={sliderRef} className="keen-slider">
              {slice.items.map((cardItem, index) => {
                return <CardItem cardItem={cardItem} key={slice.id + index} />
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
