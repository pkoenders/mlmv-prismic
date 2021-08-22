import React from 'react'
import IconSubmitError from '/src/images/svg/icon-contact-error.inline.svg'

const SubmitError = ({ resetForm }) => {
  return (
    <div className={'formError'}>
      <h4>Sorry, there has been an error</h4>
      <IconSubmitError aria-hidden="true" />
      <p>Could you please try and complete the form again.</p>
      <button onClick={resetForm} className={'buttonPrimary'}>
        <i className={'material-icons-round'} aria-hidden="true">
          refresh
        </i>
        Reload the form
      </button>
    </div>
  )
}
export default SubmitError
