import { makeStyles } from "@mui/styles";

export const useOrdersTableRow = makeStyles({
  tableRow: { '& > *': { borderBottom: 'unset' } },
  orderIDWrapper: { display: "flex", alignItems: "center" }
});