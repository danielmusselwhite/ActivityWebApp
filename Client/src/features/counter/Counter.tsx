import { Box, Button, ButtonGroup, Card, TextField, Typography } from "@mui/material";
import { useStore } from "../../lib/stores/useStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Counter = observer(function Counter() {
  const {counterStore} = useStore();
  const [amount, setAmount] = useState<number>(1);

  return (
    <Card sx={{display:"flex", flexDirection:"column", borderRadius:3}}>
      <Box sx={{p: 3, alignItems: "center", textAlign:"center" }}>
        <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
        <Typography variant="h6" gutterBottom>The Count Is: {counterStore.count}</Typography>
        <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} inputProps={{ min: 1, max: 10 }}/>
      </Box>
      <ButtonGroup sx={{ display: "flex", justifyContent: "space-between"}}>
        <Button onClick={() => counterStore.decrement(amount)} variant="contained" color="error">-</Button>
        <Button onClick={() => counterStore.increment(amount)} variant="contained" color="success">+</Button>
      </ButtonGroup>
    </Card>
  )
})

export default Counter;