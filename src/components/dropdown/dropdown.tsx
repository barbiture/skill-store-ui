import React, { FC, useState, ReactElement, MouseEvent, useEffect, useRef } from 'react'
import './dropdown.css'
interface Period {
  id: number
  title: string
  selected: boolean
}
export interface DropdownProps {
  labelName: string
  period: {
    id: number
    title: string
    selected: boolean
  }[]
}
export const Dropdown: FC<DropdownProps> = ({ labelName, period }): ReactElement => {
  const [periodFetch, setFetch] = useState<Array<Period>>([])
  const [periodItem, setItem] = useState<null | Period>(null)
  const [periodList, setList] = useState<Array<Period>>([])
  const [open, setOpen] = useState<boolean>(false)
  const updateDropdown = (): void => {
    const list = periodFetch.filter((item): undefined | Period => {
      if (item.selected) {
        setItem(item)
        return
      }
      return item
    })
    setList(list)
  }
  const ulRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (): void => {
    const target = event ? event.target : false
    if (null !== ulRef.current && target) {
      if (ulRef.current.contains(target as HTMLDivElement)) {
        return
      }
      // click outside
      setOpen(false)
    }
  }
  const handleSelect = ({ target }: MouseEvent<HTMLDivElement>): void => {
    const { id } = target as HTMLInputElement
    setOpen(!open)
    setFetch(
      periodFetch.map((item) => {
        if (item.id.toString() === id) return { ...item, selected: true }
        return { ...item, selected: false }
      })
    )
    updateDropdown()
  }
  useEffect((): void => {
    // FETCH
    setFetch(period)
  }, [period])
  useEffect((): void => {
    updateDropdown()
  }, [periodFetch])
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside, true)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const list = periodList.map((period) => (
    <div className="di" key={period.id} onClick={handleSelect} id={period.id.toString()}>
      {period.title}
    </div>
  ))

  return (
    <>
      <div className={`dd ${open ? 'dd-open' : 'dd-close'}`} ref={ulRef}>
        <div className="select-label">{labelName}</div>
        {periodItem && (
          <div className="di ds" onClick={handleSelect} id={periodItem.id.toString()}>
            {periodItem.title}
            <div className="dd-arrow"></div>
          </div>
        )}
        {open && <div className="dl">{list}</div>}
      </div>
    </>
  )
}
Dropdown.defaultProps = {
  labelName: 'Срок',
  period: [
    {
      id: 0,
      title: '3 месяца',
      selected: true,
    },
    {
      id: 1,
      title: '6 месяцев',
      selected: false,
    },
    {
      id: 2,
      title: '12 месяцев',
      selected: false,
    },
  ],
}
export default Dropdown
