import React, { Fragment, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import debounce from '../../../node_modules/lodash/debounce'
import { Card, CardBody, Button, Table, CardHeader, Badge } from '@kudi-inc/dip'
import { SideSheet } from 'evergreen-ui'
import { Header, Content } from 'components/Layout'
import styles from '../Agents/agents.module.scss'
import { TableLoading } from 'components/loading'
import { Add, Search, Close, ChevronLeft } from 'assets/svg'
import AuthContext from 'context/AuthContext'
import LoanManagerDetails from './loan-manager-details'
import { getLoanManagers } from 'services/loan-manager'
import { formatLoanManager, LoanManagerTable } from 'utils/function'
const LoanManager = ({ history }) => {
  let [auth] = useContext(AuthContext)
  
  const [viewLoanManager, setViewLoanManager] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [number, setNumber] = useState('')
  const [managerId, setManagerId] = useState('')
  const [page, setPage] = useState(0)
  let formattedData = []
  let totalPage = 0
  let limit = 20
  const { data, refetch, error, isLoading } = useQuery([
    'LoanManagers',
    {
      phoneNumber,
      limit,
      page
    }
  ],
  getLoanManagers)

  if (data?.data?.data) {
    formattedData = formatLoanManager(data.data.data.list, setViewLoanManager, setManagerId)
    totalPage = Math.ceil(data.data.data.total / limit)
  }

  const handleSearch = ({ target: { value } }) => {
    const debounced_doSearch = debounce(() => setPhoneNumber(value), 1000)
    debounced_doSearch()
  }

  return (
    <Fragment>
      <Header>
        <p> Loan Managers </p>
        {auth.type.includes('ADMIN') && !auth.type.includes('SUPER_ADMIN') && 
        <Button
          variant="flat"
          icon={<Add />}
          onClick={() => history.push(`/create-loan-manager`)}
        >
          Add Loan Manager
        </Button>
        }
      </Header>
      <Content>
        <Card>
          <CardHeader className={styles.Header}>
            All Agents
            <div className="header-search">
              <input
                placeholder="Search"
                value={number}
                onChange={e => {
                  setNumber(e.target.value)
                  return handleSearch(e)
                }}
                type="text"
              />
              {number.length > 1 ? (
                <Close
                  className="danger"
                  onClick={() => {
                    setPhoneNumber('')
                    return setNumber('')
                  }}
                />
              ) : (
                <Search />
              )}
            </div>
          </CardHeader>
          {isLoading && <TableLoading />}
          {error && (
            <span>
              Error!
              <button onClick={() => refetch({ disableThrow: true })}>
                Retry
              </button>
            </span>
          )}
          {data?.data && (
            <CardBody>
              <Table
                column={LoanManagerTable}
                data={formattedData}
                placeholder="Loan Managers"
              />
            </CardBody>
          )}
          {data && totalPage > 0 && (
            <div className="pagination">
              {page > 0 && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page - 1)}
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {page + 1} of {totalPage}
              </p>
              {formattedData.length === limit && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page + 1)}
                ></Button>
              )}
            </div>
          )}
        </Card>
        <SideSheet
          onCloseComplete={() => setViewLoanManager(false)}
          isShown={viewLoanManager}
          width={600}
        >
          <LoanManagerDetails
          id={managerId}
          />
        </SideSheet>
      </Content>
    </Fragment>
  )
}

export default LoanManager
