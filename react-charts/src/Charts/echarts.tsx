import ChartProps, { LineChartData } from "./ChartProps";
import { Box } from "@mui/material";
import ChartBox, { ChartButton } from "./ChartBox";
import ReactECharts from 'echarts-for-react';
import { ECharts } from 'echarts';
import { useEffect, useState } from "react";


const SET_OPTIONS_OVERRIDE_ALL = { notMerge: true }


function createEChartsDataOptions(data: LineChartData) {
  return {
    // animation: false,
    title: {
      text: 'ECharts Example'
    },
    tooltip: {
      trigger: 'axis'
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
}


function createEChartsFeaturesOptions(enableZoom: boolean, enableAutoZoom: boolean) {

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
        id: "slider_x_zoom_for_keeping_zoom_on_toggle",
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'none',
      },
      {
        id: "inside_x_zoom_for_keeping_zoom_on_toggle",
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'none',
        zoomOnMouseWheel: 'shift',
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        filterMode: 'none',
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        filterMode: 'none',
        zoomOnMouseWheel: 'ctrl',
      },
    ],
  }

  const autoZoomOptions = {
    dataZoom: [
      {
        id: "slider_x_zoom_for_keeping_zoom_on_toggle",
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'filter',
      },
      {
        id: "inside_x_zoom_for_keeping_zoom_on_toggle",
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'filter',
        zoomOnMouseWheel: true,
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
    ...toolBoxOptions,
    ...zoomOptions,
  }
}


function set_restore_options_to_current_loaded(echartsInstance: ECharts) {
  /* 
  When pressing the restore button on the toolbar it sends the graph to the last options
  that where set using override all settings (notMerge=true).
  Because of that if not doing this after a call to setOption with merge (or replaceMerge) strategy 
  the restore button will set the options back to the last ones that where set with notMerge=true 
  which may be undesirable.
   */
  echartsInstance.setOption(echartsInstance.getOption(), SET_OPTIONS_OVERRIDE_ALL)
}


export function EChart({ myData }: ChartProps) {
  const [zoomEnabled, setEnableZoom] = useState(false);
  const [autoZoomEnabled, setAutoZoomEnabled] = useState(true);
  const [echartsInstance, setEchartsObject] = useState<ECharts | undefined>(undefined)

  
  useEffect(() => {
    if (echartsInstance !== undefined) {
      if (!zoomEnabled) {
        const REMOVE_ZOOM_SETTINGS_WHEN_DISABLING_ZOOM = SET_OPTIONS_OVERRIDE_ALL
        echartsInstance.setOption(createEChartsDataOptions(myData), REMOVE_ZOOM_SETTINGS_WHEN_DISABLING_ZOOM);
      }
    }
  }, [myData, zoomEnabled, echartsInstance])

  useEffect(() => {
    if (echartsInstance !== undefined) {
      const PRESERVE_X_AXIS_ZOOM_ON_AUTO_MODE_TOGGLE = { replaceMerge: ["dataZoom"] }
      echartsInstance.setOption(createEChartsFeaturesOptions(zoomEnabled, autoZoomEnabled), PRESERVE_X_AXIS_ZOOM_ON_AUTO_MODE_TOGGLE)
      set_restore_options_to_current_loaded(echartsInstance)
    }
  }, [zoomEnabled, echartsInstance, autoZoomEnabled])

  return (
    <ChartBox title="Apache ECharts">
      <Box sx={{ backgroundColor: "white" }}>
        <ReactECharts
          option={{
            ...createEChartsDataOptions([]),
            ...createEChartsFeaturesOptions(false, true)
          }}
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



