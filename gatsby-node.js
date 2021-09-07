const _ = require('lodash')
const locales = require('./config/i18n')
const {
  replaceTrailing,
  localizedSlug,
  replaceBoth,
  wrapper,
} = require('./src/utils/gatsby-node-helpers')

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Only create one 404 page at /404.html
  if (page.path.includes('404' || 'preview')) {
    return
  }

  if (page.path.includes('preview')) {
    return
  }

  // First delete the pages so we can re-create them
  deletePage(page)

  Object.keys(locales).map((lang) => {
    // Remove the trailing slash from the path, e.g. --> /categories
    page.path = replaceTrailing(page.path)

    // Remove the leading AND traling slash from path, e.g. --> categories
    const name = replaceBoth(page.path)

    // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
    const localizedPath = locales[lang].default ? page.path : `${locales[lang].path}${page.path}`

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Remove trailing slash from page.path (e.g. "/mi/")
      path: localizedPath,
      // Pass in the locale as context to every page
      context: {
        locale: lang,
        name,
      },
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await wrapper(
    graphql(`
      {
        indexPage: allPrismicHomepage {
          edges {
            node {
              id
              uid
              lang
              type
            }
          }
        }

        generalPage: allPrismicGeneralPage {
          edges {
            node {
              id
              uid
              lang
              type
            }
          }
        }

        supportersList: allPrismicPeerSupportersList {
          edges {
            node {
              id
              uid
              lang
              type
            }
          }
        }

        supportersPage: allPrismicPeerSupporters(sort: { order: [ASC], fields: [lang] }) {
          edges {
            next {
              uid
              lang
              type
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
              lang
              type
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
              id
              uid
              lang
              type
            }
          }
        }

        eventsList: allPrismicEventsList {
          edges {
            node {
              id
              lang
              type
              uid
            }
          }
        }

        eventsPage: allPrismicEvents(
          sort: { order: [ASC, DESC], fields: [lang, data___start_date_time] }
        ) {
          edges {
            next {
              uid
              lang
              type
              data {
                title {
                  text
                }
              }
            }
            previous {
              uid
              lang
              type
              data {
                title {
                  text
                }
              }
            }
            node {
              id
              uid
              type
              lang
            }
          }
        }

        resourcesList: allPrismicResourcesList {
          edges {
            node {
              id
              lang
              type
              uid
            }
          }
        }

        resourcesPage: allPrismicResources {
          edges {
            next {
              uid
              lang
              type
              data {
                title {
                  text
                }
              }
            }
            previous {
              uid
              lang
              type
              data {
                title {
                  text
                }
              }
            }
            node {
              id
              uid
              type
              lang
            }
          }
        }
      }
    `)
  )

  // General page
  const generalPageTemplate = require.resolve('./src/templates/generalPage.js')
  const generalPageList = result.data.generalPage.edges
  generalPageList.forEach((edge) => {
    // The uid you assigned in Prismic is the slug!
    createPage({
      path: localizedSlug(edge.node),
      component: generalPageTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })

  // Supporters List
  const supportersListTemplate = require.resolve('./src/templates/supportersList.js')
  const supportersList = result.data.supportersList.edges
  supportersList.forEach((edge) => {
    // The uid you assigned in Prismic is the slug!

    const supportersListItem = edge.node.uid
    const { lang } = edge.node

    const localizedPath = locales[lang].default
      ? `/peer-supporters/${_.kebabCase(supportersListItem)}`
      : `/${locales[lang].path}/peer-supporters/${_.kebabCase(supportersListItem)}`
    createPage({
      // path: localizedSlug(edge.node),
      path: localizedPath,
      component: supportersListTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })

  // Supporters page
  const supportersPageTemplate = require.resolve('./src/templates/supportersPage.js')
  const supportersPage = result.data.supportersPage.edges
  supportersPage.forEach((edge) => {
    // The uid you assigned in Prismic is the slug!

    const supportersPageItem = edge.node.uid
    const { lang } = edge.node

    const localizedPath = locales[lang].default
      ? `/peer-supporters/${_.kebabCase(supportersPageItem)}`
      : `/${locales[lang].path}/peer-supporters/${_.kebabCase(supportersPageItem)}`
    createPage({
      path: localizedPath,
      component: supportersPageTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
        locale: edge.node.lang,
        next: edge.next,
        previous: edge.previous,
      },
    })
  })

  // Events List
  const eventsListTemplate = require.resolve('./src/templates/eventsList.js')
  const eventsList = result.data.eventsList.edges
  eventsList.forEach((edge) => {
    createPage({
      path: localizedSlug(edge.node),
      component: eventsListTemplate,
      context: {
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })

  // Events page
  const eventsPageTemplate = require.resolve('./src/templates/eventsPage.js')
  const eventsPage = result.data.eventsPage.edges
  eventsPage.forEach((edge) => {
    const eventsPageItem = edge.node.uid
    const { lang } = edge.node
    const localizedPath = locales[lang].default
      ? `/news-events/${_.kebabCase(eventsPageItem)}`
      : `/${locales[lang].path}/news-events/${_.kebabCase(eventsPageItem)}`
    createPage({
      path: localizedPath,
      component: eventsPageTemplate,
      context: {
        uid: edge.node.uid,
        locale: edge.node.lang,
        next: edge.next,
        previous: edge.previous,
      },
    })
  })

  // Resources List
  const resourcesListTemplate = require.resolve('./src/templates/resourcesList.js')
  const resourcesList = result.data.resourcesList.edges
  resourcesList.forEach((edge) => {
    createPage({
      path: localizedSlug(edge.node),
      component: resourcesListTemplate,
      context: {
        uid: edge.node.uid,
        locale: edge.node.lang,
      },
    })
  })

  // Resources page
  const resourcesPageTemplate = require.resolve('./src/templates/resourcesPage.js')
  const resourcesPage = result.data.resourcesPage.edges
  resourcesPage.forEach((edge) => {
    const resourcesPageItem = edge.node.uid
    const { lang } = edge.node
    const localizedPath = locales[lang].default
      ? `/resources/${_.kebabCase(resourcesPageItem)}`
      : `/${locales[lang].path}/resources/${_.kebabCase(resourcesPageItem)}`
    createPage({
      path: localizedPath,
      component: resourcesPageTemplate,
      context: {
        uid: edge.node.uid,
        locale: edge.node.lang,
        next: edge.next,
        previous: edge.previous,
      },
    })
  })
}
