// import data from "../utils/data";
import { 
  Button,
  Card,
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Grid, 
  Typography
} from "@material-ui/core";
import NextLink from 'next/link';
import Layout from "../components/Layout";
import db from "../utils/db";
import Product2 from "../models/Product2";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utils/Store";

export default function Home(props) {
  const router = useRouter ();
  const { state, dispatch } = useContext ( Store );
  const { products1 } = props;
  const addToCartHandler1 = async (product0) => {
    const existItem = state.cart.cartItems.find( (x) =>x._id === product0._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products2/${product0._id}`);
    if(data.countInStock < quantity) {
      window.alert ('Maaf. Produk Telah Habis');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product0, quantity} });
    router.push('/cart2');
  };
  return (
    <Layout>
      <div>
        <h1>Bunga Rotan</h1>
        <Grid container spacing={3}>
          {products1.map((product0) => (
            <Grid 
              item 
              md={4} 
              key={product0.name}
            >
              <Card>
                <NextLink href={`/product2/${product0.pid}`} passHref>
                  <CardActionArea>
                    <CardMedia 
                      component="img"
                      image={product0.image}
                      title={product0.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>
                        {product0.name}
                      </Typography>
                      <Typography>
                        Rp.{product0.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Button
                    size="small" 
                    color="primary"
                    variant="contained"
                    onClick={() => addToCartHandler1(product0)}
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
    
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products1 = await Product2.find({}).lean();
  await db.disconnect();
  return {
    props:{
      products1: products1.map(db.convertDocToObj),
    },
  };
}
