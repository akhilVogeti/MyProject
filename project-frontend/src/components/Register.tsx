
import { useNavigate } from 'react-router-dom';
import { Input, Button, Typography, Stack, Box, Link, FormControl, FormLabel } from '@mui/joy';
import {register} from '../api';

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
        <Box
          sx={{
            height: '70vh', 
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
          }}
        >
            <Box component="main"
            sx={{
              my: 'auto',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              border: '1px solid black',
              borderRadius: 'sm',
              boxShadow:2,
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
            
            }}>
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
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    
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

   