import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEOGeneral = ({ slice }) => (
  <StaticQuery
    query={`${SEOquery}`}
    render={(data) => {
      const metaTitle = slice.primary.title.text
        ? `${slice.primary.title.text} | ${data.site.siteMetadata.title}`
        : data.site.siteMetadata.title

      return (
        <Helmet>
          {/* Page Title. Maximum length 60-70 characters */}
          <title>{metaTitle}</title>

          {/* Page description. No longer than 155 characters. */}
          {slice.primary.description.text ? (
            <meta name="description" content={slice.primary.description.text} />
          ) : (
            <meta name="description" content={data.site.siteMetadata.description} />
          )}
        </Helmet>
      )
    }}
  />
)

export default SEOGeneral

const SEOquery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
