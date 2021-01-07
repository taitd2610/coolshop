import Head from "next/head";
import styles from "../styles/Home.module.css";
import getCommerce from "../utils/commerce";
import {
  Grid,
  Card,
  CardMedia,
  Link,
  Slide,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";

export default function Home(props) {
  const { products } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Cool Shop</title>
      </Head>

      <main className={styles.main}>
        <Grid container spacing={1}>
          {products.map((product) => (
            <Slide key={product.id} direction="up" in={true}>
              <Grid item md={3}>
                <Card>
                  <Link href={`/products/${product.permalink}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        image={product.media.source}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body1"
                          color="textPrimary"
                          component="p"
                        >
                          {product.name}
                        </Typography>
                        <Box>
                          <Typography
                            gutterBottom
                            variant="h6"
                            color="error"
                            component="h6"
                          >
                            {product.price.formatted_with_symbol}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            </Slide>
          ))}
        </Grid>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TaiTD
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();

  return {
    props: {
      products,
    },
  };
}
