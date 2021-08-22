import React from 'react'

// Helpers
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import linkResolver from '/src/utils/linkResolver'
import { validateString } from '/src/utils/helpers'

// Layout
import ListItem from '/src/components/common/layout/listResults/listItem'
import Tags from '/src/components/common/filter/tags'

const RescourcesItem = ({ resourceItem, id, showTags }) => {
  const item = resourceItem.item.document
  const tagData = resourceItem.item.document.tags.sort()
  const content = resourceItem.item.document.data
  const title = validateString(content.title.text)
  const intro = validateString(content.content.raw)
  const internalLink = validateString(content.web_address.uid)
  const externalLink = validateString(content.web_address.url)
  const phone = validateString(content.phone)
  const location = validateString(content.location)

  return (
    <>
      {item.uid && (
        <ListItem id={id} className={'item show'}>
          <div className="card">
            <span className="content">
              {title && <p>{title}</p>}
              {/* {intro && <P>{intro}</P>} */}
              {intro && <RichText render={intro} linkResolver={linkResolver} />}
            </span>
            <span className="details">
              {internalLink && (
                <p>
                  <i className="material-icons-round" aria-hidden="true">
                    arrow_forward
                  </i>
                  {internalLink}
                  <Link to={internalLink}>externalLink</Link>
                </p>
              )}

              {externalLink && (
                <a href={externalLink} target="_blank" rel="noreferrer">
                  <i className="material-icons-round" aria-hidden="true">
                    open_in_new
                  </i>
                  {externalLink}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`}>
                  <i className="material-icons-round" aria-hidden="true">
                    call
                  </i>
                  {phone}
                </a>
              )}

              {location && (
                <p>
                  <i className="material-icons-round" aria-hidden="true">
                    place
                  </i>
                  {location}
                </p>
              )}

              {showTags === true && tagData.length > 0 && <Tags tagData={tagData} />}
            </span>
          </div>
        </ListItem>
      )}
    </>
  )
}

export default RescourcesItem
