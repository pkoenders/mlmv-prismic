import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

// Helpers
import i18n from '/config/i18n'
import { RichText } from 'prismic-reactjs'
import linkResolver from '/src/utils/linkResolver'
import { validateString } from '/src/utils/helpers'

// Layout
import Section from '/src/components/common/layout/pageLayout/'
import SupporterForm from '/src/components/common/forms/formContactNew'
import Tags from '/src/components/common/filter/tags'

import styled from 'styled-components'

const SupportersHeader = styled.div`
  display: flex;

  grid-gap: ${({ theme }) => theme.padding.default};
  @media (max-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: column;
    grid-gap: ${({ theme }) => theme.padding['1/2']};
  }
  margin: ${({ theme }) => theme.padding['4xl']} auto ${({ theme }) => theme.padding.default} auto;
  padding-bottom: ${({ theme }) => theme.padding['1/2']};
  border-bottom: 4px solid ${({ theme }) => theme.colors.page[300]};

  & .intro {
    width: 66%;
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
      img {
        width: 75px !important;
        height: 75px !important;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-right: ${({ theme }) => theme.margin['1/2']};
      }
    }
  }
  & .tags {
    width: 33%;
    @media (max-width: ${({ theme }) => theme.screens.sm}) {
      width: 100%;
    }
    display: flex;
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
      line-height: 1;
      span {
        display: inline-flex;
        align-items: center;
        grid-gap: ${({ theme }) => theme.margin['1/4']};
        margin-right: ${({ theme }) => theme.margin['1/2']};
      }
    }

    & .title {
      padding: ${({ theme }) => theme.padding.default} 0 0 ${({ theme }) => theme.padding['1/2']};
      border-top: 1px solid ${({ theme }) => theme.colors.header.bground[300]};
      margin-bottom: 0;
    }
  }
`

const supportersItem = ({ currentLang, itemData }) => {
  //console.log(galleyItemTags.tags)
  const tagData = itemData.tags.sort()
  const supportersItem = itemData.data
  const firstName = validateString(supportersItem.first_name.text)
  const lastName = validateString(supportersItem.last_name.text)
  const fullName = firstName + ' ' + lastName
  const introText = validateString(supportersItem.intro.text)
  const mainContent = validateString(supportersItem.content.raw)
  const gender = validateString(supportersItem.gender)
  const location = validateString(supportersItem.location)

  return (
    // Set content width - xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'full'
    <Section contentSize={'lg'}>
      <div>
        <SupportersHeader>
          <div className="intro">
            <span>
              {supportersItem.image && (
                <GatsbyImage
                  image={supportersItem.image.localFile.childImageSharp.gatsbyImageData}
                  alt={supportersItem.image.alt ? supportersItem.image.alt : fullName}
                />
              )}
              {firstName && <h1>{fullName}</h1>}
            </span>
            {introText && <p className="date">{introText}</p>}
          </div>
          <Tags tagData={tagData} />
        </SupportersHeader>

        <SupportersBody>
          <div className="content">
            {mainContent && <RichText render={mainContent} linkResolver={linkResolver} />}
          </div>
          <div className="contact">
            <p>
              {gender && (
                <span>
                  <i className="material-icons-round" aria-hidden="true">
                    face
                  </i>
                  {gender}
                </span>
              )}

              {location && (
                <span>
                  <i className="material-icons-round" aria-hidden="true">
                    person_pin_circle
                  </i>
                  {/* {i18n[currentLang].covers}  */}
                  {location}
                </span>
              )}
            </p>
            {firstName && (
              <p className="title">
                <strong>
                  {i18n[currentLang].contact} {firstName}
                </strong>
              </p>
            )}
            <SupporterForm formData={itemData.data} />
          </div>
        </SupportersBody>
      </div>
    </Section>
  )
}

export default supportersItem
