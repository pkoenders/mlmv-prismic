import React from 'react'

import styled from 'styled-components'

const CLoseWrapper = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Close alert window',
}))`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`
const Close = ({ onClick }) => {
  return (
    <CLoseWrapper onClick={onClick}>
      <i className="material-icons-round" aria-hidden="true">
        close
      </i>
    </CLoseWrapper>
  )
}

export default Close
