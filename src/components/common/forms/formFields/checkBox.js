import React from 'react'

const CheckBox = ({ label, input, checkStatus, meta }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  return (
    <label htmlFor={name} className={`${hasValue ? 'touched' : ''}`}>
      {label}
      <input type="checkbox" id={name} name={name} value={name} {...input} />
      {/* {hasValue && (
          <i className={'material-icons-round'} aria-hidden="true">
            check_circle
          </i>
        )} */}
    </label>
  )
}

export default CheckBox
