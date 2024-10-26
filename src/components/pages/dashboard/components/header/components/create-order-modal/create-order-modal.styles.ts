import { makeStyles } from "@mui/styles";

export const useCreateOrderModalStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70vw",
    backgroundColor: '#fff',
    padding: 32,
    paddingTop: 16
  },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  formWrapper: { marginTop: 24, marginBottom: 24, display: "flex", gap: 32 },
  formLeft: { width: "40%", display: "flex", flexDirection: "column", gap: 16 },
  formRight: { display: "flex", flexDirection: "column", gap: 16, width: "60%" },
  formProductNameAndStatusWrapper: { display: "flex", alignItems: "center", gap: 16 },
  flexGap2: { display: "flex", gap: 16 },
  width50: { width: "50%" },
  width100: { width: "100%" },
  width65: { width: "65%" },
  width35: { width: "35%" },
  notesField: { resize: "vertical", width: "100%" },
  
});