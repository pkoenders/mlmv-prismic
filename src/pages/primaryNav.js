// import React from 'react'
import { graphql } from 'gatsby'
// import Layout from '../components/layout'
// import SeoZone from '/src/components/slices/seoZone'
// import SliceZone from '/src/components/slices/sliceZone'

const PrimaryNav = ({ data }) => {
  //Validate data for Gastby Build Gatsby Build breaks here for Deleate / createPages  - see  https://github.com/birkir/gatsby-source-prismic-graphql/issues/174
  const primaryNavData = data.allPrismicMainNavigation.edges.slice(0, 1).pop()

  if (!data || !primaryNavData) return null

  const primaryNav = primaryNavData.node.data.nav
  // const currentLang = primaryNavData.node.lang

  // return (
  //   <Layout currentLang={currentLang} primaryNav={primaryNav}>
  //     <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
  //     <SliceZone location={location} sliceZone={document.data.body} />
  //   </Layout>
  // )
}

export default PrimaryNav

export const query = graphql`
  query PrimaryNav($locale: String) {
    ## Get the main nav in local context
    allPrismicMainNavigation(filter: { lang: { eq: $locale } }) {
      edges {
        node {
          type
          lang
          id
          data {
            nav {
              ... on PrismicMainNavigationDataNavNavItem {
                id
                primary {
                  link {
                    uid
                    type
                    lang
                  }
                  label {
                    text
                  }
                }
                items {
                  sub_nav_link {
                    uid
                    type
                    lang
                  }
                  sub_nav_link_label {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
