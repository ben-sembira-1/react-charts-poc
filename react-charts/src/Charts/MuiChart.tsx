import { LineChart } from "@mui/x-charts";
import ChartBox from "./ChartBox";
import ChartProps from "./ChartProps";
import { Box } from "@mui/material";


export function MuiChart({ myData: data }: ChartProps) {
  return (
    <ChartBox title="Mui Chart">
      <Box sx={{ backgroundColor: "white" }}>
        <LineChart
          xAxis={[
            {
              data: data.map((value) => value.x),
            }
          ]}
          series={[
            {
              curve: "linear",
              data: data.map((value) => value.y),
            },
          ]}
          grid={{ vertical: true, horizontal: true }}
          height={300}
          width={500}
          skipAnimation
        />
      </Box>
    </ChartBox>
  )
}