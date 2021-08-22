import React from 'react'

import styled from 'styled-components'

const SortListWrapper = styled.div`
  button {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    width: 100%;
    font-size: 100%;
    user-select: none;
  }
`
const SortSelect = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Sort results',
}))`
  & span,
  i {
    pointer-events: none;
  }

  i {
    margin: 0 -${({ theme }) => theme.padding['1/4']} 0 auto;
  }

  &.isActive {
    i {
      transform: rotate(180deg);
    }
  }
`
const SortItem = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Select item',
}))``

const SortList = ({ items, toggleSortListClick, sortItemClick }) => {
  return (
    <SortListWrapper>
      <SortSelect onClick={toggleSortListClick}>
        <span>{items[0].title}</span>
        <i className="material-icons-round" aria-hidden="true">
          expand_more
        </i>
      </SortSelect>

      <div>
        {items.map((node, i) => (
          <SortItem
            type="button"
            onClick={sortItemClick}
            data-nodepath={items[i].nodePath}
            key={'list-item'[i]}
          >
            {items[i].title}
          </SortItem>
        ))}
      </div>
    </SortListWrapper>
  )
}

export default SortList
