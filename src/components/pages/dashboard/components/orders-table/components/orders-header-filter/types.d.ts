import { Filters } from "../../types";
import { Dispatch, SetStateAction } from "react";

export interface Props {
  filters: Filters,
  setFilters: Dispatch<SetStateAction<Filters>>
}