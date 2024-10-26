import React from "react";
import { PropsWithOrder } from "./types";
import { Box, CircularProgress, Collapse, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { Delete, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { OrderCustomerField, OrderDatePicker, OrderExpandedDetails, OrderItemInfoField, OrderStatusSelect } from "./components";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useDeleteOrderMutation } from "@/features/orders";
import { useSnackbar } from "notistack";
import { useOrdersTableRow } from "./orders-table-row.styles";

export const OrderTableRow: React.FC<PropsWithOrder> = ({ order }) => {
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [open, setOpen] = React.useState(false);
  const handleRequest = useHandleRequest();
  const { enqueueSnackbar } = useSnackbar()
  const styles = useOrdersTableRow();

  const onDelete = async () => {
    await handleRequest({
      request: async () => {
        const result = await deleteOrder({ id: order.orderID });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Order successfully deleted!", { variant: "success" })
      }
    })
  }

  return (
    <React.Fragment>
      <TableRow className={styles.tableRow}>
        <TableCell>
          <Box className={styles.orderIDWrapper}>
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <Typography>#{order.orderID}</Typography>
          </Box>
        </TableCell>
        <TableCell>
          <OrderStatusSelect order={order} />
        </TableCell>
        <TableCell>
          <OrderCustomerField order={order} />
        </TableCell>
        <TableCell>
          <OrderItemInfoField order={order} />
        </TableCell>
        <TableCell>
          <OrderDatePicker order={order} />
        </TableCell>
        <TableCell>
          <IconButton color="error" onClick={onDelete}>
            {isDeleting ? <CircularProgress /> : <Delete />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <OrderExpandedDetails order={order} />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}