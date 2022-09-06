// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from "@/lib/db";
import Patient, { IPatient } from "@/lib/db/models/patient";
import { MongooseError } from "mongoose";
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
  console.log("server.pid");

  if (req.method === "PATCH") {
    return await update(req, res);
  }
  if (req.method === "GET") {
    return await read(req, res);
  }
  if (req.method === "DELETE") {
    return await del(req, res);
  }
}

export const update = async (
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>
) => {
  console.log("update");

  await db();

  const { patientId } = req.query; // /patients/{_id}
  console.log("req.query", req.query);
  console.log("patientId", patientId);

  const { name, phone, petName, petBirthDate, petType }: IPatient = req.body;

  if (patientId) {
    try {
      const patient: IPatient = await Patient.findByIdAndUpdate(patientId, {
        name,
        phone,
        petName,
        petBirthDate,
        petType,
      });
      res.status(200).json({ patient });
    } catch (error: MongooseError | any) {
      const messages = error?.messages;
      messages
        ? res.status(400).json({ error: messages })
        : res.status(500).json({ error: " Please try again later" });
    }
  }
};

export const read = async (
  req: NextApiRequest,
  res: NextApiResponse<PatientsResult>
) => {
  const { patientId } = req.query;

  console.log("read");
  // load from database
  await db();
  const patients: IPatient[] = await Patient.findById(patientId);
  const result: PatientsResult = { patients };
  res?.status(200).json(result);
  // console.log("patients", patients);
};

export const del = async (
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>
) => {
  console.log("del");

  // delete from database
  await db();
  const { patientId } = req.query;
  console.log("req.body", req.body);
  console.log("patientId", patientId);

  if (patientId) {
    try {
      const patient: IPatient = await Patient.findByIdAndRemove(
        patientId
      ).orFail();
      return res.status(200).json({ patient });
    } catch (e) {}
  }
  res.status(404).json({ error: "Patient Not Found" });
};
