import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import PeerSupportersList from '/src/components/supporters/list/'

const SupportersList = ({ data }) => {
  if (!data) return null

  const document = data.prismicPeerSupportersList
  const pageIntro = document.data
  const dataList = document.data.body[0]
  // const animateScroll = document.data.body[0].primary.animate_scroll
  // const primaryNav = data.prismicPrimaryNavigation.data.top_navigation
  // const currentLang = data.prismicPrimaryNavigation.lang

  const primaryNav = data.prismicMainNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SliceZone sliceZone={document.data.body} />
      <PeerSupportersList pageIntro={pageIntro} dataList={dataList} />
    </Layout>
  )
}

export default withPrismicPreview(SupportersList, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query SupportersList($uid: String, $locale: String) {
    ## Get the primary nav in local context
    prismicMainNavigation(lang: { eq: $locale }) {
      type
      lang
      data {
        nav {
          ... on PrismicMainNavigationDataNavNavItem {
            id
            primary {
              label {
                text
              }
              link {
                uid
                lang
                type
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

    prismicPeerSupportersList(lang: { eq: $locale }, uid: { eq: $uid }) {
      lang
      type
      uid
      id
      data {
        title {
          text
        }
        intro {
          text
          raw
        }
        show_filters
        show_input
        show_sorting
        show_tags

        body {
          ... on PrismicPeerSupportersListDataBodyPeerSupporter {
            id
            items {
              name {
                text
              }
              item {
                id
                tags

                document {
                  ... on PrismicPeerSupporters {
                    tags
                    type
                    id
                    uid
                    lang
                    data {
                      first_name {
                        text
                      }
                      last_name {
                        text
                      }
                      intro {
                        text
                      }
                      location
                      image {
                        localFile {
                          childImageSharp {
                            gatsbyImageData(
                              quality: 90
                              width: 992
                              layout: CONSTRAINED
                              formats: [AUTO, WEBP, AVIF]
                              placeholder: BLURRED
                              transformOptions: { cropFocus: CENTER }
                              # aspectRatio: 1.77
                            )
                          }
                        }
                        alt
                      }
                    }
                  }
                }
              }
            }
            slice_type
          }
        }
        #Page data - ends

        #SEO Start
        body1 {
          ... on PrismicPeerSupportersListDataBody1GeneralSeoCard {
            primary {
              title {
                text
              }
              description {
                text
              }
              image {
                localFile {
                  publicURL
                }
              }
            }
            slice_type
          }

          ... on PrismicPeerSupportersListDataBody1OpenGraph {
            primary {
              availability
              currency
              description {
                text
              }
              image {
                localFile {
                  publicURL
                }
              }
              price
              title {
                text
              }
              type
            }
            slice_type
          }

          ... on PrismicPeerSupportersListDataBody1TwitterCard {
            primary {
              description {
                text
              }
              image {
                localFile {
                  publicURL
                }
              }
              card_type
              twitter_handle
              title {
                text
              }
            }
            slice_type
          }
        }
        #SEO - ends
      }
    }
  }
`
