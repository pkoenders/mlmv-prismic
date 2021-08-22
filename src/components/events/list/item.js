import React from 'react'

// Helpers
import { Link } from 'gatsby'
import moment from 'moment'

// Layout
import ListItem from '../../common/layout/listResults/listItem'
import Tags from '../../common/filter/tags'

const PeerSupportersItem = ({ thisItem, showTags }) => {
  const item = thisItem.item.document
  const content = thisItem.item.document.data
  const tagData = thisItem.item.document.tags.sort()
  const title = content.title.text
  const eventType = content.type
  const intro = content.intro
  const location = content.location

  var currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - 2)
  const today = moment(currentDate).format()
  const start_date = content.start_date_time

  // console.log('currentDate = ' + currentDate)
  // console.log('today = ' + today)
  // console.log('start_date = ' + start_date)

  const date = moment(start_date).format('LL')
  const time = moment(start_date).format('LT')

  return (
    <>
      {item.uid && (
        <ListItem className={'item show'}>
          <Link to={`${item.uid}`} className="card">
            <span className="content">
              {title && (
                <p>
                  {title}
                  <i className="material-icons-round" aria-hidden="true">
                    arrow_forward
                  </i>
                </p>
              )}
              {eventType === 'News item' && date && <p className="newsDate">{date}</p>}
              {intro && <p>{intro}</p>}
            </span>

            {eventType === 'Event' && (
              <span className="details">
                {today < start_date && (
                  <span>
                    {date && (
                      <p>
                        <i className="material-icons-round" aria-hidden="true">
                          event
                        </i>
                        {date}
                      </p>
                    )}
                    {time && (
                      <p>
                        <i className="material-icons-round" aria-hidden="true">
                          schedule
                        </i>
                        {time}
                      </p>
                    )}
                  </span>
                )}

                {today > start_date && (
                  <span className="passed">
                    <p>
                      <i className="material-icons-round" aria-hidden="true">
                        event_busy
                      </i>
                      <span className="srike">{date}</span>Previous event
                    </p>
                  </span>
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
            )}

            {eventType === 'News item' && showTags === true && tagData.length > 0 && (
              <span className="details">
                <Tags tagData={tagData} />
              </span>
            )}
          </Link>
        </ListItem>
      )}
    </>
  )
}

export default PeerSupportersItem
