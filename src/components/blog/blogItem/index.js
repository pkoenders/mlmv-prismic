import React from 'react'
import SliceZone from '/src/components/slices/sliceZone'
import styled from 'styled-components'

const BlogHeader = styled.div`
  margin: 150px auto 32px auto !important;
  padding-bottom: 8px !important;
  border-bottom: 1px solid #0c0b0f;
  h1 {
    margin-bottom: 16px;
  }

  p {
    font-size: 90%;
  }
`

const BlogItem = ({ itemData, currentLang }) => {
  //console.log(galleyItemTags.tags)
  const blogItem = itemData.data

  return (
    <section className="section-layout skinny blogPage">
      <BlogHeader>
        <h1>{blogItem.title.text}</h1>
        {blogItem.release_date && <p className="date">{blogItem.release_date}</p>}
      </BlogHeader>

      <SliceZone currentLang={currentLang} sliceZone={itemData.data.body} />
    </section>
  )
}

export default BlogItem
