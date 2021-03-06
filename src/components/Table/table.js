import React, { Fragment } from 'react'
import { Table } from '@kudi-inc/dip'
import styles from './table.module.scss'
import { EmptyTable } from 'assets/svg'

const TableContainer = ({ data, column, placeholder, className }) => {
  return (
    <Fragment>
      {data && data.length === 0 && (
        <div className={styles.Table}>
          <div className={styles.TableHeader}>
            {column &&
              column.map(({ render }, index) => (
                <div key={index}>{render} </div>
              ))}
          </div>
          <div className={styles.TableBody}>
            <div>
              <EmptyTable />
              <p>
                {placeholder
                  ? `No ${placeholder} info available`
                  : `No details available`}
              </p>
            </div>
          </div>
        </div>
      )}
      {data && data.length > 0 && (
        <Table className={className} column={column} data={data} />
      )}
    </Fragment>
  )
}

export default TableContainer
