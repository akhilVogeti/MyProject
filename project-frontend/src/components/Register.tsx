
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Stack, Box, Link, FormControl, FormLabel } from '@mui/joy';
import {register} from '../api';
import { muiStyles } from './styles/styles';

const Register: React.FC = () => {

  interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
   
  }

  interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

 

  const navigate = useNavigate();
  document.title='Register';

  const handleFormSubmit = async(event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const userData = {
      username: formElements.username.value,
      password: formElements.password.value,
    };
    try{
      await register(userData);
      navigate('/login');
    } catch(error) {
      console.error('Registration error:', error);
    }

  };

  return (
    <>
      <Typography level='h1'  sx={{ textAlign: 'center' }} >Register</Typography>
      <Box sx={muiStyles.registerPageHeader}>
        <Box component="main" sx={muiStyles.registerFormHeader}>
          <Typography level="h4" >Enter username and password to register</Typography>
          <Stack >
            <form onSubmit={handleFormSubmit} >
              <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input  name="username" />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Stack sx={{ gap: 4, mt: 2 }}>
                <Box sx={muiStyles.registerFooter}>
                  <Link level="title-sm" href="/login">
                    Already registered? Login here
                  </Link>
                </Box>
                <Button type="submit" fullWidth>
                  Register
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
export default Register;

   