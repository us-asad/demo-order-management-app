import React, { useEffect, useState } from "react";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useOrderItemInfoFieldStyles } from "./order-item-info-field.styles";
import { Scale } from "@mui/icons-material";
import { PropsWithOrder } from "../../types";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useUpdateOrderMutation } from "@/features/orders";
import { useSnackbar } from "notistack";

export const OrderItemInfoField: React.FC<PropsWithOrder> = ({ order }) => {
  const [updateOrder] = useUpdateOrderMutation();
  const [focused, setFocused] = useState(false);
  const [productName, setProductName] = useState(order.productDetails.name);
  const handleRequest = useHandleRequest();
  const styles = useOrderItemInfoFieldStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateOrder = async () => {
    await handleRequest({
      request: async () => {
        const result = await updateOrder({ id: order.orderID, body: { productDetails: { ...order.productDetails, name: productName } } });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Product name successfully updated!", { variant: "success" });
      }
    })
  }

  useEffect(() => {
    if (!focused && productName !== order.productDetails.name) {
      handleUpdateOrder();
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
            value={productName}
            onChange={e => setProductName(e.target.value)}
            onBlur={() => setFocused(false)}
            className={styles.customerNameField}
            autoFocus
          />
        </FormControl>
      ) : (
        <Typography tabIndex={1} onFocus={() => setFocused(true)} className={styles.unfocusedText}>{productName}</Typography>
      )}
      <Box className={styles.weightWrapper}>
        <Scale className={styles.weightIcon} />
        <Typography>{order.productDetails.weight}kg</Typography>
      </Box>
      <Typography>${order.productDetails.price}</Typography>
      <Typography>x{order.productDetails.quantity}</Typography>
    </Box>
  )
}