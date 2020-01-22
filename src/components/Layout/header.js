import React from 'react';
import styles from './layout.module.scss';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ChevronLeft } from 'assets/svg';

const Header = ({ children, className, subPage, history }) => {
  return (
    <div
      className={cx(styles.header, className, {
        [`${styles.headerSub}`]: subPage
      })}
    >
      {subPage && (
        <div className={styles.backBtn}>
          <ChevronLeft
            onClick={() => {
              if (history) return history.goBack();
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

Header.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  subPage: PropTypes.bool,
  history: PropTypes.object
};

export default Header;
