import React from 'react'
import { Link } from 'gatsby'

import './item.scss'

const BlogItem = ({ blogItem }) => {
  const item = blogItem.add_blog_item
  const content = item.document.data

  return (
    <li className="blogItem">
      <Link to={`${item.uid}`}>
        <h1>{content.title.text}</h1>
        {content.release_date && <p className="date">{content.release_date}</p>}
        <p>{content.intro.text}</p>
        <span>
          <i className="material-icons-round" aria-hidden="true">
            arrow_forward
          </i>
        </span>
      </Link>
    </li>
  )
}

export default BlogItem
