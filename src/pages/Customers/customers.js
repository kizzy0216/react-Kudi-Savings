import React, { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import debounce from '../../../node_modules/lodash/debounce'
import { Card, CardBody, Button, CardHeader } from '@kudi-inc/dip'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import Table from 'components/Table'
import { AddFilter } from 'components/Filter'
import styles from './customers.module.scss'
import { getCustomers } from 'services/customers'
import { Close, ChevronLeft, Search } from 'assets/svg'
import { formatCustomerData, CustomerTableColumn } from 'utils/function'
import { TableLoading } from 'components/loading'
import CustomersFields from 'components/CustomFields/CustomersFields'
import CustomersDataExport from 'components/ExportData/CustomersDataExport'
import { connect } from "react-redux";

const Customers = ({ history, prop_marketId, prop_status }) => {
  const [filters, setFilters] = useState([
    {
      title: 'Full Name',
      selected: true,
      name: 'fullName'
    },
    {
      title: 'Date of Birth',
      selected: false,
      name: 'dob'
    },
    {
      title: 'Phone Number',
      selected: true,
      name: 'phoneNumber'
    },
    {
      title: 'Amount Saved',
      selected: false,
      name: 'totalSaved'
    },
    {
      title: "Amount Withdrawn",
      selected: false,
      name: 'totalWithdrawn'
    },
    {
      title: 'Business Type',
      selected: false,
      name: 'businessType'
    },
    {
      title: 'Time Created',
      selected: false,
      name: 'timeCreated'
    },
  ]);
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  let [number, setNumber] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  // let [marketId, setMarketId] = useState(undefined)
  let limit = 50
  let totalData = 0
  let totalPage = 0
  let marketId = undefined;
  let status = undefined;
  if(prop_marketId !== '')
    marketId = prop_marketId;
  if(prop_status !== '')
    status = prop_status;
  const { data, isLoading, error, refetch } = useQuery(
    ['Customers', { page, limit, phoneNumber, marketId, status }],
    getCustomers
  )
  console.log('data', data);
  let formattedData = []
  if (data && data.data) {
    formattedData = formatCustomerData(
      data.data.data.list,
      history,
      url,
      page,
      limit
    )
    totalPage = Math.ceil(data.data.data.total / limit)
    totalData = data.data.data.total
  }
  const handleSearch = ({ target: { value } }) => {
    const debounced_doSearch = debounce(() => setPhoneNumber(value), 1000)
    debounced_doSearch()
  }

  const toggleItem = id => {
    const temp = JSON.parse(JSON.stringify(filters))
    temp[id].selected = !temp[id].selected
    setFilters(temp);
  }
  // CustomerTableColumn
  const selectedFilters = filters.filter( item => item.selected);
  const filtered_columns = selectedFilters.map( item => {
    return {key: item.name, render: item.title}
  })
  let columns = [{ key: 'sN', render: 'S/N' }];
  columns = columns.concat(filtered_columns);
  columns.push({key: 'action',render: 'ACTION'});
  console.log('columns', columns);
  return (
    <Fragment>
      <Header>
        <p> Customers </p>

        <AddFilter />
      </Header>
      <Content className={styles.content}>
        <Card className={styles.contentCard}>
          <CardHeader className={styles.Header}>
            Total Customers{' '}
            {totalData ? ` - ${totalData.toLocaleString()}` : ''}
            <div className={styles.HeaderInputsWraper}>
              <CustomersDataExport />
              
              <div className="header-search">
                <input
                  placeholder="Search by Phone Number"
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
                  <div className={styles.HeaderInputsWraper}>
                    <Search />
                  </div>
                )}
              </div>

              <CustomersFields filters={filters} toggleItem={toggleItem}/>
            </div>
          </CardHeader>
          <CardBody className={styles.Customers}>
            <div className={styles.CustomersHeader}>
              {isLoading && <TableLoading />}
              {error && (
                <span>
                  Error!
                  <button onClick={() => refetch({ disableThrow: true })}>
                    Retry
                  </button>
                </span>
              )}
              {data && (
                <Table
                  column={columns}
                  filters={filters}
                  data={formattedData}
                  placeholder="Customers"
                />
              )}
            </div>
          </CardBody>
          {data && (
            <div className="pagination">
              {page > 1 && (
                <Button
                  variant="flat"
                  onClick={() => setPage(page - 1)}
                  icon={<ChevronLeft />}
                ></Button>
              )}
              <p>
                Page {page} of {totalPage}
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
      </Content>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  prop_marketId: state.CustomerFilters.marketId,
  prop_status: state.CustomerFilters.status
})
export default connect(mapStateToProps, null)(Customers)
