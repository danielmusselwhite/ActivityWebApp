import { Card, Typography } from "@mui/material";

export default function SimpleFrag({ message }: { message: string }) {
  return (
    <Card>
        <Typography variant='h5'>{message}</Typography>
    </Card>
  )
}