import React from 'react'
// import { Link } from 'gatsby'
import IconSubmitSuccess from '/src/images/svg/icon-contact-success.inline.svg'

const SubmitSuccess = ({ resetForm }) => {
  return (
    <div className={'formSuccess'}>
      <h4>Thank you</h4>
      <IconSubmitSuccess aria-hidden="true" />
      <p>We have recieved your enquiry and will get back to you soon.</p>
      <button onClick={resetForm} className={'buttonPrimary'}>
        <i className={'material-icons-round'} aria-hidden="true">
          refresh
        </i>
        Reload the form
      </button>
    </div>
  )
}
export default SubmitSuccess
