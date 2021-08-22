import React, { useEffect, useRef } from 'react'
import IconWave from "../../images/svg/icon-wave.inline.svg"
import FormContact from "./formContact"

import { gsap, Elastic } from "gsap"
import { ScrollTrigger } from 'gsap/all'

import * as contactStyles from './contactForm.module.scss'

gsap.registerPlugin(ScrollTrigger)

const ContactForm = ({ data, location }) => {

    const waveRef = useRef(null)
    const wavetTl = useRef(null)

    const phoneRef = useRef(null)
    const phoneTween = useRef(null)

    useEffect(() => {
        //waveHandAnin
        //const waveAnim = document.querySelector('.wave')
        wavetTl.current = gsap.timeline({
            scrollTrigger: {
                trigger: waveRef.current,
                start: 'top bottom-=192px',
                end: 'top top',
                toggleActions: 'play none none reverse',
                //markers: true,
            }
        });

        wavetTl.current.fromTo(waveRef.current,
            {
                rotation: -20,
                scale: .9,
            },
            {
                rotation: 0,
                scale: 1,
                filter: 'drop-shadow(rgba(0,0,0,.15) 0px 0px 4px)',
                ease: Elastic.easeOut,
                duration: 3,
            }
        )

        // wigglePhoneAnim
        phoneTween.current = gsap.to(phoneRef.current, {
            paused: true,
            repeat: 7,
            yoyo: true,
            duration: 0.1,
            ease: Elastic.inOut,
            rotation: 10,
            //x: 3,
        })

        return () => {
            wavetTl.current.kill()
            phoneTween.current.kill()
        };

    }, []);

    const hoverPhone = () => {
        phoneTween.current.restart();
    }

    return (
        <section className={contactStyles.contactFormSection + ' section-layout-wide'}>
            <h2>Contact me</h2>
            <div className={contactStyles.contactFormWrapper}>
                <div className={contactStyles.contactForm}>
                    <span className={"contactForm"}>
                        <span ref={waveRef} style={{ display: 'block', width: 'fit-content', margin: 'auto' }}>
                            <IconWave className={'wave'} />
                        </span>
                        <p>I would love to be contacted to discuss work commissions or just hear your thoughts and ideas.</p>
                        <p>You can text or call me
                            <a
                                href="tel:+64 21 155 1085"
                                onMouseEnter={hoverPhone}
                            >
                                <i className={"material-icons-round"} aria-hidden="true" ref={phoneRef}>call</i>+64 21 155 1085
                            </a>. Alternatively, complete the following form for email enquires. Thanks.</p>

                    </span>
                    <FormContact data={data} location={location} />
                </div>
            </div>
        </section>
    )
}

export default ContactForm
