import { Stack, Typography, Divider, Box } from "@mui/material";


type ChartHeaderProps = {
  title: string;
}


function ChartHeader({title}: ChartHeaderProps) {
  return (
    <Box>
      <Typography variant="h2">{title}</Typography>
      <Divider sx={{ backgroundColor: "white" }}/>
    </Box>
  )
}


type ChartBoxProps = {
  title: string;
  children: React.ReactNode;
}


export default function ChartBox({title, children}: ChartBoxProps) {
  return (
    <Box border="2px solid white" borderRadius="1rem" p="1rem">
      <Stack spacing={2}>
        <ChartHeader title={title} />
        {children}
      </Stack>
    </Box>
  )
}
