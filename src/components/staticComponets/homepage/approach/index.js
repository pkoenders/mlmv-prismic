import React from 'react'
import './index.scss'

const Approch = () => {
  return (
    <section className="sectionApproach section-layout skinny">
      <div className="intro">
        <div>
          <i className="material-icons-round" aria-hidden="true">
            speed
          </i>
          <span>
            <p>Performance</p>
            <p>
              I design and build websites that use; next-generation image formats and optimisation,
              inlining critical styles, lazy-loading, prefetching resources, and more to improve the
              performance and page loading speed of your website.
            </p>
            <p>
              <a href="https://internetretailing.net/mobile-theme/mobile-theme/majority-of-websites-currently-fail-to-meet-googles-core-web-vitals-user-experience-requirements-23050">
                Only 4% of websites
              </a>{' '}
              meet Google's Core Web Vitals. Does your website meet the Core Web Vitals? More
              importantly, has your website provider talked to you about their stratergy on how they
              plan to meet the Core Web Vitals? As of June 2021, Google will start to consider{' '}
              <a href="https://developers.google.com/search/blog/2020/11/timing-for-page-experience">
                “Page Experience”
              </a>{' '}
              as part of search ranking, as measured by a set of metrics called Core Web Vitals.
            </p>
            <p>
              An optimised website that loads quickly helps achieve the Core Web Vitals and also
              contributes to better user experience and positive page rankings.
            </p>
          </span>
        </div>

        <div>
          <i className="material-icons-round" aria-hidden="true">
            api
          </i>
          <span>
            <p>Integrations</p>
            <p>
              Sourcing content, transform data, and more. Almost anything you can imagine — from
              CMSs, spreadsheets, to e-commerce — I can offer a seamless integration of services.
            </p>
          </span>
        </div>

        <div>
          <i className="material-icons-round" aria-hidden="true">
            accessibility
          </i>
          <span>
            <p>Accessibility</p>
            <p>
              I support digital accessibility and it is considered into my design and build from the
              start. It is not a afterthought or something to test for later.{' '}
              <a href="https://www.stats.govt.nz/news/one-in-four-new-zealanders-identified-as-disabled">
                24% of New Zealanders
              </a>{' '}
              identify themselves as having a disability. It does not make sense to ignore these
              users. An accessible website is inclusive. Is your website accessible?
            </p>

            <p>
              The framework I use is recognised by <a href="https://webaim.org/">WebAIM</a> as the
              most accessible web framework with built in best practices like accessible routing,
              progressive page enhancement and a built-in linting tool to find accessibility errors.
              Help make the web work for everyone.
            </p>
          </span>
        </div>

        <div>
          <i className="material-icons-round" aria-hidden="true">
            preview
          </i>
          <span>
            <p>Content &amp; Previews</p>
            <p>
              2021 offers a wide range of content systems.{' '}
              <a href="https://www.datocms.com">DatoCMS</a>,{' '}
              <a href="https://www.sanity.io/">Sanity</a>,{' '}
              <a href="https://wordpress.com">WordPress</a>,{' '}
              <a href="https://www.contentful.com">Contentful</a> and{' '}
              <a href="https://agilitycms.com">Agility</a> are a selection of the products I have
              worked with.
            </p>

            <p>
              I have created a <a href="/templates">demonstration boilerplate</a> of what Prismic
              can achieve with just a single, simple and manageable template. In fact, this website
              is built with <a href="https://prismic.io/">Prismic CMS</a>. Prismic It is cost
              effective and has a great user onboarding and experience for content creators,
              designers and developers. Prismic empowers content creaters to build and publish
              websites without constraints. Create a scheduale for releases, preview and share your
              content changes.
            </p>
            <p>
              Don't let your website design and content be funneled into restrictive and
              uncompromising templates. Build and publish what and when you want to.
            </p>
          </span>
        </div>

        <div>
          <i className="material-icons-round" aria-hidden="true">
            security
          </i>
          <span>
            <p>Security</p>
            <p>
              I use <a href="https://reactjs.org/">React</a> to generate static HTML at build time.
              No server and no reachable database equals no malicious requests, DDOS attacks or
              accidental exposure. Your website attack surface will be low to nonexistent.
            </p>
          </span>
        </div>

        <div>
          <i className="material-icons-round" aria-hidden="true">
            savings
          </i>
          <span>
            <p>Cost</p>
            <p>
              The static websites I build are hosted on a global CDN that don’t require complex
              scaling operations or expensive plans. They scale when needed, but when traffic drops
              so does your usage — and your costs. Host your website for less (cheaper than Wix,
              WordPress and SquareSpace) and uses less energy. If you plan to administer your
              website on your own, and you have low traffic, you could be hosting for free. It's a
              smarter choice for the concious whom are considering responsible hosting with lower
              costs and carbon footprint!
            </p>
          </span>
        </div>

        <div>
          <i className="material-icons-round" aria-hidden="true">
            support
          </i>
          <span>
            <p>Support</p>
            <p>
              In my hands, your next website will be blazing fast, accessible, secure and
              customised. You will get personal support and I will answer your calls because I just
              simply ❤️ what I do.
            </p>
          </span>
        </div>
      </div>
    </section>
  )
}

export default Approch
