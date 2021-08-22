import React from 'react'

const TextAreaInput = ({ label, input, type, meta }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  // const hasValue = !!dirty && !!touched

  return (
    <label htmlFor={name} className={hasValue ? 'touched' : undefined}>
      {label}
      <span className={'textArea'}>
        <textarea id={name} type={type} rows="5" placeholder={'Enter your ' + label} {...input} />
        {hasValue && (
          <i className={'material-icons-round'} aria-hidden="true">
            check_circle
          </i>
        )}
      </span>
    </label>
  )
}

export default TextAreaInput
