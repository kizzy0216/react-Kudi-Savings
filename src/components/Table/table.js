import React, { Fragment, useState } from 'react'
import { Table } from '@kudi-inc/dip'
import styles from './table.module.scss'
import { EmptyTable } from 'assets/svg'
import { useInfiniteScroll } from 'react-infinite-scroll-hook'
const TableContainer = ({
  data,
  column,
  placeholder,
  className,
  page,
  setPage,
  isLoading,
  limit
}) => {
  const [hasMore, setHasMore] = useState(true)
  const handleLoadMore = () => {
    setPage(page + 1)
    if (data.length < limit) {
      setHasMore(false)
    }
  }
  const infiniteRef = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: handleLoadMore,
    scrollContainer: 'window'
  })

  return (
    <Fragment>
      {data && data.length === 0 && (
        <div className={styles.Table}>
          <div className={styles.TableHeader}>
            {column && column.map(({ render }) => <div>{render} </div>)}
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
