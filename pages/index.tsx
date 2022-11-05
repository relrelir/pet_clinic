import DataTable from "@/components/data-table";
import { IPatient } from "@/lib/db/models/patient";
import fetchApi from "@/lib/fetch-api";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useContext, useState } from "react";

import pageContext, { PageContext } from "../contexts/pageContext";
import { Box, CircularProgress } from "@mui/material";
import Head from "next/head";
import { PatientsResult } from "./api/patients";
import Spinner from "@/components/Spinner";
let startTime = new Date().getTime() / 1000;
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

// //HomePageProps //any72
const Home: NextPage = (props: HomePageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // const { patients, setPatients }: any = useContext(pageContext);

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
      {/* {props?.patients ? setIsLoading(false) : setIsLoading(isLoading)} */}
      {props?.patients && <DataTable />}

      {/* <DataTable patients={patients} /> */}
      {console.log("totalTime", new Date().getTime() / 1000 - startTime)}
    </pageContext.Provider>
  );
};

export default Home;
