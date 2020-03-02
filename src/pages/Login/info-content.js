import React from 'react'
import styles from './auth.module.scss'

const InfoContent = ({ bannerheader, bannertext }) => {
  return (
    <div className={styles.infoContent}>
      <h1>
        {bannerheader ? (
          bannerheader
        ) : (
          <>
            Pay or Collect
            <br /> money with ease.
          </>
        )}
      </h1>
      <p>{bannertext}</p>
    </div>
  )
}

export default InfoContent
