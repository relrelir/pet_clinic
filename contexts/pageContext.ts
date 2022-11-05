import { IPatient } from "@/lib/db/models/patient";
import { createContext, Dispatch, SetStateAction } from "react";

export interface PageContext {
  patients?: IPatient[];
  setPatients?: any | Dispatch<SetStateAction<IPatient[]>>;
  isLoading: boolean;
  setIsLoading?: any | Dispatch<SetStateAction<boolean>>;
}
const pageContext = (createContext as any) /*<PageContext>*/();

export default pageContext;
