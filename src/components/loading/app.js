import React from 'react'
import styles from './loading.module.scss'
import Dashboard from './dashboard'
import { KudiLogo } from 'assets/svg'

const App = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <KudiLogo />
      </div>
      <div className={styles.main}>
        <Dashboard />
      </div>
    </div>
  )
}

export default App
