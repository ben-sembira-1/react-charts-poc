type SinglePoint = {
  x: number;
  y: number;
}

export type LineChartData = SinglePoint[]

type ChartProps = {
  my_data: LineChartData
}

export default ChartProps