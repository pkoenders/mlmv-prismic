import React, { useEffect, useState, useCallback } from 'react'

// Icons
import IconMaterial from '/src/components/common/icons/material'

import styled from 'styled-components'

const ListTagBtnsWrapper = styled.div`
  .utils {
    position: absolute;
    align-items: center;
    display: flex;
    flex-direction: row;
    grid-gap: ${({ theme }) => theme.padding['1/8']};
    top: 0;
    right: ${({ theme }) => theme.padding['1/4']};
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 20px;
      aspect-ratio: 1;
      padding: 2px;
      cursor: pointer;
      user-select: none;
      background-color: #fff;
      border: 1px solid transparent;
      border-radius: 999rem;
      &:hover {
        border: 1px solid ${({ theme }) => theme.colors.primary[600]};
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
  }

  span.wrapper {
    height: 26px;
    max-height: 100%;
    transition: all 3.5s ease-in;
    display: flex;
    overflow: hidden;
    min-width: 100%;

    span.inner {
      display: flex;
      flex-wrap: wrap;
      grid-gap: ${({ theme }) => theme.padding['1/4']};
      justify-content: center;
      /* height: min-content; */
      margin: 0 ${({ theme }) => theme.padding.default};
    }
  }

  span.wrapper.showMore {
    height: auto;
    max-height: 100%;
    transition: all 3.5s ease-in;
  }

  .tagButton {
    font-size: 80%;
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
    cursor: pointer;
    padding: ${({ theme }) => theme.padding['1/8']} ${({ theme }) => theme.padding['1/2']};
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.page.default};
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  .tagButton:hover {
    color: ${({ theme }) => theme.colors.page.default};
    background-color: ${({ theme }) => theme.colors.card[400]};
  }

  .tagButton.isActive {
    color: ${({ theme }) => theme.colors.page.default};
    background-color: ${({ theme }) => theme.colors.tertiary[700]};
    border: 1px solid transparent;
  }
`

const ResetTagsBtn = styled.button.attrs((props) => ({
  type: props.type || 'button',
  'aria-label': 'Reset tags',
}))`
  /* border: none !important; */
  /* background-color: transparent !important; */
  position: relative;
  i {
    font-size: 20px;
    pointer-events: none;
    @keyframes rotation {
      from {
        transform: rotate(0deg);
        transform: scale(1.25);
      }
      to {
        transform: rotate(180deg);
        opacity: 0;
      }
    }
  }
  &.rotate {
    animation: rotation 0.25s linear;
  }
`

const ListTagBtns = ({ resetFilterBtns, tagList, resetCards, resetSearchQuery }) => {
  const _ = require('lodash')
  const [tagBtnsReset, setTagBtnsReset] = useState(false) // Toggle tag btns reset
  const [moreBtns, setMoreBtns] = useState(false)

  // Concat the tag lists
  var allTags = [].concat.apply([], tagList)

  // Filter duplicates
  tagList = uniq(allTags)
  function uniq(a) {
    var seen = {}
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
  }

  // Sort tag list (A-Z)
  tagList.sort()

  // Filter list items
  const handleFilterItem = (e) => {
    const tagBtn = e.target

    // Select filter btn
    tagBtn.classList.toggle('isActive')

    //  var activeFilterBtns = document.getElementsByClassName('tagButton isActive')
    var allCards = document.getElementsByClassName('item')

    for (var i = 0; i < allCards.length; ++i) {
      // Check tag list for each card

      var allCardTags = document.getElementsByClassName('tagName')
      for (var x = 0; x < allCardTags.length; ++x) {
        var cardTag = allCardTags[x]

        // Select any tags in list and set its parent card to active
        if (cardTag.classList.contains(tagBtn.id)) {
          cardTag.classList.add('isActive')
          cardTag.closest('.item').classList.add('isActive')
        }

        // Unselect any tags in list
        if (cardTag.classList.contains(tagBtn.id) && !tagBtn.classList.contains('isActive')) {
          cardTag.classList.remove('isActive')
          cardTag.closest('.item').classList.remove('isActive')

          // Check all other tag lists. Get the nodes from each parent.
          // Overwite previous setting if active
          var localCardTags = cardTag.closest('.tagNames').childNodes
          for (var j = 0; j < localCardTags.length; ++j) {
            //Overwite previous setting if active
            localCardTags[j].classList.contains('isActive') &&
              cardTag.closest('.item').classList.add('isActive')
          }
        }
      }
    }

    updateAllCards()
    resetSearchQuery()
  }

  const updateAllCards = useCallback(() => {
    var allCards = document.getElementsByClassName('item')
    var activeFilterBtns = document.getElementsByClassName('tagButton isActive')

    // If all filter buttons are inActive Reset the cards to visible
    for (var i = 0; i < allCards.length; ++i) {
      if (activeFilterBtns.length === 0) {
        allCards[i].classList.add('show')
        allCards[i].classList.remove('isActive')
      } else {
        allCards[i].classList.remove('show')
      }
    }

    // Check if filter btns are active and display the reset btn
    activeFilterBtns.length === 0 ? setTagBtnsReset(false) : setTagBtnsReset(true)
    // console.log(tagBtnsReset)
  }, [])

  // Hide the reset btn
  const hideTagReset = useCallback(
    (e) => {
      updateAllCards()
      resetFilterBtns()

      e.target.classList.add('rotate')
      var delay = 245 // CSS rottate set to .250 - Shave a few millesonds off to protect any visual bumps?
      setTimeout(function () {
        e.target.classList.remove('rotate')
        setTagBtnsReset(false)
      }, delay)
    },
    [resetFilterBtns, updateAllCards]
  )

  // Toggle full view of btn list on browser size
  useEffect(() => {
    checkBtnsListHeight()
    'resize, keydown, orientationchange'.split(', ').forEach(function (e) {
      window.addEventListener(e, () => {
        checkBtnsListHeight()
      })
    })

    function checkBtnsListHeight() {
      if (!document.querySelector('.tagButton')) {
        return
      }
      const tagBtnHeight = document.querySelector('.tagButton').offsetHeight
      var innerHeight = document.querySelector('.inner').offsetHeight
      innerHeight > tagBtnHeight && setMoreBtns(true)
      if (innerHeight === tagBtnHeight) {
        setMoreBtns(false)
        document.querySelector('.wrapper').classList.remove('showMore')
      }
    }
  }, [])

  // Toggle full view of btn list
  function toggleMoreTagBtns(e) {
    document.querySelector('.wrapper').classList.toggle('showMore')
    e.target.innerHTML === 'unfold_more'
      ? (e.target.innerHTML = 'unfold_less')
      : (e.target.innerHTML = 'unfold_more')
  }

  return (
    <ListTagBtnsWrapper>
      <div className="utils">
        {tagBtnsReset === true && (
          <ResetTagsBtn onClick={hideTagReset}>
            <IconMaterial icon={'loop'} ariaLabel={'Reset tags'} />
          </ResetTagsBtn>
        )}

        {moreBtns === true && (
          <IconMaterial
            icon={'unfold_more'}
            type={'button'}
            onClick={toggleMoreTagBtns}
            ariaLabel={'Toggle for more tags'}
          />
        )}
      </div>

      <span className="wrapper">
        <span className="inner">
          {tagList.map((node, index) => (
            <button
              className="tagButton"
              id={_.camelCase(node)}
              key={`tagButton-` + index}
              onMouseDown={resetCards}
              onClick={handleFilterItem}
            >
              {node}
            </button>
          ))}
        </span>
      </span>
    </ListTagBtnsWrapper>
  )
}

export default ListTagBtns
