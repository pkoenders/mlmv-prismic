import React, { useEffect, useRef } from 'react'
import { gsap, Bounce } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import './index.scss'

gsap.registerPlugin(ScrollTrigger)

const Intro = () => {
  const iconRefs = useRef([])
  iconRefs.current = []

  const iconRef = (item) => {
    if (item && !iconRefs.current.includes(item)) {
      iconRefs.current.push(item)
    }
  }

  useEffect(() => {
    iconRefs.current.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          scale: 0.66,
          opacity: 0,
        },
        {
          opacity: 1,
          scale: 1,
          ease: Bounce.easeOut,
          duration: 1,
          stagger: 0.75,
          scrollTrigger: {
            trigger: item,
            stagger: 0.75,
            start: 'top bottom-=32px',
            // end: 'bottom bottom+=124px',
            toggleActions: 'play none none reset',
            // markers: true
          },
        }
      )

      return () => {
        iconRefs.current.kill()
      }
    })
  }, [])

  return (
    <section className="sectionIntro section-layout wide">
      <div className="intro">
        <div className="part1">
          <span>
            <i className="material-icons-round" aria-hidden="true" ref={iconRef}>
              follow_the_signs
            </i>
            <p>
              I’m a UI/UX designer &amp; developer originally from a traditional Graphic Design
              background and transitioned into Digital and Web Design.
            </p>
          </span>
        </div>

        <div className="part2">
          <span>
            <i className="material-icons-round" aria-hidden="true" ref={iconRef}>
              accessibility_new
            </i>
            <p>
              I support digital accessibility, am curious and enjoy working with creative and
              integration teams delivering digital solutions.
            </p>
          </span>
        </div>

        <div className="part3">
          <span>
            <i className="material-icons-round" aria-hidden="true" ref={iconRef}>
              favorite_border
            </i>
            {/* <IconDevelopment /> */}
            <p>
              With professionalism, integrity and care. I work in a collaborative manner to plan,
              design and deliver crafted solutions.
            </p>
          </span>
        </div>

        <div className="part4">
          <span>
            <i className="material-icons-round" aria-hidden="true" ref={iconRef}>
              design_services
            </i>
            <ul>
              <li>Implementation of the UI/UX design process</li>
              {/* <li>Estimating &amp; proposal review</li> */}
              <li>Iterative wire-framing &amp; prototypes</li>
              {/* <li>Build &amp; maintain design systems</li> */}
              <li>HTML components, React &amp; Headless CMS's</li>
              {/* <li>Graphic design</li> */}
            </ul>
          </span>
        </div>
      </div>
      <div className="resume">
        <a href="/peter-koenders-resume.pdf" className="buttonTertiary">
          <i className="material-icons-round" aria-hidden="true">
            article
          </i>{' '}
          View my resumé
        </a>
      </div>
    </section>
  )
}

export default Intro
