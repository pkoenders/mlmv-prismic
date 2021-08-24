import React from 'react'

import styled from 'styled-components'

const AscDescBtnWrapper = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Sort by ascending or descending',
}))`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: ${({ theme }) => theme.padding['1/4']};
  user-select: none;
  background-color: ${({ theme }) => theme.colors.page.bground.default};
  border: 1px solid ${({ theme }) => theme.colors.card[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  i {
    pointer-events: none;
  }
  &.desc {
    i {
      transform: rotate(180deg);
    }
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.default};
    border-color: ${({ theme }) => theme.colors.primary.default};
  }
`
const AscDesc = ({ onClick }) => {
  return (
    <AscDescBtnWrapper onClick={onClick} className="order">
      <i className="material-icons-round" aria-hidden="true">
        filter_list
      </i>
    </AscDescBtnWrapper>
  )
}

export default AscDesc
