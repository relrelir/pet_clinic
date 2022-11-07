import { IPatient } from "@/lib/db/models/patient";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Pagination, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import type {} from "@mui/x-data-grid/themeAugmentation";
import pageContext from "contexts/pageContext";
import { forwardRef, useContext, useState } from "react";
import AddPatient from "./addPatient";
import EditPatient from "./EditPatient";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CssBaseline from "@mui/material/CssBaseline";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#ccbad1",
    },
    text: {
      primary: "#3b8ad9",
    },
  },
  components: {
    // Name of the component
    MuiDataGrid: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
          // fontWeight: 800,
          fontStyle: "oblique",
        },
      },
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#000000",
    },
    text: {
      primary: "#3b8ad9",
    },
  },
  components: {
    // Name of the component
    MuiDataGrid: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
          fontWeight: 800,
          fontStyle: "oblique",
        },
      },
    },
  },
});

const fontTheme = createTheme({
  components: {
    // Name of the component
    MuiDataGrid: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: "1rem",
        },
      },
    },
  },
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DataTable() {
  const [light, setLight] = useState(true);

  const [openEdit, setOpenEdit]: any = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleClickOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  const { patients, setPatients }: any = useContext(pageContext);

  console.log("patients", patients);
  let patientsNames = [];
  patients?.map((patient: IPatient) => patientsNames.push(patient.name));
  console.log(patientsNames);

  function AddPtBtn() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
      <Box className="flex flex-row gap-36 mr-48">
        <Button
          variant={"contained"}
          onClick={handleClickOpenAdd}
          // className="flex flex-row  gap-4 scale-150 mr-24  "
        >
          <AddCircleTwoToneIcon />
          <Typography>Add Patient</Typography>
        </Button>
        <Pagination
          color="primary"
          count={pageCount}
          page={page + 1}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
        <Button
          variant={"outlined"}
          onClick={() => setLight((prev: boolean) => !prev)}
        >
          {light ? "Dark" : "light"} Theme
        </Button>
      </Box>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 300,
      align: "left",
      // renderHeader(params: GridColumnHeaderParams) {
      //   return (
      //     <Box className="flex flex-col justify-center">
      //       <Typography>Name</Typography>
      //     </Box>
      //   );
      // },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,
      align: "left",
    },
    {
      field: "petName",
      headerName: "Pet Name",
      width: 200,
      align: "left",
    },
    {
      field: "petBirthDate",

      headerName: "Age",
      minWidth: 150,
      align: "left",
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
      headerName: "Type",
      maxWidth: 150,
      align: "left",
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

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <Box className="mx-48 pt-24">
        <CssBaseline />
        <DataGrid
          sx={{
            boxShadow: 4,
            border: 4,
            borderRadius: "12px",
            // "& .MuiDataGrid-root": {
            //   fontFamily: ["Cormorant", "serif"].join(","),
            // },
          }}
          // localeText={{
          //   footerRowSelected: AddPtBtn,
          // }}
          components={{
            Toolbar: GridToolbar,
            Pagination: AddPtBtn,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              sx: {
                boxShadow: 2,
                borderBottom: 4,
              },
            },
          }}
          pageSize={5}
          pagination
          rows={patients}
          columns={columns}
          autoHeight
          rowsPerPageOptions={[5, 10, 15]}
        />

        {/* <Button
          variant={"text"}
          onClick={handleClickOpenAdd}
          className="mt--3rem fixed z-10 flex flex-row items-center gap-4 scale-150 mx-20 mt-4  "
        >
          <AddCircleTwoToneIcon />
          <Typography>Add Patient</Typography>
        </Button> */}
        {openEdit != false && (
          <ThemeProvider theme={light ? themeLight : themeDark}>
            <Dialog TransitionComponent={Transition} open={openEdit}>
              <EditPatient
                closeEditDialog={() => setOpenEdit(false)}
                openEdit={openEdit}
              />
            </Dialog>
          </ThemeProvider>
        )}
        {openAdd && (
          <ThemeProvider theme={light ? themeLight : themeDark}>
            <Dialog TransitionComponent={Transition} open={openAdd}>
              <AddPatient openAdd={openAdd} setOpenAdd={setOpenAdd} />
            </Dialog>
          </ThemeProvider>
        )}
      </Box>
    </ThemeProvider>
  );
}
