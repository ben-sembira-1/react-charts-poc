type SinglePoint = {
  x: number;
  y: number;
}

export type LineChartData = SinglePoint[]

type ChartProps = {
  myData: LineChartData
}

export default ChartProps