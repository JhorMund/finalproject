// import data from '../utils/data';
import { 
  Button,
  Card, 
  CardActionArea, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Grid,
  Link,
  Typography, 
} from "@material-ui/core";
import NextLink from 'next/link';
import Layout from "../components/Layout";
import db from "../utils/db";
import Product2 from "../models/Product2";

export default function bungarotan(props) {
  const { products1 } = props;
  return (
    <Layout>
      <div>
        <NextLink href="/" passHref>
          <Link>
            <Typography>
              Kembali
            </Typography>
          </Link>
        </NextLink>
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
  );
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