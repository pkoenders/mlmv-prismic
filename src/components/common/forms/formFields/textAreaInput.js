import React from 'react'

const TextAreaInput = ({ label, input, type, meta, required }) => {
  const { name } = input
  const { dirty, error, touched, invalid } = meta
  const hasError = invalid && !!touched
  const hasValue = !!dirty && !invalid

  return (
    <label
      htmlFor={name}
      className={hasError ? 'error' : undefined || hasValue ? 'touched' : undefined}
    >
      {label}
      {required && !hasValue && <span className="required">Required</span>}
      {hasError && <span className="error">{error}</span>}
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
