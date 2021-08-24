import React from 'react'

// Helpers
import { Link } from 'gatsby'
import moment from 'moment'
import i18n from '/config/i18n'

// Layout
import ListItem from '../../common/layout/listResults/listItem'
import Tags from '../../common/filter/tags'

const PeerSupportersItem = ({ currentLang, thisItem, showTags }) => {
  const item = thisItem.item.document
  const content = thisItem.item.document.data
  const tagData = thisItem.item.document.tags.sort()
  const title = content.title.text
  const eventType = content.type
  const intro = content.intro
  const location = content.location

  var currentDate = new Date()
  moment.locale(currentLang.slice(0, -3))

  currentDate.setDate(currentDate.getDate() - 2)
  const today = moment(currentDate).format()
  const start_date = content.start_date_time
  const end_date = content.end_date_time

  const date = moment(start_date).format('LL')
  const time = moment(start_date).format('LT')
  const endTime = moment(end_date).format('MMMM DD, LT')

  if (end_date) {
    var diff = moment.duration(moment(end_date).diff(moment(start_date)))
    var days = parseInt(diff.asDays()) //84
    var hours = parseInt(diff.asHours()) //2039 hours, but it gives total hours in given miliseconds which is not expacted.
    hours = hours - days * 24 // 23 hours
    var minutes = parseInt(diff.asMinutes()) //122360 minutes,but it gives total minutes in given miliseconds which is not expacted.
    minutes = minutes - (days * 24 * 60 + hours * 60) //20 minutes.
    var duration = ''
    if (days > 0) {
      duration = duration + ' ' + days + ` ${i18n[currentLang].days}`
    }
    if (hours > 0) {
      duration = duration + ' ' + hours + ` ${i18n[currentLang].hours}`
    }

    if (minutes > 0) {
      duration = duration + ' ' + minutes + ` ${i18n[currentLang].minutes}`
    }
  }

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
                        {i18n[currentLang].starts}: {time}
                      </p>
                    )}
                    {end_date > start_date && (
                      <p>
                        <i className="material-icons-round" aria-hidden="true">
                          access_time_filled
                        </i>
                        {i18n[currentLang].ends}: {endTime}
                      </p>
                    )}
                    {duration && (
                      <p>
                        <i className="material-icons-round" aria-hidden="true">
                          timelapse
                        </i>
                        {i18n[currentLang].duration}: {duration}
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
                      <span className="srike">{date}</span>
                      {i18n[currentLang].previousEvent}
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
