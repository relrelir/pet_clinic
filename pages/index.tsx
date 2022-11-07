import DataTable from "@/components/data-table";
import { IPatient } from "@/lib/db/models/patient";
import fetchApi from "@/lib/fetch-api";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useState } from "react";

import pageContext, { PageContext } from "../contexts/pageContext";
import { PatientsResult } from "./api/patients";
import { Button } from "@mui/material";

let startTime = new Date().getTime() / 1000;

// const themeLight = createTheme({
//   palette: {
//     background: {
//       default: "#e4f0e2",
//     },
//   },
// });

// const themeDark = createTheme({
//   palette: {
//     background: {
//       default: "#222222",
//     },
//     text: {
//       primary: "#ffffff",
//     },
//   },
// });

const defaultTheme = createTheme();

// const theme = createTheme({
//   overrides: {
//     MuiDataGrid: {
//       root: {
//         fontFamily: ["Cormorant", "serif"].join(","),
//       },
//     },
//   },
// });

export interface HomePageProps extends PatientsResult {}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async function getServerSideProps(): Promise<
    GetServerSidePropsResult<HomePageProps>
  > {
    console.log(
      "getServerSideProps before fetchApi",
      new Date().getTime() / 1000 - startTime
    );
    let { patients }: PatientsResult = await fetchApi<PatientsResult>(
      `/patients`
    );
    console.log(
      "getServerSideProps after fetchApi",
      new Date().getTime() / 1000 - startTime
    );
    console.log(patients);
    return {
      props: {
        patients,
      },
    };
  };

const Home: NextPage = (props: HomePageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [patients, setPatients] = useState(
    props?.patients?.map((pat: IPatient, index: number) => ({
      _id: pat._id,
      id: pat._id,
      name: pat.name,
      phone: pat.phone,
      petName: pat.petName,
      petType: pat.petType,
      petBirthDate: pat.petBirthDate,
    }))
  );

  return (
    <pageContext.Provider
      value={
        {
          patients,
          setPatients,
          isLoading,
          setIsLoading,
        } as PageContext
      }
    >
      {props?.patients && <DataTable />}

      {console.log("totalTime", new Date().getTime() / 1000 - startTime)}
    </pageContext.Provider>
  );
};

export default Home;
