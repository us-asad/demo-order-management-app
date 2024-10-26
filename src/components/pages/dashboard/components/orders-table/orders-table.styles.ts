import { makeStyles } from "@mui/styles";

export const useOrdersTableStyles = makeStyles({
  container: { marginTop: 40 },
  header: { display: "flex", justifyContent: "space-between", marginBottom: 16 },
  customerHeadCell: { width: 200 },
  productInfoHeadCell: { width: 250 }
});