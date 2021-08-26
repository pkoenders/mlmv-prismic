import React from 'react'

const RadioBtn = ({ label, input, radioId, meta }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid

  return (
    <label htmlFor={radioId} className={`${hasValue ? 'touched' : ''}`}>
      {label}
      <input type="radio" id={radioId} name={name} value={radioId} />
    </label>
  )
}

export default RadioBtn
