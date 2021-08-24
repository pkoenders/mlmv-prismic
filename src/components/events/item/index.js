import React from 'react'

// Helpers
// import { GatsbyImage } from 'gatsby-plugin-image'
import i18n from '/config/i18n'
import { RichText } from 'prismic-reactjs'
import linkResolver from '../../../utils/linkResolver'
import { validateString } from '/src/utils/helpers'
import moment from 'moment'

// Layout
import Section from '/src/components/common/layout/pageLayout/'
import EventForm from '../../common/forms/formContactNew'

import styled from 'styled-components'

const SupportersHeader = styled.div`
  display: flex;
  grid-gap: ${({ theme }) => theme.padding.default};
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
  }
  margin: ${({ theme }) => theme.padding['4xl']} auto ${({ theme }) => theme.padding.default} auto;
  // padding-bottom: ${({ theme }) => theme.padding.default};
  border-bottom: 4px solid ${({ theme }) => theme.colors.page[300]};

  & .intro {
    width: 100%;
    padding-bottom: ${({ theme }) => theme.padding['1/4']};
    padding-right: ${({ theme }) => theme.padding.default};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      padding-right: 0;
      width: 100%;
    }
    span {
      display: flex;
      align-items: center;
      margin-bottom: ${({ theme }) => theme.margin['1/2']};
    }

    .dateLocation {
      grid-gap: ${({ theme }) => theme.padding.default};
      padding: 0;
      margin: 0;
      color: ${({ theme }) => theme.colors.page[700]};

      span,
      span.passed {
        margin: 0;
        flex-wrap: wrap;
        grid-column-gap: ${({ theme }) => theme.margin.default};
        grid-row-gap: ${({ theme }) => theme.margin['1/4']};
        p,
        a {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 0;
          width: fit-content;
          white-space: nowrap;

          i {
            /* margin-top:1px; */
            color: inherit;
            margin-right: ${({ theme }) => theme.margin['1/4']};
          }
        }
      }
      span.passed {
        p {
          .prev {
            text-decoration: line-through;
            opacity: 0.5;
            margin: 0 ${({ theme }) => theme.margin['1/4']} 0 0;
          }
        }
      }
    }
  }
`

const SupportersBody = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
  }
  grid-gap: ${({ theme }) => theme.padding.default};
  & .content {
    width: 66%;
    padding-right: ${({ theme }) => theme.padding.default};
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      padding-right: 0;
      width: 100%;
    }
    font-size: 110%;
  }
  & .contact {
    width: 33%;
    @media (max-width: ${({ theme }) => theme.screens.md}) {
      width: 100%;
    }
    p {
      margin: 0;
      padding-bottom: ${({ theme }) => theme.padding.default};
      span {
        display: inline-flex;
        align-items: center;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        margin-right: ${({ theme }) => theme.margin['1/2']};
      }
    }

    & .title {
      padding: 0 0 0 ${({ theme }) => theme.padding['1/2']};
      margin-bottom: 0;
      line-height: inherit;
    }
  }
`

const EventItem = ({ currentLang, itemData }) => {
  const eventItem = itemData.data
  const title = validateString(eventItem.title.text)
  const eventType = validateString(eventItem.type)
  const mainContent = validateString(eventItem.content.raw)
  const location = validateString(eventItem.location)

  var currentDate = new Date()

  moment.locale(currentLang.slice(0, -3))
  currentDate.setDate(currentDate.getDate() - 2)
  const today = moment(currentDate).format()
  var start_date = eventItem.start_date_time
  const end_date = eventItem.end_date_time

  var date = moment(start_date).format('LL')
  // date = moment.locale('es')

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
      duration = duration + ' ' + days + ' Days'
    }
    if (hours > 0) {
      duration = duration + ' ' + hours + ' Hours'
    }
    if (minutes > 0) {
      duration = duration + ' ' + minutes + ' Minutes'
    }
  }

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <Section contentSize={'lg'}>
      <div>
        <SupportersHeader>
          <div className="intro">
            <span>{title && <h1>{title}</h1>}</span>

            {eventType === 'Event' && (
              <span className="dateLocation">
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

                    {location && (
                      <p>
                        <i className="material-icons-round" aria-hidden="true">
                          place
                        </i>
                        {location}
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
                      <span className="prev">{date}</span> {i18n[currentLang].previousEvent}
                    </p>
                    <p>
                      <i className="material-icons-round" aria-hidden="true">
                        place
                      </i>
                      {location}
                    </p>
                  </span>
                )}
              </span>
            )}

            {eventType === 'News item' && date && (
              <span className="dateLocation">
                <p>{date}</p>
              </span>
            )}
          </div>
        </SupportersHeader>

        <SupportersBody>
          <div className="content">
            {mainContent && <RichText render={mainContent} linkResolver={linkResolver} />}
          </div>
          {today < start_date && eventType === 'Event' && (
            <div className="contact">
              <p className="title">
                <strong>{i18n[currentLang].attendingEvent}</strong>
              </p>

              <EventForm formData={itemData.data} />
            </div>
          )}
        </SupportersBody>
      </div>
    </Section>
  )
}

export default EventItem
