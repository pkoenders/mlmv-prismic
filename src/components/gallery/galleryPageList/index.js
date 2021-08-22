import React, { useState } from 'react'
import SearchField from '/src/components/common/forms/formFields/search'
import NoResults from '/src/components/common/noResults/noResultsGallery'
import GalleryPageItem from './item'
import SimpleReactLightbox from 'simple-react-lightbox'
import { SRLWrapper } from 'simple-react-lightbox'

import '/src/components/common/forms/index.scss'
import './index.scss'

const GalleryPageList = ({ galleryItems, animateScroll }) => {
  // Container width
  //var sectionWidth = getContentWidth(slice.primary.width)

  //Get the tag lists
  var gTagItem = []
  galleryItems.map((tags, index) => gTagItem.push(galleryItems[index].add_item.tags))

  // Concat them
  var gTagItemNew = [].concat.apply([], gTagItem)

  //Filter duplicates
  gTagItemNew = uniq(gTagItemNew)
  function uniq(a) {
    var seen = {}
    return a.filter(function (item) {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true)
    })
  }

  //Sort
  gTagItemNew.sort()

  //Filter list items
  const handleFilterItem = (event) => {
    const tagBtn = event.target

    // Select filter btn
    tagBtn.classList.toggle('isActive')

    //Get all cards
    var allCards = document.getElementsByClassName('galleryItem')
    for (var i = 0; i < allCards.length; ++i) {
      // Check tag list for each card
      var allCardTags = document.getElementsByClassName('tagName')
      for (var x = 0; x < allCardTags.length; ++x) {
        var cardTag = allCardTags[x]

        // Select any tags in list and set its parent card to active
        if (cardTag.classList.contains(tagBtn.id)) {
          cardTag.classList.add('isActive')
          //cardTag.closest('.galleryItem').classList.remove('show')
          cardTag.closest('.galleryItem').classList.add('isActive')
        }

        // Unselect any tags in list
        if (cardTag.classList.contains(tagBtn.id) && !tagBtn.classList.contains('isActive')) {
          cardTag.classList.remove('isActive')
          cardTag.closest('.galleryItem').classList.remove('isActive')

          // Check all other tag lists. Get the nodes from each parent.
          //Overwite previous setting if active
          var localCardTags = cardTag.closest('.tagNames').childNodes
          for (var j = 0; j < localCardTags.length; ++j) {
            //Overwite previous setting if active
            if (localCardTags[j].classList.contains('isActive')) {
              cardTag.closest('.galleryItem').classList.add('isActive')
            }
          }
        }
      }

      //If all filter buttons are inActive Reset the cards to visible
      var filterBtns = document.getElementsByClassName('buttonSecondary buttonTag isActive')

      if (filterBtns.length === 0) {
        allCards[i].classList.add('show')
      } else {
        allCards[i].classList.remove('show')
      }
    }
  }

  function resetFilters(evt) {
    resetFilterBtns()
    resetSearchQuery()
    handleSearchChange(evt)
  }

  function resetFilterBtns() {
    var filterBtns = document.getElementsByClassName('buttonSecondary buttonTag')
    for (var x = 0; x < filterBtns.length; ++x) {
      filterBtns[x].classList.remove('isActive')
    }
  }

  function resetSearchQuery() {
    var searchInput = document.querySelector('.search label input')
    searchInput.value = ''
  }

  // Input filter
  const allPosts = galleryItems
  const emptyQuery = ''

  const [state, setState] = useState({
    filteredData: [''],
    query: emptyQuery,
  })

  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    const query = event.target.value

    // resetFilterBtns()
    if (query.length >= 0) {
      resetFilterBtns()
    }

    const posts = galleryItems || []

    const filteredData = posts.filter((post) => {
      const { intro, title } = post.add_item.document.data
      const { tags } = post.add_item.document

      return (
        intro.toLowerCase().includes(query.toLowerCase()) ||
        title.text.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join('').toLowerCase().includes(query.toLowerCase()))
      )
    })

    setState({
      query,
      filteredData,
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const posts = hasSearchResults ? filteredData : allPosts

  //console.log(filteredData)
  //Input filter - End

  // Lightbox settings
  const options = {
    settings: {
      autoplaySpeed: 0,
      boxShadow: 'none',
      disableKeyboardControls: false,
      disablePanzoom: false,
      disableWheelControls: false,
      hideControlsAfter: 3000,
      lightboxTransitionSpeed: 0.3,
      lightboxTransitionTimingFunction: 'linear',
      //
      // Header bground color
      //overlayColor: 'rgba(35, 48, 68, 0.96)',
      //
      // Footer bground color
      overlayColor: 'rgba(3, 18, 35, 0.96)',
      slideAnimationType: 'slide',
      slideSpringValues: [300, 50],
      slideTransitionSpeed: 0.6,
      slideTransitionTimingFunction: 'linear',
      usingPreact: false,
    },
    caption: {
      showCaption: false,
    },
  }
  return (
    <section className="section-layout gallery">
      <div>
        <div className={'filter'}>
          {gTagItemNew.map((index) => (
            <button
              className={'buttonSecondary buttonTag'}
              id={index}
              key={`filter-tags-${index}`}
              onClick={handleFilterItem}
            >
              {index}
            </button>
          ))}
        </div>

        <div className={'search'}>
          <SearchField handleSearchChange={handleSearchChange} />
        </div>

        {filteredData.length === 0 ? <NoResults resetFilters={resetFilters} query={query} /> : ''}
        <SimpleReactLightbox>
          <SRLWrapper options={options}>
            <ul className="masonry-grid">
              {posts.map((node, index) => (
                <GalleryPageItem
                  galleryItem={posts[index]}
                  animateScroll={animateScroll}
                  key={`gallery-items-${index}`}
                />
              ))}
            </ul>
          </SRLWrapper>
        </SimpleReactLightbox>
      </div>
    </section>
  )
}

export default GalleryPageList
