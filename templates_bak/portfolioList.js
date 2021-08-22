import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import GalleryPageList from '/src/components/gallery/galleryPageList/'

const GalleryTemplate = ({ data }) => {
  if (!data) return null

  const document = data.prismicGalleryPage
  const galleryItems = document.data.body[0].items
  const animateScroll = document.data.body[0].primary.animate_scroll
  const primaryNav = data.prismicNavigation.data.top_navigation
  const currentLang = data.prismicNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.seobody} />
      <SliceZone sliceZone={document.data.body} />
      <GalleryPageList galleryItems={galleryItems} animateScroll={animateScroll} />
    </Layout>
  )
}

export default withPrismicPreview(GalleryTemplate, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query GalleryPage($uid: String, $locale: String) {
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

    prismicGalleryPage(lang: { eq: $locale }, uid: { eq: $uid }) {
      lang
      type
      uid
      id
      data {
        body {
          ... on PrismicGalleryPageDataBodyHeroImage {
            slice_type
            primary {
              title {
                raw
              }
              description {
                raw
              }
              button_style
              button_text
              button_link {
                uid
                type
                lang
                raw
              }
              align_content
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

          ... on PrismicGalleryPageDataBodyGalleryItems {
            id
            items {
              add_item {
                tags
                document {
                  ... on PrismicGalleryItem {
                    tags
                    data {
                      title {
                        text
                      }

                      main_image {
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
                      intro
                    }
                    id
                    uid
                    type
                    lang
                  }
                }
              }
            }
            primary {
              animate_scroll
            }
            slice_type
          }
        }
        #Page data - ends

        #SEO Start
        seobody {
          ... on PrismicGalleryPageDataSeobodyGeneralSeoCard {
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

          ... on PrismicGalleryPageDataSeobodyOpenGraph {
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

          ... on PrismicGalleryPageDataSeobodyTwitterCard {
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
