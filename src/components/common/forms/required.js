import React from 'react'

import * as contactStyles from './contactForm.module.scss'

import "./formStyles.scss"

const Required = () => {

    return (
        <span className={'validation'}>Required <br />
        <i className='material-icons-round' aria-hidden="true">error</i>
        </span>
    )
}

export default Required
