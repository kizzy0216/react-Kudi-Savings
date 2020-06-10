import React, { useState, useRef, useCallback, useEffect } from 'react'
import styles from './select.module.scss'
import { ChevronDown } from '../../assets/svg'

const Select = ({ options, onSelect, active }) => {
  const [isSelect, setIsSelect] = useState(false)
  let activeOption = {}
  if (options) {
    activeOption = options.find(item => item.value === active)
  }

  const node = useRef(null)

  const handleHide = useCallback(
    event => {
      if (event.key === 'Escape') {
        setIsSelect(false)
        return
      }
    },
    [setIsSelect]
  )
  const handleClick = useCallback(
    event => {
      if (node.current && !node.current.contains(event.target)) {
        setIsSelect(false)
        return
      }
    },
    [setIsSelect]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleHide, true)
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('keydown', handleHide, true)
      document.removeEventListener('click', handleClick, true)
    }
  }, [handleClick, handleHide])

  return (
    <div className={styles.Select} ref={node}>
      <div
        tabIndex="0"
        role="button"
        onKeyDown={() => setIsSelect(true)}
        onClick={() => setIsSelect(true)}
        className={styles.SelectActive}
      >
        {activeOption.text} <ChevronDown />
      </div>
      {isSelect && (
        <div className={styles.SelectOptions}>
          {options.map(
            ({ text, value }) =>
              value !== active && (
                <div
                  tabIndex="0"
                  role="button"
                  className={styles.option}
                  key={value}
                  onKeyDown={() => {
                    onSelect(value)

                    return setIsSelect(false)
                  }}
                  onClick={() => {
                    onSelect(value)

                    return setIsSelect(false)
                  }}
                >
                  {text}
                </div>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default Select
