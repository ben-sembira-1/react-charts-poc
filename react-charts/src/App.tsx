import { Box, Button, Stack } from '@mui/material'
import './App.css'
import { MuiChart } from './Charts/MuiChart'
import { useState } from 'react'
import { LineChartData } from './Charts/ChartProps'
import { ChartJs } from './Charts/ChartJS'

const FULL_DATA: LineChartData = Array.from(Array(50).keys()).map(
  x => ({ x: x, y: Math.random() * 10 })
)

function App() {
  const [shifted, setShifted] = useState<boolean>(false)

  const data = shifted ? FULL_DATA.slice(0, -10) : FULL_DATA.slice(10)

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
