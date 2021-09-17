import React from 'react'
import HeroImage from './heroImage/'
import Cards from './cards/'
import MediaHighlight from './highlight/'
import Quotes from './quote/'
import Text from './text/'
import StyledList from './styledList'
import Form from '../common/forms/formContact'
import StaticComponent from './staticComponent/'

const SliceZone = ({ currentLang, location, sliceZone }) => {
  const sliceComponents = {
    hero_image: HeroImage,
    cards: Cards,
    media_highlight: MediaHighlight,
    quote: Quotes,
    text: Text,
    styled_list: StyledList,
    form: Form,
    static_component: StaticComponent,
  }

  const sliceZoneContent = sliceZone.map((slice, index) => {
    const SliceComponent = sliceComponents[slice.slice_type]
    if (SliceComponent) {
      return (
        <SliceComponent
          currentLang={currentLang}
          location={location}
          slice={slice}
          key={`slice-${index}`}
        />
      )
    }
    return null
  })

  return <>{sliceZoneContent}</>
}

export default SliceZone
