import { Delete, DeleteOutline } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function DeleteButton() {
  return (
    <Box sx={{ position: "relative" }}>
      <Button
        sx={{
          opacity: 0.7,
          transition: "opacity 0.3s",
          position: "relative",
          cursor: "pointer",
        }}
      >
        <DeleteOutline
          sx={{
            fontSize: 32,
            position: "absolute",
            color: "white",
          }}
        />

        <Delete
          sx={{
            fontSize: 27,
            color: "red",
          }}
        />
      </Button>
    </Box>
  );
}
