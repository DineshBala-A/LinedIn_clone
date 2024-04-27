import {React,useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {  ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';
import { host } from '../../host';
import { useContext } from 'react';
import {MyContextProvider,MyContext} from '../../MyContextProvider';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://dineshbala.netlify.app">
        dineshbala
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignIn() {
  // const {user_id,set_user_id}=useContext(MyContext);
  // console.log(user_id)
  const navigate = useNavigate();
const theme = useTheme();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log("fdfkfj")
    const controller =new AbortController();
    const signal=controller.signal;
    fetch(`${host}/Profile-id`,
    {
      signal,
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({"email":data.get("email"),"password":data.get("password")}),
    }
  ).then(response=>{
    if(!response.ok){
      throw new Error("Login failed");
    }
    return response.json();
  }).then(data=>{
    console.log("login success")
    console.log(data);
    navigate('/feed', { state: { user_id: data.userid } });
  }).catch(e=>{
    console.error(e.message);
  })
  return()=>{
    controller.abort();
  }
  };

  // const loginSubmit=()=>{
  //   console.log("fdfkfj")
  //   const controller =new AbortController();
  //   const signal=controller.signal;
  //   fetch(`${host}/Profile`,
  //   { 
  //     signal,
  //     method:"POST",
  //     header:{"Content-Type":"application/json"},
  //     body:JSON.stringify(data),
  //   }
  // ).then(response=>{
  //   if(!response.ok){
  //     throw new Error("Login failed");
  //   }
  //   response.json();
  // }).then(data=>{
  //   console.log("login success")
  //   console.log(data);
  // }).catch(e=>{
  //   console.error(e.message);
  // })
  // return()=>{
  //   controller.abort();
  // }
  // }
  return (
    // <ThemeProvider theme={theme}>
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // component={NavLink} to="/"
              // onClick={loginSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </>
    // </ThemeProvider>
  );
}