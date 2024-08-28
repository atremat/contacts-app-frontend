import { Suspense } from "react";
import { AppBarContainer } from "../AppBarContainer/AppBarContainer";
import { Box } from "@mui/material";

export const Layout = ({ children }) => {
  return (
    <Box sx={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>
      <AppBarContainer />
      <Suspense fallback={null}>{children}</Suspense>
    </Box>
  );
};
