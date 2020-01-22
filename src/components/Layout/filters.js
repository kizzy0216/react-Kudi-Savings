import React from 'react';
import styles from './layout.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Filters = ({ children, className }) => {
  return <div className={cx(styles.filters, className)}> {children} </div>;
};

Filters.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Filters;
