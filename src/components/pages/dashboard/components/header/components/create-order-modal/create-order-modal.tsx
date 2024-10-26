import React from "react";
import { Props } from "./types";
import { Box, FormControl, FormLabel, IconButton, Modal, Typography } from "@mui/material";
import { FormContainer, SelectElement, SubmitHandler, TextFieldElement, TextareaAutosizeElement } from "react-hook-form-mui";
import { DatePickerElement } from "react-hook-form-mui/date-pickers"
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateOrderMutation } from "@/features/orders";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { Order } from "@/types/order";
import { useSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import { OrderStatusTexts } from "@/constants/statuses";
import { useCreateOrderModalStyles } from "./create-order-modal.styles";

export const CreateOrderModal: React.FC<Props> = ({ open, close }) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const handleRequest = useHandleRequest();
  const { enqueueSnackbar } = useSnackbar()
  const styles = useCreateOrderModalStyles();

  const onSubmit: SubmitHandler<Order> = async formData => {
    await handleRequest({
      request: async () => {
        const result = await createOrder({ body: formData });
        return result;
      },
      onSuccess: () => {
        enqueueSnackbar("Order successfully created!", { variant: "success" });
        close()
      }
    })
  }

  return (
    <Modal open={open} onClose={close}>
      <Box className={styles.modal}>
        <Box className={styles.header}>
          <Typography variant="h5" fontWeight="bold">Create Order</Typography>
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Box>
        <FormContainer onSuccess={onSubmit}>
          <Box className={styles.formWrapper}>
            <Box className={styles.formLeft}>
              <FormControl>
                <FormLabel htmlFor="order-notes">Notes</FormLabel>
                <TextareaAutosizeElement name="note" id="order-notes" minRows={6} placeholder="Order delay for 3 days..." className={styles.notesField} />
              </FormControl>
              <FormControl>
                <DatePickerElement name="orderedAt" required className={styles.width100} label="Ordered At" />
              </FormControl>
            </Box>
            <Box className={styles.formRight}>
              <Box className={styles.formProductNameAndStatusWrapper}>
                <FormControl className={styles.width65}>
                  <FormLabel htmlFor="productName">Product Name</FormLabel>
                  <TextFieldElement
                    id="productName"
                    name="productDetails.name"
                    placeholder="Magic Box"
                    variant="outlined"
                    required
                  />
                </FormControl>
                <FormControl className={styles.width35}>
                  <FormLabel htmlFor="create-order-status-select">Status</FormLabel>
                  <SelectElement name="status" required options={OrderStatusTexts.map((statusText, index) => ({ id: index, label: statusText }))} />
                </FormControl>
              </Box>
              <Box className={styles.formProductNameAndStatusWrapper}>
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
                    required
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
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="quantity">Quantity</FormLabel>
                  <TextFieldElement
                    id="quantity"
                    name="productDetails.quantity"
                    placeholder="2"
                    type="number"
                    required
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
                    required
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
      </Box >
    </Modal >
  )
}