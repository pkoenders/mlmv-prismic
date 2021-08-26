import React from 'react'

const CheckBox = ({ label, input, meta, fieldId }) => {
  const { name } = input
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  return (
    <label className={`${hasValue ? 'touched' : ''}`}>
      {label}
      <input type="checkbox" id={fieldId} name={label} value="True" />
    </label>
  )
}

export default CheckBox
