import React, { useEffect, useState } from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useOrderCustomerFieldStyles } from "./order-customer-field.styles";
import { PropsWithOrder } from "../../types";
import { useUpdateOrderMutation } from "@/features/orders";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useSnackbar } from "notistack";

export const OrderCustomerField: React.FC<PropsWithOrder> = ({ order }) => {
  const [updateOrder] = useUpdateOrderMutation();
  const [focused, setFocused] = useState(false);
  const [fullName, setFullName] = useState(order.customer.fullName);
  const handleRequest = useHandleRequest()
  const styles = useOrderCustomerFieldStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateOrder = async () => {
    await handleRequest({
      request: async () => {
        const result = await updateOrder({ id: order.orderID, body: { customer: { ...order.customer, fullName } } });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Customer name successfully updated!", { variant: "success" });
      }
    })
  }

  useEffect(() => {
    if (!focused && fullName !== order.customer.fullName) {
      handleUpdateOrder()
    }
  }, [focused]);

  return (
    <Box className={styles.wrapper}>
      {focused ? (
        <FormControl>
          <TextField
            name="customer"
            placeholder="John Doe"
            variant="outlined"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
        </FormControl>
      ) : (
        <Typography tabIndex={1} onFocus={() => setFocused(true)} className={styles.unfocusedText}>{fullName}</Typography>
      )}
    </Box>
  )
}