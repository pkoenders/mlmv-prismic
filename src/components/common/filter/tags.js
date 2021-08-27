import React from 'react'
import styled from 'styled-components'

const Tags = styled.div`
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center;
    grid-gap: ${({ theme }) => theme.margin['1/4']};
    align-self: flex-start;
    margin: 0;
    li {
      margin: 0px;
      letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
      width: fit-content;
      padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
      background-color: ${({ theme }) => theme.colors.card[300]};
      white-space: nowrap;
      font-size: 90%;
      // text-transform: uppercase;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
    }
    li.isActive {
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.primary.default};
    }
  }
`

const SupporterTags = ({ tagData }) => {
  const _ = require('lodash')
  return (
    <Tags className="tags">
      <ul className="tagNames">
        {tagData.map((node, index) => (
          <li className={'tagName ' + _.camelCase(node)} key={`supporter-tags` + index}>
            {node}
          </li>
        ))}
      </ul>
    </Tags>
  )
}

export default SupporterTags
