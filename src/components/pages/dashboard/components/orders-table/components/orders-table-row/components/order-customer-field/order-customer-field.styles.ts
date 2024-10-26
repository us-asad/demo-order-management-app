import { makeStyles } from "@mui/styles";

export const useOrderCustomerFieldStyles = makeStyles({
  unfocusedText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical"
  },
  wrapper: { height: 48, display: "flex", alignItems: "center", }
});