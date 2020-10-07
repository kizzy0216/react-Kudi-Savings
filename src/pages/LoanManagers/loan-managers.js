import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import { Card, CardBody, Button, Table, CardHeader, Badge } from '@kudi-inc/dip'
import moment from 'moment'
import cx from 'classnames'
import { useRouteMatch } from 'react-router-dom'
import { Header, Content } from 'components/Layout'
import { TableLoading } from 'components/loading'
import { Eye, Add } from 'assets/svg'

const LoanManager = ({history}) => {
    const {url} = useRouteMatch()
    return(
<Fragment>
      <Header>
        <p> Loan Managers </p>
        <Button
          variant="flat"
          icon={<Add />}
          onClick={() => history.push(`/create-loan-manager`)}
        >
          Add Loan Manager
        </Button>
      </Header>
    </Fragment>
    )
}

export default LoanManager