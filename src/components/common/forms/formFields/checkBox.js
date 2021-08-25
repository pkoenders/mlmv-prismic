import React from 'react'

const CheckBox = ({ label, input, meta }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  return (
    <label htmlFor={name} className={`${hasValue ? 'touched' : ''}`}>
      <span>{label}</span>
      <input type="checkbox" id={name} name={name} value={name} {...name} />
    </label>
  )
}

export default CheckBox
