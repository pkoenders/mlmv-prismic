import * as React from 'react'
import { graphql } from 'gatsby'
// import Header from '../components/common/header/'
//import Wrapper from '../components/Wrapper'
import Layout from '../components/layout'
// import { LocaleContext } from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

const PageTemplate = ({ data, location }) => {
  if (!data) return null

  const document = data.prismicPage
  const primaryNav = data.prismicNavigation.data.top_navigation
  const currentLang = data.prismicNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SliceZone currentLang={currentLang} sliceZone={document.data.body} />
    </Layout>
  )
}

export default withPrismicPreview(PageTemplate, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query PageQuery($uid: String, $locale: String) {
    ## Get the primary nav in local context
    prismicNavigation(lang: { eq: $locale }) {
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

    prismicPage(lang: { eq: $locale }, uid: { eq: $uid }) {
      lang
      type
      uid
      id
      alternate_languages {
        lang
        uid
        type
        id
      }

      #_previewable
      data {
        #Page data
        body {
          ... on PrismicPageDataBodyText {
            slice_type
            primary {
              vertical_padding_bottom
              vertical_padding_top
              background_color
              font_sizing
              text_alignment
              width
              columns
              animate_scroll
              content {
                raw
              }
              button {
                uid
                type
                lang
              }
              button_alignment
              button_style
              button_text
            }
          }

          ... on PrismicPageDataBodyQuote {
            slice_type
            primary {
              quote {
                raw
              }
            }
          }

          ... on PrismicPageDataBodyHeroImage {
            slice_type
            primary {
              title {
                raw
                text
              }
              description {
                raw
              }
              button_style
              button_text
              button_link {
                raw
                type
                lang
              }
              secondary_button_style
              secondary_button_text
              secondary_button_link {
                raw
                type
                lang
              }
              align_content
              vertical_align_content
              width
              height
              v_height
              margin_bottom
              margin_top
              overlay_from
              overlay_from_opacity
              overlay_to
              overlay_to_opacity
              overlay_direction
              align_image
              image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      quality: 90
                      layout: FULL_WIDTH
                      transformOptions: { fit: COVER, cropFocus: ATTENTION }
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                }
              }
            }
          }

          ... on PrismicPageDataBodyCards {
            slice_type
            slice_type
            primary {
              presentation_type
              background_color
              width
              animate_scroll
              columns
              card_title
            }
            items {
              format
              title
              description {
                raw
                text
              }
              link_label {
                text
              }
              link {
                link_type
                type
                uid
                lang
              }
              image {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      #aspectRatio: 1.777777,
                      quality: 80
                      width: 564
                      layout: CONSTRAINED
                      formats: [AUTO, WEBP, AVIF]
                      placeholder: BLURRED
                      transformOptions: { cropFocus: CENTER }
                    )
                  }
                }
              }
            }
          }

          ... on PrismicPageDataBodyMediaHighlight {
            primary {
              title {
                text
              }
              description {
                raw
              }
              button_style
              button_label {
                text
              }
              button_link {
                uid
                type
                lang
              }
              font_sizing
              align_content
              width
              v_padding_top
              v_padding_bottom
              background_color

              ## Shared media paramerters
              position_media
              media_size
              animate_scroll

              ## Add shared media item

              add_media {
                document {
                  ... on PrismicSharedContent {
                    data {
                      body {
                        ## Image
                        ... on PrismicSharedContentDataBodyImage {
                          slice_type
                          primary {
                            image {
                              localFile {
                                childImageSharp {
                                  gatsbyImageData(
                                    aspectRatio: 1.777777
                                    quality: 90
                                    #width:735,
                                    #layout: CONSTRAINED,
                                    layout: FULL_WIDTH
                                    formats: [AUTO, WEBP, AVIF]
                                    placeholder: BLURRED
                                    transformOptions: { cropFocus: CENTER }
                                  )
                                }
                              }
                            }
                          }
                        }
                        ## End image

                        ## Embedded cloud media
                        ... on PrismicSharedContentDataBodyEmbeddedCloudMedia {
                          slice_type
                          primary {
                            media
                            name {
                              text
                            }
                          }
                        }
                        ## End Embbed media

                        ## Text
                        ... on PrismicSharedContentDataBodyText {
                          slice_type
                          primary {
                            text {
                              raw
                            }
                          }
                        }
                        ## End Text

                        ## Geopoint
                        ... on PrismicSharedContentDataBodyGeopoint {
                          slice_type
                          primary {
                            description {
                              raw
                              text
                            }
                            geopoint {
                              latitude
                              longitude
                            }
                            name {
                              text
                            }
                            zoom_level
                          }
                        }
                        ## End Geopoint
                      }
                    }
                  }
                }
              }
              ## End - Shared content
            }
            slice_type
          }

          ## Forms
          ... on PrismicPageDataBodyForm {
            slice_type
            primary {
              background_color
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
            }
          }
        }
        #Page data - ends

        #SEO Start
        body1 {
          ... on PrismicPageDataBody1GeneralSeoCard {
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

          ... on PrismicPageDataBody1OpenGraph {
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

          ... on PrismicPageDataBody1TwitterCard {
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
