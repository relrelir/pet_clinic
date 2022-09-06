import { IPatient } from "@/lib/db/models/patient";
import { EditNotifications, Phone } from "@mui/icons-material";

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
import { useContext, useEffect, useState } from "react";
import pageContext, { PageContext } from "../contexts/pageContext";
import PetTipe from "./petTipe";
import DeleteIcon from "@mui/icons-material/Delete";
import { PatientResult } from "../pages/api/patients/[patientId]";
import { useGridApiRef } from "@mui/x-data-grid";

export default function EditPatient({ openEdit, closeEditDialog }) {
  const patientId = openEdit;
  console.log("patientId", patientId);
  console.log("openEdit", openEdit);

  const { patients, setPatients, isEdited, setIsEdited }: PageContext =
    useContext(pageContext);
  const patient: IPatient = patients.find((p: IPatient) => patientId === p._id);
  const apiRef = useGridApiRef();

  // console.log("patient._id", patient._id);
  // console.log("patient", patient);
  // console.log("patientId", patientId);

  // let fetchData;
  // useEffect(() => {
  //   let fetchData = async () => {
  //     let res = await fetch("/api/patients");
  //     let data = await res.json();

  //     setPatients(res);
  //   };
  // }, [patients]);

  const [name, setName] = useState(patient?.name);
  const [phone, setPhone] = useState(patient.phone);
  const [petName, setPetName] = useState(patient.petName);
  const [petBirthDate, setPetBirthDate] = useState(patient.petBirthDate);
  const [petType, setPetType] = useState(patient.petType);

  const editPatient = async () => {
    try {
      let res: Response = await fetch(`/api/patients/${patientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, petName, petBirthDate, petType }),
      });

      let result: PatientResult = await res.json();
      console.log("result", result);

      let { patient }: PatientResult = result;
      console.log("patient", patient);
      console.log("petType", petType, typeof petType);
      console.log("phone", phone);
      console.log("patient._id", patient._id, typeof patient._id);

      patient.name = name;
      patient.petBirthDate = petBirthDate;
      patient.petName = petName;
      patient.petType = petType;
      patient.phone = phone;
      patient.id = patient._id;
      console.log("patientff", patient);

      setPatients((patients: IPatient[]) => {
        const index: number = patients.findIndex((p: IPatient) => {
          return patientId === p._id;
        });
        console.log("index", index);
        console.log("patientId", patientId);

        console.log("return", [
          ...patients.slice(0, index),
          patient,
          ...patients.slice(index + 1),
        ]);

        if (index > -1) {
          // return patients.map((patient, i) =>
          //   i === index ? { ...patient } : patient
          // );
          let newPatients: IPatient[] = [
            ...patients.slice(0, index),
            patient,
            ...patients.slice(index + 1),
          ];
          // setPatients(newPatients);

          return newPatients;
        } else {
          return patients;
        }
      });

      // const handleUpdateRow = () => {
      //   const rowIds = apiRef.current.getAllRowIds();
      //   const rowId = patientId;

      //   apiRef.current.updateRows([{ _id: rowId, ...patient }]);
      // };

      // setPatients((patients: IPatient[]) => {
      //   let rowToUpdateIndex: number = patients.findIndex(
      //     (patient: IPatient) => patientId === patient._id
      //   );

      //   return patients.map((patient: IPatient, index: number) =>
      //     index === rowToUpdateIndex ? { ...patient } : patient
      //   );
      // });
      console.log(patient);
      // apiRef.current.updateRows([{ id: patientId, patient: { ...patient } }]);
      // handleUpdateRow();
      // setIsEdited(isEdited);
      closeEditDialog();
    } catch (res: Response | any) {
      console.error(res.error);
    }
  };

  async function handleDeletePatient() {
    try {
      await fetch(`/api/patients/${patientId}`, {
        method: "DELETE",
      });
    } catch (e) {
      return;
    }
    // setIsEdited(isEdited);
    closeEditDialog();

    console.log("itemdeleted");

    setPatients((patients: IPatient[]) => {
      let index: number = patients.findIndex(
        (patient: IPatient) => patient._id === patientId
      );

      if (index > -1) {
        return [...patients.slice(0, index), ...patients.slice(index + 1)];
      } else {
        return patients;
      }
    });
  }

  return (
    <>
      <Dialog
        open={true}
        // TransitionComponent={Transition}
        // keepMounted
        onClose={() => console.log("close")}
        onBackdropClick={closeEditDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" "}
          <Box className="flex flex-row items-center gap-4 scale-150 mx-20 mt-4  ">
            <EditNotifications />
            <Typography>Edit Patient</Typography>
            <Button onClick={handleDeletePatient}>
              <DeleteIcon />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form
            action="/api/patients"
            method="PATCH"
            onSubmit={(e) => (e.preventDefault(), editPatient())}
          >
            <Box className="flex flex-col gap-8 w-1/2 ">
              <Box className="flex flex-row items-center justify-between">
                <Typography>Name:</Typography>
                <TextField
                  required
                  autoFocus
                  inputProps={{ maxLength: 30, minLength: 2 }}
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                />
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Typography>Phone:</Typography>
                <TextField
                  required
                  type="tel"
                  defaultValue={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    console.log("fff", phone);
                  }}
                  id="phone"
                />
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Typography>Pet Name:</Typography>
                <TextField
                  defaultValue={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  id="petName"
                />
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Typography>Pet Birth Date:</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    minDate={new Date("2000-01-01")}
                    maxDate={new Date()}
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    defaultValue={petBirthDate}
                    value={petBirthDate}
                    onChange={setPetBirthDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
              <Box className="flex flex-row items-center justify-between">
                <Typography>Pet Type:</Typography>
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
                  Save
                </Button>
                <Button
                  onClick={closeEditDialog}
                  className="w-1/3"
                  variant="outlined"
                >
                  Close
                </Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
