import React, { useEffect, useState } from 'react'

// Helpers
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import {
  getPostionAlign,
  getContentWidth,
  getAutoSpacing,
  getManualSpacing,
  getBgColor,
  getColorTint,
  rgb2hex,
  getContrast,
} from '/src/utils/helpers'

import styled from 'styled-components'

const QuoteWrapper = styled.section`
  .title {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: ${({ theme }) => theme.margin.default};
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

  ul,
  ul.left {
    li {
      blockquote {
        margin: 0 0;
      }
      .label {
        text-align: left;
        margin-left: ${({ theme }) => theme.margin['1/2']};
      }
    }
  }

  ul.center {
    li {
      text-align: center;
      blockquote {
        margin: 0 auto;
        text-align: center;
      }
      .label {
        text-align: center;
        margin-left: 0;
      }
    }
  }

  ul.right {
    li {
      blockquote {
        margin: 0 0 0 auto;
      }
      .label {
        text-align: right;
        margin-right: ${({ theme }) => theme.margin['1/2']};
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding.default};
    li {
      blockquote {
        position: relative;
        display: flex;
        flex-direction: column;
        width: fit-content;
        color: ${({ theme }) => theme.colors.page.default};
        background-color: #fff;
        padding: ${({ theme }) => theme.padding.default} ${({ theme }) => theme.padding['2xl']};
        border-radius: ${({ theme }) => theme.borderRadius.default};
        box-shadow: ${({ theme }) => theme.boxShadow.default};
      }

      blockquote:before,
      blockquote:after {
        color: ${({ theme }) => theme.colors.primary[700]};
        /* color: #fff; */
        font-family: ${({ theme }) => theme.font.serif};
        font-size: ${({ theme }) => theme.fontSize['5xl']};
        line-height: 0;
        display: inline-flex;
        position: absolute;
      }
      blockquote:before {
        content: '“';
        top: ${({ theme }) => theme.margin.default};
        left: ${({ theme }) => theme.margin['1/2']};
      }
      blockquote:after {
        content: '”';
        bottom: ${({ theme }) => theme.margin['1/4']};
        right: ${({ theme }) => theme.margin['1/2']};
      }
      .label {
        margin-top: ${({ theme }) => theme.margin[`1/4`]};
        font-weight: 300;
        /* font-style: italic; */
      }
    }
  }

  &.dark {
    blockquote:before,
    blockquote:after {
      color: ${({ theme }) => theme.colors.grey.default};
    }
  }
`

const Quotes = ({ slice }) => {
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

  // Content
  const title = slice.primary.title
  const align = getPostionAlign(slice.primary.align)

  return (
    <QuoteWrapper
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

        {slice.items.length > 0 && (
          <ul className={align}>
            {slice.items.map(
              (node, index) =>
                slice.items[index].active === true && (
                  <li key={slice.id + index}>
                    {slice.items[index].content.raw && (
                      <>
                        <blockquote>
                          {/* {slice.items[index].content.text} */}
                          <RichText render={slice.items[index].content.raw} />
                        </blockquote>
                        <p className="label">{slice.items[index].title}</p>
                      </>
                    )}
                  </li>
                )
            )}
          </ul>
        )}
      </div>
    </QuoteWrapper>
  )
}

export default Quotes
