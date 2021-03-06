import React, { FC, useState, ReactElement, ChangeEvent } from 'react'
import './input-range.css'
export interface InputRangeProps {
  step: string
  min: string
  max: string
  value: string
  originCurrency: string
  labelName: string
}
export const InputRange: FC<InputRangeProps> = ({
  step,
  min,
  max,
  originCurrency,
  labelName,
}): ReactElement => {
  const [value, setValue] = useState(min)

  const handleSlider = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setValue(target.value)
  }
  return (
    <>
      <div className="select-label">{labelName}</div>
      <p>
        {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} {originCurrency}
      </p>
      <input type="range" value={value} onChange={handleSlider} step={step} max={max} min={min} />
    </>
  )
}
InputRange.defaultProps = {
  step: '1000',
  min: '10000',
  max: '10000000',
  originCurrency: '₽',
  labelName: 'Инвестирование',
}
export default InputRange
