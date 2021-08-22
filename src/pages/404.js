import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '/src/components/layout'
import Bground404 from '/src/components/common/404/404-bground'

import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

import HomeTemplate from './index'
import PageTemplate from '../templates/generalPage'

const NotFoundPage = ({ data }) => {
  if (!data) return null
  const primaryNav = data.prismicPrimaryNavigation.data.top_navigation
  const currentLang = data.prismicNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <Bground404 />
      {/* <canvas className={'catAnim'} width="32" height="32" /> */}
      <section className="section-layout fourOfour">
        <span>
          <h1>Oh purr-leaze!</h1>
          <p>It appears that Zoe has hidden this page.</p>
          <Link className={'buttonTertiary'} to="/">
            <i className={'material-icons-round md-36'} aria-hidden="true">
              home
            </i>
            Take me home
          </Link>
        </span>
      </section>
    </Layout>
  )
}

export default withPrismicPreview(NotFoundPage, {
  templateMap: {
    page: PageTemplate,
    homepage: HomeTemplate,
    prismicPage: PageTemplate,
    prismicHomepage: HomeTemplate,
  },
})

export const query = graphql`
  query errorPage($locale: String) {
    ## Get the primary nav in local context
    prismicPrimaryNavigation(lang: { eq: $locale }) {
      type
      lang

      data {
        top_navigation {
          link {
            uid
            type
            lang
          }
          link_label {
            text
          }
        }
      }
    }
  }
`
