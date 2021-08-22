import React from 'react'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../../utils/linkResolver'
import { validateString } from '/src/utils/helpers'
import styled from 'styled-components'

const BlogReferences = styled.div`
  p {
    strong {
      opacity: 0.75;
    }
    padding-bottom: 6px;
  }
  border-top: 1px solid #0c0b0f;
  padding-top: 8px !important;
  margin-top: 32px !important;
`

const ReferencesBlog = ({ slice }) => {
  // Validate text
  const content = validateString(slice.primary.reference.raw)
  return (
    <BlogReferences>
      <p>
        <strong>References</strong>
      </p>
      {content !== null ? <RichText render={content} linkResolver={linkResolver} /> : ''}
    </BlogReferences>
  )
}

export default ReferencesBlog
