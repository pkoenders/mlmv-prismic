import React from 'react'

// Helpers
import { Link } from 'gatsby'
import linkResolver from '../../../utils/linkResolver'

import styled from 'styled-components'

const BtnWrapper = styled.span`
  display: flex;
  margin: ${({ theme }) => theme.margin.default} auto 0 auto;

  .btn:focus {
    outline: none;
  }

  .btn {
    display: flex;
    align-self: center;
    align-items: center;

    cursor: pointer;
    user-select: none;
    width: fit-content;
    margin: 0 auto;
    padding: 12px ${({ theme }) => theme.padding.default};
    font-size: $font-size;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none !important;
    font-weight: 500;
    font-family: inherit;
    line-height: inherit;
    letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary.default};
    border: 1px solid ${({ theme }) => theme.colors.primary[1100]};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    box-sizing: border-box;
    box-shadow: ${({ theme }) => theme.boxShadow.md};
    /* transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1); */
    transition: ${({ theme }) => theme.transition.linear.quick};

    i {
      margin-left: ${({ theme }) => theme.padding['1/4']} !important;
    }
  }
  .btn:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
  .btn.primary {
    background-color: ${({ theme }) => theme.colors.primary.default};
    border: 1px solid ${({ theme }) => theme.colors.primary[1100]};
  }
  .btn.secondary {
    background-color: ${({ theme }) => theme.colors.secondary.default};
    border: 1px solid ${({ theme }) => theme.colors.secondary[1200]};
  }
  .btn.tertiary {
    background-color: ${({ theme }) => theme.colors.tertiary.default};
    border: 1px solid ${({ theme }) => theme.colors.tertiary[1200]};
  }
  .btn.white {
    color: ${({ theme }) => theme.colors.grey.default};
    background-color: ${({ theme }) => theme.colors.grey[100]};
    border: 1px solid ${({ theme }) => theme.colors.tertiary[200]};
  }
  .btn.black {
    color: ${({ theme }) => theme.colors.grey[100]};
    background-color: ${({ theme }) => theme.colors.grey.default};
    border: 1px solid ${({ theme }) => theme.colors.tertiary[1200]};
  }

  .btn.link {
    color: ${({ theme }) => theme.colors.grey.default};
    padding: ${({ theme }) => theme.padding['1/8']} ${({ theme }) => theme.padding['1/4']};
    /* margin: 0 ${({ theme }) => theme.padding['1/2']} !important; */
    background-color: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    border-radius: 0;
    box-shadow: none;
  }
  .btn.link:hover {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey.default};
  }

  .dark &,
  .heroImage & {
    .btn.link {
      color: ${({ theme }) => theme.colors.grey[100]} !important;
    }
    .btn.link:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
    }
  }

  .btn.transparent {
    color: ${({ theme }) => theme.colors.grey[100]};
    background-color: transparent;
    /* background-color: #ffffff1a; */
    border: 1px solid ${({ theme }) => theme.colors.grey[100]};
  }

  .light & {
    .btn.transparent {
      color: ${({ theme }) => theme.colors.grey.default};
      background-color: transparent;
      border: 1px solid ${({ theme }) => theme.colors.grey[100]};
    }
  }

  // Teartiary reverse
  .btn.tertiary-rev {
    color: ${({ theme }) => theme.colors.tertiary.default};
    background-color: ${({ theme }) => theme.colors.tertiary[100]};
    border: 1px solid ${({ theme }) => theme.colors.tertiary[700]};
  }

  // Alert btns
  .alertLevel-1 &,
  .alertLevel-2 &,
  .alertLevel-3 &,
  .alertLevel-4 &,
  .alertLevel-5 & {
    .btn {
      padding: ${({ theme }) => theme.padding['1/4']} ${({ theme }) => theme.padding.default};
      margin: 0 auto ${({ theme }) => theme.margin['1/2']} 0;
      color: #fff;
      background-color: ${({ theme }) => theme.colors.alert.l1[1200]};
      border: 1px solid ${({ theme }) => theme.colors.alert.l1[1300]};
    }

    .btn.link {
      color: ${({ theme }) => theme.colors.grey[100]};
      padding: ${({ theme }) => theme.padding['1/8']} ${({ theme }) => theme.padding['1/4']};
      background-color: transparent;
      border: none;
      border-bottom: 1px solid transparent;
      border-radius: 0;
      box-shadow: none;
    }
    .btn.link:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
    }

    .btn.white {
      color: ${({ theme }) => theme.colors.grey.default};
      background-color: ${({ theme }) => theme.colors.grey[100]};
      border: 1px solid ${({ theme }) => theme.colors.tertiary[200]};
    }
    .btn.black {
      color: ${({ theme }) => theme.colors.grey[100]};
      background-color: ${({ theme }) => theme.colors.grey.default};
      border: 1px solid ${({ theme }) => theme.colors.tertiary[1200]};
    }
    .btn.transparent {
      color: ${({ theme }) => theme.colors.grey[100]};
      background-color: transparent;
      /* background-color: #ffffff1a; */
      border: 1px solid ${({ theme }) => theme.colors.grey[100]};
    }
  }
  .alertLevel-2 & {
    .btn {
      background-color: ${({ theme }) => theme.colors.alert.l2[1200]};
      border: 1px solid ${({ theme }) => theme.colors.alert.l2[1300]};
    }
  }
  .alertLevel-3 & {
    .btn {
      color: ${({ theme }) => theme.colors.grey.default};
      background-color: ${({ theme }) => theme.colors.alert.l3[1200]};
      border: 1px solid ${({ theme }) => theme.colors.alert.l3[1300]};
    }
    .btn.link {
      color: ${({ theme }) => theme.colors.grey.default};
    }
    .btn.link:hover {
      border-bottom: 1px solid ${({ theme }) => theme.colors.grey.default};
    }
    .btn.transparent {
      color: ${({ theme }) => theme.colors.grey.default};
      border: 1px solid ${({ theme }) => theme.colors.grey.default};
    }
  }
  .alertLevel-4 & {
    .btn {
      background-color: ${({ theme }) => theme.colors.alert.l4[1200]};
      border: 1px solid ${({ theme }) => theme.colors.alert.l4[1300]};
    }
  }
  .alertLevel-5 & {
    .btn {
      background-color: ${({ theme }) => theme.colors.alert.l5[1200]};
      border: 1px solid ${({ theme }) => theme.colors.alert.l5[1300]};
    }
  }
`
const LinkButton = ({ buttonLabel, buttonType, staticLink, buttonStyle, onClick }) => {
  // console.log(buttonLink)

  return (
    <BtnWrapper>
      {buttonType.link_type === 'Document' && (
        <Link to={linkResolver(buttonType)} className={'btn ' + buttonStyle}>
          {buttonLabel}
          {buttonStyle === 'link' && (
            <i className="material-icons-round" aria-hidden="true">
              arrow_forward
            </i>
          )}
        </Link>
      )}

      {buttonType.link_type === 'Web' && (
        <a
          href={buttonType.url}
          rel={buttonType.target === '_blank' && 'noreferrer'}
          target={buttonType.target === '_blank' && '_blank'}
          className={'btn ' + buttonStyle}
        >
          {buttonLabel}
          {buttonStyle === 'link' && (
            <i className="material-icons-round" aria-hidden="true">
              arrow_forward
            </i>
          )}
        </a>
      )}

      {buttonType.link_type === 'Media' && (
        <a href={buttonType.url} className={'btn ' + buttonStyle}>
          {buttonLabel}
          {buttonStyle === 'link' && (
            <i className="material-icons-round" aria-hidden="true">
              arrow_forward
            </i>
          )}
        </a>
      )}

      {buttonType === 'Static' && (
        <a href={staticLink} className={'btn ' + buttonStyle}>
          {buttonLabel}
          {buttonStyle === 'link' && (
            <i className="material-icons-round" aria-hidden="true">
              arrow_forward
            </i>
          )}
        </a>
      )}

      {buttonType === 'button' && (
        <button onClick={onClick} type={buttonType} className={'btn ' + buttonStyle}>
          {buttonLabel}
          {buttonStyle === 'link' && (
            <i className="material-icons-round" aria-hidden="true">
              arrow_forward
            </i>
          )}
        </button>
      )}
    </BtnWrapper>
  )
}

export default LinkButton
