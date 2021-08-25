import React from 'react'

const RadioBtn = ({ label, input, radioId, meta }) => {
  const { name } = input

  // var radioId = label.replace(/\s/g, '').toLowerCase()
  const { dirty, invalid } = meta
  const hasValue = !!dirty && !invalid
  // const hasValue = !!dirty && !!touched
  // console.log('fieldName = ' + fieldName)

  return (
    <label htmlFor={radioId} className={`${hasValue ? 'touched' : ''}`}>
      <span>{label}</span>
      <input type="radio" id={radioId} name={name} value={radioId} {...radioId} />
    </label>
  )
}

export default RadioBtn
