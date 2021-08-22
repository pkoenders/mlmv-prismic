import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import './index.scss'

const ImageBlog = ({ slice }) => {
  // Validate text
  const mediaObj = slice.primary.image
  return (
    <div className="blogImage">
      {slice.slice_type === 'image_blog' && (
        <GatsbyImage
          image={mediaObj.localFile.childImageSharp.gatsbyImageData}
          alt={mediaObj.alt ? mediaObj.alt : 'Placeholder image'}
        />
      )}
    </div>
  )
}

export default ImageBlog
