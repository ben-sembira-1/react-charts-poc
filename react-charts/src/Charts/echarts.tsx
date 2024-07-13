import ChartProps from "./ChartProps";
import { Box } from "@mui/material";
import ChartBox from "./ChartBox";
import ReactECharts from 'echarts-for-react';

export function EChart({ my_data }: ChartProps) {
  const my_options = {
    // animation: false,
    title: {
      text: 'ECharts Example'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['my data legend']
    },
    xAxis: {
      data: my_data.map((point) => point.x),
      splitLine: {
        show: true
      }
    },
    yAxis: {
      splitLine: {
        show: true
      }
    },
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none'
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none'
      },
    ],
    series: [
      {
        id: 'a',
        type: 'line',
        data: my_data.map((point) => (point.y.toFixed(3)))
      }
    ]
  };

  return (
    <ChartBox title="chart.js">
      <Box sx={{ backgroundColor: "white" }}>
        <ReactECharts
          option={my_options}
          // theme={"dark"}
          style={{ height: 300, width: 500 }}
        />
      </Box>
    </ChartBox>
  )
}



