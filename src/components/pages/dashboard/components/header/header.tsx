import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch } from '@/store/hooks';
import { baseApi } from '@/features';
import { RTKTags } from '@/constants/rtk-tags';
import { storage } from '@/utils/storage';
import { useState } from 'react';
import { CreateOrderModal } from './components';
import { useHeaderStyles } from './header.styles';

export const Header = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false);
  const styles = useHeaderStyles()

  const handleLogout = () => {
    storage.removeAccessToken();
    dispatch(baseApi.util.invalidateTags([RTKTags.USER]))
    window.location.href = "/auth"
  }

  return (
    <>
      <Box className={styles.wrapper}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" className={styles.title}>
              Belcor Order Management
            </Typography>
            <Box className={styles.buttonsWrapper}>
              <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Create Order</Button>
              <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <CreateOrderModal open={open} close={() => setOpen(false)} />
    </>
  )
}