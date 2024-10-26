import { makeStyles } from "@mui/styles";

export const useOrderItemInfoFieldStyles = makeStyles({
  unfocusedText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical"
  },
  wrapper: { height: 48, display: "flex", alignItems: "center", gap: 16 },
  customerNameField: { maxWidth: "100%" },
  weightWrapper: { display: "flex", alignItems: "center", gap: 4 },
  weightIcon: { fontSize: "12px !important" },
});