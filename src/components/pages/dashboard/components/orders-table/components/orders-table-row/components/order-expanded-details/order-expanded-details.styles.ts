import { makeStyles } from "@mui/styles";

export const useOrderExpandedDetails = makeStyles({
  wrapper: { marginTop: 24, marginBottom: 24, display: "flex", gap: 32 },
  notesController: { width: "40%" },
  notesField: { resize: "vertical", width: "100%" },
  orderDetailsWrapper: { display: "flex", flexDirection: "column", gap: 16, width: "60%" },
  flexGap2: { display: "flex", gap: 16 },
  width50: {width: "50%"},
});