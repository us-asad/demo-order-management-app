import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { Props } from "./types";
import { useLoaderStyles } from "./loader.styles";

export const Loader: React.FC<Props> = ({ sx }) => {
  const styles = useLoaderStyles()

  return (
    <Box className={styles.parent} sx={sx}>
      <CircularProgress />
    </Box>
  )
}