import React from 'react'

const CheckBox = ({ label, input, meta }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  return (
    <label htmlFor={name} className={`${hasValue ? 'touched' : ''}`}>
      {label}
      <input type="checkbox" id={name} name={name} value={name} />
    </label>
  )
}

export default CheckBox
