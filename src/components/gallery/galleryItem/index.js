import React, { useRef, useEffect } from 'react'
// import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import mediumZoom from 'medium-zoom'
import linkResolver from '../../../utils/linkResolver'
import { RichText } from 'prismic-reactjs'

import './index.scss'

const GalleryItem = ({ itemData }) => {
  // const galleryItemTags = itemData

  //console.log(galleyItemTags.tags)
  const galleryItem = itemData.data
  const galleryImageRoll = galleryItem.body1[0]

  //console.log(galleryImageRoll)

  const revealRefs = useRef([])
  revealRefs.current = []
  const itemRef = (item) => {
    if (item && !revealRefs.current.includes(item)) {
      revealRefs.current.push(item)
    }
  }
  useEffect(() => {
    // mediumZoom('[data-zoomable]', {
    //   margin: 64,
    // })

    revealRefs.current.forEach((index) => {
      mediumZoom('[data-zoomable]', {
        margin: 64,
      })
    })
  }, [])

  return (
    <section className="section-layout wide galleryPage">
      <div>
        <h1>{galleryItem.title.text}</h1>

        <div className="galleryItem">
          <div className="galleryDescription">
            {galleryItem.creation_date && <p className="date">{galleryItem.creation_date}</p>}

            {galleryItem.link && (
              <a href={galleryItem.link.url} className="visit">
                <i className="material-icons-round" aria-hidden="true">
                  open_in_new
                </i>
                {galleryItem.link.url}
              </a>
            )}

            {/* {galleryItemTags.tags && (
              <ul className="tagNames">
                {galleryItemTags.tags.map((tag, index) => (
                  <li className={'tagName ' + tag} key={index}>
                    {tag}
                  </li>
                ))}
              </ul>
            )} */}

            {galleryItem.description.raw && (
              <RichText render={galleryItem.description.raw} linkResolver={linkResolver} />
            )}

            {/* <p className="sizing">
          Canvas size: Width {galleyItem.width}cm&nbsp;&nbsp;x&nbsp;&nbsp;Height {galleyItem.height}
          cm
        </p> */}
          </div>

          <div className="galleryImage">
            <GatsbyImage
              image={galleryItem.main_image.localFile.childImageSharp.gatsbyImageData}
              alt={
                galleryItem.main_image.localFile.alt
                  ? galleryItem.main_image.localFile.alt
                  : 'This image currently has no description'
              }
              data-zoomable
              ref={itemRef}
            />

            {galleryImageRoll.items.map((item, index) => (
              // console.log(index)
              <GatsbyImage
                image={item.image.localFile.childImageSharp.gatsbyImageData}
                alt={
                  item.image.localFile.alt
                    ? item.image.localFile.alt
                    : 'This image currently has no description'
                }
                key={index}
                data-zoomable
                ref={itemRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GalleryItem
