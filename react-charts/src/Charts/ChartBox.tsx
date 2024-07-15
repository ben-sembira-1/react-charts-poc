import { Stack, Typography, Divider, Box, Button } from "@mui/material";
import React from "react";


type ChartHeaderProps = {
  title: string;
}


function ChartHeader({ title }: ChartHeaderProps) {
  return (
    <Box>
      <Typography variant="h2">{title}</Typography>
      <Divider sx={{ backgroundColor: "white" }} />
    </Box>
  )
}


type ChartBoxProps = {
  title: string;
  children: React.ReactNode;
}


export function ChartButton(
  { boolState, setBoolState, children }:
    { boolState: boolean, setBoolState: React.Dispatch<React.SetStateAction<boolean>>, children: React.ReactNode }
) {
  return (
    <Button
      onClick={() => setBoolState((prev) => !prev)}
      sx={{
        backgroundColor: boolState ? 'white' : '',
        ":hover": { backgroundColor: "grey" }
      }}
    >
      {children}
    </Button>)
}


export default function ChartBox({ title, children }: ChartBoxProps) {
  return (
    <Box border="2px solid white" borderRadius="1rem" p="1rem">
      <Stack spacing={2}>
        <ChartHeader title={title} />
        {children}
      </Stack>
    </Box>
  )
}
