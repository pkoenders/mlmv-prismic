import React from 'react'
import { Link } from 'gatsby'
import i18n from '../../../../config/i18n'
import linkResolver from '../../../utils/linkResolver'
import styled from 'styled-components'

const SecondaryNavWrapper = styled.section`
  z-index: 10000;
  position: fixed;
  top: ${({ theme }) => theme.header.height};
  left: 0px;
  right: 0px;
  padding: 0;
  color: ${({ theme }) => theme.colors.header.default};
  background-color: ${({ theme }) => theme.colors.header.bground.default};
  border-bottom: ${({ theme }) => theme.colors.header.bground[200]};
  box-shadow: ${({ theme }) => theme.boxShadow.default};
  will-change: transform;
  transition: ${({ theme }) => theme.transition.easeOut.lazy};

  nav {
    height: 60px;
    align-items: center;
    max-width: ${({ theme }) => theme.screens.lg};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${({ theme }) => theme.padding['1/2']};
    align-items: center;
    flex-basis: 100%;

    @include respond-below(md) {
      width: 100%;
      position: relative;
      top: 0px;
    }

    @include respond-below(md) {
      flex-basis: 100%;
    }

    button,
    a {
      display: flex;
      align-items: center;
      margin: 0 ${({ theme }) => theme.margin['1/8']} 0 0;
      padding: 0;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.colors.header.default};
      background-color: transparent;
      text-align: left;
      cursor: pointer;
      user-select: none;

      i {
        pointer-events: none;
        font-size: 24px;
      }
    }

    .alignRight {
      display: flex;
      align-items: center;
      margin: 0 0 0 auto;

      button:last-child,
      a:last-child {
        margin: 0 0 0 ${({ theme }) => theme.margin['1/2']} !important;
        text-align: right;
      }
    }

    button:hover,
    a:hover {
      outline: none;
      color: ${({ theme }) => theme.colors.primary[300]};
      text-decoration: none;
      i {
        color: inherit;
      }
    }
  }

  &.slide {
    will-change: transform;
    top: 0px;
  }
`

const SecondaryNav = ({ currentLang, next, nextTitle, previous, previousTitle }) => {
  // console.log(next)
  // console.log(previous)
  // console.log(currentLang)
  // console.log(next.uid)
  // console.log(previous.uid)

  return (
    <SecondaryNavWrapper className="secondaryNav">
      <nav aria-label="Navigate to previous page or next page" role="navigation">
        {/* <Link aria-label="Back" to="../"> */}
        <a href="#" onClick={() => window.history.back()} aria-label="Back">
          <i className={'material-icons-round'} aria-hidden="true">
            arrow_back
          </i>
          {i18n[currentLang].back}
        </a>

        <span className="alignRight">
          {previous && previous.lang === currentLang && (
            <Link aria-label={previousTitle} to={linkResolver(previous)}>
              <i className="material-icons-round left" aria-hidden="true">
                chevron_left
              </i>
              {/* {i18n[currentLang].previousTitle} */}
              {previousTitle}
            </Link>
          )}

          {next && next.lang === currentLang && (
            <Link aria-label={nextTitle} to={linkResolver(next)}>
              {nextTitle}
              <i className="material-icons-round" aria-hidden="true">
                chevron_right
              </i>
            </Link>
          )}
        </span>
      </nav>
    </SecondaryNavWrapper>
  )
}

export default SecondaryNav
