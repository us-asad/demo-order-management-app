import React, { useEffect, useState } from 'react';
import { PropsWithOrder } from '../../types';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { FormControl } from '@mui/material';
import { useHandleRequest } from '@/hooks/use-handle-request';
import { useUpdateOrderMutation } from '@/features/orders';
import { useSnackbar } from 'notistack';
import { useOrderDatePicker } from './order-date-picker.styles';

export const OrderDatePicker: React.FC<PropsWithOrder> = ({ order }) => {
  const [orderedAt, setOrderedAt] = useState(dayjs(order.orderedAt))
  const [updateOrder] = useUpdateOrderMutation();
  const handleRequest = useHandleRequest();
  const { enqueueSnackbar } = useSnackbar();
  const styles = useOrderDatePicker();

  const handleUpdateOrder = async () => {
    await handleRequest({
      request: async () => {
        const result = await updateOrder({ id: order.orderID, body: { orderedAt: orderedAt.toJSON() } });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Order date successfully updated!", { variant: "success" })
      }
    })
  }

  useEffect(() => {
    if (orderedAt.toJSON() !== new Date(order.orderedAt).toJSON()) {
      handleUpdateOrder()
    }
  }, [orderedAt]);

  return (
    <FormControl className={styles.formController} size="small">
      <DatePicker value={orderedAt} onChange={value => setOrderedAt(value as Dayjs)} className={styles.datePickerField} />
    </FormControl>
  )
}