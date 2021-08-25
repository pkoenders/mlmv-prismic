import React from 'react'

const SelectList = ({ label }) => {
  return (
    <option value={label} {...label}>
      {label}
    </option>
  )
}

export default SelectList
