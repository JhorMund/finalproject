// import { useRouter } from 'next/router';
// import data from '../../utils/data';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { 
  Button,
  Card,
  Grid, 
  Link, 
  List,
  ListItem,
  Typography,
 } from '@material-ui/core';
import useStyles from '../../utils/styles';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import Product2 from '../../models/Product2';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter ();
  const { state, dispatch } = useContext ( Store );
  const { product0 } = props;
  const classes = useStyles();
  if (!product0) {
    return <div> Product Tidak Ditemukan</div>;
  }
  const addToCartHandler1 = async () => {
    const { data } = await axios.get(`/api/products2/${product0._id}`);
    if(data.countInStock <= 0) {
      window.alert ('Maaf. Produk Telah Habis');
      return;
    }
    const existItem = state.cart.cartItems.find(x=>x._id === product0._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if(data.countInStock < quantity) {
      window.alert ('Maaf. Produk Telah Habis');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product0, quantity} });
    router.push('/cart');
  };

  return (
    <Layout title={product0.name} description={product0.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>
              Kembali
            </Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product0.image}
            alt={product0.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>  
              <Typography component="h1" variant="h1">
                {product0.name}
              </Typography>
            </ListItem>
            <ListItem>
            <Typography>
              Kategory: {product0.category}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Deskripsi:{product0.description}
              </Typography> 
            </ListItem>
            <ListItem>
              <Typography>
                Ukuran:{product0.ukuran}
              </Typography> 
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      Status :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product0.countInStock > 0 ? 'ada barang' : 'tidak terbatas'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      Harga :
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      Rp. {product0.price}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button 
                  fullwidth 
                  variant="contained" 
                  color="primary"
                  onClick={addToCartHandler1}
                >
                  Add To Cart
                </Button>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Typography>
                    Jika Anda Ingin Memesan Tinggal Kontak Kami Di Aplikasi Whatsapp
                  </Typography>
                </Grid>
              </ListItem>
              <ListItem>
                <Button 
                  fullwidth 
                  variant="contained" 
                  color="primary" 
                  href="https://api.whatsapp.com/send?phone=628999207632&text=Halo,%20Saya%20Mau%20Pesan%bunga." 
                  passHref
                  startIcon={<WhatsAppIcon/>}
                >
                  WhatsApp
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { pid } = params;

  await db.connect();
  const product0 = await Product2.findOne({ pid }).lean();
  await db.disconnect();
  return {
    props:{
      product0: db.convertDocToObj(product0),
    },
  };
}