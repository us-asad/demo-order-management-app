
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OrderStatusTexts } from '@/constants/statuses';
import { PropsWithOrder } from '../../types';
import { InputLabel } from '@mui/material';
import { useUpdateOrderMutation } from '@/features/orders';
import { useHandleRequest } from '@/hooks/use-handle-request';
import { useSnackbar } from 'notistack';
import { useOrderStatusSelectStyles } from './order-status-select.styles';

export const OrderStatusSelect: React.FC<PropsWithOrder> = ({ order }) => {
  const [updateOrder] = useUpdateOrderMutation();
  const [status, setStatus] = useState(order.status);
  const handleRequest = useHandleRequest();
  const { enqueueSnackbar } = useSnackbar();
  const styles = useOrderStatusSelectStyles();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(+event.target.value);
  };

  const handleUpdateOrder = async () => {
    await handleRequest({
      request: async () => {
        const result = await updateOrder({ id: order.orderID, body: { status } });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Status successfully updated!", { variant: "success" });
      }
    })
  };

  useEffect(() => {
    if (status !== order.status) {
      handleUpdateOrder()
    }
  }, [status]);

  return (
    <FormControl className={styles.formController} size="small">
      <InputLabel id="order-status-select">Status</InputLabel>
      <Select
        labelId="order-status-select"
        id="order-status-select"
        value={status.toString()}
        label="Status"
        onChange={handleChange}
      >
        {OrderStatusTexts.map((statusText, index) => <MenuItem key={index} value={index}>{statusText}</MenuItem>)}
      </Select>
    </FormControl>
  );
}
