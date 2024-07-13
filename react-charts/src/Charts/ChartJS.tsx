import { Line, Scatter } from "react-chartjs-2";
import ChartProps from "./ChartProps";
import { Box } from "@mui/material";
import ChartBox from "./ChartBox";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(
  zoomPlugin
);



export function ChartJs({ my_data }: ChartProps) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: 'xy',
        }
      }
    },
  };

  const data: ChartData<"line"> = {
    labels: my_data.map((point) => point.x),
    datasets: [{
      label: 'My Data',
      data: my_data,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      animation: false,
    }],
  }

  return (
    <ChartBox title="chart.js">
      <Box sx={{ backgroundColor: "white" }}>
        <Scatter
          options={options}
          data={data}
          height={300}
          width={500}
        />
      </Box>
    </ChartBox>
  )
}



