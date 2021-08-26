import React from 'react'

const RadioBtn = ({ label, input, meta, fieldId }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid

  return (
    <label htmlFor={fieldId} className={`${hasValue ? 'touched' : ''}`}>
      {label}
      <input type="radio" id={fieldId} name={name} value={label} />
    </label>
  )
}

export default RadioBtn
