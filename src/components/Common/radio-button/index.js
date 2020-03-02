import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './radioButton.module.scss'
import { Checked } from 'assets/svg'

const RadioButton = ({ label, className, ...rest }) => {
  const randomId = `${Math.floor(Math.random() * 100000)}radioBtn`
  return (
    <div className={cx(styles.radioButton, className)}>
      <input id={randomId} type="radio" {...rest} />
      <div className={styles.radioButtonCheckIndicator}>
        <Checked />
      </div>
      <label htmlFor={randomId}>{label}</label>
    </div>
  )
}

RadioButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string
}

export default RadioButton
