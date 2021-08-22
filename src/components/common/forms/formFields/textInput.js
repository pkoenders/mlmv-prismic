import React from 'react'

const TextInput = ({ label, input, type, required, meta }) => {
  const { name } = input
  // const { delay, active, pristine, dirty, error, touched, children, invalid } = meta
  const { dirty, error, touched, invalid } = meta
  const hasError = invalid && !!touched
  const hasValue = !!dirty && !invalid

  return (
    <label
      htmlFor={name}
      className={hasError ? 'error' : undefined || hasValue ? 'touched' : undefined}
    >
      {label}
      {hasError && <span>{error}</span>}
      <span>
        <input
          type={type}
          id={name}
          required={required}
          placeholder={'Enter your ' + label}
          {...input}
        />
        {hasValue && (
          <i className="material-icons-round" aria-hidden="true">
            check_circle
          </i>
        )}
      </span>
    </label>
  )
}

export default TextInput
