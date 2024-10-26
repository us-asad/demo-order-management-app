import { makeStyles } from "@mui/styles";

export const useAuthStyles = makeStyles({
  title: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 16,
  }
});