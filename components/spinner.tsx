import { Box, CircularProgress } from "@mui/material";
import pageContext from "contexts/pageContext";
import { useContext } from "react";

export default function Spinner() {
  const { isLoading, setIsLoading }: any = useContext(pageContext);
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}
