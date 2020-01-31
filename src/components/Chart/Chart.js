import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import styles from './chart.module.scss'
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

let dataSource = {
    chart: {
        showvalues: '0',
        showlegend: '1',
        showlabel: '1',
        caption: '',
        subcaption: '',
        numberprefix: '',
        numbersuffix: '',
        plottooltext: '',
        showhovereffect: '1',
        yaxisname: '',
        showsum: '0',
        theme: 'fusion',
        palettecolors: '29C3BE,00C588,18379A,8561C5,EE8728'
    }
}

const Chart = props => {
    const { chart, type, dataSource: data , height} = props
    dataSource = { chart: { ...dataSource.chart, ...chart }, data }
    const chartConfigs = {
        type,
        width: '100%',
        height,
        dataFormat: 'json',
        dataLoadStartMessage: 'Please wait, chart is loading the data....',
        dataSource
    }

    return (
        <section className={styles.Chart}>
            <ReactFC {...chartConfigs} />
        </section>
    )
}

export default Chart
