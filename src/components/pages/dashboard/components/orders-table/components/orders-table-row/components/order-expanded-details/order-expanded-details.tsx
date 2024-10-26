import { Box, FormControl, FormLabel } from '@mui/material';
import React from 'react';
import { PropsWithOrder } from '../../types';
import { FormContainer, SubmitHandler, TextFieldElement, TextareaAutosizeElement } from 'react-hook-form-mui';
import { Order } from '@/types/order';
import { useUpdateOrderMutation } from '@/features/orders';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHandleRequest } from '@/hooks/use-handle-request';
import { useSnackbar } from 'notistack';
import { useOrderExpandedDetails } from './order-expanded-details.styles';

export const OrderExpandedDetails: React.FC<PropsWithOrder> = ({ order }) => {
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const handleRequest = useHandleRequest();
  const { enqueueSnackbar } = useSnackbar();
  const styles = useOrderExpandedDetails();

  const onSubmit: SubmitHandler<Order> = async formData => {
    await handleRequest({
      request: async () => {
        const result = updateOrder({ id: order.orderID, body: { ...formData, orderedAt: new Date(formData.orderedAt).toJSON(), note: formData.note || "" } });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Order successfully updated!", { variant: "success" })
      }
    })
  }

  return (
    <FormContainer defaultValues={order} onSuccess={onSubmit}>
      <Box className={styles.wrapper}>
        <FormControl className={styles.notesController}>
          <FormLabel htmlFor="order-notes">Notes</FormLabel>
          <TextareaAutosizeElement name="note" id="order-notes" minRows={12} placeholder="Order delay for 3 days..." className={styles.notesField} />
        </FormControl>
        <Box className={styles.orderDetailsWrapper}>
          <FormControl>
            <FormLabel htmlFor="productName">Product Name</FormLabel>
            <TextFieldElement
              id="productName"
              name="productDetails.name"
              placeholder="Magic Box"
              variant="outlined"
            />
          </FormControl>
          <Box className={styles.flexGap2}>
            <FormControl>
              <FormLabel htmlFor="weight">Weight</FormLabel>
              <TextFieldElement
                id="weight"
                name="productDetails.weight"
                placeholder="23"
                type="number"
                InputProps={{
                  endAdornment: "kg"
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="price">Price</FormLabel>
              <TextFieldElement
                id="price"
                name="productDetails.price"
                placeholder="400"
                type="number"
                InputProps={{
                  startAdornment: "$"
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <TextFieldElement
                id="quantity"
                name="productDetails.quantity"
                placeholder="2"
                type="number"
              />
            </FormControl>
          </Box>
          <Box className={styles.flexGap2}>
            <FormControl className={styles.width50}>
              <FormLabel htmlFor="customerName">Customer Name</FormLabel>
              <TextFieldElement
                id="customerName"
                name="customer.fullName"
                placeholder="your@email.com"
              />
            </FormControl>
            <FormControl className={styles.width50}>
              <FormLabel htmlFor="customerPhoneNumber">Customer Phone Number</FormLabel>
              <TextFieldElement
                id="customerPhoneNumber"
                name="customer.phoneNumber"
                placeholder="+998 99 238 43 43"
              />
            </FormControl>
          </Box>
          <LoadingButton type="submit" variant="contained" loading={isLoading}>Save</LoadingButton>
        </Box>
      </Box>
    </FormContainer>
  )
}