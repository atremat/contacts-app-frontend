import { Suspense } from "react";
import { AppBarContainer } from "../AppBarContainer/AppBarContainer";

export const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>
      <AppBarContainer />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
