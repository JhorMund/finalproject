import { 
  Button,
  Card,
  Grid, 
  Link, 
  List, 
  ListItem, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  CircularProgress, 
} from '@material-ui/core';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import { Store } from '../../utils/Store';
import Image from 'next/image';
import useStyles from '../../utils/styles';
import CheckoutWizard from '../../components/checkoutWizard';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function reducer( state, action ) {
  switch ( action.type ){
    case 'FETCH_REQUEST':
      return { 
        ...state, 
        loading: true,
        error:'',
      };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        order: action.payload,
        error:'' 
      };
      case 'FETCH_FAIL':
      return { 
        ...state, 
        loading: false, 
        error: action.payload,
      };
    default: state;
  }
}

function Order({ params }) {
  const orderId = params.id;
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext (Store);
  const { userInfo } = state;
  
  
  const[{ loading, error, order }, dispatch ] = useReducer( reducer, { 
    loading: true, 
    order: {}, 
    error: '',
  });
  const { 
    shippingAddress, 
    orderItems, 
    itemsPrice, 
    shippingPrice, 
    totalPrice 
  } = order;

  useEffect(() => {
    if(!userInfo){
      return router.push('/login');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get (`/api/orders/${orderId}`, {
          headers: {authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if( !order._id || ( order._id && order._id !== orderId )){
      fetchOrder();
    }
  }, [order]);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  

  return (
    <Layout title={`Order ${orderId}`}>
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Order {orderId}
      </Typography> {
        loading ? (<CircularProgress />)
        : error ? <Typography className={classes.error}>{error}</Typography> 
        : <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Card className={classes.section}>
                  <List>
                    <ListItem>
                      <Typography component="h2" variant="h2">
                        Alamat Pengiriman
                      </Typography>
                    </ListItem>
                    <ListItem>
                      {shippingAddress.fullName}, {''}
                      {shippingAddress.address}, {''}
                      {shippingAddress.numberPhone}
                    </ListItem>
                  </List>
              </Card>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">
                      Item Pesanan
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Image
                            </TableCell>
                            <TableCell>
                              Nama
                            </TableCell>
                            <TableCell align="right">
                              Quantity
                            </TableCell>
                            <TableCell align="right">
                              Harga
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orderItems.map((item) => (
                            <TableRow key={item._id}>
                              <TableCell>
                                <NextLink href={`/product/${item.slug}`} passHref>
                                  <Link>
                                    <Image 
                                      src={item.image}
                                      alt={item.name}
                                      width={50}
                                      height={50}
                                    ></Image>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell>
                                <NextLink href={`/product/${item.slug}`} passHref>
                                  <Link>
                                    <Typography>{item.name}</Typography>
                                  </Link>
                                </NextLink>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{item.quantity}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>Rp.{item.price}</Typography>
                              </TableCell>
                              
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                </List>
                
              </Card>
            </Grid>
            <Grid md={3} xs={12}>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      Jumlah Pesanan
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          Items :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          Rp. {itemsPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          Pengiriman :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                        Rp.{shippingPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>
                            Total :
                          </strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          <strong>
                          Rp. {totalPrice}
                          </strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
      }
        
    </Layout>
  );
}

export async function getServerSideProps({params}) {
  return { props: { params }};
}

export default dynamic(() => Promise.resolve(Order), {ssr: false});