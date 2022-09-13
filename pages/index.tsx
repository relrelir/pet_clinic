import DataTable from "@/components/data-table";
import PetClinicDashboard from "@/components/pet-clinic-dashboard";
import { IPatient } from "@/lib/db/models/patient";
import fetchApi from "@/lib/fetch-api";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { useState } from "react";

import pageContext, { PageContext } from "../contexts/pageContext";
import { PatientsResult } from "./api/patients";

export interface HomePageProps extends PatientsResult {}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async function getServerSideProps(): Promise<
    GetServerSidePropsResult<HomePageProps>
  > {
    console.log("getServerSideProps before fetchApi");
    let { patients }: PatientsResult = await fetchApi<PatientsResult>(
      `/patients`
    );
    console.log("getServerSideProps after fetchApi");

    return {
      props: {
        patients,
      },
    };
  };

//HomePageProps //any72
const Home: NextPage = (props: HomePageProps) => {
  const [patients, setPatients] = useState(
    props.patients?.map((pat: IPatient, index: number) => ({
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
        } as PageContext
      }
    >
      {/* <PetClinicDashboard /> */}
      <DataTable />
    </pageContext.Provider>
  );
};

export default Home;
