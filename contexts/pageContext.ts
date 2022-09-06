import { createContext, Dispatch, SetStateAction } from "react";
import { IPatient } from "@/lib/db/models/patient";

export interface PageContext {
  patients?: IPatient[];
  setPatients?: any | Dispatch<SetStateAction<IPatient[]>>;
  isEdited: boolean;
  setIsEdited?: any | Dispatch<SetStateAction<boolean>>;
}
const pageContext = (createContext as any) /*<PageContext>*/();

export default pageContext;
