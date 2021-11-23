import { 
  Button,
  List, 
  ListItem, 
  TextField, 
  Typography 
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/checkoutWizard';

export default function Shipping() {
  const {
    handleSubmit, 
    control, 
    formState: { errors },
    setValue
  } = useForm ();
  const router = useRouter();
  const { state, dispatch } = useContext ( Store );
  const { 
    userInfo, 
    cart: { shippingAddress } 
  } = state;
  useEffect (() => {
    if ( !userInfo ) {
      router.push('/login?redirect=/shipping');
    }
    setValue ( 'fullName', shippingAddress.fullName );
    setValue ( 'address', shippingAddress.address );
    setValue ( 'message', shippingAddress.message );
    setValue ( 'numberPhone', shippingAddress.numberPhone );
  },[]);
  
  
  const classes = useStyles();
  const submitHandler = ({
    fullName,
    address,
    message,
    numberPhone,
  }) => {
      dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: {
        fullName,
        address,
        message,
        numberPhone,
      }});
      Cookies.set('shippingAddress', JSON.stringify({
        fullName,
        address,
        message,
        numberPhone,
      }));
      router.push('/placeorder');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form 
        onSubmit={ handleSubmit (submitHandler) }
        className={classes.form}
      >
        <Typography component="h1" variant="h1">
          Alamat Pengiriman
        </Typography>
        <List>
        <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render = {({field}) => (
                <TextField
                  variant="outlined" 
                  fullWidth 
                  id="fullName"
                  label="Nama Lengkap"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName 
                    ? errors.fullName.type === 'minLength' 
                    ? 'Nama Lengkap Kurang, Isi Lebih Dari 1' 
                    : 'Nama Lengkap Kosong'
                    : ''
                  }
                  { ...field }
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render = {({field}) => (
                <TextField
                  variant="outlined" 
                  fullWidth 
                  id="address"
                  label="Alamat Rumah"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address 
                    ? errors.address.type === 'minLength' 
                    ? 'Alamat Rumah Kurang, Isi Lebih Dari 1' 
                    : 'Alamat Rumah Kosong'
                    : ''
                  }
                  { ...field }
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render = {({field}) => (
                <TextField
                  variant="outlined" 
                  fullWidth 
                  id="message"
                  label="Pesan-pesan yang di terima"
                  error={Boolean(errors.message)}
                  helperText={
                    errors.message 
                    ? errors.message.type === 'minLength' 
                    ? 'Pesan-pesan Kurang, Isi Lebih Dari 1' 
                    : 'Pesan-pesan Kosong'
                    : ''
                  }
                  { ...field }
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="numberPhone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render = {({field}) => (
                <TextField
                  variant="outlined" 
                  fullWidth 
                  id="numberPhone"
                  label="Nomor Telepon"
                  error={Boolean(errors.numberPhone)}
                  helperText={
                    errors.numberPhone 
                    ? errors.numberPhone.type === 'minLength' 
                    ? 'Nomor Telepon Kurang, Isi Lebih Dari 1' 
                    : 'Nomor Telepon Kosong'
                    : ''
                  }
                  { ...field }
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button 
              variant="contained"
              type="submit"
              fullWidth
              color="primary"
            >
              Selanjutnya
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
