import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  margin: ${({ theme }) => theme.margin['1/2']} auto;
  background-color: transparent;
  padding: 0;
  border: none;
  color: ${({ theme }) => theme.colors.footer.bground.default};
  display: flex;

  i {
    margin-top: ${({ theme }) => theme.margin['1/4']};
    border-radius: 999rem;
    background-color: ${({ theme }) => theme.colors.footer.default};
    padding: 4px;
    font-size: 28px;
    transition: all, 0.15s ease-out;
  }

  &:hover {
    i {
      margin-top: 0;
      padding-bottom: 12px;
    }
  }
`
const ScrollToTop = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  // if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', checkScrollTop)
  // }

  return (
    <Button onClick={scrollTop} aria-label="Go to the top of the page">
      <i className={' material-icons-round'} aria-hidden="true">
        arrow_upward
      </i>
    </Button>
  )
}

export default ScrollToTop
