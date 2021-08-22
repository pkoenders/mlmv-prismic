import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogItem from '../components/blog/blogItem'
import SeoZone from '/src/components/slices/seoZone'
import SecondaryNav from '../components/common/secondaryNav/'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

const BlogTemplate = ({ data, pageContext }) => {
  if (!data) return null

  const { next, previous } = pageContext
  // console.log(pageContext)
  // const document = data.prismicBlog
  const document = data.allPrismicBlog.edges[0].node
  const primaryNav = data.prismicNavigation.data.top_navigation
  const currentLang = data.prismicNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      <SecondaryNav currentLang={currentLang} previous={previous} next={next} />
      <BlogItem itemData={document} />
    </Layout>
  )
}

export default withPrismicPreview(BlogTemplate, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query BlogQuery($uid: String, $locale: String) {
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

    allPrismicBlog(filter: { lang: { eq: $locale }, uid: { eq: $uid } }) {
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

          #_previewable
          data {
            #Page data
            body {
              ... on PrismicBlogDataBodyTextBlog {
                id
                primary {
                  text {
                    raw
                  }
                }
                slice_type
              }

              ... on PrismicBlogDataBodyImageBlog {
                slice_type
                primary {
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

              ... on PrismicBlogDataBodyQuoteBlog {
                id
                primary {
                  quote {
                    raw
                  }
                }
                slice_type
              }

              ... on PrismicBlogDataBodyReferences {
                slice_type
                primary {
                  reference {
                    raw
                  }
                }
              }
            }
            title {
              text
            }
            release_date(formatString: "DD MMMM YYYY")
            #Page data - ends

            #SEO Start
            body1 {
              ... on PrismicBlogDataBody1GeneralSeoCard {
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

              ... on PrismicBlogDataBody1OpenGraph {
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

              ... on PrismicBlogDataBody1TwitterCard {
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
