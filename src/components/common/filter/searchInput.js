import React from 'react'

// Helpers
import i18n from '/config/i18n'

import styled from 'styled-components'

const Input = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  width: 100%;

  label {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;

    input {
      padding: ${({ theme }) => theme.padding['1/4']} 0 ${({ theme }) => theme.padding['1/4']}
        ${({ theme }) => theme.padding['2xl']};
      border: 1px solid ${({ theme }) => theme.colors.card[300]};
      border-radius: 999rem;
    }

    i {
      user-select: none;
      position: absolute;
      left: ${({ theme }) => theme.padding['1/2']};
      align-self: center;
    }
    .close {
      left: auto;
      right: ${({ theme }) => theme.padding['1/2']};
      opacity: 0.5;
    }
  }
`

const Reset = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Reset search input',
}))`
  position: absolute;
  align-self: center;
  cursor: pointer;
  user-select: none;
  right: ${({ theme }) => theme.margin['1/2']};
  opacity: 0.5;
`

const Search = ({ currentLang, handleSearchChange, queryLength, resetFilters }) => {
  function resetSearch(e) {
    e.target.parentNode.querySelector('input').focus()
    resetFilters(e)
  }
  return (
    <Input>
      <label className={'search'} htmlFor="search">
        <input
          type="search"
          name="search"
          aria-label="Search"
          placeholder={`${i18n[currentLang].searchPlacholder}`}
          onChange={handleSearchChange}
        />
        <i className="material-icons-round" aria-hidden="true">
          search
        </i>
        {queryLength > 0 && (
          <Reset onClick={resetSearch} className="material-icons-round" aria-hidden="true">
            close
          </Reset>
        )}
      </label>
    </Input>
  )
}
export default Search
