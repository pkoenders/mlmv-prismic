import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import EventItem from '../components/events/item'
import SeoZone from '/src/components/slices/seoZone'
import SecondaryNav from '../components/common/secondaryNav'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import { validateString } from '/src/utils/helpers'

const EventsPage = ({ data, pageContext }) => {
  if (!data) return null

  const { next, previous } = pageContext

  // Validate and create Next title
  var nextTitle
  if (!next) {
    nextTitle = null
  } else {
    nextTitle = validateString(next.data.title.text)
  }

  // Validate and create Previous title
  var previousTitle
  if (!previous) {
    previousTitle = null
  } else {
    previousTitle = validateString(previous.data.title.text)
  }

  const document = data.allPrismicEvents.edges[0].node
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
      <EventItem currentLang={currentLang} itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(EventsPage, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query EventsQuery($uid: String, $locale: String) {
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

    allPrismicEvents(filter: { lang: { eq: $locale }, uid: { eq: $uid } }) {
      edges {
        next {
          uid
          type
          lang
          data {
            title {
              text
            }
          }
        }
        previous {
          uid
          type
          lang
          data {
            title {
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

            title {
              text
            }
            type
            intro
            content {
              raw
            }
            location
            start_date_time
            end_date_time

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
                        id
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
                        id
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
                        id
                        slice_type
                        primary {
                          required
                          field_type
                          field_name {
                            text
                          }
                        }
                      }

                      ## Rich text area
                      ... on PrismicFormsDataBodyRichText {
                        id
                        slice_type
                        primary {
                          align_with_input
                          text {
                            text
                            raw
                          }
                        }
                      }

                      ## Checkbox
                      ... on PrismicFormsDataBodyCheckbox {
                        id
                        slice_type
                        primary {
                          title {
                            text
                          }
                          required
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
                          required
                          align
                        }
                      }

                      ## Select list
                      ... on PrismicFormsDataBodySelectList {
                        id
                        items {
                          item {
                            text
                          }
                        }
                        primary {
                          title {
                            text
                          }
                          required
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
              ... on PrismicEventsDataBodyGeneralSeoCard {
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

              ... on PrismicEventsDataBodyOpenGraph {
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

              ... on PrismicEventsDataBodyTwitterCard {
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
