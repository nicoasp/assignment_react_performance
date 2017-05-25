import React from 'react'

const Select = (props) => {
  const {options, ...restOfProps} = props
  const optionElements = options.map((option) => (
      <option key={option} value={option} >
        {option}
      </option>
    )
  )

  return (
    <select {...restOfProps} >
      {optionElements}
    </select>
  )
}

export default Select