import React, { Component } from 'react'
import styles from './ExportData.module.scss'
import { DownloadIcon } from 'assets/svg'

class CustomersDataExport extends Component {
  render() {
    return (
      <div className={styles.exportDataWrapper}>
        <button type="button">
          <div className={styles.exportData}>
            <div>
              <DownloadIcon />
              Export Data
            </div>
          </div>
        </button>
      </div>
    )
  }
}

export default CustomersDataExport
