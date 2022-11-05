import "@/styles/globals.css";

import Home from "./index";

import { IPatient } from "@/lib/db/models/patient";
import fetchApi from "@/lib/fetch-api";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { useState } from "react";
import { PatientsResult } from "./api/patients";

import pageContext, { PageContext } from "../contexts/pageContext";
import { AppContext } from "next/app";

export interface HomePageProps extends PatientsResult {}
// let startTime = new Date().getTime() / 1000;

function MyApp({ Component, pageProps }) {
  // const [patients, setPatients] = useState(
  //   props?.patients?.map((pat: IPatient, index: number) => ({
  //     _id: pat._id,
  //     id: pat._id,
  //     name: pat.name,
  //     phone: pat.phone,
  //     petName: pat.petName,
  //     petType: pat.petType,
  //     petBirthDate: pat.petBirthDate,
  //   }))
  // );
  return (
    <>
      {/* {props?.patients ? <Home /> : <span> Loading... </span>} */}
      <Home />
      <Component {...pageProps} />
      {/* {console.log("totalTime", new Date().getTime() / 1000 - startTime)} */}
    </>
  );
}

export default MyApp;

// lazy loading
