import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SupportersItem from '../components/supporters/item/'
import SeoZone from '/src/components/slices/seoZone'
import SecondaryNav from '../components/common/secondaryNav'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { validateString } from '/src/utils/helpers'

const SupportersPage = ({ data, pageContext }) => {
  if (!data) return null

  const { next, previous } = pageContext

  // Validate and create Next title
  var nextTitle
  if (!next) {
    nextTitle = null
  } else {
    nextTitle =
      validateString(next.data.first_name.text) + ' ' + validateString(next.data.last_name.text)
  }
  // console.log('nextTitle = ' + nextTitle)

  // Validate and create Previous title
  var previousTitle
  if (!previous) {
    previousTitle = null
  } else {
    previousTitle =
      validateString(previous.data.first_name.text) +
        ' ' +
        validateString(previous.data.last_name.text) || null
  }
  // console.log('previousTitle = ' + previousTitle)

  // console.log(pageContext)
  const document = data.allPrismicPeerSupporters.edges[0].node
  // const primaryNav = data.prismicPrimaryNavigation.data.top_navigation
  // const currentLang = data.prismicPrimaryNavigation.lang

  const primaryNav = data.prismicMainNavigation.data.nav
  const currentLang = data.prismicMainNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body} />
      <SecondaryNav
        currentLang={currentLang}
        next={next}
        nextTitle={nextTitle}
        previous={previous}
        previousTitle={previousTitle}
      />
      <SupportersItem currentLang={currentLang} itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(SupportersPage, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query SupportersQuery($uid: String, $locale: String) {
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

    allPrismicPeerSupporters(filter: { lang: { eq: $locale }, uid: { eq: $uid } }) {
      edges {
        next {
          uid
          type
          lang
          data {
            first_name {
              text
            }
            last_name {
              text
            }
          }
        }
        previous {
          uid
          type
          lang
          data {
            first_name {
              text
            }
            last_name {
              text
            }
          }
        }
        node {
          lang
          type
          uid
          id
          tags

          #_previewable
          data {
            #Page data

            location
            first_name {
              text
            }
            last_name {
              text
            }
            intro {
              text
            }
            content {
              raw
            }
            gender
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
            }

            ## Forms
            select_form {
              document {
                ... on PrismicForms {
                  data {
                    form_title {
                      text
                    }
                    from_content {
                      raw
                    }
                    body {
                      ## Button
                      ... on PrismicFormsDataBodyButton {
                        slice_type
                        primary {
                          button_type
                          button_name {
                            text
                          }
                        }
                      }

                      ## Text area
                      ... on PrismicFormsDataBodyTextAreaInput {
                        slice_type
                        primary {
                          required
                          field_name {
                            text
                          }
                        }
                      }

                      ## Text input
                      ... on PrismicFormsDataBodyTextInput {
                        slice_type
                        primary {
                          required
                          field_type
                          field_name {
                            text
                          }
                        }
                      }

                      ## Checkbox
                      ... on PrismicFormsDataBodyCheckbox {
                        slice_type
                        primary {
                          title {
                            text
                          }
                          align
                        }
                        items {
                          item {
                            text
                          }
                        }
                      }

                      ## Radio buttons
                      ... on PrismicFormsDataBodyRadioButton {
                        id
                        slice_type
                        items {
                          item {
                            text
                          }
                        }
                        primary {
                          title {
                            text
                          }
                          align
                        }
                      }

                      ## Select list
                      ... on PrismicFormsDataBodySelectList {
                        items {
                          item {
                            text
                          }
                        }
                        primary {
                          title {
                            text
                          }
                        }
                        slice_type
                      }
                    }
                  }
                }
              }
            }

            #Page data - ends

            #SEO Start
            body {
              ... on PrismicPeerSupportersDataBodyGeneralSeoCard {
                primary {
                  description {
                    text
                  }
                  title {
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

              ... on PrismicPeerSupportersDataBodyOpenGraph {
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

              ... on PrismicPeerSupportersDataBodyTwitterCard {
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
    }
  }
`
