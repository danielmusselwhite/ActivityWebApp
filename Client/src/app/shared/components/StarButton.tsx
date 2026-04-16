import { Star, StarBorder } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

type Props = {
  selected: boolean;
};

export default function StarButton({ selected }: Props) {
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
        <StarBorder
          sx={{
            fontSize: 32,
            position: "absolute",
            color: "white",
          }}
        />

        <Star
          sx={{
            fontSize: 27,
            color: selected ? "yellow" : "gray",
          }}
        />
      </Button>
    </Box>
  );
}
