import React from 'react'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../../utils/linkResolver'
import { validateString } from '/src/utils/helpers'
import './index.scss'

const TextBlog = ({ slice }) => {
  // Validate text
  const content = validateString(slice.primary.text.raw)
  return (
    <div>{content !== null ? <RichText render={content} linkResolver={linkResolver} /> : ''}</div>
  )
}

export default TextBlog
