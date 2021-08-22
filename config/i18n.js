// const website = require('./website')

module.exports = {
  defaultPrefix: 'en',
  // All default paths  - Primary path (en) = '/' - include a trailing slash option for dev envrionemt.
  allPrefix: ['mi/', 'en/'],

  'en-nz': {
    default: true,
    path: 'en',
    locale: 'en-nz',
    siteLanguage: 'en',
    // ogLang: 'de_DE',
    // defaultTitle: website.title,
    // defaultTitleAlt: website.titleAlt,
    // defaultDescription:
    //   'Basierend auf gatsby-starter-prismic mit Unterstützung für Lokalisierung (i18n)',
    // headline: 'Schreiben und Veröffentlichen für LekoArts',
    linkToHomepage: 'Go to the homepage',
    menu: 'Menu',
    close: 'Close',
    back: 'Back',
    previous: 'Previous',
    next: 'Next',
    covers: 'Covers',
    contact: 'Contact',
    attendingEvent: 'Planning on attending this event? Let us know.',
  },
  'mi-nz': {
    path: 'mi',
    locale: 'mi-nz',
    siteLanguage: 'mi',
    // ogLang: 'en_US',
    // defaultTitle: website.title,
    // defaultTitleAlt: website.titleAlt,
    // defaultDescription: website.description,
    // headline: website.headline,
    linkToHomepage: 'Haere ki te whaarangi',
    menu: 'Tahua',
    close: 'Katia',
    back: 'Hoki',
    previous: 'Tuhinga o mua',
    next: 'Panuku',
    covers: 'Nga uhi',
    contact: 'Whakapaa',
    attendingEvent: 'Te whakamahere mo te haere ki tenei huihuinga? Kia mohio taatau.',
  },
}
