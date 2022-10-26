import { IPatient } from "@/lib/db/models/patient";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  // GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import pageContext from "contexts/pageContext";
import { useContext, useState } from "react";
import AddPatient from "./addPatient";
import EditPatient from "./EditPatient";

// const Transition = forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function DataTable() {
  const [openEdit, setOpenEdit]: any = useState(false);
  // const [openAdd, setOpenAdd] = useState(false);
  // const handleClickOpenAdd = () => {
  //   setOpenAdd(true);
  // };

  const { patients, setPatients }: any = useContext(pageContext);
  let patientsNames = [];
  patients.map((patient: IPatient) => patientsNames.push(patient.name));
  console.log(patientsNames);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      align: "center",
      renderHeader(params: GridColumnHeaderParams) {
        return (
          <Box className="flex flex-col justify-center">
            <Typography>Name</Typography>
          </Box>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,
      align: "center",
    },
    {
      field: "petName",
      headerName: "Pet Name",
      width: 300,
      align: "center",
    },
    {
      field: "petBirthDate",
      headerName: "pet Age",
      width: 80,
      align: "center",
      valueFormatter(params) {
        let petBirthDate = params.value;
        let today = new Date();
        let birthDate = new Date(petBirthDate);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age;
      },
    },
    {
      field: "petType",
      headerName: "Pet Type",
      width: 300,
      align: "center",
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        let patientId = params.id;

        return (
          <>
            <Button onClick={() => setOpenEdit(patientId)}>
              <EditIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  return (
    <Box>
      <DataGrid
        components={{ Toolbar: GridToolbarQuickFilter }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debunceMs: 500 },
          },
        }}
        disableColumnFilter
        rows={patients}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        autoHeight
        disableSelectionOnClick
      />

      <Button
        sx={{ m: -3 }}
        onClick={handleClickOpenAdd}
        className="mt--3rem fixed z-10 flex flex-row items-center gap-4 scale-150 mx-20 mt-4  "
      >
        <AddCircleTwoToneIcon />
        <Typography>Add Patient</Typography>
      </Button>
      {openEdit != false && (
        <EditPatient
          closeEditDialog={() => setOpenEdit(false)}
          openEdit={openEdit}
        />
      )}
      {openAdd && <AddPatient openAdd={openAdd} setOpenAdd={setOpenAdd} />}
    </Box>
  );
}
