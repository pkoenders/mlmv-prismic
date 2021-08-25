import React from 'react'

const RadioBtn = ({ label, input, fieldName, meta }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  // const hasValue = !!dirty && !!touched
  // console.log('fieldName = ' + fieldName)

  return (
    <label htmlFor={name} className={`${hasValue ? 'touched' : ''}`}>
      <span>{label}</span>
      <input type="radio" id={name} name={fieldName} value={name} {...input} />
      {/* {hasValue && (
          <i className={'material-icons-round'} aria-hidden="true">
            check_circle
          </i>
        )} */}
    </label>
  )
}

export default RadioBtn
