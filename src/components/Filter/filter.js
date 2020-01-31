import React, { useState } from 'react'
import { Filters } from 'components/Layout'
import { Button, DateRangePicker } from '@kudi-inc/dip'
import styles from './filter.module.scss'
import { DownloadIcon } from 'assets/svg'
import moment from 'moment'

const Filter = () => {
    const [startDate, setStartDate] = useState(moment())
    const [endDate, setEndDate] = useState(moment().add(1, 'months'))
    const [focusedInput, setfocusedInput] = useState(null)

    const onDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const onFocusChange = focusedInput => {
        setfocusedInput(focusedInput)
    }

    return (
        <Filters className={styles.filters}>
            <p className={styles.filtersCaption}>
                Find all your activities and transactions below{' '}
                <Button variant="flat" icon={<DownloadIcon />}>
                    Dowload Report
                </Button>
            </p>
            <DateRangePicker
                onDatesChange={onDatesChange}
                onFocusChange={onFocusChange}
                displayFormat="DD MMM, YY"
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
            />
        </Filters>
    )
}

export default Filter
