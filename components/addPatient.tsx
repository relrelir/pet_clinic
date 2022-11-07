import { IPatient } from "@/lib/db/models/patient";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useContext, useState } from "react";
import pageContext, { PageContext } from "../contexts/pageContext";
import { PatientResult } from "../pages/api/patients";
import PetTipe from "./petTipe";
import { useTheme } from "@mui/material/styles";

export default function AddPatient({ openAdd, setOpenAdd }) {
  const theme = useTheme();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petBirthDate, setPetBirthDate] = useState(null);
  const [petType, setPetType] = useState("");
  const { patients, setPatients }: PageContext = useContext(pageContext);

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  function handleDatePickerChange(date: number) {
    setPetBirthDate(date);
  }

  const createPatient = async () => {
    try {
      const res: Response = await fetch(`/api/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, petName, petBirthDate, petType }),
      });
      const { patient }: PatientResult = await res.json();
      (patient as any).id = patient._id;
      console.log("patient", patient);
      setPatients((patients: IPatient[]) => [...patients, patient]);
      handleCloseAdd();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={openAdd}
      // TransitionComponent={Transition}
      // keepMounted
      onClose={handleCloseAdd}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Box className="flex flex-row items-center gap-4 scale-150 mx-24 mt-4  ">
          <AddCircleTwoToneIcon />
          <Typography>Add Patient</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <form
          action="/api/patients"
          method="POST"
          onSubmit={(e) => (e.preventDefault(), createPatient())}
        >
          <Box className="flex flex-col mt-4 gap-4 w-1/2 ">
            <Box className="flex flex-row items-center justify-between">
              <TextField
                label="Name:"
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
            </Box>
            <Box className="flex flex-row items-center justify-between">
              <TextField
                label="Phone:"
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
              />
            </Box>
            <Box className="flex flex-row items-center justify-between">
              <TextField
                label="Pet Name:"
                onChange={(e) => setPetName(e.target.value)}
                id="petName"
              />
            </Box>
            <Box className="flex flex-row items-center justify-between">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Pet Birthday"
                  inputFormat="MM/dd/yyyy"
                  value={petBirthDate}
                  onChange={handleDatePickerChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box className="flex flex-row items-center justify-between">
              <PetTipe petType={petType} setPetType={setPetType} />
            </Box>
            <Box className="flex flex-row items-center justify-evenly">
              <Button
                className="w-1/3"
                variant="contained"
                color="success"
                id="submit"
                name="submit"
                type="submit"
              >
                Add
              </Button>
              <Button
                onClick={handleCloseAdd}
                className="w-1/3"
                variant="outlined"
              >
                close
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}
