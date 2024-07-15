import ChartProps, { LineChartData } from "./ChartProps";
import { Box, Button } from "@mui/material";
import ChartBox, { ChartButton } from "./ChartBox";
import ReactECharts, { EChartsInstance } from 'echarts-for-react';
import { EChartsType } from 'echarts';
import { useEffect, useMemo, useState } from "react";


function createEChartsOptions(data: LineChartData, enableZoom: boolean, enableAutoZoom: boolean) {
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

  const toolBoxOptions = {
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    }
  }

  const manualZoomOptions = {
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none',
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none',
      },
    ],
  }

  const autoZoomOptions = {
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'filter',
      },
      {
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'filter',
      },
    ]
  }

  const zoomOptions = (
    enableZoom ?
      (
        enableAutoZoom ?
          autoZoomOptions :
          manualZoomOptions
      ) :
      {}
  )

  return {
    ...basic_line_options,
    ...toolBoxOptions,
    ...zoomOptions,
  }
}


export function EChart({ myData }: ChartProps) {
  const [zoomEnabled, setEnableZoom] = useState(false);
  const [autoZoomEnabled, setAutoZoomEnabled] = useState(false);
  const [echartsObject, setEchartsObject] = useState<EChartsType | undefined>(undefined)
  const [chartData, setChartData] = useState<LineChartData>([])

  useEffect(() => {
    if (!zoomEnabled) {
      setChartData(myData)
    }
  }, [myData, zoomEnabled])

  useEffect(() => {
    const setOptionOptions = {
      notMerge: true
    }
    if (echartsObject !== undefined) {
      echartsObject.setOption(createEChartsOptions(chartData, zoomEnabled, autoZoomEnabled), setOptionOptions);
    }
  }, [zoomEnabled, echartsObject, chartData, autoZoomEnabled])

  return (
    <ChartBox title="Apache ECharts">
      <Box sx={{ backgroundColor: "white" }}>
        <ReactECharts
          option={createEChartsOptions([], false, true)}
          // theme={"dark"}
          style={{ height: 300, width: 500 }}
          lazyUpdate={true}
          onChartReady={setEchartsObject}
        />
      </Box>
      <ChartButton boolState={zoomEnabled} setBoolState={setEnableZoom}>
        {zoomEnabled ? "Zoom Enabled" : "Zoom Disabled"}
      </ChartButton>
      <ChartButton boolState={autoZoomEnabled} setBoolState={setAutoZoomEnabled}>
        {autoZoomEnabled ? "Auto Zoom" : "Manual Zoom"}
      </ChartButton>
    </ChartBox >
  )
}



