import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SeoZone from '/src/components/slices/seoZone'
// import SliceZone from '/src/components/slices/sliceZone'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import BlogList from '/src/components/blog/blogList/'

const BlogListTemplate = ({ data }) => {
  if (!data) return null

  const document = data.prismicBlogList
  const blogItems = document.data.body[0].items
  const primaryNav = data.prismicNavigation.data.top_navigation
  const currentLang = data.prismicNavigation.lang

  return (
    <Layout currentLang={currentLang} primaryNav={primaryNav}>
      <SeoZone currentLang={currentLang} seoZone={document.data.body1} />
      {/* <SliceZone sliceZone={document.data.body} /> */}
      <BlogList blogItems={blogItems} />
    </Layout>
  )
}

export default withPrismicPreview(BlogListTemplate, [
  {
    repositoryName: `${process.env.GATSBY_PRISMIC_REPO_NAME}`,
  },
])

export const query = graphql`
  query BlogListPage($uid: String, $locale: String) {
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

    prismicBlogList(lang: { eq: $locale }, uid: { eq: $uid }) {
      type
      lang
      data {
        body {
          ... on PrismicBlogListDataBodyBlogItems {
            slice_type
            items {
              add_blog_item {
                uid
                document {
                  ... on PrismicBlog {
                    id
                    type
                    lang
                    id
                    data {
                      release_date(formatString: "DD MMMM YYYY")
                      intro {
                        text
                      }
                      title {
                        text
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
          ... on PrismicBlogListDataBody1GeneralSeoCard {
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

          ... on PrismicBlogListDataBody1OpenGraph {
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

          ... on PrismicBlogListDataBody1TwitterCard {
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
