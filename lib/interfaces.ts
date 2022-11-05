import { InferSchemaType, MongooseError, ObjectId } from "mongoose";

export type InferSchemaWithIdType<T> = InferSchemaType<T> & {
  _id?: ObjectId | string;
};

export interface ErrorResult {
  error?: any | typeof MongooseError.messages;
}
