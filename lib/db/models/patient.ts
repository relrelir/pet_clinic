import { InferSchemaWithIdType } from "@/lib/interfaces";
import { ObjectId } from "mongodb";
import mongoose, { InferSchemaType, Schema } from "mongoose";

export const PatientSchema = new Schema({
  id: {
    type: String || ObjectId,
    required: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 13,
  },
  petName: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 30,
  },
  petBirthDate: {
    type: Date,
    required: false,
    max: new Date(),
    min: new Date(+new Date() - 1000 * 60 * 60 * 24 * 365 * 40),
  },
  petType: {
    type: String,
    enum: ["Dog", "Cat", "Parrot"] as const,
    required: false,
  },
});

export type IPatient = InferSchemaWithIdType<typeof PatientSchema>;

// mongoose.models = {};

// const Patient: mongoose.Model<IPatient> = mongoose.model(
//   "patient",
//   PatientSchema
// );

// export default Patient;

const Patient: mongoose.Model<IPatient> =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);

export default Patient;

/*
export enum PetType {
  dog = "dog",
  cat = "cat",
  parrot = "parrot",
}

export const PetSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  type: {
    type: String,
    enum: PetType,
    required: false,
  },
});

export const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pet: PetSchema,
});
*/
