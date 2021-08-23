import React from 'react'

// Helpers
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import { getImgFormat } from '/src/utils/helpers'
import { validateString } from '/src/utils/helpers'

import styled from 'styled-components'

const CardItemWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.padding['1/2']};

  a {
    border: 1px solid transparent;
    display: block;

    .image {
      overflow: hidden;
      position: relative;
      z-index: 99;
      aspect-ratio: 16/9;
      img {
        transition: ${({ theme }) => theme.transition.linear.quick};
        transform: scale(1.033) !important;
      }
    }

    .image.landscape {
      aspect-ratio: 16/9;
    }

    .image.portrait {
      aspect-ratio: 3/4;
    }

    .description {
      display: flex;
      color: ${({ theme }) => theme.colors.page.default};
      flex-direction: column;
      text-align: center;
      grid-gap: ${({ theme }) => theme.padding['1/8']};
      z-index: 100;
      position: relative;
      padding: ${({ theme }) => theme.padding.default} ${({ theme }) => theme.padding['1/2']} 0;
      p {
        margin: 0;
      }

      p.title {
        font-size: 108%;
        font-weight: 700;
      }

      .link {
        text-transform: uppercase;
        display: flex;
        margin: 0 auto;
        align-items: center;
        width: fit-content;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.primary.default};
        border-bottom: 1px solid transparent;

        i {
          margin-left: ${({ theme }) => theme.padding['1/4']};
        }
      }
    }
  }

  a:hover {
    text-decoration: none;
    /* border: 1px solid ${({ theme }) => theme.colors.primary.default}; */

    .image {
      img {
        transform: scale(1.01) !important;
      }
    }

    .description {
      .link {
        text-decoration: none;

        i {
          text-decoration: none;
          color: ${({ theme }) => theme.colors.primary.default};
        }
      }
    }
  }
`

const CardItem = ({ cardItem, index }) => {
  // Validate image format
  var imgFormat = getImgFormat(cardItem.format)
  // Validate content
  const link = cardItem.link
  const image = cardItem.image
  const title = validateString(cardItem.title)
  const content = cardItem.description
  const linkLabel = validateString(cardItem.link_label.text)

  return (
    <CardItemWrapper className="cardItem keen-slider__slide">
      <Link to={linkResolver(link)} className={'link'}>
        {image && (
          <GatsbyImage
            className={'image landscape ' + imgFormat}
            image={image.localFile.childImageSharp.gatsbyImageData}
            alt={image.alt ? image.alt : 'Sorry, no image description is available at this time'}
          />
        )}
        <span className="description">
          {title && <p className="title">{title}</p>}
          {content.text && <RichText render={content.raw} />}
          {linkLabel && (
            <p className="link">
              {linkLabel}
              <i className="material-icons-round" aria-hidden="true">
                arrow_forward
              </i>
            </p>
          )}
        </span>
      </Link>
    </CardItemWrapper>
  )
}

export default CardItem
