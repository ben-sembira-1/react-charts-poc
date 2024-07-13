import { Stack } from '@mui/material'
import './App.css'
import { MuiChart } from './Charts/MuiChart'

function App() {
  return (
    <Stack direction={'row'} spacing={2}>
      <MuiChart />
      <MuiChart />
    </Stack>
  )
}

export default App
