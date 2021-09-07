import React from 'react'
import { Link } from 'gatsby'
import i18n from '../../../../config/i18n'
import linkResolver from '../../../utils/linkResolver'

// Icons
import IconMaterial from '/src/components/common/icons/material'

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

    button,
    a {
      display: flex;
      align-items: center;
      white-space: pre-line;
      width: fit-content;
      border: none;
      outline: none;
      color: ${({ theme }) => theme.colors.header.default};
      background-color: transparent;
      text-align: left;
      cursor: pointer;
      user-select: none;
      line-height: ${({ theme }) => theme.lineHeight.tight};

      i {
        pointer-events: none;
        font-size: 24px;
      }
    }

    button {
      padding-right: ${({ theme }) => theme.padding.default};
    }

    .alignRight {
      display: flex;
      flex-direction: row;
      grid-gap: ${({ theme }) => theme.padding.default};
      align-items: center;
      margin: 0 0 0 auto;

      button:last-child,
      a:last-child {
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

        <button onClick={() => window.history.back()} aria-label="Back">
          <IconMaterial icon={'arrow_back'} />
          {i18n[currentLang].back}
        </button>

        <span className="alignRight">
          {/* {previous && previous.lang === currentLang && ( */}
          {previous && previous.lang === currentLang && (
            <Link aria-label={previousTitle} to={linkResolver(previous)}>
              <IconMaterial icon={'chevron_left'} />
              {previousTitle}
            </Link>
          )}

          {/* {next && next.lang === currentLang && ( */}
          {next && next.lang === currentLang && (
            <Link aria-label={nextTitle} to={linkResolver(next)}>
              {nextTitle}
              <IconMaterial icon={'chevron_right'} />
            </Link>
          )}
        </span>
      </nav>
    </SecondaryNavWrapper>
  )
}

export default SecondaryNav
