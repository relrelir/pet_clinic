import { Paper, StyledEngineProvider } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";
import pageContext, { PageContext } from "contexts/pageContext";
import { useContext } from "react";

import DataTable from "./data-table";

export default function PetClinicDashboard() {
  const { patients, setPatients, isEdited, setIsEdited }: PageContext =
    useContext(pageContext);

  return (
    <Paper>
      <StyledEngineProvider injectFirst>
        <DataTable />
      </StyledEngineProvider>
    </Paper>
  );
}
