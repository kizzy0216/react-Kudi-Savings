import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './progressBar.module.scss'

const ProgressBar = ({ percentage, className }) => {
    let type =
        percentage < 33
            ? 'danger'
            : percentage > 33 && percentage < 50
            ? 'warning'
            : 'success'
    return (
        <div className={cx(styles.progress, className)}>
            <p className={styles.progressInfo}>{percentage}</p>
            <div className={styles.progressWrapper}>
                <div
                    style={{ width: `${percentage}%` }}
                    className={cx(styles.progressBar, styles[type])}
                ></div>
            </div>
        </div>
    )
}

ProgressBar.propTypes = {
    percentage: PropTypes.number,
    text: PropTypes.string,
    className: PropTypes.string
}

export default ProgressBar
