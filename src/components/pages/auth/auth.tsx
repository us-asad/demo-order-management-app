import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { FormContainer, SubmitHandler, TextFieldElement } from 'react-hook-form-mui'
import { getValidations } from '@/utils/util-functions';
import { AuthFormData } from './types';
import { useLoginMutation } from '@/features/auth';
import { useHandleRequest } from '@/hooks/use-handle-request';
import { useNavigate } from 'react-router-dom';
import { storage } from '@/utils/storage';
import { baseApi } from '@/features';
import { RTKTags } from '@/constants/rtk-tags';
import { useAppDispatch } from '@/store/hooks';
import { useAuthStyles } from './auth.styles';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  },
}));

export const AuthPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const handleRequest = useHandleRequest();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const styles = useAuthStyles();

  const handleSubmit: SubmitHandler<AuthFormData> = async (formData) => {
    await handleRequest({
      request: async () => {
        const result = await login({ body: formData })
        return result;
      },
      onSuccess: ({ data }) => {
        navigate("/dashboard")
        dispatch(baseApi.util.invalidateTags([RTKTags.USER]))
        storage.setAccessToken(data.data)
      }
    })

  };

  return (
    <FormContainer onSuccess={handleSubmit}>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            className={styles.title}
          >
            Sign in
          </Typography>
          <Box
            className={styles.formWrapper}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextFieldElement
                id="username"
                name="username"
                placeholder="Username"
                required
                variant="outlined"
                rules={getValidations(true)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextFieldElement
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                required
                variant="outlined"
                rules={getValidations(true, 4, 100)}
              />
            </FormControl>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
            >
              Sign in
            </LoadingButton>
          </Box>
        </Card>
      </SignInContainer>
    </FormContainer>
  );
}