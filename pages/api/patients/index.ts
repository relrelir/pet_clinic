// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import PetTipe from "@/components/petTipe";
import { MongooseError } from "mongoose";
import withMongodb, { db } from "@/lib/db";
import Patient, { IPatient } from "@/lib/db/models/patient";
import type { NextApiRequest, NextApiResponse } from "next";

export interface ErrorResult {
  error?: any | typeof MongooseError.messages;
}
export interface PatientResult extends ErrorResult {
  patient?: IPatient;
}
export interface PatientsResult extends ErrorResult {
  patients?: Array<IPatient>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("server");

  if (req.method === "POST") {
    return await create(req, res);
  }

  if (req.method === "GET") {
    return await read(req, res);
  }
}

const create = async (
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>
) => {
  console.log("create");

  // insert to database

  const { name, phone, petName, petBirthDate, petType }: IPatient = req.body;
  let patient = new Patient({ name, phone, petBirthDate, petName, petType });
  await db();
  await patient.save();
  res.status(200).json({ patient });
};

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<PatientsResult>
) => {
  console.log("read");
  // load from database
  await db();
  const patients: IPatient[] | any = await Patient.find();
  const result: PatientsResult = { patients };
  res?.status(200).json(result);
  // console.log("patients", patients);
};
