import { Box, Stack } from '@mui/material'
import './App.css'
import { MuiChart } from './Charts/MuiChart'
import { useEffect, useState } from 'react'
import { LineChartData } from './Charts/ChartProps'
import { ChartJs } from './Charts/ChartJS'
import { EChart } from './Charts/echarts'


function App() {
  const [data, setData] = useState<LineChartData>([{ x: 0, y: 0 }])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Adding data!');
      for (let i = 0; i < 5; i++) {
        setData((oldData) => {
          const lastPoint = oldData[oldData.length - 1]
          const epsilon = Math.random() * 2 - 1
          const newValue = Math.max(0, Math.min(lastPoint.y + epsilon, 10))
          const newPoint = { x: lastPoint.x + 1, y: newValue }
          return [...oldData, newPoint]
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const CUT = 100
  return (
    <Stack spacing={2} alignItems={"center"}>
      <Stack direction={'row'} spacing={2}>
        <Box>
          <MuiChart my_data={data.slice(-CUT)} />
        </Box>
        <Box>
          <ChartJs my_data={data.slice(-CUT)} />
        </Box>
        <Box>
          <EChart my_data={data.slice(-CUT)} />
        </Box>
        <Box>
          <EChart my_data={data} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default App
