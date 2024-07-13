import { Box, Button, Stack } from '@mui/material'
import './App.css'
import { MuiChart } from './Charts/MuiChart'
import { useState } from 'react'
import { LineChartData } from './Charts/ChartProps'
import { ChartJs } from './Charts/ChartJS'


function App() {
  const [shifted, setShifted] = useState<boolean>(false)
  const FULL_DATA: LineChartData = [
    { x: 1, y: 2 },
    { x: 2, y: 5.5 },
    { x: 3, y: 2 },
    { x: 5, y: 8.5 },
    { x: 8, y: 1.5 },
    { x: 10, y: 5 },
    { x: 11, y: 3 },
  ]

  const data = shifted ? FULL_DATA.slice(0, -1) : FULL_DATA.slice(1)

  const toggleShifted = () => setShifted((previous: boolean) => !previous)
  return (
    <Stack spacing={2} alignItems={"center"}>
      <Stack direction={'row'} spacing={2}>
        <Box>
          <MuiChart my_data={data} />
        </Box>
        <Box>
          <ChartJs my_data={data} />
        </Box>
      </Stack>
      <Button sx={{ ":focus": { outline: "none !important" }, width: "5rem" }} onClick={toggleShifted}>{shifted ? "Move Left" : "Move Right"}</Button>
    </Stack>
  )
}

export default App
