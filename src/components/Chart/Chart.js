import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

let dataSource = {
  chart: {
    showvalues: "0",
    showlegend: "1",
    showlabel: "1",
    caption: "",
    subcaption: "",
    numberprefix: "",
    numbersuffix: "",
    plottooltext: "",
    showhovereffect: "1",
    yaxisname: "",
    showsum: "0",
    theme: "fusion",
    palettecolors: "29C3BE,00C588,18379A,8561C5,EE8728"
  }
};

const Chart = props => {
  const { chart, type } = props;
  dataSource.chart = { ...dataSource.chart, ...chart };
  switch (type) {
    case "column2d":
      dataSource.data = props.dataSource;
      break;

    case "stackedcolumn2d":
    case "stackedcolumn2dline":
    case "mscolumn2d":
    case "scrollstackedcolumn2d":
    case "msline":
    case "mssplinearea":
      dataSource.categories = [
        {
          category: props.dataSource.categories
        }
      ];
      dataSource.dataset = props.dataSource.dataset;
      break;
    case "scrollcolumn2d":
      dataSource = { ...dataSource, ...props.dataSource };
      break;
    default:
      return;
  }

  const chartConfigs = {
    type,
    width: "100%",
    height: "500",
    dataFormat: "json",
    dataLoadStartMessage: "Please wait, chart is loading the data....",
    dataSource
  };

  return <ReactFC {...chartConfigs} />
};

export default Chart;