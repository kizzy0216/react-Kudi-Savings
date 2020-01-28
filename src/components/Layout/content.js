import React from 'react'
import styles from './layout.module.scss'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Content = ({ children, className }) => {
    return <div className={cx(styles.content, className)}> {children} </div>
}

Content.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export default Content
