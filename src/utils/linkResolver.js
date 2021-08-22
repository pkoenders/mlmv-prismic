const i18n = require('../../config/i18n')

// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

const linkResolver = (doc) => {
  // console.log('doc.type = ' + doc.type)
  // console.log('doc.lang = ' + doc.lang)

  const prefix = i18n[doc.lang].default ? `/` : `/${i18n[doc.lang].path}/`

  // URL for a peer_supporters_list type
  if (doc.type === 'peer_supporters_list') {
    return `${prefix}peer-supporters/our-peer-supporters`
  }
  // URL for a peer_supporters type
  if (doc.type === 'peer_supporters') {
    return `${prefix}peer-supporters/${doc.uid}`
  }

  // URL for a events_list type
  if (doc.type === 'events_list') {
    return `${prefix}news-events`
  }
  // URL for a events type
  if (doc.type === 'events') {
    return `${prefix}news-events/${doc.uid}`
  }

  // URL for a resources_list type
  if (doc.type === 'resources_list') {
    return `${prefix}resources`
  }

  // URL for a homepage type
  if (doc.type === 'homepage') {
    return `${prefix}`
  }

  // URL for a page type
  if (doc.type === 'general_page') {
    return `${prefix}${doc.uid}`
  }

  // Backup for all other types
  return `${prefix}`
}
module.exports = linkResolver
