import { 
  Button,
  Link,
  List, 
  ListItem, 
  TextField, 
  Typography 
} from '@material-ui/core';
import NextLink from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';

export default function Login() {
  const classes = useStyles();
  return (
    <Layout title="Login">
      <form className={classes.form}>
        <Typography component="h1" variant="h1">
          Log in
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined" 
              fullWidth 
              id="email"
              label="Email"
              inputProps={{ type: 'email'}}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              varian="outlines" 
              fullWidth 
              id="password"
              label="Password"
              inputProps={{ type: 'password'}}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button 
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
            >
              Masuk
            </Button>
          </ListItem>
          <ListItem>
            Tidak Mempunyai Akun ? &nbsp;
            <NextLink href="/register" passHref>
              <Link>
                Daftar
              </Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
