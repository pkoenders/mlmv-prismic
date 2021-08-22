import React from 'react'

import BlogItem from './item'

import './index.scss'

const BlogPageList = ({ blogItems }) => {
  const allPosts = blogItems || []

  // console.log(allPosts)
  // Container width
  //var sectionWidth = getContentWidth(slice.primary.width)
  return (
    <section className="section-layout skinny blogList">
      <div>
        <ul className="">
          {allPosts.map((node, index) => (
            <BlogItem
              blogItem={allPosts[index]}
              // animateScroll={animateScroll}
              key={`blog-items-${index}`}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BlogPageList
