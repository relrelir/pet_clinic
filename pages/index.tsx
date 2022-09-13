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
    let { patients }: PatientsResult = await fetchApi<PatientsResult>(
      `/patients`
    );
    return {
      props: {
        patients,
      },
    };
  };
// let patients: IPatient[] = [
//   {
//     _id: "63166ba9caab9829a676a433",
//     name: "eee",
//     phone: "123456789",
//     petName: "saf",
//     petBirthDate: "2022-09-02T21:00:00.000Z",
//     petType: "Cat",
//   },
//   {
//     _id: "6316ff7f8280e9d72a80cdcf",
//     name: "ariela",
//     phone: "9876543210",
//     petName: "saf",
//     petBirthDate: "2022-09-04T21:00:00.000Z",
//     petType: "Dog",
//   },
//   {
//     _id: "6316ff8c8280e9d72a80cdd1",
//     name: "ggg",
//     phone: "0509455250",
//     petName: "saf",
//     petBirthDate: "2022-09-03T21:00:00.000Z",
//     petType: "Parrot",
//   },
//   {
//     _id: "63186f111d0161765334f40e",
//     name: "survapp",
//     phone: "0509455250",
//     petName: "koko",
//     petBirthDate: "2022-09-05T21:00:00.000Z",
//     petType: "Dog",
//   },
// ];

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

  const [isEdited, setIsEdited] = useState(false);

  return (
    <pageContext.Provider
      value={
        {
          patients,
          setPatients,
          isEdited,
          setIsEdited,
        } as PageContext
      }
    >
      <PetClinicDashboard />
    </pageContext.Provider>
  );
};

export default Home;
