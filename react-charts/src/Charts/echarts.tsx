import ChartProps, { LineChartData } from "./ChartProps";
import { Box, Button } from "@mui/material";
import ChartBox from "./ChartBox";
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { EChartsType } from 'echarts';
import { useEffect, useMemo, useState } from "react";


function createEChartsOptions(data: LineChartData, enableZoom: boolean) {
  const basic_line_options = {
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
      data: data.map((point) => point.x),
      splitLine: {
        show: true
      }
    },
    yAxis: {
      splitLine: {
        show: true
      }
    },
    series: [
      {
        id: 'a',
        type: 'line',
        data: data.map((point) => (point.y.toFixed(3))),
        showSymbol: false,
      }
    ]
  };

  const zoomOptions = {
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
  }

  const noZoomOptions = {
    toolbox: {},
    dataZoom: [],
  }

  return {
    ...basic_line_options,
    ...(enableZoom ? zoomOptions : noZoomOptions)
  }
}


export function EChart({ myData }: ChartProps) {
  const [zoomEnabled, setEnableZoom] = useState(false);
  const [echartsObject, setEchartsObject] = useState<EChartsType | undefined>(undefined)
  const [chartData, setChartData] = useState<LineChartData>([])

  useEffect(() => {
    if (!zoomEnabled) {
      setChartData(myData)
    }
  }, [myData, zoomEnabled])

  useEffect(() => {
    const setOptionOptions = {
      notMerge: true,
      lazyUpdate: false
    }
    if (echartsObject !== undefined) {
      echartsObject.setOption(createEChartsOptions(chartData, zoomEnabled), setOptionOptions);
    }
  }, [zoomEnabled, echartsObject, chartData])

  return (
    <ChartBox title="Apache ECharts">
      <Box sx={{ backgroundColor: "white" }}>
        <ReactECharts
          option={createEChartsOptions([], false)}
          // theme={"dark"}
          style={{ height: 300, width: 500 }}
          lazyUpdate={true}
          onChartReady={setEchartsObject}
        />
      </Box>
      <Button onClick={() => setEnableZoom((prev) => !prev)}>{zoomEnabled ? "Disable Zoom" : "Enable Zoom"}</Button>
    </ChartBox >
  )
}



