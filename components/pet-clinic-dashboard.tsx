import { IPatient } from "@/lib/db/models/patient";
import { createTheme, Paper, StyledEngineProvider } from "@mui/material";
import type {} from "@mui/x-data-grid/themeAugmentation";
import pageContext, { PageContext } from "contexts/pageContext";
import { useContext, useEffect, useState } from "react";

import AddPatient from "./addPatient";
import DataTable from "./data-table";
import EditPatient from "./EditPatient";

export default function PetClinicDashboard() {
  const { patients, setPatients, isEdited, setIsEdited }: PageContext =
    useContext(pageContext);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [openAdd, setOpenAdd] = useState(false);

  // const handleClickOpenAdd = () => {
  //   setOpenAdd(true);
  // };

  // const closeEditDialog = () => setOpenEdit(false);
  // useEffect(() => {
  //   let fetchData = async () => {
  //     let res = await fetch("/api/patients");
  //     let data = await res.json();

  //     const { patients } = data;

  // console.log("patients", patients);
  // function initRows() {
  //   setPatients(
  //     patients?.map((patient) => ({
  //       _id: patient._id,
  //       get id() {
  //         return this._id;
  //       },
  //       name: patient.name,
  //       phone: patient.phone,
  //       petName: patient.petName,
  //       petType: patient.petType,
  //       petBirthDate: patient.petBirthDate,
  //     }))
  //   );
  // }
  // };

  //   fetchData();
  // }, [isEdited]);
  // initRows();

  return (
    <Paper>
      <StyledEngineProvider injectFirst>
        <DataTable />
      </StyledEngineProvider>
    </Paper>
  );
}
