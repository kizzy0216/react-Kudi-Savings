import React, { Fragment, useState, useEffect } from 'react'
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
import moment from 'moment'
import { clearCustomerData } from 'redux/customer/actions/customer-filter'

const Customers = ({ history, marketId, status, startDate, endDate, isDateFilter, clearCustomerData }) => {
  const [filters, setFilters] = useState([
    {
      title: 'Full Name',
      selected: true,
      fieldName: 'full-name'
    },
    {
      title: 'KTA Details',
      selected: true,
      name: 'kta-details'
    },
    {
      title: "customer's Phone Number",
      selected: true,
      name: 'customer-phone'
    },
    {
      title: 'Status',
      selected: true,
      fieldName: 'status'
    },
    {
      title: 'Referral Status',
      selected: false,
      name: 'referral-status'
    },
    {
      title: "Referral's Market",
      selected: false,
      name: 'referral-market'
    },
    {
      title: "Referral's Phone Number",
      selected: false,
      name: 'referral-phone'
    },
    {
      title: 'Next of Kin',
      selected: false,
      name: 'next-of-kin'
    },
    {
      title: 'Date of Birth',
      selected: false,
      fieldName: 'dob'
    },
    {
      title: 'Amount Saved',
      selected: true,
      fieldName: 'totalSaved'
    },
    {
      title: "Amount Withdrawn",
      selected: true,
      fieldName: 'totalWithdrawn'
    },
    {
      title: 'Loan Status',
      selected: false,
      name: 'loan-status'
    },
    {
      title: "DSA's Name",
      selected: false,
      name: 'dsa-name'
    },
    {
      title: "DSA's Phone Number",
      selected: false,
      name: 'dsa-phone'
    },
    {
      title: 'Time Created',
      selected: false,
      name: 'timeCreated'
    },
    {
      title: 'Market',
      selected: false,
      name: 'market'
    },
    {
      title: 'Business Type',
      selected: false,
      fieldName: 'businessType'
    },
  ]);
  let { url } = useRouteMatch()
  const [page, setPage] = useState(1)
  let [number, setNumber] = useState('')
  let [phoneNumber, setPhoneNumber] = useState('')
  
  useEffect(() => {
    clearCustomerData();
  }, []);
  let limit = 50
  let totalData = 0
  let totalPage = 0
  let query = {page, limit, phoneNumber};
  if(marketId !== '')
    query.marketId = marketId;
  if(status !== '')
    query.status = status;
  if(isDateFilter){
    query.startDate = moment(startDate).format("YYYY-MM-DD");
    query.endDate = moment(endDate).format("YYYY-MM-DD");
  }

  const { data, isLoading, error, refetch } = useQuery(
    ['Customers', query],
    getCustomers
  )
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
    return {key: item.fieldName, render: item.title}
  })
  let columns = [{ key: 'sN', render: 'S/N' }];
  columns = columns.concat(filtered_columns);
  columns.push({key: 'action',render: 'ACTION'});
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
  marketId: state.CustomerFilters.marketId,
  status: state.CustomerFilters.status,
  startDate: state.CustomerFilters.startDate,
  endDate: state.CustomerFilters.endDate,
  isDateFilter: state.CustomerFilters.isDateFilter,
})
export default connect(mapStateToProps, {clearCustomerData})(Customers)
