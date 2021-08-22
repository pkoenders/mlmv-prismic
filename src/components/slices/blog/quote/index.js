import React from 'react'
import { RichText } from 'prismic-reactjs'
import './index.scss'

const Quote = ({ slice }) => <blockquote>{RichText.asText(slice.primary.quote.raw)}</blockquote>

export default Quote
