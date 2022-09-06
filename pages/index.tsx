import PetClinicDashboard from "@/components/pet-clinic-dashboard";
import { IPatient } from "@/lib/db/models/patient";
import fetchApi from "@/lib/fetch-api";
import { Button, Typography } from "@mui/material";
import type {
  NextPage,
  GetServerSidePropsResult,
  GetStaticPropsResult,
  GetStaticProps,
  GetServerSideProps,
} from "next";
import { useState } from "react";
import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";

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

const Home: NextPage = (props: HomePageProps) => {
  const [patients, setPatients] = useState(
    props.patients?.map((pat, index) => ({
      _id: pat._id,
      id: pat._id,
      name: pat.name,
      phone: pat.phone,
      petName: pat.petName,
      petType: pat.petType,
      petBirthDate: pat.petBirthDate,
      // EditIcon: () => <EditIcon />,
    }))
  );

  // patients.push(button);
  // setPatients(patients);
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
