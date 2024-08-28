import { Box } from "@mui/material";
import { PulseLoader } from "react-spinners";

export const Loader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <PulseLoader color="#1976d2" />
    </Box>
  );
};
